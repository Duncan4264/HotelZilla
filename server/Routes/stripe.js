import express from 'express';


 const router = express.Router()

 // Middleware
 import { requireSignin } from '../middleware';

// Controller
import { createConnectionAccount, getAccountStatus, getAccountBalance,  getPayoutSettings, readStripeSessionId, stripeSuccess} from '../Controllers/stripe/StripeController';

try {
// Route to handle post request to handle creating stripe account
 router.post("/createStripeAccount", requireSignin, createConnectionAccount);
// route to handle getting strinpe account status
router.post("/getAccountStatus", requireSignin, getAccountStatus);
// route to handle getting account balance
router.post("/getAccountBalance", requireSignin, getAccountBalance);
// route to handle the account settings configuration 
router.post("/PayoutSettings", requireSignin, getPayoutSettings)
// route to get a stripe session id from the Stripe API
router.post("/stripe-session-id", requireSignin, readStripeSessionId)
// route to handle stripe success 
router.post("/stripe-success", requireSignin, stripeSuccess)
} catch (error) {
    // log the error to the console
    console.log(error)
}

module.exports = router; 