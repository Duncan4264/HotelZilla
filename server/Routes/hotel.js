import express from 'express'
import formidable from "express-formidable"

import { create } from "../Controllers/hotel/HotelController";

 const router = express.Router();

 import {requireSignin} from "../middleware/index";

router.post("/create-hotel", requireSignin, formidable(), create)

module.exports = router; 