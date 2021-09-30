import {RegisterService, LoginService, readUserService} from '../../Business/auth/AuthBusinessService';
/**
 * @description
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} register response
 */
export const Register = async (req, res) => {
  try {
    // create business service
      let register = RegisterService(req, res);
      // return register 
      return register;
  } catch (error) {
    // log an error to the console
    console.log(error);
  }
 }
/**
 * @description Method that handles controller login response
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} login response
 */
export const Login = async(req, res) => {
   try {
     // variable that handles login business service
     let login = LoginService(req, res);
     // return login response
     return login;
   } catch (error) {
     // log an error to the console 
     console.log(error);
   }
}/**
 * @description method that handles controller request to read user
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} read user response
 */
export const readUser = async(req, res) => {
  try {
    let readUser = ReeadUserService(req, res);
    return readUser;
  } catch (error) {
    console.log(error);
  }
}

