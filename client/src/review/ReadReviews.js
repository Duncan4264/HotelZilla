import { useEffect, useState } from "react";
import ReviewCard from "../components/cards/ReviewCard";
import { readUser } from "../actions/auth";
import { readuserReviews } from "../actions/review";
import { useSelector } from "react-redux";
import { Card } from 'antd';


/**
 * @description Component that handles reading reviews
 * @author Cyrus Duncan
 * @date 12/10/2021
 * @param {*} {match}
 * @returns {*} review component
 */
const ReadReviews = ({match}) => {
    const [reviews, setReviews] = useState([]);
    const [user, setUser] = useState({});
    const [owner, setOwner] = useState();

    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    useEffect(() => {
        readuserReview();
        loadUser();
    }, [])
/**
 * @description Method to read user 
 * @author Cyrus Duncan
 * @date 10/9/2021
 */
const readuserReview  =  async()  => {
        try {
            // read user reviews from api with userId and token
            let res = await readuserReviews(match.params.userId, token);
            // set reviews state to api response
            setReviews(res.data);
            // check to see if the user is owner of these reviews
            if(auth.user._id === match.params.userId) {
                // set owner state to true
                setOwner(true);
              }
        } catch (error) {
            // log an error tot the console
            console.log(error);
        }
    };


    /*
    * Method to load the user, and set the profile equal to the user data response
    */
        const loadUser = async () => {
            // read the user from auth action and userId
            let res = await readUser(match.params.userId)
            // set the profile state with the data returend
            setUser(res.data);
        }
    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
          <h2>{user.name}'s Reviews</h2>
        </div>
        <Card title={`${user.name}'s Reviews`}>
        {
            owner 
        ? reviews.map((r) => (
          <ReviewCard key={r._id} r={r} owner={owner}/>
        ))
        : reviews.map((r) => (
          <ReviewCard className="mt-5" key={r._id} r={r}/>
        ))
        }
        </Card>
      </>
    )
}

export default ReadReviews;