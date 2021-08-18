import express from 'express'
import formidable from "express-formidable"

import { create, hotels, readImage, sellerHotels, deleteHotel, readHotel, updateHotel} from "../Controllers/hotel/HotelController";

 const router = express.Router();

 import {hotelOwner, requireSignin} from "../middleware/index";



router.post("/create-hotel", requireSignin, formidable(), create);

router.get('/hotels', hotels);

router.get('/hotel/image/:hotelId', readImage);

router.get('/seller-hotels', requireSignin, sellerHotels);

router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, deleteHotel);

router.get('/hotel/:hotelId', readHotel);

router.put('/update-hotel/:hotelId', requireSignin, hotelOwner, formidable(), updateHotel);

module.exports = router; 