import { DatePicker, Select } from "antd";
import moment from "moment";
import ReactGoogleAutocomplete  from 'react-google-autocomplete'

// Deconstruct Option from select
const { Option } = Select;

// create cofig variable to enviroment variable react app google places API
const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

/*
* Method to create and handle hotel edit form
* Parameters: Values, setValues, handleChange, handleImageChange, handleSubmit
*/ 
const HotelEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,

}) => {
  const { title, content, location, price, bed, from, to } = values;

  return (
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
{ location && location.length &&
        <ReactGoogleAutocomplete
          className="form-control m-2"
          placeholder="Location"
          defaultValue={location}
          apiKey={config}
          onPlaceSelected={(place) => {
            setValues({...values, location: place})
          }
        }
        style={{height: "50px"}}
          />}

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of beds"
          value={bed}
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>

      {from && <DatePicker
        placeholder="From date"
        className="form-control m-2"
        defaultValue={moment(from, "YYYY-MM-DD")}
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />}

{ to &&  <DatePicker
        placeholder="To date"
        className="form-control m-2"
        defaultValue={moment(to, "YYYY-MM-DD")}
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
}
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export default HotelEditForm;
