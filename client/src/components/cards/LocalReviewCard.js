import { useEffect, useState } from "react"
import CreateCommentModal from '../modals/CommentModal';
import {readComments} from '../../actions/comment';

import CommentCard from './CommentCard';
import { useAuth0 } from '@auth0/auth0-react';
const ReviewCard = ({
    r,
    handleReviewDelete = (f) => f,
    owner = false,
}) => {
    const {getAccessTokenSilently } = useAuth0();
    const [comments, setComments] = useState([]);
    const [CommentModal, setCommentModal] = useState(false);

       
    
    useEffect(() => {
        loadComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
    const loadComment = async() => {
        try {
            const token = await getAccessTokenSilently();
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

  <div className="container">

	
	<div className="card">
	    <div className="card-body">
	        <div className="row">
        	    <div className="col-sm-2 text-center">
        	        <img src={`https://st.depositphotos.com/1052233/2815/v/600/depositphotos_28158459-stock-illustration-male-default-profile-picture.jpg`} alt="Profile" className="rounded img-fluid mx-auto d-block"/>
                  <a className="fs-4 card-title" href="/"><strong>{r.reviewer.name}</strong></a>
        	        <p className="text-secondary text-center">{r.reviewDate}</p>

        	    </div>
        	    <div className="col-sm-10">
              {CommentModal && <CreateCommentModal review={r} CommentModal={CommentModal} setCommentModal={setCommentModal}/>}
              <p className="pull-right">
              <button onClick={() => setCommentModal(!CommentModal)}
                   className="btn btn-secondary">
                <u>Create a review</u>
                </button> 
              </p>
                  <h2>{r.summary}</h2> 
        	       <div className="clearfix"></div>
        	        <p className="fs-4">{r.description}</p>
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