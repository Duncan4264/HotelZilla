 import express from 'express'
import { Register , Login } from '../Controllers/auth/AuthController';

 const router = express.Router()


router.post('/register', Register);

router.post('/login', Login)

module.exports = router; 