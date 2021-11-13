// import dependencys
import express from 'express';
import formidable from "express-formidable" ;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });



import {createProfile, readProfile, readImage, updateProfile, DeleteProfile} from "../Controllers/profile/profileController"

import { requireSignin, checkJwt} from '../middleware/index';
// create variable router from express router

 const router = express.Router();


 try{
 // Post request to /register URI directs to register method in Auth Controller
router.get('/profile/:userId', readProfile);
// send a prost request for with form data and require sign in middleware to create profile
router.post('/create-profile/:userId', checkJwt, formidable(),  createProfile);
// send a get request with profile id in uri to read image from API
router.get('/profile/image/:profileId', readImage);
// edit a profile based off of profile id
router.put('/update-profile/:profileId', formidable(), updateProfile).post(upload.single('image'));
// delete a profile bassed off of the profile id
router.delete('/delete-profile/:profileId', checkJwt, DeleteProfile);

 } catch(error) {
     // log and error to the console
     console.log(error)
 }

// export modules equal to the router variable
module.exports = router; 