// Dependecy 
import React from 'react';
import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { StripeSuccessRequest } from '../actions/stripe';
import {useHistory} from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
/*
* Method to handle stripe success state and redering
* Parameters: Match Hotel ID
*/
const StripeSuccess = ({match}) => {
    // History variables
    const history = useHistory();
    // Auth token variable state
    const {getAccessTokenSilently } = useAuth0();
    const { auth } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        StripeSuccess();
    });

    const StripeSuccess = async () => {
        
        const token = await getAccessTokenSilently();
                // grab stripe success 
                StripeSuccessRequest(token, auth._id, match.params.hotelId)
                // with response push to dashboard or cancel
                .then(res => {
                    // console.log('stripe sucess response', res.data)
                    if(res.data.success) {
                        history.push("/dashboard");
                    } else {
                        history.push("/stripe/cancel")
                    }
                })
    }
    return (
        <div className="container">
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 text-danger"/>
        </div>
    </div>
    )
}

export default StripeSuccess