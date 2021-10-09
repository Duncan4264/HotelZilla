import { useEffect, useState } from "react"
import {read} from "../../actions/profile";
import moment from "moment";
import {EditOutlined} from '@ant-design/icons';
import EditReviewModal from "../modals/EditReviewModal";
const ReviewCard = ({
    r,
    handleReviewDelete = (f) => f,
    owner = false,
}) => {
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState("");
    const [editReviewModal, setReviewModal] = useState(false);
    useEffect(() => {
        loadUser();
    }, [])
    const loadUser = async () => {
        try {
            let res = await read(r.user);
            // set the profile state with the data returend
            setProfile(res.data);
            // image 
            setImage(`${process.env.REACT_APP_API}/profile/image/${res.data._id}`) 
        } catch (error) {
         console.log(error);   
        }
        // read the user from auth action and userId

        
    }
    return (
    <div class="reviews mt-5">
    <div class="row blockquote review-item">
      <div class="col-md-3 text-center">
        <img class="rounded-circle reviewer" src={image} alt="Profile"/>
        <div class="caption">   
          <small>by <a href={`/user/${r.user}`}>{profile.name}</a></small>
        </div>
  
      </div>
      <div class="col-md-9">
        <h4>{r.title}</h4>
        <div class="ratebox text-center" data-id="0" data-rating="5"></div>
        <p class="review-text">{r.content}</p>
  
        <small class="review-date">{moment (new Date(r.createdAt)).format("MMMM Do YYYY, h:mm:ss a")}</small>
        <div className="mr-5">
        {editReviewModal && <EditReviewModal hotel={r.hotel} editReviewModal={editReviewModal} setReviewModal={setReviewModal} review={r} />}
        {owner &&
        <button onClick={() => setReviewModal(!editReviewModal)}
                  className="btn btn-secondary">
                  <u>Edit a review</u>
                </button> 
        }
      </div>
    </div>   
    </div>
    
  </div>
    )
}
export default ReviewCard;