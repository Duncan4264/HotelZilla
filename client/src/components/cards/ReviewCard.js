import { useEffect, useState } from "react"
import {read} from "../../actions/profile";
import moment from "moment";
import {EditOutlined} from '@ant-design/icons';
import EditReviewModal from "../modals/EditReviewModal";
import CreateCommentModal from '../modals/CommentModal';
import {readComments} from '../../actions/comment';
import { useSelector } from "react-redux";
import CommentCard from '../cards/CommentCard';
const ReviewCard = ({
    r,
    handleReviewDelete = (f) => f,
    owner = false,
}) => {
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState("");
    const [editReviewModal, setReviewModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [CommentModal, setCommentModal] = useState(false);

        // Grab auth token from state
        const {auth} = useSelector((state => ({...state})));
        const { token } = auth;
    
    useEffect(() => {
        loadUser();
        loadComment();
    }, [])
    const loadUser = async () => {
        try {
            let res = await read(r.user);
            // set the profile state with the data returend
            setProfile(res.data);
            // image 
            setImage(`${process.env.REACT_APP_API}/profile/image/${res.data._id}`) 
        } catch (error) {
            // log an error in the console
         console.log(error);   
        }     
    }
    const loadComment = async() => {
        try {
            console.log(r._id);
            // create variable that reads comments 
            let res = await readComments(token, r._id);
            console.log(res);
            // set comments state to res
            setComments(res.data);
        } catch (error) {
            // log the error to the console
            console.log(error);
        }
    }
    return (

  <div class="container">

	
	<div class="card">
	    <div class="card-body">
	        <div class="row">
        	    <div class="col-sm-2 text-center">
        	        <img src={image} alt="Profile" class="rounded img-fluid mx-auto d-block"/>
                  <a class="fs-4 card-title" href={`/user/${r.user}`}><strong>{profile.name}</strong></a>
        	        <p class="text-secondary text-center">{moment (new Date(r.createdAt)).format("MMMM Do YYYY, h:mm:ss a")}</p>

        	    </div>
        	    <div class="col-sm-10">
              {CommentModal && <CreateCommentModal review={r} CommentModal={CommentModal} setCommentModal={setCommentModal}/>}
              <p class="pull-right">
              <button onClick={() => setCommentModal(!CommentModal)}
                   className="btn btn-secondary">
                <u>Create a review</u>
                </button> 
              </p>
              {editReviewModal && <EditReviewModal hotel={r.hotel} editReviewModal={editReviewModal} setReviewModal={setReviewModal} review={r} />}
                  {owner &&
       <p className="pull-right"><button onClick={() => setReviewModal(!editReviewModal)}
                   className="btn btn-secondary">
                <u>Edit a review</u>
                </button> 
                </p>
       }

                  <h2>{r.title}</h2> 
        	       <div class="clearfix"></div>
        	        <p class="fs-4">{r.content}</p>
        	    </div>
	        </div>
          {comments.length === 0 ?
          <div className="card card-inner">
          <h1 className="text-center">No comments for this review.</h1>
          </div>
          : 
          
          comments.map((c) => (
            <CommentCard comment={c}/>
          ))
         }
          </div>
        </div>
      </div>
    )
}
export default ReviewCard;