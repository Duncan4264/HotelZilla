// import mongoose dependcy
import mongoose from "mongoose";

// deconstruct schema variable
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
// create hotel schema 
const hotelSchema = new Schema(
  {
    // Title field for hotel title, type stringe
    title: {
      type: String,
      required: "Title is required",
    },
    // content to explain hotel listing type string, max length 10,000 chacaters
    content: {
      type: String,
      required: "Content is required",
      maxlength: 10000,
    },
    // Location field type string
    location: {
      type: String,
    },
    // price field type number - trimming number
    price: {
      type: Number,
      required: "Price is required",
      trim: true,
    },
    // Posted by field type Object ID references user
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    // Image field data buffer based off of content type string
    image: {
      data: Buffer,
      contentType: String,
    },
    // From field with Date type
    from: {
      type: Date,
    },
    // To filed with date type
    to: {
      type: Date,
    },
    // Bed field with number type for number of beds 
    bed: {
      type: Number,
    },
  },
  // enable timestamps for each model created or editied
  { timestamps: true }
);

// Export the hotel schema to mongoose
export default mongoose.model("Hotel", hotelSchema);
