import User from "../../Models/User";
import Stripe from 'stripe';
import queryString from "querystring";
import express from 'express';

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
  
