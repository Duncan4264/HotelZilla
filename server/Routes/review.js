// import dependinces 
import express from 'express'
import formidable from "express-formidable"
// import methods from hotel controller
import { countReviews, createReview, readReviews, readUserReviews, editReviews } from "../Controllers/review/reviewController";

// create router variable from express router
 const router = express.Router();

 // deconstruct middleware 
 import {hotelOwner, requireSignin, checkJwt} from "../middleware/index";


try {
    router.post('/create-review', checkJwt, formidable(), createReview);
    router.get('/reviews/:hotelId', checkJwt, readReviews);
    router.get('/user/reviewcount/:userId', checkJwt, countReviews);
    router.get('/users/reviews/:userId', checkJwt, readUserReviews);
    router.put(`/edit-review/:reviewId`, checkJwt, formidable(), editReviews);
} catch (error) {
    // log the error to the console
    console.log(error);
}

module.exports = router; 