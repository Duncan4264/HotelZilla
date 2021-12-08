import { useEffect, useState } from 'react';
import { read } from '../../actions/profile';

import EditReviewModal from '../modals/EditReviewModal';
import CreateCommentModal from '../modals/CommentModal';
import { readComments } from '../../actions/comment';

import CommentCard from '../cards/CommentCard';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
const ReviewCard = ({ r, handleReviewDelete = (f) => f, owner = false }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState('');
  const [editReviewModal, setReviewModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [CommentModal, setCommentModal] = useState(false);

  useEffect(() => {
    loadUser();
    loadComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadUser = async () => {
    try {
      let res = await read(r.user);
      // set the profile state with the data returend
      setProfile(res.data);
      // image
      setImage(`${process.env.REACT_APP_API}/profile/image/${res.data._id}`);
    } catch (error) {
      // log an error in the console
      console.log(error);
    }
  };
  const loadComment = async () => {
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
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-2 text-center">
              <img
                src={profile.imageurl || image|| profile}
                alt="Profile"
                className="rounded img-fluid mx-auto d-block"
              />
              <a className="fs-4 card-title" href={`/user/${r.user}`}>
                <strong>{profile.name}</strong>
              </a>
              <p className="text-secondary text-center">
                {moment(new Date(r.createdAt)).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </p>
            </div>
            <div className="col-sm-10">
              {CommentModal && (
                <CreateCommentModal
                  review={r}
                  CommentModal={CommentModal}
                  setCommentModal={setCommentModal}
                />
              )}
              <p className="pull-right">
                <button
                  onClick={() => setCommentModal(!CommentModal)}
                  className="btn btn-secondary"
                >
                  <u>Create a review</u>
                </button>
              </p>
              {editReviewModal && (
                <EditReviewModal
                  hotel={r.hotel}
                  editReviewModal={editReviewModal}
                  setReviewModal={setReviewModal}
                  review={r}
                />
              )}
              {owner && (
                <p className="pull-right">
                  <button
                    onClick={() => setReviewModal(!editReviewModal)}
                    className="btn btn-secondary"
                  >
                    <u>Edit a review</u>
                  </button>
                </p>
              )}

              <h2>{r.title}</h2>
              <div className="clearfix"></div>
              <p className="fs-4">{r.content}</p>
            </div>
          </div>
          {comments.length === 0 ? (
            <div className="card card-inner">
              <h1 className="text-center">No comments for this review.</h1>
            </div>
          ) : (
            comments.map((c) => <CommentCard key={c.id} comment={c} />)
          )}
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
