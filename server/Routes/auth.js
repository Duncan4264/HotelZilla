 import express from 'express'
import { Register  } from '../Controllers/AuthController';

 const router = express.Router()


router.post('/register', Register);

module.exports = router; 