import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {deleteProfile, read} from "../actions/profile";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

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
    const [image, setImage] = useState({});
    // Grab auth token from state
    const {auth} = useSelector((state => ({...state})));
    const { token } = auth;
    // constructor to run load user profile at start up
    useEffect(() => {
        loadUserProfile();
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
    return (
        <>
        <div class="container">
            <img align="center" class="" src={image} alt="Profile image example"/>
            <div class="fb-profile-text">
                <h1>{profile.name}</h1>
                <p>{profile.content}</p>
            </div>

            <Link to={`/profile/edit/${auth.user._id}`}>
                <EditOutlined className="text-warning" />
            </Link>
            <DeleteOutlined 
             onClick={() => handleProfileDelete(profile._id)}
             className="text-danger"
            />
            
        </div>
        </>
    )
}

export default ReadProfile;

