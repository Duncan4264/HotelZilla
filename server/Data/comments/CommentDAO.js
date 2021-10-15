import Comment from '../../Models/comment';
/**
 * @description Method to create a comment in the database
 * @author Cyrus Duncan
 * @date 13/10/2021
 * @param {*} req
 * @param {*} res
 */
export const createComment = async (req, res) => {
    try {
        // grab field from req
        let fields = req.fields;
        // ad fields to review DTO
        let review = new Comment(fields);
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
/**
 * @description Method that handles reading comments based off of reviewId
 * @author Cyrus Duncan
 * @date 14/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} comments object array
 */
export const readComments = async(req, res) => {
    try {
        // let comments variable find comment object based off of Review Id
        let comments = await Comment.find({review:req.params.reviewId}).exec();
        // return res json
        res.json(comments);
        // return comments array
        return comments;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}

export const countComments = async(req, res) => {
    try {
        let commentCount = await Comment.countDocuments({user: req.params.userId}).exec();

        console.log(commentCount);
        res.json(commentCount);

        return commentCount;
    } catch (error) {
       console.log(error); 
    }
}