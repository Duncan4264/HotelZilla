import Review from "../../Models/Review";
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
                res.status(400).send("Error saving review" + error);
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