import {countReviewService, newReviewService, readReviewService, readUserReviewService, editReviewService} from '../../Business/review/ReviewBusinessService';
/**
 * @description
 * @author Cyrus Duncan
 * @date 04/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return review
 */
export const createReview = async (req, res) => {
    try {
        // call review service
        let newReview = newReviewService(req, res);
        // return new review
        return newReview;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description method that reads reviews for a given user
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} reviews array
 */
export const readReviews = async (req, res) => {
    try {
        // let review variable equal to read review service
        let readReview = readReviewService(req, res);
        // return read review
        return readReview;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description method that counts reviews for a given user
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} review count number
 */
export const countReviews = async (req, res) => {
    try {
        // variable that calls count in review business service
        let count = countReviewService(req, res);
        // return count
        return count;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to read user reviews
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} array of user reviews 
 */
export const readUserReviews = async (req, res) => {
    try {
        // create variable that calls read reviews in business service
        let Reviews = readUserReviewService(req, res);
        // return reviews
        return Reviews;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method that edits a review based off of reviewID
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} status code 
 */
export const editReviews = async(req, res) => {
    try {
        // create variable that calls edit in review Business service
        let editReview = editReviewService(req, res);
        // return status code
        return editReview;
    } catch (error) {
        // log an error to the console
        console.log(error); 
    }
}
/**
 * @description Method that reads local reviews
 * @author Cyrus Duncan
 * @date 18/11/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} 
 */
const readLocalReviews = async (req, res) => {
    try {
        // create variable that calls read in review business service
        let readReview = readLocalReviewsService(req, res);
        // return reviews
        return readReview;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}