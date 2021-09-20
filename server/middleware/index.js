// import dependinces
import expressJwt from "express-jwt";
import Hotel from "../Models/hotel";
import User from "../Models/User"

/*
* Method to require sign on
*/
export const requireSignin = expressJwt({
  // Secret with enviroment jwt secret using HS256 algorithms
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
/*
* Method to require that the user is the owner of the hotel listing
* Parameters: Request Object, Response Object, Next Object
*/
export const hotelOwner = async (req, res, next) => {
  // hotel variable that finds hotel by ID
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  // owner variable that sees if hotel postedBy id is equal to user id 
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  // if not the owner, return error 403 Unauthorized
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  // send to next method
  next();
};