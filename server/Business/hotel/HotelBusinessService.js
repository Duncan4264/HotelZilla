import { create, hotels, readImage, sellerHotels, deleteHotel, readHotel, updateHotel, userHotelBookings, isBooked, searchLists, profileHotels, countHotels } from '../../Data/hotel/HotelDAO';
/**
 * @description Create service for creating hotel
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} status code
 */
export const createService = async (req, res) => {
    try {
        // call create DAO
        let createService = create(req, res);
        // return status code
        return createService;
    } catch (error) {
        // log an error 
        console.log(error);
    }
}
/**
 * @description Method to get hotels
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return hotels
 */
export const hotelsService = async (req, res) => {
    try {
        // get hotels
        let hotelsService = hotels(req, res);
        // return hotels
        return hotelsService;
    } catch (error) {
        // log an error
        console.log(error);
    }
}
/**
 * @description read an image from API
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return Image
 */
export const readImageService = async(req, res) => {
    try {
        // read Image DAO
        let readImageService = readImage(req, res);
        // return image 
        return readImageService;
    } catch (error) {
        // log an error
        console.log(error);
    }
}
/**
 * @description Get seller hotels
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} hotels
 */
export const sellerHotelsService = async(req, res) => {
    try {
        // grab seller hotels DAO
        let sellerHotelsService = sellerHotels(req, res);
        // return hotels
        return sellerHotelsService;
    } catch (error) {
        // log an error
        console.log(error);
    }
}
/**
 * @description Delete Hotel method
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return status code
 */
export const deleteHotelService = async(req, res) => {
    try {
        // delete hotel DAO method
        let deleteService = deleteHotel(req, res);
        // return status
        return deleteService;
    } catch (error) {
        // log an error
        console.log(error);
    }
}
/**
 * @description Method to read hotel
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} single hotel
 */
export const readHotelService = async (req, res) => {
    try {
        // method to read hotel DAO
        let readHotelService = readHotel(req, res);
        // return hotel
        return readHotelService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to update hotel
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} status code
 */
export const updateHotelService = async(req, res) => {
    try {
        // call update DAO
        let updateHotelService = updateHotel(req, res);
        // return update hotel Service
        return updateHotelService;
    } catch (error) {
        // log an error to the console
      console.log(error); 
    }
}
/**
 * @description user Hotel Bookings Service
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} hotels
 */
export const userHotelBookingsService = async(req, res) => {
    try {
        // Call user Hotel Bookings Service
        let userHotelBookingsService = userHotelBookings(req, res);
        // return user hotel bookings
        return userHotelBookingsService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to check if user is booked
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} boolean
 */
export const isBookedService = async(req,res) => {
    try {
        // called isBooked DAO
        let isBookedService = isBooked(req, res);
        // return boolean
        return isBookedService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to search hotels results
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return hotel
 */
export const searchListsService = async(req, res) => {
    try {
        // call search lists DAO
        let searchListService = searchLists(req,res);
        // return hotels
        return searchListService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Profile Hotels
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return hotels
 */
export const profileHotelsService = async(req, res) => {
    try {
        // Profile Hotels DAO 
        let profileHotelsService = profileHotels(req, res);
        // return hotels
        return profileHotelsService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method that counts hotels from DAO 
 * @author Cyrus Duncan
 * @date 07/10/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} hotel count
 */
export const countHotelsService = async(req, res) => {
    try {
        // let hotel service count hotels from database
        let countHotelsService = await countHotels(req, res);
        // return hotel count
        return countHotelsService;
    } catch (error) {
        // log an error to the count
        console.log(error);
    }
}

