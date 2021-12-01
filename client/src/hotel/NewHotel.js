import { useState } from "react";
import { toast } from "react-toastify";
import { CreateHotel } from "../actions/hotel";
import { useSelector } from "react-redux";

import HotelCreateForm from "../components/forms/HotelCreateForm";
import { useAuth0 } from '@auth0/auth0-react';

const NewHotel = () => {
  const {getAccessTokenSilently } = useAuth0();
  const { auth } = useSelector((state) => ({ ...state }));
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  // destructuring variables from state
  const { title, content, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);
    hotelData.append("postedBy", auth._id);


    try {
      const token = await getAccessTokenSilently();
      // await create hotel in backend
      await CreateHotel(token, hotelData);
      // send a sucess request to client 
      toast.success("New hotel is posted");
      // reload the window after 1000 seconds 
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      // log the error to the console
      console.log(err);
    }
  };
  /*
  * Method to handle Image Change
  * Post request to cloudinary
  */
  const handleImageChange = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    // replace this with your upload preset name
    formData.append('upload_preset', 'Hotelzilla');
    const options = {
    method: 'POST',
    body: formData,
      };

    return fetch('https://api.Cloudinary.com/v1_1/hotelzilla/image/upload', options)
              .then(resp => resp.json()).then(data => {setValues({...values, image: data.url})})
    }
 /*
 * Method to handle Change
 * Parameters: Event Object 
 */
  const handleChange = (e) => {
    if(e.target.value.match("^[a-zA-Z 0-9]*$") != null){
      setValues({ ...values, [e.target.name]: e.target.value });
  }
    // setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
