import {Modal} from "antd"
import { useSelector } from "react-redux";
import { useState } from "react";
import { create } from "../../actions/comment";
import { useAuth0 } from '@auth0/auth0-react';
/*
* Method to handle order modal to
*/
const CreateCommentModal = ({review, CommentModal, setCommentModal}) => {
        // Grab the auth and user token from state
        const {auth} = useSelector((state) => ({...state}));
        const {getAccessTokenSilently } = useAuth0();
        const [values, setValues] = useState({
                title: "",
                content: ""
            })
        const {title, content} = values;
    /**
     * @description Method to handle Module cancel
     * @author Cyrus Duncan
     * @date 03/10/2021
     */
    const handleCancel = () => {
        setCommentModal(false);
      };
    /**
     * @description Method to handle form submit
     * @author Cyrus Duncan
     * @date 03/10/2021
     * @param {*} e
     * @returns {*} 
     */
    const handleOk = async (e) => {
        try {
            const token = await getAccessTokenSilently();
            // prevent default vlaues
            e.preventDefault();
            // grab review data
            let commentData = new FormData();
            // add review data
            commentData.append("title", title);
            commentData.append("content", content);
            commentData.append("user", auth.user._id);
            commentData.append("review", review._id);

            try {
                // create review in backend
                let editReview = await create(token, commentData);
                // set review modal to false to remove form screen
                setCommentModal(false);
                // refresh the window
                window.location.reload();
                // return review object
                return editReview;
            } catch (error) {
                // log an error to the console
                console.log(error);
            }
        } catch (error) {
            // log an error to the console
            console.log(error);
        }
        // close module
        setCommentModal(false);
    };
        /*
    * Method to handle a change in state 
    * Parameters: Event Object
    */
        const handleChange = (e) => {
            // set the values of the state of e target neame to e target value
            setValues({...values, [e.target.name]: e.target.value });
        }
    return (
        <Modal visible={CommentModal} title="Create A Comment" onCancel={handleCancel} onOk={handleOk}>
            <form onSubmit={handleOk}>
            <div className="form-group">
            <input type="text" name="userid" value={auth.user_id} hidden />
            <input type="text" name="hotelid" value={review._id} hidden />
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Comment Title"
                className="form-control m-2"
                value={title}
                />
                <textarea
                name="content"
                onChange={handleChange}
                placeholder="Comment Body"
                className="form-control m-2"
                value={content}
                />
            </div>
            <button className="btn btn-outline-primary m-2">Create Comment</button>
            </form>
        </Modal>
    )
}
export default CreateCommentModal; 