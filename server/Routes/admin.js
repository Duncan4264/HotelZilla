// import dependencys
import express from 'express'

import {getAllUsers, suspendUser, unSuspendUser} from '../Controllers/admin/AdminController';

// create variable router from express router

 const router = express.Router();


 try{
    router.get('/admin/user/all', getAllUsers);
    router.put('/admin/user/suspend/:id', suspendUser);
    router.put('/admin/user/unsuspend/:id', unSuspendUser);
 } catch(error) {
     // Console log an error
     console.log(error)
 }

// export modules equal to the router variable
module.exports = router; 