import axios from 'axios';
/**
 * @description Method to create a review
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} token
 * @param {*} data
 * @returns {*} 
 */
export const create = async (token, data) => {
try {
    // create variable calling  axios post from API
    let review = await axios.post(`${process.env.REACT_APP_API}/create-review`, data, {
        headers: {
            // with jwt token
            Authorization: `Bearer ${token}`
        },
    });
    // return voew
    return review;
} catch (error) {
    // log an error to the console
    console.log(error);
  }
}
/**
 * @description Method to read reviews
 * @author Cyrus Duncan
 * @date 04/10/2021
 * @param {*} userId
 * @returns {*} reviews
 */
export const readReviews = async(hotelId, token) => {
    try {
        // get reviews from api
        let reviews = await axios.get(`${process.env.REACT_APP_API}/reviews/${hotelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(reviews);
        // return reviews
        return reviews;
    } catch (error) {
        // log an error
        console.log(error);
    }
}
/**
 * @description Method to count reviews 
 * @author Cyrus Duncan
 * @date 05/10/2021
 * @param {*} userId
 * @param {*} token
 * @returns {*} 
 */
export const countReviews = async(userId, token) => {
    try {
        // count the amount of reviews based off of user id from API
        let count = await axios.get(`${process.env.REACT_APP_API}/user/reviewcount/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // return count
        return count;
    } catch (error) {
        // log the error to the console
        console.log(error);
    }
}
/**
 * @description
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} userId
 * @param {*} token
 * @returns {*} 
 */
export const readuserReviews = async(userId, token) => {
    try {
        // grab user reviews 
        let reviews = await axios.get(`${process.env.REACT_APP_API}/users/reviews/${userId}`, {
            // pass review bearer token
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // return reviews
        return reviews;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to edit a profile 
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} reviewId
 * @param {*} data
 * @param {*} token
 * @returns {*} status code
 */
export const edit = async(reviewId, data, token) => {
    try {
        // send post request with new review and review token
    let review = await axios.put(`${process.env.REACT_APP_API}/edit-review/${reviewId}`, data, {
        headers: {
            // with jwt token
            Authorization: `Bearer ${token}`
        },
    });
    // return error
    return review;
    } catch (error) {
        // log an error to the console
       console.log(error); 
    }
}

export const readLocalReview = async(hotelId, token) => {
    try {
        // get reviews from api
        let reviews = await axios.get(`${process.env.REACT_APP_API}/local/reviews/${hotelId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(reviews);
        // return reviews
        return reviews;
    } catch (error) {
        // log an error
        console.log(error);
    }
}