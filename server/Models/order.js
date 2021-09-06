// Import mongoose dependency
import mongoose from "mongoose";
// desconstruct Object ID from mongoose schema
const { ObjectId } = mongoose.Schema;

// make order model
const orderSchema = new mongoose.Schema(
  {
    // Make the hotel with OrderID Foreign key
    hotel: {
      type: ObjectId,
      ref: "Hotel",
    },
    // create empty session object
    session: {},
    // Make ordered by with object id of user foreign key
    orderedBy: { type: ObjectId, ref: "User" },
  },
  // enable time stamps to keep track of when the model is created and editied
  { timestamps: true }
);

// Export Order schema to mongoose as Order
export default module.exports = mongoose.model("Order", orderSchema);
