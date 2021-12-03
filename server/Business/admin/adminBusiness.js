
import { ReadAllUsers, suspendUser, unsuspendUser } from "../../Data/admin/AdminDAO";
/**
 * @description Method to read users
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} users
 */
export const readUsers = (req, res) => {
    try {
        console.log("hello");
       let users =  ReadAllUsers(req, res);
        return users;
    }
    catch (error) { 
        console.log(error);
    }
};
/**
 * @description method to suspend service
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} service
 */
export const suspendService = (req, res) => {
    try {
       let users =  suspendUser(req, res);
        return users;
    }
    catch (error) { 
        console.log(error);
    }
}
/**
 * @description Method to unsuspend service
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} 
 */
export const unSuspendService = (req, res) => {
    try {
       let users =  unsuspendUser(req, res);
        return users;
    }
    catch (error) { 
        console.log(error);
    }
}