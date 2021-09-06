// import dependencys
import express from 'express'
import { Register , Login } from '../Controllers/auth/AuthController';

// create variable router from express router

 const router = express.Router();


 try{
 // Post request to /register URI directs to register method in Auth Controller
router.post('/register', Register);

// Post request to /login URI directs to login method for integrity
router.post('/login', Login)
 } catch(error) {
     console.log(error)
 }

// export modules equal to the router variable
module.exports = router; 