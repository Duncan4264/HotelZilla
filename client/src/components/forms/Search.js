import React, {useState} from 'react'
import { DatePicker, Select } from 'antd'

import { useHistory } from 'react-router-dom'
import ReactGoogleAutocomplete from 'react-google-autocomplete'

import moment from 'moment'
import { toast } from 'react-toastify'

import Carousel from 'react-bootstrap/Carousel';



const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

// Destructure values
const {RangePicker} = DatePicker;


// Search Form
const Search = () => {

    // history destructure 
const history  = useHistory()
    // state
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [bed, setBed] = useState("")
    const {Option} = Select;
    // function to handle submit and push to URI with search result and date / bed URI
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(location);
      if(location !== undefined && date !== undefined && bed !== undefined && location !== "" && date !== "" && bed !== "")  {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
      } else {
        toast.error("Date, bed count and location required to search");
        // history.push('/');
      }
    }
    return (
        // <div className="d-flex pb-4">
        //   <div className="w-100">
        //   <ReactGoogleAutocomplete
        //   placeholder="Location"
        //   apiKey={config}
        //   style={{ height: "75px" }}
        //   className="w-100 h-500"
        //   onPlaceSelected={(place) => {
        //     setLocation(place.formatted_address);
        //   }}
        //   />
        //   </div>
    
        //   <RangePicker className="w-100"
        //     onChange={(value, dateString) => setDate(dateString)}
        //     disabledDate={(current) =>
        //       current && current.valueOf() < moment().subtract(1, "days")
        //     }
        //   />
        //   <Select
        //     onChange={(value) => setBed(value)}
        //     className="w-100 h-100"
        //     size="large"
        //     placeholder="Number of beds"
        //   >
        //     <Option key={1}>{1}</Option>
        //     <Option key={2}>{2}</Option>
        //     <Option key={3}>{3}</Option>
        //     <Option key={4}>{4}</Option>
        //     </Select>
        //   <SearchOutlined
        //     onClick={handleSubmit}
        //     className="btn btn-primary p-1"
        //   />
        //   </div>
        <>
<section>
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      alt="First slide"
      height="500px"
    />
    <Carousel.Caption>
    
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      alt="Second slide"
      height="500px"
    />

    <Carousel.Caption>
  
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      alt="Third slide"
      height="500px"
    />

    <Carousel.Caption>
    
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</section>
        <section class="search-sec">
    <div class="container">
    <h1 className="text-white">Find your perfect room</h1>
        <form action="#" method="post" novalidate="novalidate">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            {/* <input type="text" class="form-control search-slt" placeholder="Enter Pickup City"/> */}
                              <ReactGoogleAutocomplete
                          placeholder="Location"
                          apiKey={config}
                          style={{ height: "60px" }}
                          className="form-control search-slt w-100 h-100"
                          onPlaceSelected={(place) => {
                          setLocation(place.formatted_address);
                          }}
                         />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            {/* <input type="text" class="form-control search-slt" placeholder="Enter Drop City"/> */}
                            <RangePicker onChange={(value) => setDate(value)} className="w-100 h-100"
                            disabledDate={(current) =>
                            current && current.valueOf() < moment().subtract(1, "days")
                          } />
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            <Select
            onChange={(value) => setBed(value)}
            className="form-control search-slt w-100 h-100"
            size="large"
            placeholder="Number of beds"
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
          </Select>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                            <button type="button" onClick={handleSubmit} class="btn btn-danger wrn-btn w-100 h-100">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>
        </>
      
      );

}
export default Search