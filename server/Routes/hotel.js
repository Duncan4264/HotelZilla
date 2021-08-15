import express from 'express'
import formidable from "express-formidable"

import { create, hotels, readImage, sellerHotels} from "../Controllers/hotel/HotelController";

 const router = express.Router();

 import {requireSignin} from "../middleware/index";



router.post("/create-hotel", requireSignin, formidable(), create)

router.get('/hotels', hotels)

router.get('/hotel/image/:hotelId', readImage);

router.get('/seller-hotels', requireSignin, sellerHotels);

module.exports = router; 