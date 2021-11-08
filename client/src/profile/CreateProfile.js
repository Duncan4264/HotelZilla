
import { useState, useEffect } from "react";
import { readUser } from "../actions/auth";
import ProfileCreateForm from "../components/forms/ProfileCreateform";
import {create} from "../actions/profile";
import { toast } from "react-toastify";
import { useAuth0 } from '@auth0/auth0-react';
/**
 * @description Method to create profile for the user based off of their userId and their user data
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} {match, history}
 * @returns {*} 
 */
const CreateProfile = ({match, history}) => {
  const {getAccessTokenSilently } = useAuth0();
    // create the state variables
    const [setProfile] = useState({});
    let profileId = "";

    const [user] = useState(false);
    // set the values of the projectin the state
    const [values, setValues] = useState({
        name: "",
        aboutme: "",
        image: "",
        })
        // set the image state to a placeholder image
    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW"
    );
    // set the location state
    const [location, setLocation] = useState("");
      
    // deconstruct profile variables and set it to values
    const {name, aboutme, image} = values;

    // constructor to handle loading user
    useEffect(() => {
        // call te method to load the user information
        loadUser();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    /*
    * Method to load the user, and set the profile equal to the user data response
    */
    const loadUser = async () => {
        // read the user from auth action and userId
        let res = await readUser(match.params.userId);
        // set the profile state with the data returend
        setProfile(res.data._id);
        profileId = res.data._id;

        console.log(profileId);
    }
    /*
    * Method to handle submit of form creation
    *
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // create a new form data object
        let profileData = new FormData();
        // append profile form data to profile data object
        profileData.append("name", name);
        profileData.append("content", aboutme);
        profileData.append("location", location);
        image && profileData.append("image", image);
        
        
        try {
          const token = await getAccessTokenSilently();
            // create profile variable after creating profile with usertoken and form data
            const profile = await create(token, profileData, match.params.userId);
            // alert the user a new profile is created succuessfully
            toast.success("New  Profile is created");
            // set a timeout for 1000 seconds
            setTimeout(() => {
                // reload the window
                window.location.reload();
            }, 1000);
            // return the profile object
            return profile;
        } catch(error) {
            // log an error to the console
            console.log(error);

        }
    }
    /*
    * Method to handle an Image Change in state
    * Parameters: Event Object
    */
    const handleImageChange = (e) => {
        // method to set preview state to a new url created from event files
        setPreview(URL.createObjectURL(e.target.files[0]));
        // set the values of image to event tartget values
        setValues({...values, image: e.target.files[0]});
    }
    /*
    * Method to handle a change in state 
    * Parameters: Event Object
    */
    const handleChange = (e) => {
        // set the values of the state of e target neame to e target value
        setValues({...values, [e.target.name]: e.target.value });
    }
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
          <h2>Create Profile</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <br />
              <ProfileCreateForm
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
                location={location}
                setLocation={setLocation}
                User={user}
              />
            </div>
            <div className="col-md-2">
              <img
                src={preview}
                alt="preview_image"
                className="img img-fluid m-2"
              />
              <pre>{JSON.stringify(values, null, 4)}</pre>
              {JSON.stringify(location)}
            </div>
          </div>
        </div>
      </>
    )
}
export default CreateProfile;