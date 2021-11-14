// import dependencys
import express from 'express';
import formidable from "express-formidable" ;
const multer = require('multer');


import {createProfile, readProfile, readImage, updateProfile, DeleteProfile} from "../Controllers/profile/profileController"

import { requireSignin, checkJwt} from '../middleware/index';

 const router = express.Router();


 try{
 // Post request to /register URI directs to register method in Auth Controller
router.get('/profile/:userId', readProfile);
// send a prost request for with form data and require sign in middleware to create profile
router.post('/create-profile/:userId', checkJwt, formidable(),  createProfile);
// send a get request with profile id in uri to read image from API
router.get('/profile/image/:profileId', readImage);
// edit a profile based off of profile id
router.put('/update-profile/:profileId', formidable(), updateProfile);
// delete a profile bassed off of the profile id
router.delete('/delete-profile/:profileId', checkJwt, DeleteProfile);

 } catch(error) {
     // log and error to the console
     console.log(error)
 }

// export modules equal to the router variable
module.exports = router; 