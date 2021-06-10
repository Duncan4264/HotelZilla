import LoginForm from "../components/LoginForm"
import {useState} from 'react';
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import {useDispatch} from "react-redux"

const Login = ({history}) => {
    const [email, setEmail] = useState("ryan@gmail.com");
    const [password, setPassword] = useState("rrrrrr");
    const dispatch = useDispatch();
    const SubmitHandle = async (e) => {
        e.preventDefault();
        console.log("SEND LOGIN DATA", {email, password});
        try {
            let res = await login({email, password})
            console.log('LOGIN RESPONSE ', res)
            if(res.data) {
                window.localStorage.setItem("auth", JSON.stringify(res.data));

                dispatch({
                  type: 'LOGGED_IN_USER',
                  payload: res.data
                });
                history.push("/");
            }
        } catch (error) {
            console.log(error);
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