import LoginForm from "../components/forms/LoginForm"
import {useState, useEffect} from 'react';
import { toast } from "react-toastify";
import { login, register } from "../actions/auth";
import {useDispatch} from "react-redux"
import { useAuth0 } from '@auth0/auth0-react';
import {readUserAuth0, checkEmail} from '../actions/auth';


/*
* Method to handle state and render Login Form
* Parameters: History 
*/
const Login = () => {
  const {getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    LoginUser();
  }, [])

    const LoginUser = async() => {
    // function to handle submit
        try {
          const token = await getAccessTokenSilently();
          // Read user from Auth0
          let user = await readUserAuth0(token);
          const name = user.data.nickname;
          const email = user.data.email;
          console.log(user.data.name);
            let res = await checkEmail(token, user.data.email);
          if(res.data) {
            window.localStorage.setItem("auth", JSON.stringify(res.data));
          } else {

          let registerUser = await register({name, email});
          let res = await checkEmail(token, user.data.email);
          if(res.data) {
            window.localStorage.setItem("auth", JSON.stringify(res.data));
          }
        }
          // // let response equare to login request
          //   let res = await login({email, password})
          //   // console.log('LOGIN RESPONSE ', res)
            
          //   // if the response has data
          //   if(res.data) {
          //     // save auth token to browser locally
          //       window.localStorage.setItem("auth", JSON.stringify(res.data));
          //       // dispatch that the user is logged in with response.data
          //       dispatch({
          //         type: 'LOGGED_IN_USER',
          //         payload: res.data
          //       });
                
          //       // reload the application to cache cookie 
          //       history.push("/");

          //       window.location.reload()
          //       // Send the user to the root of the application
               
          //     }
        

        } catch (error) {

          // Log the error to the console
            console.log(error);
            // if server errror display the error in the GUI
            if(error.response.status === 400) toast.error(error.response.data);
        }
      }
    


    return (
        <>
          <div className="container-fluid bg-secondary p-5 text-center">
            <h1>Login</h1>
          </div>
    
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">

              </div>
            </div>
          </div>
        </>
    )
}

export default Login;