// Import dependiences
import User from "../../Models/User";
import Stripe from 'stripe';
import queryString from "querystring";
import express, { response } from 'express';
import Hotel from '../../Models/hotel';
import Order from '../../Models/Order';

// Create stripe variable for stripe object with stripe api key
const stripe = Stripe(process.env.STRIPE_SECRET);

/*
* Method to create a connection account with Stripe API
* Parameters Request Object, Response Object
*/
export const createConnectionAccount = async (request, response) => {
  try {
    //  find user from db
    const user = await User.findById(request.user._id).exec();
    //  if user don't have stripe_account_id yet, create now
    if (!user.stripe_account_id) {
      // create accout variable that creates a stripe account in express 
      const account = await stripe.accounts.create({
        type: "express",
      });
      // get the account id from user object
      user.stripe_account_id = account.id;
      // save the user object in the database
      user.save();
    }
    // create login link based on account id (for frontend to complete onboarding)

    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });
    // prefill any info such as email
    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email || undefined,
    });
    // create link with query string with account like uri
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;

    // return the response in json
    response.json(link);
  } catch (error) {
    // log an error to the console
    console.log(error);
  }
  };

  /*
  * Method to update the delayed days off of Stripe Activity
  * Parameters: Account ID
  */
export const updateDelayDays = async (req, res, accountId) => {
    try{
      // make account variable that updates account object with accountId
    const account = await stripe.accounts.update(accountId, {
      settings: {
        payouts: {
        schedule: {
          delay_days: 7,
        }
        }
      }
    });
    // return account object
    return account;
  } catch(error) {
    // log an error tthe console
    console.log(error);
  }
  };
/*
* Method to get account status from stripe
* Parameters: Request Object, Response Objects
*/
  export const getAccountStatus = async (request, response) => {
    try {
      // log to the console ettering get account status
    console.log("Entering get Account Status()");
    // grab the user by id
    const user = await User.findById(request.user._id).exec();
    // grab the account by account id
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // make an updated account with account id
    const updataedAccount = await updateDelayDays(account.id);
    // update the user with user id
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      stripe_seller: account,
      // set new stripe seller
    }, {new: true}
    ).select("-password").exec();

    // return the response in frontend with json
    response.json(updatedUser);
  } catch(error) {
    // log the error to the console
    console.log(error)
  }
  };
 /*
 * Method to get account balance
 * Parameters: Request, Repsonse
 */
  export const getAccountBalance = async(request, response) => {
    try {
    // const variable to find user by id
    const user = await User.findById(request.user._id).exec();
      // const balance to get stripe balance from userid
      const balance = await stripe.balance.retrieve({
        stripeAccount: user.stripe_account_id,
      });

      // return the response to json
      response.json(balance);
    } catch (error) {
      // log an error to the console
      console.log(error);
    }
  }
/*
* Method to get payout settings from Stripe API
* Parameters: Request Object, Response Object
*/
  export const getPayoutSettings = async (request ,response) => {
    try {
      // log method entered in console
      console.log('Payoutsettings()')
      // find user by id
      const user = await User.findById(request.user._id).exec();

      // Method to create login link from stripe accounts
      const loginLink = await stripe.accounts.createLoginLink(user.stripe_seller.id, {
          redirect_url: process.env.STRIPE_SETTINGS_REDIRECT_URL,
      });
      // return response json with login link
      response.json(loginLink);
    } catch (error) {
      // log the error to the console
      console.log('Stripe payout settings error ', error);
    }
  }

  export const readStripeSessionId = async (req, res) => {
    try {
    //Get hotel body from request body

    const {hotelId} = req.body
    // find the hotel based on HotelIID
    const hotel = await Hotel.findById(hotelId).populate("postedBy").exec();
    // Charge 20% application fee 
    const fee = (hotel.price * 20) / 100;
    // create a session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: hotel.title,
          amount: hotel.price * 100, // in cents
          currency: "usd",
          quantity: 1
        }
      ],
      payment_intent_data: {
        application_fee_amount: fee * 100,
        // this seller can see his balance in our fronetend dashboard 
        transfer_data: {
          destination: hotel.postedBy.stripe_account_id,
        },
      },
      // success and cancel uerls
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${hotel.id}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    // Add this session object to user in the database
    await User.findByIdAndUpdate(req.user._id, {stripeSession: session}).exec()
    // return session ID as response to frontend 
    res.send({
      sessionId: session.id,
    })
  } catch(error) {
    console.log(error);
  }
  }

  export const stripeSuccess = async (req, res) => {
    try {
      // 1 get hotel id from req.body
      const { hotelId } = req.body;

      // 2 find currently logged in user
      const user = await User.findById(req.user._id).exec();
      // check if user has stripeSession
      if (!user.stripeSession) return;
      // 3 retrieve stripe session, based on session id we previously save in user db
      const session = await stripe.checkout.sessions.retrieve(
        user.stripeSession.id
      );
      // 4 if session payment status is paid, create order
      if (session.payment_status === "paid") {
        // 5 check if order with that session id already exist by querying orders collection
        const orderExist = await Order.findOne({
          "session.id": session.id,
        }).exec();
        if (orderExist) {
          // 6 if order exist, send success true
          res.json({ success: true });
        } else {
          // 7 else create new order and send success true
          let newOrder = await new Order({
            hotel: hotelId,
            session,
            orderedBy: user._id,
          }).save();
          // 8 remove user's stripeSession
          await User.findByIdAndUpdate(user._id, {
            $set: { stripeSession: {} },
          });
          res.json({ success: true });
        }
      }
    } catch (err) {
      console.log("STRIPE SUCCESS ERR", err);
    }
}

