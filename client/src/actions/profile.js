import axios from 'axios';

/**
 * @description Grab the user profile based off of the user id
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} userId
 * @returns {*} Returns the user profile or an error finding user profile
 */
export const read = async (userId) => {
    try {
        // Grab the user profile from the backend passing the userId
        let profile = await axios.get(`${process.env.REACT_APP_API}/profile/${userId}`)
        // return the profile
        return profile;
    } catch (error) {
        // Log an error to the console
       console.log(error); 
    }
}
/**
 * @description Method to create a user profile with the user token and the form data passed through
 * @author Cyrus Duncan
 * @date 16/09/2021
 * @param {*} token
 * @param {*} data
 * @returns {*}  Returns the new user profile or an error creating the user profile
 */
export const create = async (token, data) => {
    try {
        // variable that sends the post request to the uri with the form data and token in the headers
        let profile = await axios.post(`${process.env.REACT_APP_API}/create-profile`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        // return the profile
        return profile;
    } catch(error) {
        // log an erorr to the console
        console.log(error);
    }
}
/**
 * @description Method to send token, form data and profile to API with profile id
 * @author Cyrus Duncan
 * @date 19/09/2021
 * @param {*} token
 * @param {*} data
 * @param {*} profileId
 * @returns {*} Return a profile
 */
export const editProfile = async (token, data, profileId) => {
    try{
        // profile varaibe that makes a put request to profile id
        let profile = await axios.put(`${process.env.REACT_APP_API}/update-profile/${profileId}`, data, {
            // Bearer token headers
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // return profile
        return profile;
    } catch(error) {
        // log an error to the console
        console.log(error);
        // return an error
        return error;
    }
}
/**
 * @description Method to delete a profile and send request to API to profileID
 * @author Cyrus Duncan
 * @date 19/09/2021
 * @param {*} token
 * @param {*} profileId
 * @returns {*} returnes the response from the API
 */
export const deleteProfile = async(token, profileId) => {
    try {
        // create a variable that deletes a profile based off of proffile ide
        let response = await axios.delete(`${process.env.REACT_APP_API}/delete-profile/${profileId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        // return response
        return response;
    } catch (error) {
        // log an error to the response
        console.log(error);
        // return an error
        return error;
    }
}

