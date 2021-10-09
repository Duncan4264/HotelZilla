import mongoose from 'mongoose';
// deconstruct schema and objectID
const {Schema} = mongoose;

const {ObjectId} = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        title: {
            type: String,
            required: "Name is required",
        },
        // body
        content: {
            type: String,
            required: "Content is required",
        },
        // hotel for post
        hotel: {
            type: ObjectId,
            required: "Hotel is required for post",
        },
        user: {
            type: ObjectId,
            required: "User is required",
        },
    },
    {timestamps: true}
);

// export default profile profile schema
export default module.exports = mongoose.model("Review", ReviewSchema);