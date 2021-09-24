import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {deleteProfile, editProfile, read} from "../actions/profile";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { profileHotels } from '../actions/hotel';
import SmallCard from "../components/cards/SmallCard";
import {DeleteOutlined, EditOutlined, ProfileOutlined} from '@ant-design/icons'


/**
 * @description Method the returns the profile object from the backend
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} {match, history}
 * @returns {*} returns the profile object to the state or returns an error
 */
const ReadProfile = ({match, history}) => {
    //state
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setisUser] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [image, setImage] = useState({});
    const [owner, setOwner] = useState(false);
    // Grab auth token from state
    const {auth} = useSelector((state => ({...state})));
    const { token } = auth;
    // constructor to run load user profile at start up
    useEffect(() => {
        loadUserProfile();
        loadSellersHotels();
    }, [])
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
                if(auth.user._id !== match.params.userId) {
                    history.push('/dashboard');
                    toast.error("User Profile Does Not Exist");
                    return;
                }
                // navigate user to create profile with userid
                history.push(`/profile/create/${match.params.userId}`)
                // stop loading user profile
                return;
            }
            if(auth.user._id === match.params.userId) {
              setOwner(true);
            }
            
            // set profile to user state
            setProfile(res.data);
            // set image to user state
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
    const loadSellersHotels = async () => {
      try{
      // deconstruct data from calling seller hotels from back end
      let res  = await profileHotels(match.params.userId);
      // set hotels state to that data
      setHotels(res.data);
      } catch(error) {
        console.log(error);
        return;
      }

    };
    return (
        <>
<section class="profile">
  <header class="header">
    <div class="details">
      <img src={image} alt="Profile" class="profile-pic"/>
      <h1 class="heading">{profile.name}</h1>
      <div class="location">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
</svg>
        <p>{profile.location}</p>
      </div>
      <div class="aboutme">
        <h2 className="text-white"> About Us: </h2>
        <h2 className="text-white">{profile.content}</h2>
        </div>
      <div class="stats">
        <div class="col-4">
        {owner && 
          <div className="mb-3">
          <DeleteOutlined
          onClick={() => handleProfileDelete(profile._id)}
          className="text-danger"
          />
          </div>
            }
          <h4 className="text-white">20</h4>
          <p>Reviews</p>
        </div>
        <div class="col-4">
          {owner && <div className="mb-3">
          <ProfileOutlined/>
          </div>}
          <h4 className="text-white">10</h4>
          <p>Posts</p>
        </div>
        <div class="col-4">
          {owner &&
          <div className="mb-3">
                        <Link to={`/profile/edit/${auth.user._id}`}>
                <EditOutlined className="text-warning" />
            </Link>
            </div>}
          <h4 className="text-white">100</h4>
          <p>Comments</p>
        </div>
      </div>
    </div>
  </header>
</section> 

<h2 className="mt-5">{profile.name}'s Hotels</h2>
<div className="card mt-5">
  { owner &&<div className="card-body">
        {hotels.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            
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
    )
}

export default ReadProfile;

