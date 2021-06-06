import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

import RegisterForm from '../components/RegisterForm';

const Register = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const submitHandle = async (e) => {
        e.preventDefault();
        try {
       const response =  await axios.post(`${process.env.REACT_APP_API}/register`, {
            name,
            email,
            password,
        });
        console.log('REGISTER USER =======>', response);
        toast.success('Register sueccess!!');
        history.push("/login");
    }
        catch (error) {
            console.log(error);
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