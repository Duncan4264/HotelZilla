import axios from 'axios';
/**
 * @description Method that creates a comment by sending post request out to API
 * @author Cyrus Duncan
 * @date 14/10/2021
 * @param {*} token
 * @param {*} data
 * @returns {*} status code
 */
export const create = async (token, data) => {
    try {
        // create variable calling  axios post from API
        let comment = await axios.post(`${process.env.REACT_APP_API}/create-comment`, data, {
            headers: {
                // with jwt token
                Authorization: `Bearer ${token}`
            },
        });
        // return voew
        return comment;
    } catch (error) {
        // log an error to the console
        console.log(error);
      }
}
/**
 * @description Method to read commetns 
 * @author Cyrus Duncan
 * @date 14/10/2021
 * @param {*} reviewId
 * @param {*} token
 * @returns {*} comments object array 
 */
export const readComments = async(token, reviewId) => {
    try {
        let comments = await axios.get(`${process.env.REACT_APP_API}/comments/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return comments;
    } catch (error) {
       console.log(error); 
    }
}

export const countComments = async(userId, token) => {
    try {
        let comments = await axios.get(`${process.env.REACT_APP_API}/user/comments/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return comments;
    } catch (error) {
       console.log(error); 
    }
}