// import dependinces 
import express from 'express'
import formidable from "express-formidable"
// import methods from hotel controller
import { create, readComments, countComments} from "../Controllers/comments/CommentController";

// create router variable from express router
 const router = express.Router();

 // deconstruct middleware 
 import {requireSignin} from "../middleware/index";


try {
    router.post('/create-comment', requireSignin, formidable(), create);
    router.get('/comments/:reviewId', requireSignin, readComments);
    router.get(`/user/comments/:userId`, requireSignin, countComments);
} catch (error) {
    // log the error to the console
    console.log(error);
}

module.exports = router; 