// import dependenceis
import Profile from '../../Models/profile';
import jwt from 'jsonwebtoken';
import fs from "fs";    
import hotel from '../../Models/hotel';
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
import { ObjectId } from 'mongodb';
/**
 * @description Method to handle reading a profile from the beckend mongo database
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} Returns the user profile
 */
export const readProfile = async (req, res) => {
    try { 
        // set variable to fond one profie based off of user id in object id of mongsedb
        let profile = await Profile.findOne({"user" : ObjectId(req.params.userId)})  
        // let profile = await Profile.findById(req.params.userId)
        .select("-image.data")
        .exec();
        // return json profile object
        res.json(profile);
        return profile;
    } catch(error) {
        // log an error to the console
        console.log(error)
        // return the 400 json status with error message
        res.status(400).json({
            error: error.message,
        })
    }
}
/**
 * @description Method to create a profile in the database
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} req
 * @param {*} res
 */
export const createProfile = async(req, res) => {
    try{
        // grab the fields and files from the request
        let fields = req.fields;
        let files = req.files;

        // make a new profile variable to the profile object with fields 
        let profile = new Profile(fields);
        // set profile user variable equal to request user id
        profile.user = req.params.userId
        profile.imageurl = fields.image;
        console.log(profile.imageurl);
        // if the files have an image
        // if(files.image) {
        //     // set the profile image data to the file path of the image
        //     profile.image.data = fs.readFileSync(files.image.path);
        //     // set the profile image type to the file image type
        //     profile.image.contentType = files.image.type;
        // }
        // save the profile to the data bae with error and result parameters
        profile.save((error, result) => {
            // if there is an error 
            if(error) {
                // log the error to the console
                console.log("error saving profile, ", error);
                // send an error 400 error saving profiles
                res.status(400).send("Error saving profile")
            }
            // return json of result of profile creations
            res.json(result);
        })
    } catch(error) {
        // log an error to the console
        console.log(error);
        // return the status 400 and error 
        res.status(400).json({
            error: error.message,
        });
    }
}
/**
 * @description Method that reads an image from the API URI
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} Method to read an image from the API with the profileID passed
 */
export const readImage = async (req, res) => {
    try {
        // create profile variable that finds a profile by the profileId
        let profile = await Profile.findById(req.params.profileId).exec();
        // if the profile, profile image and profile image data is not null
        if(profile && profile.image && profile.image.data !== null) {
            // set the content type to profile image content type
            res.set("Content-Type", profile.image.contentType);
            // send the profile image data
            return res.send(profile.image.data);
        }
    } catch(error) {
        // log an error to the console
        console.log(error);
        // return res status 400 json error with an error message
        res.status(400).json({
            error: error.message,
        })
    }
};
/**
 * @description Method that handles updating a profile in MongoDB
 * @author Cyrus Duncan
 * @date 19/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*}  Mongodb Update response
 */
export const updateProfile = async (req, res) => {
    try{
        // grab fields and files from request
        let fields = req.fields;
        let files = req.files;
        // deconstruct fields
        let data = {...fields}
        
        // console.log();
        // // if files have an image
        // if(files.image) {
        //     // create an image object
        //     let image = {}
        //     // read file from image path
        //     image.data = fs.readFileSync(files.image.path);
        //     // set image type to request image type
        //     image.contentType = files.image.type;
        //     // set image data to new imaage
        //     data.image = image;
        // }
        // data.image = req.files.image.path;
        // find profile by id and update with profile id parameter and data
        let updated = await Profile.findByIdAndUpdate(req.params.profileId, data, {
            new: true,
        }).select("-image.data")   
        // retunr updated 
        res.json(updated);
        return updated;
    } catch(error) {
        // log the error
        console.log(error);
        // return status of 400
        res.status(400).json({
            error: error.message,
        });
    }
}
/**
 * @description Method that handled delete profile in MongoDB
 * @author Cyrus Duncan
 * @date 19/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} returms mongodb status
 */
export const DeleteProfile = async (req, res) => {
    try {
        // create variable that finds a profile by id and deletes it
        let removed = await Profile.findByIdAndDelete(req.params.profileId).select("-image.data").exec();
        // returned removed status
        res.json(removed);
        return removed;
    } catch (error) {
        // log an error to the console and return 400 status error to client
      console.log(error);
      res.status(400).json({
        error: error.message,
      }) 
    }
}


