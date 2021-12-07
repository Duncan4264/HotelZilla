
import {readUsers, suspendService, unSuspendService} from '../../Business/admin/adminBusiness';
/**
 * @description Method to read all users
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} users
 */
export const getAllUsers = (req, res) => {
    try {
        const users = readUsers(req, res);
        return users;
     }
    catch (error) {
        console.log(error);
    }
}
/**
 * @description Method to suspend a user
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} User
 */
export const suspendUser = (req, res) => {
    try {
        // call user from service
        const users = suspendService(req, res);
        // return users
        return users;
     }
    catch (error) {
        console.log(error);
    }
}
/**
 * @description Method to unsuspend a user
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} 
 */
export const unSuspendUser = (req, res) => {
    try {
        // call user from service
        const users = unSuspendService(req, res);
        // return users
        return users;
     }
    catch (error) {
        console.log(error);
    }
}
