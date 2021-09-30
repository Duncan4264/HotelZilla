import { createProfileService, deleteProfileService, readImageService, readProfileService, updateProfileService } from "../../Business/profile/ProfileBusinessService";
/**
 * @description Method Create Profile
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*}  return profile
 */
export const createProfile = async (req, res) => {
    try {
        // return createProfile Service
        let createProfileController = createProfileService(req, res);
        // return create profile
        return createProfileController;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method that reads profile
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return profile Controller
 */
export const readProfile = async (req, res) => {
    try {
        // read profile service method call
        let readProfileController = readProfileService(req, res);
        // return profile controller
        return readProfileController;
    } catch (error) {
        // log an error to the console
        console.log(error);
        // return error
        return error;
    }
}
/**
 * @description Read Image method 
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return profile Image
 */
export const readImage = async (req, res) => {
    try {
        // create read image service 
        let readImageController = readImageService(req, res);
        // read image controller
        return readImageController;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to update a profile
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return a status code
 */
export const updateProfile = async (req, res) => {
    try {
        // update profile controller with updateProfileService
       let updateProfileController = updateProfileService(req, res);
       // return profile controller
       return updateProfileController;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to delete a profile
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return a status code
 */
export const DeleteProfile = async (req, res) => {
    try {
        // create delete profile service object
        let deleteProfileController = deleteProfileService(req, res);
        // return delete profile controller
        return deleteProfileController;
    } catch (error) {
        // console error 
        console.log(error);
    }
}

