// Import Dependencies 
import DashboardNav from "../components/DashboardNav";
import NavConnect from "../components/Navconnect";
import {Link} from 'react-router-dom';
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BookingCard from "../components/cards/BookingCard";

// Dashboard state and rendering class
const Dashboard = () => {
    // descustruce token from state
    const { 
        auth: {token},
    } = useSelector((state) => ({...state }));
    // state variable
    const [booking, setBooking] = useState([]);
    // constructor to load user bookings 
    useEffect(() => {
        // call method to load user booking
        loadUserBookings()
    }, [])
    // Method to handle load user bookings
    const loadUserBookings = async () => {
        // create variable to await loading user hotel bookings
        const res = await userHotelBookings(token);
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
                    <Link to="/" className="btn btn-primary">Search Hotels</Link>
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