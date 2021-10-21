// Import people's dependencys
import React, { useState, useEffect } from "react";
import { read, diffDays, isAlreadyBooked } from "../actions/hotel";
import { getSessionId } from "../actions/stripe";
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { readReviews } from '../actions/review';
import ReviewCard from "../components/cards/ReviewCard";
import { Card } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';

/*
* Method to view a single hotel
* Parameters: match hotel Object and history Object
*/
const ViewHotel = ({ match, history }) => {
  const {getAccessTokenSilently } = useAuth0();
  // state
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [token, setToken] = useState("");

  // deconstruct auth from state
  const { auth } = useSelector((state) => ({ ...state }));



// constructor to load seller hotels and check if it's already booked when compontent is loaded
  useEffect(() => {
    // call load seller hotel action in back end
    loadSellerHotel();
    // if authorized
    if(auth && token) {
      // check to see if user is already booked
      isAlreadyBooked(token, match.params.hotelId)
      // then if response
      .then((res) => {
        // set hotel objects to already booked
        setAlreadyBooked(res.data.ok);
      });
    }
    // read reviews
    readAllReview();
  }, []);
  

// Method to load seller hotel
  const loadSellerHotel = async () => {

    const token = await getAccessTokenSilently();
    
    setToken(token);
    // call backed with response variable
    let res  = await read(match.params.hotelId);
    // console.log(res);
    // set hotel state to response data
    setHotel(res.data);
    // set image to hotel image URI
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
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
    let res = await getSessionId( token, match.params.hotelId, auth._id);
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
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>{hotel.title}</h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>

          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">${hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
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

      <Card className="mt-5" title={`${hotel.title}'s Reviews`}>
      {reviews.map((r) => (
          <ReviewCard key={r._id} r={r}/>
        ))}
    </Card>




      
    </>
  );
};

export default ViewHotel;
