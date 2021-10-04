// Import dependices
import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import Navconnect from "../components/Navconnect";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectionAccount } from "../actions/stripe";
import { sellerHotels } from "../actions/hotel";
import { toast } from "react-toastify";
import SmallCard from "../components/cards/SmallCard";

import { deleteHotel } from "../actions/hotel";

// class to handle dashboard seller state and rendering
const DashboardSeller = () => {
  // deconstruct token from state
  const { auth } = useSelector((state) => ({ ...state }));
  // state varaibles
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);


  // Constructor to load seller hostels
  useEffect(() => {
    loadSellersHotels();
  }, []);

  // Method to load seller hotels
  const loadSellersHotels = async () => {
    try {
    // deconstruct data from calling seller hotels from back end
    let { data } = await sellerHotels(auth.token);
    // set hotels state to that data
    setHotels(data);
    } catch(error) {
      console.log(error);
    }
  };
 // Method to handle button click
  const handleClick = async () => {
    // set loading state to true
    setLoading(true);
    try {
      // response variable to create connection accout with token in stripe API
      let res = await createConnectionAccount(auth.token);
      // set browser location to response data
      window.location.href = res.data;
    } catch (err) {
      // log error to console
      console.log(err);
      // display an error in client
      toast.error("Stripe connect failed, Try again.");
      // set loading state to false
      setLoading(false);
    }
  };

/*
* Handle hotel delete method
* Parameters: Hotel ID String
*/
  const handleHotelDelete = async (hotelId) => {
    // if not canceled return
    if (!window.confirm("Are you sure?")) return;
      // Delete hotel method with token and hotel id  
    deleteHotel(auth.token, hotelId).then((res) => {
      // log the client hotel deleted meesage
      toast.success("Hotel Deleted");
      // call message to load seller hotels
      loadSellersHotels();
    });
  };


  const connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>

      <div className="row">
        {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            owner={true}
            handleHotelDelete={handleHotelDelete}
          />
        ))}
      </div>
    </div>
  );
    // Method to render not connected component
  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              MERN partners with stripe to transfer earnings to your bank
              account
            </p>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <Navconnect />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;