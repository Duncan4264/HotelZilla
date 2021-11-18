// Import dependiences
import User from "../../Models/User";
import Stripe from 'stripe';
import queryString from "querystring";
import express, { response } from 'express';
import Hotel from '../../Models/hotel';
import Order from '../../Models/order';
import unirest from 'unirest';
import moment from 'moment';

// Create stripe variable for stripe object with stripe api key
const stripe = Stripe(process.env.STRIPE_SECRET);

/*
* Method to create a connection account with Stripe API
* Parameters Request Object, Response Object
*/
export const createConnectionAccount = async (request, response) => {
  try {
    //  find user from db
    const user = await User.findById(request.params.userId).exec();
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
export const updateDelayDays = async (accountId) => {
    try{
      // make account variable that updates account object with accountId
    const acount = await stripe.accounts.update(accountId, {
      settings: {
        payouts: {
        schedule: {
          delay_days: 7,
        }
        }
      }
    });

    // return account object
    return acount;
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
    const user = await User.findById(request.params.userId).exec();
    // grab the account by account id
    const account = await stripe.accounts.retrieve(user.stripe_account_id);
    // make an updated account with account id
    const updataedAccount = await updateDelayDays(user.stripe_account_id);
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
    const user = await User.findById(request.params.userId).exec();
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
      const user = await User.findById(request.params.userId).exec();

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
    await User.findByIdAndUpdate(req.params.userId, {stripeSession: session}).exec()
    // return session ID as response to frontend 
    res.send({
      sessionId: session.id,
    })
  } catch(error) {
    console.log(error);
  }
  }
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @return {*} stripe success
 */
export const stripeSuccess = async (req, res) => {
  try {
    // 1 get hotel id from req.body
    let { hotelId } = req.body;

    // 2 find currently logged in user
    const user = await User.findById(req.params.hotelId).exec();
    console.log(user.stripeSession);
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
        var request = unirest("GET", "https://hotels4.p.rapidapi.com/properties/get-details");

  let theDate = moment().format('YYYY-MM-DD');
  let theDate2 = moment().add('7','days').format('YYYY-MM-DD');
  request.query({
    "id": hotelId,
    "adults1": "1",
    "checkIn": theDate,
	  "checkOut": theDate2,
    "currency": "USD",
    "locale": "en_US"
  });
  
  request.headers({
    "x-rapidapi-host": "hotels4.p.rapidapi.com",
    "x-rapidapi-key": "89c82a4054msh1dc9265c777dba3p139679jsn2eb8ca089188",
    "useQueryString": true
  });
  
  
  request.end(async function (response) {
    if (response.error) throw new Error(response.error);
    
    let hotel = response.body.data.body;
    let imageUrl = hotel.roomsAndRates.rooms[0].images[0].fullSizeUrl;
    imageUrl = imageUrl.slice(0, -5);
    imageUrl = imageUrl + 'z.jpg';
    imageUrl = imageUrl + '?impolicy=fcrop&w=900&h=590&q=high';

    let tagline = hotel.propertyDescription.tagline[0].replace( /(<([^>]+)>)/ig, '');
    let adminUser = await User.find({}).sort({"_id":1}).limit(1);
    let newHotel = new Hotel({
      title: hotel.propertyDescription.name,
      content: tagline,
      location: hotel.propertyDescription.address.cityName,
      price: hotel.propertyDescription.featuredPrice.currentPrice.plain,
      postedBy: "60dbba001aa8fd27c672d828",
      imageUrl: imageUrl,
      from: Date.now(),
      to: Date.now() + 7,
      bed: 1,
    }).save(async function(err, obj) {
      if (err) throw err;
      hotelId = obj._id;
      console.log(user._id);
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
        });
    });
  }
}
  } catch (err) {
    console.log("STRIPE SUCCESS ERR", err);
  }
}
/**
 * @description Method to get stripe sesson id
 * @author Cyrus Duncan
 * @date 17/11/2021
 * @param {*} req
 * @param {*} res
 */
export const readLocalStripeSessionId = async (req, res) => {
  try {
    var request = unirest("GET", "https://hotels4.p.rapidapi.com/properties/get-details");

    let theDate = moment().format('YYYY-MM-DD');
    let theDate2 = moment().add('7','days').format('YYYY-MM-DD');
    request.query({
      "id": req.params.hotelId,
      "adults1": "1",
      "checkIn": theDate,
      "checkOut": theDate2,
      "currency": "USD",
      "locale": "en_US"
    });
    
    request.headers({
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
      "x-rapidapi-key": "89c82a4054msh1dc9265c777dba3p139679jsn2eb8ca089188",
      "useQueryString": true
    });
    
    
    request.end(async function (response) {
      if (response.error) throw new Error(response.error);
      
      let hotel = response.body.data.body.roomsAndRates.rooms[0];
      let price =  hotel.ratePlans[0].price.current.substring(1);
          // create a session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: hotel.name,
          amount: Number(price * 100), // in cents
          currency: "usd",
          quantity: 1
        }
      ],
      payment_intent_data: {
        application_fee_amount: 2,
        transfer_data: {
          destination: "acct_1JJ3tOPwuqIiuJ32",
        },
      },

      // success and cancel uerls
      success_url: `${process.env.STRIPE_SUCCESS_URL}/${req.params.hotelId}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    // Add this session object to user in the database
    await User.findByIdAndUpdate(req.params.userId, {stripeSession: session}).exec()
    // return session ID as response to frontend 
    res.send({
      sessionId: session.id,
    })
    });
  } catch(error) {
    console.log(error);
  }
}

