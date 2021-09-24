import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ProfileEditForm from "../components/forms/ProfileEditForm";
import {useHistory} from 'react-router-dom';
import {read, editProfile} from "../actions/profile";
import { toast } from "react-toastify";
/**
 * @description Method to edit a profile based off of profile id, handles and renders form 
 * @author Cyrus Duncan
 * @date 19/09/2021
 * @param {*} {match}
 * @returns {*} Returns Edit form and API response
 */
const EditProfile = ({match}) => {
  // grab history
  const history = useHistory();
  // deconstruct auth from state
    const {auth} = useSelector((state) => ({...state}));
    // deconstruct token from state
    const {token} = auth;
  // create state  values
    const [values, setValues] = useState({
        name: "",
        content: "",
        image: "",
        location: "",
    });
    // create id state
    const [id, setId] = useState("")


    // create preview state with placeholder
    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100x100.png?text=PREVIEW"
    );
      
    // deconstruct fields from values
    const {name, content, image, location} = values;
    
    /*
    * Costructor that loads a user profile
    */
    useEffect(() => {
        loadUserProfile();
    }, []);

    /*
    * Load user profile from API based off of userId
    */
    const loadUserProfile = async () => {
      // crete variable that reads a userid
        let res = await read(match.params.userId);
        // set state id to response id
        setId(res.data._id)
        // set values to values and reponse data
        setValues({...values, ...res.data});
        // set state preview to api profile image
        setPreview(`${process.env.REACT_APP_API}/profile/image/${res.data._id}`);
    }
/*
* Method that handle edit profile submission
* Parameters: Event Object
*/
    const handleSubmit = async (e) => {
      // prevent form defaults
        e.preventDefault();
      // handle form data in form data object
        let profileData = new FormData();
        profileData.append("name", name);
        profileData.append("content", content)
        profileData.append("location", location)
        profileData.append("user", auth.user._id    )
        image && profileData.append("image", image);
        
        try{
          // send new form data to edit profile API with token, formdata and profile id
            let res = await editProfile(token, profileData, id);
            // alert a success profile is updated
            toast.success(`${res.data.name} is updated`)
            //send user to dashboard
            history.push(`/user/${match.params.userId}`)
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
          <h2>Edit Profile</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <br />
              <ProfileEditForm
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="col-md-2">
              <img
                src={preview}
                alt="preview_image"
                className="img img-fluid m-2"
              />
              {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
              {JSON.stringify(location)}
            </div>
          </div>
        </div>
      </>
    )
}

export default EditProfile;