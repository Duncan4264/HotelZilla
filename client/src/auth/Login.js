import LoginForm from "../components/LoginForm"
import {useState} from 'react';
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import {useDispatch} from "react-redux"


/*
* Method to handle state and render Login Form
* Parameters: History 
*/
const Login = ({history}) => {
  // Create the staate
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // create dispatch
    const dispatch = useDispatch();
    // function to handle submit
    const SubmitHandle = async (e) => {
      // prevent form defaults
        e.preventDefault();
        // log the information in the console for dev testing
        // console.log("SEND LOGIN DATA", {email, password});
        try {
          // let response equare to login request
            let res = await login({email, password})
            // console.log('LOGIN RESPONSE ', res)
            
            // if the response has data
            if(res.data) {
              // save auth token to browser locally
                window.localStorage.setItem("auth", JSON.stringify(res.data));
                // dispatch that the user is logged in with response.data
                dispatch({
                  type: 'LOGGED_IN_USER',
                  payload: res.data
                });
                
                // reload the application to cache cookie 
                history.push("/");

                window.location.reload()
                // Send the user to the root of the application
               
              }

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
                <LoginForm
                  handleSubmit={SubmitHandle}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                />
              </div>
            </div>
          </div>
        </>
    )
}

export default Login;