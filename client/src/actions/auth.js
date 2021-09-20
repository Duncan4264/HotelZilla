import axios from 'axios';
import { toast } from 'react-toastify';


/**
 * @description
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} user
 * @returns {*} returns the register success status or an resgister failed error
 */
export const register = async (user) => {
  try {
    // axios post to register URI with user paramater
   let register = await axios.post(`${process.env.REACT_APP_API}/register`, user);
   // return response status
   return register;
  } catch (error) {
    // log errors
    console.log(error);
  }
}

/*
* Method used to post login request to backend with user paramater
*  @Post method
*/
export const login = async (user) => {
  try {
    // axios post request to login URI with user paramater
    let login = await axios.post(`${process.env.REACT_APP_API}/login`, user)
    .catch(function (error) {
      if(error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message);
      }
      toast.error(error.response.data);
      return error;
    });
    return login;
  } catch (error) {
    // log any errors to the console
    console.log(error);
  }
}
 
/*
* Added method to update user in local storage
* @ Local storage
*/
  export const updateUser = async (user, next) => {
    // Get local stoarge has auth token
    if(window.localStorage.getItem('auth')) {
      // let JSON parse auth token
      let auth = JSON.parse(localStorage.getItem('auth'));
      // Set token to user 
      auth.user = user;
      // save token auth in JSON
      localStorage.setItem('auth', JSON.stringify(auth));
      next();
    }
  };

  export const readUser = async(userId) => {
    try {
    let hotel = await axios.get(`${process.env.REACT_APP_API}/user/${userId}`)
    return hotel;
    } catch(error) {
      console.log(error);
    }
  }

