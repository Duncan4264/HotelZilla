 import express from 'express'
import { showMessage } from '../Controllers/AuthController';

 const router = express.Router()


router.get("/:message", showMessage);

module.exports = router; 