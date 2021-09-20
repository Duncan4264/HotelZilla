import ReactGoogleAutocomplete from "react-google-autocomplete";

const config = process.env.REACT_APP_GOOGLEPLACES_API_KEY;

/**
 * @description Componenet that handles edit profile form
 * @author Cyrus Duncan
 * @date 19/09/2021
 * @param {*} {
 *     values,
 *     setValues,
 *     handleChange,
 *     handleImageChange,
 *     handleSubmit,
 *     location,
 *     setLocation,
 *     User,
 * }
 * @returns {*} return profile fields state
 */
const ProfileEditForm = ({
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
                name="content"
                onChange={handleChange}
                placeholder="About Me"
                className="form-control m-2"
                value={content}
                />
             { location && location.length &&   <ReactGoogleAutocomplete
                className="form-control m-2"
                placeholder="Location"
                defaultValue={location}
                apiKey={config}
                onPlaceSelected={(place) => {
                    setValues({...values, location: place});
                }
            }
            style={{height: "50px"}}
                />}
                
                <button className="btn btn-outline-primary m-2">Edit Profile</button>
                

            </div>
        </form>
    )
}

export default ProfileEditForm;