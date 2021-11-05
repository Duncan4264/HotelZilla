import express from 'express';


 const router = express.Router()

 // Middleware
 import { requireSignin, checkJwt } from '../middleware';

// Controller
import { createConnectionAccount, getAccountStatus, getAccountBalance,  getPayoutSettings, readStripeSessionId, stripeSuccess, readLocalStripeSessionId} from '../Controllers/stripe/StripeController';

try {
// Route to handle post request to handle creating stripe account
 router.post("/createStripeAccount/:userId", checkJwt, createConnectionAccount);
// route to handle getting strinpe account status
router.post("/getAccountStatus/:userId", checkJwt, getAccountStatus);
// route to handle getting account balance
router.post("/getAccountBalance/:userId", checkJwt, getAccountBalance);
// route to handle the account settings configuration 
router.post("/PayoutSettings/:userId", checkJwt, getPayoutSettings)
// route to get a stripe session id from the Stripe API
router.post("/stripe-session-id/:userId", checkJwt, readStripeSessionId)
// route to handle stripe success 
router.post("/stripe-success/:hotelId", checkJwt, stripeSuccess)
// route to handle stripe local
router.post("/stripe-local/:userId/:hotelId", checkJwt, readLocalStripeSessionId)
} catch (error) {
    // log the error to the console
    console.log(error)
}

module.exports = router; 