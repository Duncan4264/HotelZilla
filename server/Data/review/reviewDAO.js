import Review from "../../Models/Review";
import unirest from "unirest";
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
                res.status(400).send("error saving a review" + escapeHtml(error));
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
/*
*
*
*/
export const readLocalReviews = async (req, res) => {
    try {
        var request = unirest("GET", "https://hotels4.p.rapidapi.com/reviews/v2/list");

request.query({
	"hotelId": req.params.hotelId,
	"reviewOrder": "date_newest_first",
	"tripTypeFilter": "all"
});

request.headers({
	"x-rapidapi-host": process.env.RAPID_API_HOST,
	"x-rapidapi-key": process.env.RAPID_API_KEY,
	"useQueryString": true
});


request.end(function (response) {
	if (response.error) throw new Error(response.error);
    // console.log(response.body.data.reviews.body.reviewContent.reviews.hermes.groups[0].items);
    // console.log(response.body.data.reviews.body.reviewContent.reviews.hermes.groups[1].items);
	res.json(response.body.data.reviews.body.reviewContent.reviews.hermes.groups[0].items.slice(0,5));
});
    } catch(error) {
    // log an error to the console
    console.log(error);
}
    }