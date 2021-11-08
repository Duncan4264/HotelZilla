// Dependecy 
import React from 'react';
import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { StripeSuccessRequest } from '../actions/stripe';
import {useHistory} from 'react-router-dom';
import Lottie from "react-lottie";
import { useAuth0 } from '@auth0/auth0-react';
import * as location from "../assets/9013-hotel.json";
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
    const defaultOptions1 = {
      loop: true,
      autoplay: true,
      animationData: location.default,

    };
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
        <Lottie options={defaultOptions1} height={600} width={600} />
        </div>
    </div>
    )
}

export default StripeSuccess