// import dependicnes 
import {LoadingOutlined} from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getStripeStatus } from '../actions/stripe';
import { updateUser } from '../actions/auth';
/*
* Method stripe call back method to handle stripe call backs 
* Parameters: History Object
*/
const StripeCallback = ({history}) => {
    // state variables
    const {auth} = useSelector((state)=> ({...state}));
    // dispatch variable
    const dispatch = useDispatch();


    useEffect(() => {
        if(auth && auth.token) accountStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const accountStatus = async () => {
        try {
            // create response variable to get stripe status
            const response = await getStripeStatus(auth.token);
            // Update user with response data 
            updateUser(response.data, () => {
                // Dispatch logged in user with response data
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: response.data,
                });
            });
            // set window location uri with seller
            window.location.href = '/dashboard/seller';
        } catch(error) {
            // log error to console
            console.log(error);
        }
    }
    return <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="h1 p-5 text-danger" />
    </div>
}

export default StripeCallback;