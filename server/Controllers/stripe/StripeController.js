import User from "../../Models/User";
import Stripe from 'stripe';
import queryString from "querystring";

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectionAccount  = async (request, response) => {
    try
    {
    const user = await User.findById(request.user._id).exec();
    console.log("USER: ", user);

    const account = await stripe.accounts.create({
        type: 'express',
    });
    console.log("Account: ", account);
    user.stripe_account_id = account.id;
    user.save();

    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: "account_onboarding",
    });

    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
    });

    let link = (`${accountLink}?${queryString.stringify(accountLink)}`);

    console.log("LOGIN LINK: ", link);
    response.send(link);
    console.log("ACCOUNT LINK: ", accountLink);
    } catch (error)
    {
    console.log(error);
    }

    
}

