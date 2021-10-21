import {useState} from 'react';
import {toast} from 'react-toastify';
import  { register } from '../actions/auth';

import RegisterForm from '../components/forms/RegisterForm';

/*
* Method to handle Register state and register form
* Parameters: History 
*/
const Register = ({ history }) => {

    // Create state variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // function to handle form submit with event parmeter
    const submitHandle = async (e) => {
        // prevent default values
        e.preventDefault();
        try {
            // Make a response from register function, destructure name email and password
       await register({
            name,
            email,
            password,
        });
        // console.log('REGISTER USER =======>', response);

        // Post the success response to the client
        toast.success('Register sueccess!!');
        // send the user to the login URI
        history.push("/login");
    }
        catch (error) {
            // log the error to the console
            console.log(error);
            // if the error response status = 400 send the error to the GUI
            if(error.response.status === 400) toast(error.response.data);
        }
    }

    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
          <h1>Register</h1>  
        </div>

        

        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                <RegisterForm submitHandle={submitHandle} name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;