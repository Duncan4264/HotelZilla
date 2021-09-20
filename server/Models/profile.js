import mongoose from 'mongoose'
// decsonstruct schema and objectId from mongoose
const {Schema} = mongoose;
const { ObjectId } = mongoose.Schema;

const ProfileSchema = new Schema(
    {
        // name field type string required
        name: {
            type: String,
            required: "Name is required"
        },
        // content field type string required
        content: {
            type: String,
            required: "Content is required",
            maxlength: 10000,
        },
        // location field type string required
        location: {
            type: String,
            required: "Location is required",
        },
        // hotields fieled type Hotel Object
        hotels: {
            type: ObjectId,
            ref: "Hotel",
        },
        // Image field type data buffer required
        image: {
            data: Buffer,
            contentType: String,    
        },
        // User boject type user Object required
        user: {
            type: ObjectId,
            ref: "User",
            required: "User ID is required"
        }
    }
)
// export default profile profile schema
export default module.exports = mongoose.model("Profile", ProfileSchema);