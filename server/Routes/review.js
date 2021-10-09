// import dependinces 
import express from 'express'
import formidable from "express-formidable"
// import methods from hotel controller
import { countReviews, createReview, readReviews, readUserReviews, editReviews } from "../Controllers/review/reviewController";

// create router variable from express router
 const router = express.Router();

 // deconstruct middleware 
 import {hotelOwner, requireSignin} from "../middleware/index";


try {
    router.post('/create-review', requireSignin, formidable(), createReview);
    router.get('/reviews/:hotelId', requireSignin, readReviews);
    router.get('/user/reviewcount/:userId', requireSignin, countReviews);
    router.get('/users/reviews/:userId', requireSignin, readUserReviews);
    router.put(`/edit-review/:reviewId`, requireSignin, formidable(), editReviews);
} catch (error) {
    // log the error to the console
    console.log(error);
}

module.exports = router; 