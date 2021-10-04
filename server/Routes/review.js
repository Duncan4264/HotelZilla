// import dependinces 
import express from 'express'
import formidable from "express-formidable"
// import methods from hotel controller
import { createReview } from "../Controllers/review/reviewController";

// create router variable from express router
 const router = express.Router();

 // deconstruct middleware 
 import {hotelOwner, requireSignin} from "../middleware/index";


try {
    router.post('/create-review', requireSignin, formidable(), createReview);
} catch (error) {
    // log the error to the console
    console.log(error);
}

module.exports = router; 