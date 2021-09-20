// Import people's dependencys
import React, { useState, useEffect } from "react";
import { read, diffDays, isAlreadyBooked } from "../actions/hotel";
import { getSessionId } from "../actions/stripe";
import moment from "moment";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

/*
* Method to view a single hotel
* Parameters: match hotel Object and history Object
*/
const ViewHotel = ({ match, history }) => {
  // state
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  // deconstruct auth from state
  const { auth } = useSelector((state) => ({ ...state }));


// constructor to load seller hotels and check if it's already booked when compontent is loaded
  useEffect(() => {
    // call load seller hotel action in back end
    loadSellerHotel();
    // if authorized
    if(auth && auth.token) {
      // check to see if user is already booked
      isAlreadyBooked(auth.token, match.params.hotelId)
      // then if response
      .then((res) => {
        // set hotel objects to already booked
        setAlreadyBooked(res.data.ok);
      });
    }
  }, []);
  

// Method to load seller hotel
  const loadSellerHotel = async () => {
    // call backed with response variable
    let res  = await read(match.params.hotelId);
    console.log(res);
    // console.log(res);
    // set hotel state to response data
    setHotel(res.data);
    // set image to hotel image URI
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };
/*
* Method to handle click
* Parameters: Enviroment Object
*/
  const handleClick = async (e) => {
    // if no auth or auth token
    if(!auth || !auth.token) {
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
    let res = await getSessionId(auth.token, match.params.hotelId);
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
                : auth && auth.token
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
