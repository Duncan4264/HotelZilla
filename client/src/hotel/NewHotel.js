import { useState } from "react"
import { toast } from "react-toastify"

import ReactGoogleAutocomplete  from 'react-google-autocomplete'


const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

const NewHotel = () => {   
    const [values, setValues] = useState({
        title: "",
        content: "",
        location: "",
        image: "",
        price: "",
        from: "",
        to: "",
        bed: "",
    });

const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png')

const {title, content, location, image, price, from, to, bed} = values;

const handleSubmit = (e) => {

}

const handleImageChange = (e) => {
  setPreview(URL.createObjectURL(e.target.files[0]));
  setValues({...values, image: e.target.files[0]});
}

const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
}

const setLocation = (e) => {
  setValues({...values, location: e.target.value})
}


const hotelForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        <ReactGoogleAutocomplete
          className="form-control m-2"
          placeholder="Location"
          apiKey={config}
          onPlaceSelected={(place) => {
            setLocation(place.formatted_address);
          }}
          style={{ height: "50px" }}
            />

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <input
          type="number"
          name="bed"
          onChange={handleChange}
          placeholder="Number of Beds"
          className="form-control m-2"
          value={bed}
        />
      </div>

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );




    return (
        <>
        <div className="container-fluid bg-secondary p-5 text-center">
           <h2>Add Hotel</h2>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <br/>
                    {hotelForm()}
                </div>
            <div className="col-md-2">
              <img src={preview} alt="preview_image" className="img img-fluid m-2"/>
            <pre>{JSON.stringify(values, null, 4)}</pre></div>
            </div>

        </div>
        </>
    );
};
export default NewHotel;