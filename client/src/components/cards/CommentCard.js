import moment from "moment"
import {read} from "../../actions/profile";
import { useState, useEffect } from "react";
const CommentCard = ({comment}) => {
    const [profile, setProfile] = useState({});
    const [image, setImage] = useState("");


    const loadUser = async () => {
        try {
            let res = await read(comment.user);
            // set the profile state with the data returend
            setProfile(res.data);
            // image 
            setImage(`${process.env.REACT_APP_API}/profile/image/${res.data._id}`) 
        } catch (error) {
            // log an error in the console
         console.log(error);   
        }     
    }

    useEffect(() => {
        loadUser();
    }, []);
    return (
 <div class="card card-inner mt-3">
 <div class="card-body">
     <div class="row">
         <div class="col-md-2">
             <img  alt="Profile" src={image} class="img img-rounded img-fluid"/>
             <p className="text-center mt-2"><a href={`/user/${comment.user}`}><strong>{profile.name}</strong></a></p>
             <p class="text-secondary text-center">{moment (new Date(comment.createdAt)).format("MMMM Do YYYY, h:mm:ss a")}</p>
         </div>
         <div class="col-md-10">
             <h2>{comment.title}</h2>
             <p>{comment.content}</p>
         </div>
     </div>
 </div>
</div>
)
}

export default CommentCard;