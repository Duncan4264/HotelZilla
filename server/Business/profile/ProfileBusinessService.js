import {createProfile, readProfile, readImage, updateProfile, DeleteProfile} from '../../Data/profile/profileDAO';

/**
 * @description Method to create a profile service
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return status code
 */
export const createProfileService = async (req, res) => {
    try {
        // variable that creates a profile DAO
        let createProfileService = createProfile(req, res);
        // return a profile stauts
        return createProfileService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method to reead an image 
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} return image URL
 */
export const readImageService = async (req, res) => {
    try {
        // create new read Image DAO
        let readImageService = readImage(req, res);
        // return image URL
        return readImageService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description update a profile business service
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} status code
 */
export const updateProfileService = async (req, res) => {
    try {
        // update Profile service
       let updateProfileService = updateProfile(req, res);
       // return status code
       return updateProfileService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}

/**
 * @description MEthod delte profile service
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} status code
 */
export const deleteProfileService = async (req, res) => {
    try {
        // delete profile service
        let deleteProfileService = DeleteProfile(req, res);
        // return status code
        return deleteProfileService;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description metod to read profile service
 * @author Cyrus Duncan
 * @date 29/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} profile object
 */
export const readProfileService = async (req, res) => {
    try {
        // create variable that calls DAO read profile method
        let readProfileService = readProfile(req, res);
        // return read profile
        return readProfileService;
    } catch (error) {
        // log  a error to the console
        console.log(error);
    }
}