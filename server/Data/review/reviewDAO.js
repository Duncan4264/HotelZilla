import Review from "../../Models/Review";
import { ObjectId } from "mongodb";
/**
 * @description method to create a review in the DAO
 * @author Cyrus Duncan
 * @date 03/10/2021
 * @param {*} req
 * @param {*} res
 */
export const createReview = async (req, res) => {
    try {
        // grab field from req
        let fields = req.fields;
        // ad fields to review DTO
        let review = new Review(fields);
        // save review to database
        review.save((error, result) => {
            if(error) {
                console.log("error saving a review  " + error);
                let errorMessage = "error saving a review";
                res.status(400).send(errorMessage + error);
            }
            // return results to front end in JSON
            res.json(result);
        })
    } catch (error) {
        // log an error to the console
        console.log(error);
        // return error with 400 in json
        res.status(400).json({
            error: error.message,
        });
    }
}
/**
 * @description method that reads reviews based off of hotel ID
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} hotels object array
 */
export const readReviews = async(req, res) => {
    try {
        // create variable that captures review find query to db
        let reviews = await Review.find({hotel: req.params.hotelId}).exec();
        // send response of reviews hotel object array to json
        res.json(reviews);
        // return reviews
        return reviews;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description method that counts reviews given user Id
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} review count integer
 */
export const countReviews = async(req, res) => {
    try {
        // method that counts reviews give userId
        let reviewCount = await Review.countDocuments({user: req.params.userId}).exec();
        // return count as a response in JSON
        res.json(reviewCount);
        // return review count
        return reviewCount;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method that read's user reviews based off of UserID
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} reviews object array
 */
export const readUserReviews = async (req, res) => {
    try {
        // create reviews object array equal to user reviews array
        let reviews = await Review.find({user: req.params.userId}).exec();
        // return response of reviews array in json
        res.json(reviews);
        // return reviews
        return reviews;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description method that edits a review
 * @author Cyrus Duncan
 * @date 09/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} status code
 */
export const edit = async (req, res) => {
    try {
        // grab fields and files frim req
        let fields = req.fields;
        // deconstruct fields
        let data = {...fields}
        // find by id and update review
        let updated = await Review.findByIdAndUpdate(req.params.reviewId, data, {
            new: true,
        }).exec();
        // return status code in json
        res.json(updated);
        // return status code
        return updated;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}