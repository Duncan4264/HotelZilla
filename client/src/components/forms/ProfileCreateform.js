import ReactGoogleAutocomplete from "react-google-autocomplete";

const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;
const ProfileCreateForm = ({
    values,
    setValues,
    handleChange,
    handleImageChange,
    handleSubmit,
    location,
    setLocation,
    User,
}) => {
    const {name, content } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" name="userid" value={User._id} hidden />
                <label className="btn btn-outline-secndary btn-block m-2 text-left">
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
                name="name"
                onChange={handleChange}
                placeholder="Name"
                className="form-control m-2"
                value={name}
                />
                <textarea
                name="aboutme"
                onChange={handleChange}
                placeholder="About Me"
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
                />
                <button className="btn btn-outline-primary m-2">Create Profile</button>
                

            </div>
        </form>
    )
}

export default ProfileCreateForm;