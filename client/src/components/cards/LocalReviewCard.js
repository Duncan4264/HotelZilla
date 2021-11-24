import { useEffect} from "react"
const ReviewCard = ({
    r,
    handleReviewDelete = (f) => f,
    owner = false,
}) => {
    useEffect(() => {
    }, []) 
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
                  <h2>{r.summary}</h2> 
        	       <div className="clearfix"></div>
        	        <p className="fs-4">{r.description}</p>
        	    </div>
	        </div>
          </div>
        </div>
      </div>
    )
    }
export default ReviewCard;