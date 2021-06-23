import express from 'express';


 const router = express.Router()

 // Middleware
 import { requireSignin } from '../middleware';

// Controller
import { createConnectionAccount } from '../Controllers/stripe/StripeController';

router.post("/createStripeAccount", requireSignin, createConnectionAccount);


module.exports = router; 