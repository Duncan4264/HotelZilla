// Dependecy 
import React from 'react';
import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { StripeSuccessRequest } from '../actions/stripe';
import {useHistory} from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

/*
* Method to handle stripe success state and redering
* Parameters: Match Hotel ID
*/
const StripeSuccess = ({match}) => {
    // History variables
    const history = useHistory();
    // Auth token variable state
    const {
        auth: {token},
    } = useSelector((state) => ({...state}));

    // Constructor to handle stripe success
    useEffect(() => {
        // grab stripe success 
        StripeSuccessRequest(token, match.params.hotelId)
        // with response push to dashboard or cancel
        .then(res => {
            // console.log('stripe sucess response', res.data)
            if(res.data.success) {
                history.push("/dashboard");
            } else {
                history.push("/stripe/cancel")
            }
        })
        // grab histroy, hotelId and token variables
    }, [history, match.params.hotelId, token]);
    return (
        <div className="container">
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 text-danger"/>
        </div>
    </div>
    )
}

export default StripeSuccess