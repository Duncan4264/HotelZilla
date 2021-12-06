// Import people's dependencys
import React, { useState, useEffect } from "react";
import { readLocalHotel } from "../actions/hotel";
import { getLocalSessionId } from "../actions/stripe";
import { readLocalReview } from "../actions/review";
import {readUserAuth0, checkEmail, register} from '../actions/auth';
import LocalReviewCard from "../components/cards/LocalReviewCard";
import { Card } from 'antd';
import * as location from "../assets/9013-hotel.json";

import Lottie from "react-lottie";

// import { readReviews } from "../actions/review";

import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import { useAuth0 } from '@auth0/auth0-react';
import { toast } from "react-toastify";

/*
* Method to view a single hotel
* Parameters: match hotel Object and history Object
*/
const ViewLocalHotel = ({ match, history }) => {
  
  const {getAccessTokenSilently } = useAuth0();
  // state
  const [hotel, setHotel] = useState();
  const [image, setImage] = useState("");
  const [LocalReviews, setLocalReviews] = useState();
  const [hotelInfo, setHotelInfo] = useState();

  const [loading, setLoading] = useState(false);
  const [alreadyBooked] = useState(false);
  const [token, setToken] = useState("");

  // deconstruct auth from state
  const { auth } = useSelector((state) => ({ ...state }));



// constructor to load seller hotels and check if it's already booked when compontent is loaded
  useEffect(() => {
    try{
      const timer = setTimeout(() => {
        loadSellerHotel();
        loadSellerReviews();
      }, 10000);
    
      return () => clearTimeout(timer);


    }catch(err){
      console.log(err)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const defaultOptions1 = {
      loop: true,
      autoplay: true,
      animationData: location.default,
    };
    


// Method to load seller hotel
  const loadSellerHotel = async () => {
    try {
    // Method to grab user token
    const token = await getAccessTokenSilently();
    if(auth == null){
        // Read user from Auth0
        let user = await readUserAuth0(token);
        const name = user.data.nickname;
        const email = user.data.email;
          let res = await checkEmail(token, user.data.email);
        if(res.data) {
          window.localStorage.setItem("auth", JSON.stringify(res.data));
          window.location.reload(false);
        } else {
        await register({name, email});
        let res = await checkEmail(token, user.data.email);
        if(res.data) {
          window.localStorage.setItem("auth", JSON.stringify(res.data));
          window.location.reload(false);
        }
        window.location.reload(false);

      }
    }
    // method to set token state
    setToken(token);
    
    // call backed with response variable
    let res  = await readLocalHotel(token, match.params.hotelId);
    setHotelInfo(res.data.data.body);
    // set hotel state to response data
    setHotel(res.data.data.body.roomsAndRates.rooms[0]);
    console.log(res.data.data.body);
    let imageUrl = res.data.data.body.roomsAndRates.rooms[0].images[0].fullSizeUrl;
    let images = imageUrl.slice(0, -5) + 'z.jpg';
    setImage(images);
    } catch(error) {
      console.log(error);
    }
    
  };
// method to load seller reviews
  const loadSellerReviews = async () => {
    try {
    // Method to grab user token
    const token = await getAccessTokenSilently();
    // method to set token state

    let local = await readLocalReview(match.params.hotelId, token);
    console.log(local.data);
    setLocalReviews(local.data);
    } catch(error) {
      console.log(error);
    }
  }

  
/*
* Method to handle click
* Parameters: Enviroment Object
*/
  const handleClick = async (e) => {
    // if no auth or auth token
    if(!auth) {
      // send user to login
      history.push('/login')
      return;
    }
    // prevent default form data
    e.preventDefault();
    // set loading state to true
    setLoading(true);
    // if no auth token send user to login uri
    if (!auth) history.push("/login");
    // let response to get session ID
    let res = await getLocalSessionId( token, auth._id, match.params.hotelId);
    // let stripe await load stripe with stripe API key
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    // stripe redirect to
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result)).catch(err => console.log(err));
  };

  let handleError = () => {
    toast.error("Error loading hotel");
    history.push("/");
  };


  return ( 

    <>
    { !hotel || !LocalReviews ? 

    <>
    <div className="h-100 row align-items-center">
    <Lottie options={defaultOptions1} height={600} width={600} />

  </div> 
  </>: 
  hotel.ratePlans[0].features[0] ? (
    
      <>
      
    <div className="container-fluid bg-secondary p-5 text-center">
          <h1>{hotel.name}</h1>
        </div><div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <br />
                <img src={image} alt={hotel.name} width={900} height={800} className="img img-fluid m-2"/>
              </div>

              <div className="col-md-6">
                <br />
                <p className="alert alert-info mt-3">{hotel.ratePlans[0].price.current}</p>
                <p className="card-text">
                  <span className="float-right text-primary">
                  {hotel.ratePlans[0].features[0].title}
                  </span>
                </p>
                <p>Max Occupancy: {hotel.maxOccupancy.total}</p>
                <p>Address: {hotelInfo.propertyDescription.address.fullAddress}</p>
                <p>Reviews: {hotelInfo.guestReviews.brands.rating} out of {hotelInfo.guestReviews.brands.scale}</p>
                <p>{hotelInfo.atAGlance.keyFacts.arrivingLeaving[0]}</p>
                <p>{hotelInfo.atAGlance.keyFacts.arrivingLeaving[1]}</p>
                
                <br />
                <button
                  onClick={handleClick}
                  className="btn btn-lg btn-primary"
                  disabled={loading || alreadyBooked}
                >
                  {loading
                    ? "Loading..."
                    : alreadyBooked
                      ? "Already Booked"
                      : auth && token
                        ? "Book Now"
                        : "Login to Book"}
                </button>
              </div>

            </div>
          </div>
          <Card className="mt-5" title={`Review's`}>
      {LocalReviews.map((r) => (
          <LocalReviewCard key={r._id} r={r}/>
        ))}
    </Card>
    </>
  ): <>
  {handleError()}
  </>
    }
    </>
  )
}
;

export default ViewLocalHotel;
