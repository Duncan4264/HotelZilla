import React, {useState} from 'react'
import { DatePicker, Select } from 'antd'

import { useHistory } from 'react-router-dom'
import ReactGoogleAutocomplete from 'react-google-autocomplete'

import moment from 'moment'
import { toast } from 'react-toastify'





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

      if(location !== undefined && date !== undefined && bed !== undefined && location !== "" && date !== "" && bed !== "")  {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
      } else {
        toast.error("Date, bed count and location required to search");
      }
    }
    return (
        <>
    <div className="container mb-5">
    <h1 className="mt-5">Find your perfect room</h1>
    <br/>
        <form action="#" method="post" noValidate="novalidate">
            <div className="row">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
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
                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                            {/* <input type="text" class="form-control search-slt" placeholder="Enter Drop City"/> */}
                            <RangePicker onChange={(value) => setDate(value)} className="w-100 h-100"
                            disabledDate={(current) =>
                            current && current.valueOf() < moment().subtract(1, "days")
                          } />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                            <Select
            onChange={(value) => setBed(value)}
            className="w-100 h-100"
            size="large"
            placeholder="Number of beds"
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
          </Select>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                            <button type="button" onClick={handleSubmit} className="btn btn-danger wrn-btn w-100 h-100">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>  
        </>
      
      );

}
export default Search