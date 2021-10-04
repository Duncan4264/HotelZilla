import { createReview } from "../../Data/review/reviewDAO";
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
