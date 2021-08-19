import User from "../../Models/User";
import Stripe from 'stripe';
import queryString from "querystring";
import express from 'express';
import Hotel from '../../Models/hotel';
import Order from '../../Models/Order';
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectionAccount = async (request, response) => {
    //  find user from db
    const user = await User.findById(request.user._id).exec();
    console.log("USER ==> ", user);
    //  if user don't have stripe_account_id yet, create now
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({
        type: "express",
      });
      console.log("ACCOUNT ===> ", account);
      user.stripe_account_id = account.id;
      user.save();
    }
    // create login link based on account id (for frontend to complete onboarding)
    try {
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
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log("LOGIN LINK", link);
    response.json(link);
  } catch (error) {
    console.log(error);
  }
  };

  const updateDelayDays = async (accountId) => {
    const account = await stripe.accounts.update(accountId, {
      settings: {
        payouts: {
        schedule: {
          delay_days: 7,
        }
        }
      }
    });
    return account;
  };

  export const getAccountStatus = async (request, response) => {
    try {
    console.log("Entering get Account Status()");
    const user = await User.findById(request.user._id).exec();
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    const updataedAccount = await updateDelayDays(account.id);
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      stripe_seller: account,
    }, {new: true}
    ).select("-password").exec();

    response.json(updatedUser);
  } catch(error) {
    console.log(error)
  }
  };

  export const getAccountBalance = async(request, response) => {
    const user = await User.findById(request.user._id).exec();
    try {
      const balance = await stripe.balance.retrieve({
        stripeAccount: user.stripe_account_id,
      });
      console.log('Balance: ', balance);
      response.json(balance);
    } catch (error) {
      console.log(error);
    }
  }

  export const getPayoutSettings = async (request ,response) => {
    try {
      console.log('Payoutsettings()')
      const user = await User.findById(request.user._id).exec();


      const loginLink = await stripe.accounts.createLoginLink(user.stripe_seller.id, {
          redirect_url: process.env.STRIPE_SETTINGS_REDIRECT_URL,
      });
      console.log('Link for payout settings', loginLink);
      response.json(loginLink);
    } catch (error) {
      console.log('Stripe payout settings error ', error);
    }
  }

  export const readStripeSessionId = async (req, res) => {

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
  }

  export const stripeSuccess = async (req, res) => {
    try {
      
    //get hotel id from req body
    const {hotelId}= req.body
    // 2 find currently logged in user
    const user = await await User.findById(req.user._id).exec()

    // check if user has stripe session

    if(!user.stripeSession) return;

    console.log(user);

    // retrieve stripe session based on session ID 
    const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);

    // if session payment status is paid, create order
    if(session.payment_status === 'paid') {
      // check if order with that session id already exists by querying orders collection
      const orderExist = await Order.findOne({'session.id': session.id}).exec();
      if(orderExist) {
        res.json({sucess: true});
      } else {
        let newOrder = await new Order({
          hotel: hotelId,
          session,
          postedBy: user._id,
        }).save()
        // remove user's stripe session
        await User.findByIdAndUpdate(user._id, {
          $set: {stripeSession: {}},
        });

        res.json({success: true});
      }
    }
  } catch (error) {
   console.log("STRIPE SUCCESS ERROR ", error);
   res.json(400).send("STRIPE SUCCESS ERROR ")
  }
}
  
