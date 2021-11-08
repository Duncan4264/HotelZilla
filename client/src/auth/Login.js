
import { useEffect} from 'react';

import { register } from "../actions/auth";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          await register({name, email});
          let res = await checkEmail(token, user.data.email);
          if(res.data) {
            window.localStorage.setItem("auth", JSON.stringify(res.data));
            history.push('/');
            window.location.reload(false);
          }
          history.push('/');
          window.location.reload(false);
        }

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