import {newReviewService} from '../../Business/review/ReviewBusinessService';
export const createReview = async (req, res) => {
    try {
        let newReview = newReviewService(req, res);
        return newReview;
    } catch (error) {
        console.log(error);
    }
}