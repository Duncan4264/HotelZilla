import {LoadingOutlined} from '@ant-design/icons';
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getStripeStatus } from '../actions/stripe';
import { updateUser } from '../actions/auth';
const StripeCallback = ({history}) => {
    const {auth} = useSelector((state)=> ({...state}));
    const dispatch = useDispatch();


    useEffect(() => {
        if(auth && auth.token) accountStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const accountStatus = async () => {
        try {
            const response = await getStripeStatus(auth.token);
            updateUser(response.data, () => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: response.data,
                });
            });
            window.location.href = '/dashboard/seller';
        } catch(error) {
            console.log(error);
        }
    }
    return <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="h1 p-5 text-danger" />
    </div>
}

export default StripeCallback;