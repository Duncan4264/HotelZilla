
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { readUser } from "../actions/auth";
import moment from "moment";
import { read, diffDays } from "../actions/hotel";
import { useAuth0 } from '@auth0/auth0-react';
/**
 * @description class that creates a review
 * @author Cyrus Duncan
 * @date 03/10/2021
 * @param {*} {match, history}
 * @returns {*} 
 */
const CreateReview = ({match, history}) => {
// Grab the auth and user token from state
const {auth} = useSelector((state) => ({...state}));
const {getAccessTokenSilently } = useAuth0();
// create the state variables
const [review, setReview] = useState({});
const [hotel, setHotel] = useState({});
const [image, setImage] = useState("");
// set the values of the projectin the state
const [values, setValues] = useState({
    title: "",
    content: "",
    });

// Load user and seller hotel in constructor
useEffect(() => {
    loadUser();
    loadSellerHotel();
}, []);

  
// method to load user from api
const loadUser = async () => {
  const token = await getAccessTokenSilently();
    // load user
    let res = await readUser(auth.user._id);
    // set review to user
    setReview(res.data);
}
// Method to load seller hotel
const loadSellerHotel = async () => {
    // call backed with response variable
    let res  = await read(match.params.hotelId);
    // set hotel state to response data
    setHotel(res.data);
    // set image to hotel image URI
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
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
          </div>
        </div>
      </div>
    </>

)
}

export default CreateReview;