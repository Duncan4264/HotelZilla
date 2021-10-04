import { LoginDAO, RegisterDAO, readUser } from "../../Data/auth/authDAO"
/**
 * @description Method that handles Register busienss service
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*}  returns register response
 */
export const RegisterService = async (req, res) => {
    try {
        // create register with register DAO object
        let register = RegisterDAO(req, res);
        // return register
        return register;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}
/**
 * @description Method that handles login Business Service
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} login response
 */
export const LoginService = async (req, res) => {
    try {
        // create login with login data access object
        let login = LoginDAO(req, res);
        // return login repsone
        return login;
    } catch (error) {
        // log an error to the consoles
        console.log(error);
    }
}
/**
 * @description Method that handles read user business service 
 * @author Cyrus Duncan
 * @date 28/09/2021
 * @param {*} req
 * @param {*} res
 * @returns {*} read user response
 */
export const ReadUserService = async (req, res) => {
    try {
        // create variable that read user DAO object
        let userRead = readUser(req, res);
        // return read user response
        return userRead;
    } catch (error) {
        // log an error to the console
        console.log(error);
    }
}