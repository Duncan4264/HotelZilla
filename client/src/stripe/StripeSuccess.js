import React from 'react';
import { useEffect } from 'react';
import { useSelector} from 'react-redux';
import { StripeSuccessRequest } from '../actions/stripe';
import {useHistory} from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const StripeSuccess = ({match}) => {
    const history = useHistory();
    const {
        auth: {token},
    } = useSelector((state) => ({...state}));

    useEffect(() => {
        StripeSuccessRequest(token, match.params.hotelId)
        .then(res => {
            // console.log('stripe sucess response', res.data)
            if(res.data.success) {
                history.push("/dashboard");
            } else {
                history.push("/stripe/cancel")
            }
        })
    }, [match.params.hotelId]);
    return (
        <div className="container">
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 text-danger"/>
        </div>
    </div>
    )
}

export default StripeSuccess