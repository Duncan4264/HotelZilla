import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {deleteProfile, read} from "../actions/profile";
import { deleteHotel, countHotels } from "../actions/hotel";
import {countReviews} from "../actions/review"; 
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { profileHotels } from '../actions/hotel';
import SmallCard from "../components/cards/SmallCard";
import {DeleteOutlined, EditOutlined, ProfileOutlined} from '@ant-design/icons';
import { countComments  } from "../actions/comment";
import { useAuth0 } from '@auth0/auth0-react';
import { readuserReviews } from "../actions/review";
import { Card } from 'antd';
import ReviewCard from "../components/cards/ReviewCard";

/**
 * @description Method the returns the profile object from the backend
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} {match, history}
 * @returns {*} returns the profile object to the state or returns an error
 */
const ReadProfile = ({match, history}) => {
  const {getAccessTokenSilently } = useAuth0();
    //state
    const [profile, setProfile] = useState({});
    const [reviews, setReviews] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [hotelCount, setHotelCount] = useState(0);
    const [CommentCount, setCommentCount] = useState(0);
    const [hotels, setHotels] = useState([]);
    const [image, setImage] = useState({});
    const [owner, setOwner] = useState(false);
    

    // Grab auth token from state
    const {auth} = useSelector((state => ({...state})));
    
    // constructor to run load user profile at start up
    useEffect(() => {
        loadUserProfile();
        loadSellersHotels();
        countProfileReviews();
        countPost();
        countComment();
        readuserReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
 * @description Method to read user 
 * @author Cyrus Duncan
 * @date 10/9/2021
 */
const readuserReview  =  async()  => {
  try {
    const token = await getAccessTokenSilently();
      // read user reviews from api with userId and token
      let res = await readuserReviews(match.params.userId, token);
      // set reviews state to api response
      setReviews(res.data);
      // check to see if the user is owner of these reviews
      if(auth._id === match.params.userId) {
          // set owner state to true
          setOwner(true);
        }
  } catch (error) {
      // log an error tot the console
      console.log(error);
  }
};

    /*
    * Method to load user porifle from profile action
    * */
    const loadUserProfile = async () => {
        try {
          
            // Read the user profile with the profile userId
            let res = await read(match.params.userId);

            
            // If the response is undefined or null
            if(typeof res == 'undefined' || res == null || typeof res.data == 'undefined' ||  res.data == null)  {
                // if the user is not signed in as the user in userId parameter, return user to dashboard
                if(auth._id !== match.params.userId) {
                    history.push('/dashboard');
                    toast.error("User Profile Does Not Exist");
                    return;
                }
                // navigate user to create profile with userid
                history.push(`/profile/create/${match.params.userId}`)
                // stop loading user profile
                return;
            }
            if(auth._id === match.params.userId) {
              setOwner(true);
            }
        // set profile to user state
            setProfile(res.data);
            // // set image to user state   
            setImage(`${process.env.REACT_APP_API}/profile/image/${res.data._id}`) 
        } catch (error) {
            // log an error to the console.
           console.log(error); 
        }
    }

/**
 * @description Method to handle a Profile Delete
 * @author Cyrus Duncan
 * @date 19/09/2021
 * @returns {*} returns user to dashboard with a succuess popup or displays and error
 */
const handleProfileDelete = async() => {
        try {
          const token = await getAccessTokenSilently();
            // create a variable that deletes a profile based off of token and profile id
            let res = await deleteProfile(token, profile._id);
            // create and alert that profile has been deleted
            toast.success("Profile has been deleted");
            // send the user to the dashboard
            history.push('/dashboard');
            // return response variable
            return res;
        } catch (error) {
            // log an error 
            console.log(error);
        }
      }
/**
 * @description Method to count profile reviews
 * @author Cyrus Duncan
 * @date 05/10/2021
 * @returns {*} review count
 */
const countProfileReviews = async() => {
  try {
    const token = await getAccessTokenSilently();
    console.log(match.params.userId);
    // grab review count from database
    let res = await countReviews(match.params.userId, token);
    // set review count to response data
    setReviewCount(res.data);
    // return res
    return res;
  } catch (error) {
    // log an error to the console
    console.log(error);
  }
}
  /*
  * Handle hotel delete method
  * Parameters: Hotel ID String
  */
  const handleHotelDelete = async (hotelId) => {
    const token = await getAccessTokenSilently();
    // if not canceled return
    if (!window.confirm("Are you sure?")) return;    // Delete hotel method with token and hotel id  
    deleteHotel(token, hotelId).then((res) => {
      // log the client hotel deleted meesage
      toast.success("Hotel Deleted");
      // call message to load seller hotels
      loadSellersHotels();
    }).catch((err) => {
      // log an error to the console
      console.log(err);
    });
  };
    /*
    * Method to load the profile's hotels
    */
    const loadSellersHotels = async () => {
      try{
      // create variable that grabs profile hotels based off of user id
      let res  = await profileHotels(match.params.userId);
      // set hotels state to that data
      setHotels(res.data);
      } catch(error) {
        console.log(error);
        return;
      }
    };
    /*
    * Method to count profile hotels
    */
   const countPost = async () => {
    const token = await getAccessTokenSilently();
     try {
       // call the count hotels method from action to get hotel count from backend
      let res = await countHotels(match.params.userId, token);
      
      // set state to response data
      setHotelCount(res.data);
      // return response
      return res;
     } catch (error) {
       // log an error 
      console.log(error);
     }
   }
   const countComment = async () => {
    const token = await getAccessTokenSilently();
     try {
       let res = await countComments(match.params.userId, token);

      setCommentCount(res.data);
       return res;
     } catch (error) {
       console.log(error);
     }
   }
    return (
        <>
             {console.log(profile)}
<section className="profile">
  <header className="header">
    <div className="details mt-3">
      <img src={profile.imageurl || image|| profile.image} alt="Profile" className="profile-pic"/>
      <h1 className="heading">{profile.name}</h1>
      <div className="location">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
</svg>
        <p>{profile.location}</p>
      </div>
      <div className="aboutme">
        <h2 className="text-white"> About Us: </h2>
        <h2 className="text-white">{profile.content}</h2>
        </div>
      <div className="stats">
        <div className="col-4">
        {owner && 
          <div className="mb-3">
          <DeleteOutlined
          onClick={() => handleProfileDelete()}
          className="text-danger"
          />
          </div>
            }
          <h4 className="text-white">{reviewCount}</h4>
          <p>Reviews</p>
        </div>
        <div className="col-4">
          {owner && <div className="mb-3">
          <a href={`/user/reviews/${auth._id}`}>
          <ProfileOutlined className="text-white"/>
          </a>
          </div>}
          {hotelCount > 0 ?
          <h4 className="text-white">{hotelCount}</h4>
          : ""
          }
          <p>Hotel Posts</p>
        </div>
        <div className="col-4">
          {owner &&
          <div className="mb-3">
           <Link to={`/profile/edit/${auth._id}`}>
            <EditOutlined className="text-warning" />
            </Link>
            </div>}
          <h4 className="text-white">{CommentCount}</h4>
          <p>Comments</p>
        </div>
      </div>
    </div>
  </header>
</section> 

{ hotelCount === 0 ?
<>
<div className="container-fluid bg-secondary p-5 text-center">
          <h2>{profile.name}'s Reviews</h2>
        </div>
        <Card title={`${profile.name}'s Reviews`}>
        {
            owner 
        ? reviews.map((r) => (
          <ReviewCard key={r._id} r={r} owner={owner}/>
        ))
        : reviews.map((r) => (
          <ReviewCard className="mt-5" key={r._id} r={r}/>
        ))
        }
        </Card>
</>
:
<>
<h2 className="mt-5">{profile.name}'s Hotels</h2>
<div className="card mt-5">
  { owner &&<div className="card-body">
        {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            handleHotelDelete={handleHotelDelete}
            owner={true}

          />  
        ))}
  </div>
  }
  { !owner && <div className="card-body">
  {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            owner={false}
          />  
        ))}
    </div>}
</div>
</>
}

        </>
    )
}

export default ReadProfile;

