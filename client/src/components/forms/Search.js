import React, {useState} from 'react'
import { DatePicker, Select } from 'antd'
import {SearchOutlined} from '@ant-design/icons'

import { useHistory } from 'react-router-dom'
import ReactGoogleAutocomplete from 'react-google-autocomplete'

import moment from 'moment'
import { toast } from 'react-toastify'




const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

// Destructure values
const {RangePicker} = DatePicker;

const {Option} = Select;

// Search Form
const Search = () => {
    // history destructure 
const history  = useHistory()
    // state
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [bed, setBed] = useState("")
    // function to handle submit and push to URI with search result and date / bed URI
    const handleSubmit = () => {
      console.log(location);
      if(location !== undefined && date !== undefined && bed !== undefined && location !== "" && date !== "" && bed !== "")  {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
      } else {
        toast.error("Date, bed count and location required to search");
        history.push('/');
      }
    }
    return (
        <div className="d-flex pb-4">
          <div className="w-100">
          <ReactGoogleAutocomplete
          placeholder="Location"
          apiKey={config}
          style={{ height: "50px" }}
          className="w-100"
          onPlaceSelected={(place) => {
            setLocation(place.formatted_address);
          }}
          />
          </div>
    
          <RangePicker
            onChange={(value, dateString) => setDate(dateString)}
            disabledDate={(current) =>
              current && current.valueOf() < moment().subtract(1, "days")
            }
            className="w-100"
          />
    
          <Select
            onChange={(value) => setBed(value)}
            className="w-100"
            size="large"
            placeholder="Number of beds"
          >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
          </Select>
    
          <SearchOutlined
            onClick={handleSubmit}
            className="btn btn-primary p-3 btn-square"
          />
        </div>
      );

}
export default Search