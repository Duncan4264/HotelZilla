// import dependices 
import Hotel from "../../Models/hotel"
import fs from "fs";
import { response } from "express";
import Order from "../../Models/order"

/*
* Method to handle hotel creation
* Parameters: request parameter, response parameter
*/
export const create = async (req, res) => {
  try {
    // grab fields and files from request object
    let fields = req.fields;
    let files = req.files;
    // hotel variable that creates hotel object with fields
    let hotel = new Hotel(fields);
    hotel.postedBy = req.user._id;
    // handle image
    if (files.image) {
      // read image with image path parameter
      hotel.image.data = fs.readFileSync(files.image.path);
      // store image content type
      hotel.image.contentType = files.image.type;
    }

    // Save the hotel to database
    hotel.save((err, result) => {
      // if there's an error
      if (err) {
        // log the error to the console
        console.log("saving hotel err => ", err);
        // send a 400 error with message 
        res.status(400).send("Error saving");
      }
      // return results in json
      res.json(result);
    });
  } catch (err) {
    // log an error to the console
    console.log(err);
    // response status 
    res.status(400).json({
      // set error to error message
      err: err.message,
    });
  }
};
/*
* Method to grab all the hotels
* Parameters: Request Object, Response Object
*/
export const hotels = async (req, res) => {
  // let all = await Hotel.find({ })
  // find hotel based off of date
  //rom: { $gte: new Date() 
  try {
  let all = await Hotel.find({  })
    .limit(24)
    .select("-image.data") 
    .populate("postedBy", "_id name")
    .exec();
    // return hotels as json
  res.json(all);
  } catch(error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    })
  }
};

/*
* Method to read image from backend
* Parameters: Request object, response object
*/
export const readImage = async (req, res) => {
  try {
  // find hotel based off of hotel id
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  // if hotel image does not equal null
  if (hotel && hotel.image && hotel.image.data !== null) {
    // set the content type to image content type
    res.set("Content-Type", hotel.image.contentType);
    // return the image data as json
    return res.send(hotel.image.data);
  } 
 } catch(error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    })
  }
};


/*
* Method to grab all the seller hotels from database
* Parmeters: Request Object, Response Object
*/
export const sellerHotels = async (req, res) => {
  try {
  // Set seller hotels variable to find hotel by postedby variable with user ID
  let sellerHotels = await Hotel.find({postedBy: req.user._id})
  .select('-image.data')
  .populate('postedBy', '_id name')
  .exec();
  // Send the seller hotels data to front end
  res.send(sellerHotels);
  } catch(error) {
    console.log(error)
    res.status(400).json({
      error: error.message,
    })
  }
}
/*
* Method to delete hotel from database
* Parameters: Request Object, Response Object
*/
export const deleteHotel = async (req, res) => {

  try {
  // create removed variable that finds a hotel by it's ID and deletes it from database
let removed = await Hotel.findByIdAndDelete(req.params.hotelId).select("-image.data").exec();
  // return response to front end
  res.json(removed);
  } catch(error) {
     console.log(err);
     res.status(400).json({
       error: error.message,
     })
   }
}
/*
* Method to read a single hotel from the database
* Parameters: Request Object, response Object
*/
export const readHotel = async (req, res) => {
  try {
  // create variable that finds a hotel by it's hotelID
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy")
    .select("-image.data-_id")
    .exec();
  // Return hotel to frontend 
  res.json(hotel);
  } catch(error) {
    console.log(error)
    res.status(400).json({
      error: error.message,
    })
  }
};

/*
* Method to update a hotel in the database 
* Parameters: Request object, Response Object
*/
export const updateHotel = async(req, res) => {
  try {
    // Grab the files and fields from request object
    let fields = req.fields;
    let files = req.files;
    // variable that deconstructs the fileds
    let data  = {...fields}

    // if there is an image
    if(files.image) {
      // make an image object variable
      let image = {}
      // read the image path
      image.data = fs.readFileSync(files.image.path);
      // Set the image content type
      image.contentType = files.image.type;

      // set the data.image to the image
      data.image = image;
    }
    // create updated variable that queries database for hotel based off of id and updates it
    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image.data")
    .exec();
    res.json(updated);
  } catch (error) {
    // log an error to the console
    console.log(error);
    // return a response 400 with hotel update failed message
    response.status(400).send('Hotel update failed. Please try again')
  }
}
/*
* Method to read user hotel bookings from database
* Parameters: Request Object, Response Object
*/
export const userHotelBookings = async (req, res) => {
  try{ 
  // Create variable to and query all of the orders from the database
  const all = await Order
  .find({orderedBy: req.user._id})
  .select("session")
  .populate("hotel", "-image.data")
  .populate("orderedBy", "_id name")
  .exec()
  // return response to front end
  res.json(all)
  } catch(error) {
    console.log(error);
    res.status(400).sendJson({
      error: error.message
    })
  }
}
/*
* Method to see if a hotel is booked already from the databae
* Parameters: Request Object, Response Object
*/
export const isBooked = async (req, res) => {
  try {
  // Deconstruct hotelId from request parameters
  const { hotelId } = req.params;
  // find orders of the currently logged in user
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select("hotel")
    .exec();
  // check if hotel id is found in userOrders array
  let ids = [];
  // for each order
  for (let i = 0; i < userOrders.length; i++) {
    // put each order in an array
    ids.push(userOrders[i].hotel.toString());
  }
  // return json to frontend with ok status 
  res.json({
    ok: ids.includes(hotelId),
  });
} catch(error) {
  console.log(error);
  res.status(400).sendJson({
    error: error.message,
  })
}
};

/*
* Method to search hotels from database based off of paremeters 
* Parameters: Request Object, Response Object
*/
export const searchLists = async (req, res) => {

  try{
  // Deconstruct location, date and bed from request body
  const {location, date, bed} = req.body

  // Split from date with a comma
  const fromDate = date.split(",");

  // console.log(location, date, bed);
  // create variable that searches the hotel database with the paremeters of location, bed and from date
  let result = await Hotel.find({from: {$gte: new Date(fromDate[0])}, location: location, bed: bed})
  .select("-image.data")
  .exec();

  // send query results to front end
  res.json(result);
  } catch(error) {
    console.log(error);
    res.json({
      error: error.message,
    })
  }
} 

/**
 * @description Method to grab the profile hotels bassed off of user id
 * @author Cyrus Duncan
 * @date 24/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*}  Returns profile hotels
 */
export const profileHotels = async (req, res) => {
  try {
      // create variable that findes profile hotels from UserId
      let sellerHotels = await Hotel.find({postedBy: req.params.userId})
      .select('-image.data')
      .populate('postedBy', '_id name')
      .exec();
      // method to send response of hotels back
      res.send(sellerHotels);
      // return out of method
      return sellerHotels;
  } catch (error) {
    // log an error to the console
      console.log(error);
  }
}
/**
 * @description Method to count hotels from userid
 * @author Cyrus Duncan
 * @date 07/10/2021
 * @param {*} req
 * @param {*} res 
 * @returns {*} return hotel count 
 */
export const countHotels = async(req, res) => {
  try {
      let count = await Hotel.countDocuments({postedBy: req.params.userId});
      res.json(count);
      return count;
  } catch (error) {
    console.log(error);
  }
}