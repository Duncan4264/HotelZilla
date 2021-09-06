// import dependinces 
import express from 'express'
import formidable from "express-formidable"
// import methods from hotel controller
import { create, hotels, readImage, sellerHotels, deleteHotel, readHotel, updateHotel, userHotelBookings, isBooked, searchLists } from "../Controllers/hotel/HotelController";

// create router variable from express router
 const router = express.Router();

 // deconstruct middleware 
 import {hotelOwner, requireSignin} from "../middleware/index";


try {
    // route to handle create hotel post method with require sign on middleware, formidable method and create method uri
router.post("/create-hotel", requireSignin, formidable(), create);

// route to get hotels from hotels
router.get('/hotels', hotels);

// Route to get hotel image based off of hotel id uri
router.get('/hotel/image/:hotelId', readImage);
// route to get the seller hotels with require sign in middleware
router.get('/seller-hotels', requireSignin, sellerHotels);

// route to dleete a hotel based off of the hotel id, requires sign in and hotel owner
router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, deleteHotel);
// route to get a single hotel based off of hotel id
router.get('/hotel/:hotelId', readHotel);
// route to update hotel based off of hotel id, requires sign on and hotel owner middleware
router.put('/update-hotel/:hotelId', requireSignin, hotelOwner, formidable(), updateHotel);
// route to get users hotel bookings that requires sign in middleware
router.get('/user-hotel-bookings', requireSignin, userHotelBookings)
// route to get is already booked by hotel id, requiresignin middleware
router.get('/is-already-booked/:hotelId', requireSignin, isBooked)

// route to search hotel listings
router.post('/search-listings', searchLists)

} catch (error) {
    // log the error to the console
    console.log(error);
}

module.exports = router; 