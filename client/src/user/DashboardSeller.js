import DashboardNav from "../components/DashboardNav";
import NavConnect from "../components/Navconnect";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from '@ant-design/icons';
import { createConnectionAccount } from "../actions/stripe";
import { useState } from "react";
import {toast} from 'react-toastify';
const DashboardSeller = () => {
    const {auth} = useSelector((state) => ({...state}));
    const [loading, setLoading] = useState(false);

    const clickHandler = async () => {
        setLoading(true)
        try {
            let response = await createConnectionAccount(auth.token);
            console.log(response);
            window.location.href = response.data;
        } catch (error) {
            console.log(error);
            toast.error("Stripe conenction failed, please try again.");
            setLoading(false);
        }
    }
    const connected = () => (
        
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-10">
                <h2>Hotels</h2>
            </div>
        </div>
        <div className="col-md-2">
            <Link to="/hotels/new" className="btn btn-primary">Create Hotels</Link>
        </div>
    </div>
    );
    const unConnected = () => (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
                <div className="p-5 pointer">
                    <HomeOutlined className="h1"/>
                    <h4>Setup checkout with stripe to create hotels</h4>
                    <p className="lead">HotelZilla partners with stripe for collections.</p>
                    <button disabled={loading} onClick={clickHandler} className="btn btn-primary mb-3">
                        {loading ? 'Loading Stripe Connection' : 'Configure Payment'}
                    </button>
                    <p className="text-muted"><small>You will be redirected to Stripe for onboarding process.</small></p>
                </div>
            </div>
    </div>
    </div>
    );
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <NavConnect/>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav/>
            </div>
            { auth && auth.user && auth.user.stripe_seller && auth.user.stripe_seller.charges_enabled ? connected() : unConnected()}
        </>
    );
};

export default DashboardSeller;