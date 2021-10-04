import { useState } from "react";
import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { useHistory } from "react-router";
import OrderModal from "../modals/OrderModal";
import ReviewModal from "../modals/ReviewModal";
import { Link } from "react-router-dom";


/**
 * @description Method to handle the booking card component and render to front end the user, the user session and who booked the hotel
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} { hotel, session, orderedBy }
 * @returns {*} Booking component card
 */
const BookingCard = ({ hotel, session, orderedBy }) => {
  // create state variables
  const [showModal, setShowModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                alt="default hotel"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default hotel"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {hotel.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "usd",
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{hotel.location}</p>
              <p className="card-text">{`${hotel.content.substring(
                1,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(hotel.from, hotel.to)}{" "}
                  {diffDays(hotel.from, hotel.to) <= 1 ? " day" : " days"}
                </span>
              </p>
              <p className="card-text">{hotel.bed} bed</p>
              <p className="card-text">
                Available from {new Date(hotel.from).toLocaleDateString()}
              </p>
                {showModal && <OrderModal session={session} orderedBy={orderedBy} showModal={showModal} setShowModal={setShowModal}/>}
              <div className="d-flex justify-content-between h4">
                <button onClick={() => setShowModal(!showModal)}
                className="btn btn-primary">
                  Show Payment info
                </button>
              </div>
              {reviewModal && <ReviewModal hotel={hotel} reviewModal={reviewModal} setReviewModal={setReviewModal}/>}
              <button onClick={() => setReviewModal(!reviewModal)}
              className="btn btn-secondary">
                <u>Write A Review</u>
              </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default BookingCard;
