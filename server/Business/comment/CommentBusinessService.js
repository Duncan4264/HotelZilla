import {createComment, readComments, countComments} from '../../Data/comments/CommentDAO';
/**
 * @description Method that creats a comment from business service layer
 * @author Cyrus Duncan
 * @date 13/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} status code
 */
export const createCommentService = async(req, res) => {
    try {
        let create = createComment(req, res);
        return create;
    } catch (error) {
        console.log(error);
    }
}

export const readCommentsService = async(req, res) => {
    try {
        let comments = readComments(req, res);
        return comments; 
    } catch (error) {
        console.log(error);
    }
}

export const countCommentService = async(req, res) => {
    try {
        let commentService = countComments(req, res);
        return commentService;
    } catch (error) {
        console.log(error);
    }
}