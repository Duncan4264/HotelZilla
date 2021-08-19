import express from 'express';


 const router = express.Router()

 // Middleware
 import { requireSignin } from '../middleware';

// Controller
import { createConnectionAccount, getAccountStatus, getAccountBalance,  getPayoutSettings, readStripeSessionId} from '../Controllers/stripe/StripeController';

router.post("/createStripeAccount", requireSignin, createConnectionAccount);

router.post("/getAccountStatus", requireSignin, getAccountStatus);

router.post("/getAccountBalance", requireSignin, getAccountBalance);

router.post("/PayoutSettings", requireSignin, getPayoutSettings)

router.post("/stripe-session-id", requireSignin, readStripeSessionId)
module.exports = router; 