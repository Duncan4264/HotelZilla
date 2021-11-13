// Import Dependencies 
import DashboardNav from "../components/DashboardNav";
import NavConnect from "../components/Navconnect";
import {Link} from 'react-router-dom';
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BookingCard from "../components/cards/BookingCard";
import { useAuth0 } from '@auth0/auth0-react';

// Dashboard state and rendering class
const Dashboard = () => {
    // descustruce token from state
    const {getAccessTokenSilently } = useAuth0();
    const { auth } = useSelector((state) => ({ ...state }));
    // state variable
    const [booking, setBooking] = useState([]);
    // constructor to load user bookings 
    useEffect(() => {
        // call method to load user booking
        loadUserBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Method to handle load user bookings
    const loadUserBookings = async () => {
        const token = await getAccessTokenSilently();
        // create variable to await loading user hotel bookings
        const res = await userHotelBookings(token, auth._id);
        setBooking(res.data);
    }
    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <NavConnect/>
            </div>

            <div className="container-fluid p-4">
                <DashboardNav/>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Bookings</h2>
                    
                </div>
                <div className="col-md-2">
                    <Link to="/" className="btn btn-primary mb-4">Search Hotels</Link>
                </div>
                </div>
                <div className="row">
                { booking.map(b => (
                    <BookingCard key={b._id} hotel={b.hotel} session={b.session} orderedBy={b.orderedBy} />
                ))
                }
                </div>
            </div>
        </>
    );
};

export default Dashboard;