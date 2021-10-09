import { createReview, readReviews, countReviews, readUserReviews, edit} from "../../Data/review/reviewDAO";
/**
 * @description business service for review create produt
 * @author Cyrus Duncan
 * @date 03/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} returns status code
 */
export const newReviewService = async (req, res) => {
    try {
        // try creating review
        let newReview = createReview(req, res);
        // return review status
        return newReview;
    } catch (error) {
        // log an error to the console
       console.log(error); 
    }
}
/**
 * @description Method to read reviews for given user
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*}  reviews array
 */
export const readReviewService = async (req, res) => {
    try {
        // read reviews from DAO
        let readReview = readReviews(req, res);
        // reead reviews
        return readReview;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to count posted reviews for a given user
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} review count 
 */
export const countReviewService = async (req, res) => {
    try {
        // let count equal to counting reviews
        let count = countReviews(req, res);
        // return count
        return count;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to read review service
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return user reviews
 */
export const readUserReviewService = async (req, res) => {
    try {
        // let user reviews
        let userReviews = readUserReviews(req, res);
        // return user reviews
        return userReviews;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description method to edit review service
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return review status code
 */
export const editReviewService = async(req, res) => {
    try {
        // variable that calls edit review DAO's edit method
        let editReview = edit(req, res);
        // return edit review
        return editReview;
    } catch (error) {
        // log an error to the console
       console.log(error); 
    }
}
