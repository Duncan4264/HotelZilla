import {Modal} from "antd"
import { useSelector } from "react-redux";
import { useState } from "react";
import { create } from "../../actions/review";
import { useAuth0 } from '@auth0/auth0-react';
/*
* Method to handle order modal to
*/
const ReviewModal = ({hotel, reviewModal, setReviewModal}) => {
        // Grab the auth and user token from state
        const {auth} = useSelector((state) => ({...state}));
        const {getAccessTokenSilently } = useAuth0();
        const [values, setValues] = useState({
                title: "",
                content: "",
            })
        const {title, content} = values;
    /**
     * @description Method to handle Module cancel
     * @author Cyrus Duncan
     * @date 03/10/2021
     */
    const handleCancel = () => {
        console.log(hotel._id);
        setReviewModal(false);
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
            let reviewData = new FormData();
            // add review data
            reviewData.append("title", title);
            reviewData.append("content", content);
            reviewData.append("user", auth._id);
            reviewData.append("hotel", hotel._id);

            try {
                // create review in backend
                let review = await create(token, reviewData);
                // set review modal to false to remove form screen
                setReviewModal(false);
                // return review object
                return review;
            } catch (error) {
                // log an error to the console
                console.log(error);
            }
        } catch (error) {
            // log an error to the console
            console.log(error);
        }
        // close module
        setReviewModal(false);
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
        <Modal visible={reviewModal} title="Write a review" onCancel={handleCancel} onOk={handleOk}>
            <form onSubmit={handleOk}>
            <div className="form-group">
            <input type="text" name="userid" value={auth._id} hidden />
            <input type="text" name="hotelid" value={hotel._id} hidden />
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Review Title"
                className="form-control m-2"
                value={title}
                />
                <textarea
                name="content"
                onChange={handleChange}
                placeholder="Review Body"
                className="form-control m-2"
                value={content}
                />
            </div>
            <button className="btn btn-outline-primary m-2">Create Review</button>
            </form>
        </Modal>
    )
}
export default ReviewModal; 