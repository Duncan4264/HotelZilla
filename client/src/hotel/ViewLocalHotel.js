// Import people's dependencys
import React, { useState, useEffect } from "react";
import { readLocalHotel, diffDays, isAlreadyBooked } from "../actions/hotel";
import { getLocalStripeSession } from "../actions/stripe";
import { readReviews } from "../actions/review";
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import ReviewCard from "../components/cards/ReviewCard";
import { Card } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

/*
* Method to view a single hotel
* Parameters: match hotel Object and history Object
*/
const ViewLocalHotel = ({ match, history }) => {
  const {getAccessTokenSilently } = useAuth0();
  // state
  const [hotel, setHotel] = useState();
  const [image, setImage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [token, setToken] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // deconstruct auth from state
  const { auth } = useSelector((state) => ({ ...state }));

// constructor to load seller hotels and check if it's already booked when compontent is loaded
  useEffect(() => {
    try{
    loadSellerHotel();
    setLoaded(true);
    }catch(err){
      console.log(err)
    };
    }, []);

// Method to load seller hotel
  const loadSellerHotel = async () => {
    try {
    // Method to grab user token
    const token = await getAccessTokenSilently();
    // method to set token state
    setToken(token);
    // call backed with response variable
    let res  = await readLocalHotel(token, match.params.hotelId);

    // set hotel state to response data
    setHotel(res.data);

    console.log(res.data.images[0].fullSizeUrl);
    let imageUrl = res.data.images[0].fullSizeUrl;
    let images = imageUrl.slice(0, -5) + 'w.jpg';
    console.log(images);
    setImage(images);
    } catch(error) {
      console.log(error);
    }
    // // set image to hotel image URI
    // setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };
  
// method to load reviews for hotel
  const readAllReview = async () => {
    const token = await getAccessTokenSilently(); 
    // call back to read reviews
    let res = await readReviews(match.params.hotelId, token);
    console.log(res.data);

    setReviews(res.data); 
    console.log(reviews);
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
    let res = await getLocalStripeSession( token, match.params.hotelId, auth._id);
    console.log(res);
    // let stripe await load stripe with stripe API key
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    // stripe redirect to
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => console.log(result));
  };

  return (   
    <>
    { !hotel ? <h1>Loading...</h1> :(
      <>
    <div className="container-fluid bg-secondary p-5 text-center">
          <h1>{hotel.name}</h1>
        </div><div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <br />
                <img src={image} alt={hotel.name} className="img img-fluid m-2" />
              </div>

              <div className="col-md-6">
                <br />
                <p className="alert alert-info mt-3">{hotel.ratePlans[0].price.current}</p>
                <p className="card-text">
                  <span className="float-right text-primary">
                    {hotel.ratePlans[0].features[0].title}
                  </span>
                </p>
                <p>
                {/* <b>{hotel.bedChoices.mainOptions}</b><br/> */}

                </p>
                <p>
                <b>Max Occupancy: {hotel.maxOccupancy.total}</b>
                </p>
                {/* <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i> */}
                <br />
                <button
                  onClick={handleClick}
                  className="btn btn-block btn-lg btn-primary mt-3"
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
          </>
             )
          }
    </>
  );
}
;

export default ViewLocalHotel;
