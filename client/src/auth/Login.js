import LoginForm from "../components/forms/LoginForm"
import {useState, useEffect} from 'react';
import { toast } from "react-toastify";
import { login, register } from "../actions/auth";
import {useDispatch} from "react-redux"
import { useAuth0 } from '@auth0/auth0-react';
import {readUserAuth0, checkEmail} from '../actions/auth';
import {useHistory} from 'react-router-dom';


/*
* Method to handle state and render Login Form
* Parameters: History 
*/
const Login = () => {
  const {getAccessTokenSilently } = useAuth0();
    // create history variable from react-router-dom
    const history = useHistory();

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
            history.push('/');
            window.location.reload(false);
          } else {
          let registerUser = await register({name, email});
          let res = await checkEmail(token, user.data.email);
          if(res.data) {
            window.localStorage.setItem("auth", JSON.stringify(res.data));
            history.push('/');
            window.location.reload(false);
          }
          history.push('/');
          window.location.reload(false);
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
        }
      }
    


    return (
        <>
          <div className="container-fluid bg-secondary p-5 text-center">
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