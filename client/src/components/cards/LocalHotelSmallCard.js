import { currencyFormatter } from "../../actions/stripe";
import { diffDays } from "../../actions/hotel";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
/**
 * @description Method to render the small card component and handle the hotel delete and edit, check if the user is the owener, render the hotel and show view single hotel
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} {
 *   h,
 *   handleHotelDelete = (f) => f,
 *   owner = false,
 *   showViewMoreButton = true,
 * }
 * @returns {*} Small card component
 */
const LocalHotelSmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
    {console.log(h)}
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {h.optimizedThumbUrls ? (
              <img
                src={h.optimizedThumbUrls.srpDesktop} 
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
                {h.name}{" "}
                <span className="float-right text-primary">
                {h.ratePlan.price.current}
                </span>{" "}
              </h3>
              <p className="alert alert-info">{h.address.streetAddress} - {h.address.locality}</p>
              { h.landmarks.map((l) => (
                <p className="card-text">{l.label} - {l.distance} away</p>
              ))} 
              <p className="card-text">
                <span className="float-right text-primary">
                  { h.guestReviews ? (
                    <>
                 Adverage User Review: {h.guestReviews.rating}/10 out of {h.guestReviews.total} Reviews
                 </>
                  ) : (
                    <>
                  User Review: Not Available
                    </>
                  )
                  }
                </span>
              </p>
              <p className="card-text">
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/local/hotel/${h.id}`)}
                    className="btn btn-primary"
                  >
                    Show more
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalHotelSmallCard;