// import dependinces 
import express from 'express'
import formidable from "express-formidable"
// import methods from hotel controller
import { create, hotels, readImage, sellerHotels, deleteHotel, readHotel, updateHotel, userHotelBookings, isBooked, searchLists, profileHotels, countHotels, readLocalHotels, readLocalHotel, searchLocalLists} from "../Controllers/hotel/HotelController";

// create router variable from express router
 const router = express.Router();

 // deconstruct middleware 
 import {hotelOwner, requireSignin, checkJwt} from "../middleware/index";



try {
    // route to handle create hotel post method with require sign on middleware, formidable method and create method uri
router.post("/create-hotel", checkJwt, formidable(), create);

// route to get hotels from hotels
router.get('/hotels', hotels);

// route to get hotels based off of userId
router.get('/profile-hotels/:userId', profileHotels)

// Route to get hotel image based off of hotel id uri
router.get('/hotel/image/:hotelId', readImage);
// route to get the seller hotels with require sign in middleware
router.get('/seller-hotels/:hotelId', checkJwt, sellerHotels);

// route to dleete a hotel based off of the hotel id, requires sign in and hotel owner
router.delete('/delete-hotel/:hotelId', checkJwt, deleteHotel);
// route to get a single hotel based off of hotel id
router.get('/hotel/:hotelId', readHotel);
// route to update hotel based off of hotel id, requires sign on and hotel owner middleware
router.put('/update-hotel/:hotelId', checkJwt, formidable(), updateHotel);
// route to get users hotel bookings that requires sign in middleware
router.get('/user-hotel-bookings/:userId', checkJwt, userHotelBookings)
// route to get is already booked by hotel id, requiresignin middleware
router.get('/is-already-booked/:hotelId', checkJwt, isBooked)

// route to search hotel listings
router.post('/search-listings', searchLists);

// route to search local hotel listings
router.post('/search-local-listings', searchLocalLists);

// route to count hotel listings
router.get('/user/hotels/:userId', checkJwt, countHotels);

// get api for hotel listings
router.get('/local/hotels/:word', readLocalHotels);
//get api for local hotel listing
router.get('/local/hotel/:hotelId', readLocalHotel);
} catch (error) {
    // log the error to the console
    console.log(error);
}

module.exports = router; 