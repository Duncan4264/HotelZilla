import {createCommentService, readCommentsService, countCommentService} from '../../Business/comment/CommentBusinessService';
/**
 * @description method to handle crete comment service
 * @author Cyrus Duncan
 * @date 13/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return response
 */
export const create = async(req, res) => {
    try {
       let response =  createCommentService(req, res);
       return response;
    } catch (error) {
        console.log(error);
    }
}
/**
 * @description Controller method that exports comments object array
 * @author Cyrus Duncan
 * @date 14/10/2021
 * @param {*} req
 * @param {*} res
 */
export const readComments = async(req,res) => {
    try {
        let comments = readCommentsService(req, res);
        return comments;
    } catch (error) {
       console.log(error); 
    }
}

export const countComments = async(req, res) => {
    try {
        let count = countCommentService(req, res);
        return count;
    } catch (error) {
        console.log(error);
    }
}
