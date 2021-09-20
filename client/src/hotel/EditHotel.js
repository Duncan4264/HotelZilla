// import dependencys 
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { read, updateHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import HotelEditForm from "../components/forms/HotelEditForm";



/*
* Class to handle state and render edit hotel form
* Paramaets: Match Hotel Object parameter
*/
const EditHotel = ({ match }) => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [image, setImage] = useState("")
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  // destructuring variables from state
  const { title, content, price, from, to, bed, location } = values;
 // Constructor to load seller hotels 
  useEffect(() => {
    // method action to backend to load all seller hotels
    loadSellerHotel();
  }, []);
  
  // method to load sller hotel from backend
  const loadSellerHotel = async () => {
    // set response to backend passing match hotel porameters
    let res = await read(match.params.hotelId);
    // set values equal to response data values 
    setValues({ ...values, ...res.data });
    // set image preview to image based off of image ID 
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };
  /*
  * Method to handle submitting edit form
  * Parameters: Event Object
  */
  const handleSubmit = async (e) => {
    // event prevent default values
    e.preventDefault();
    // Create new hotel Form Data and append each parameter to form data
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    try {
      // set response variable to await updating backend action in backend
        let res = await updateHotel(token, hotelData, match.params.hotelId);
        // show an update success with data title to the client
        toast.success(`${res.data.title} is updated`);
    } catch (error) {
       // log error to the console
        console.log(error);
        // show the error to the client
        toast.error(error.response.data.error)
    }
  }

  /*
  * Method to handle image change
  * Parameters: Event Object
  */
  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    // set the preview state to the create object url with image file from event object
    setPreview(URL.createObjectURL(e.target.files[0]));
    // set the Image to the file in the event oject
    setImage(e.target.files[0]);
  };
  /*
  * Method to handle the change of all other fields
  * Parameters: Event Object
  */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;