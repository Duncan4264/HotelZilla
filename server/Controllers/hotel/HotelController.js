import {createService, deleteHotelService, hotelsService, isBookedService, profileHotelsService, readHotelService, readImageService, searchListsService, sellerHotelsService, updateHotelService, userHotelBookingsService, countHotelsService} from '../../Business/hotel/HotelBusinessService';
/**
 * @description Method that handles hotel creation
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return create response
 */
export const create = async (req, res) => {
    try {
      // varaible that creates hotel service
      let create = createService(req, res);
      // return create
      return create;
    } catch (error) {
      // log an error
      console.log(error);
    }
}/**
 * @description
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return hotels 
 */
export const hotels = async (req, res) => {
  try {
    // create hotels service object
    let hotels = hotelsService(req, res);
    // return hotels
    return hotels;
  } catch (error) {
    // log error to the console
    console.log(error);
  }
}
/**
 * @description method to read an image
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} Image URL
 */
export const readImage = async(req, res) => {
  try {
    // read an image service
    let readImage = readImageService(req, res);
    // return image
    return readImage;
  } catch (error) {
    // log an error the console
    console.log(error);
  }
}
/**
 * @description Seller hotels
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} returnseller hotels
 */
export const sellerHotels = async(req, res) => {
  try {
    // let hotels equal to seller hotels service
    let sellerHotels = sellerHotelsService(req, res);
    // return hotels
    return sellerHotels;
  } catch (error) {
    // log an error to the cosole
    console.log(error);
  }
}
/**
 * @description Method to delete hotel
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} returns status code
 */
export const deleteHotel = async(req, res) => {
  try {
    // delete Hotel service
    let deleteHotel = deleteHotelService(req, res);
    // return delete hotel
    return deleteHotel;
  } catch (error) {
    // log an error to the console
    console.log(error);
  }
}
/**
 * @description Method that reads a single hotel
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} returns a single hotel
 */
export const readHotel = async(req, res) => {
  try {
    // variable that read hotel service
    let readHotels = readHotelService(req, res);
    // return hotel
    return readHotels;
  } catch (error) {
    // log an erorr
    console.log(error);
  }
}
/**
 * @description Method to update hotel
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} Status code
 */
export const updateHotel = async(req, res) => {
  try {
    // update hotel service
    let updateHotel = updateHotelService(req, res);
    // return update
    return updateHotel;
  } catch (error) {
    // log an error
    console.log(error);
  }
}
/**
 * @description Method to grab hotel bookings
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} hotels
 */
export const userHotelBookings = async(req, res) => {
  try {
    // call userHotelBookings Service
    let userBookings = userHotelBookingsService(req, res);
    // return user hotel bookings
    return userHotelBookings;
  } catch (error) {
    // log an error
    console.log(error);
  }
}
/**
 * @description check if user is booked
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return hotel
 */
export const isBooked = async(req, res) => {
  try {
    // variable is booked service
    let isBooked = isBookedService(req, res);
    // return is booked
    return isBooked;
  } catch (error) {
    // log an error
    console.log(error);
  }
}
/**
 * @description Search hotel listings
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return hotels
 */
export const searchLists = async(req, res) => {
  try {
    /// search hotels service
    let searchLists = searchListsService(req, res);
    // return hotels
    return searchLists;
  } catch (error) {
    // log an error 
    console.log(error);
  }
}
/**
 * @description Profile hotels
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return hotels
 */
export const profileHotels = async(req, res) => {
  try {
    // profile hotel service
    let profileHotel = profileHotelsService(req, res);
    // return profile hotel
    return profileHotel;
  } catch (error) {
    // log an error to the console
    console.log(error);
  }
}
/**
 * @description Method that routes to business service to count hotels by user ID
 * @author Cyrus Duncan
 * @date 07/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} hotel count
 */
export const countHotels = async(req, res) => {
  try {
    // grab count of hotels from business service
     let count = countHotelsService(req, res);
     return count;
  } catch (error) {
    console.log(error);
  }
}