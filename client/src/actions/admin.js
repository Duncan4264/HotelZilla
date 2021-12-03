import axios from "axios";
/**
 * @description Method to read all users
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} token
 * @returns {*} users
 */
export const readAllUsers = async(token) => {
    try {
      let users = await axios.get(`${process.env.REACT_APP_API}/admin/user/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return users;
    } catch (error) {
      console.log(error);
    }
  }
/**
 * @description Method to read all users
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} token
 * @param {*} id
 * @returns {*} suspend user
 */
export const suspendProfile = async(token, id) => {
    try {
        let users = await axios.put(`${process.env.REACT_APP_API}/admin/user/suspend/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return users;
    } catch (error) {
        console.log(error);
    }
}

export const unSuspendProfile = async(token, id) => {
    try {
        let users = await axios.put(`${process.env.REACT_APP_API}/admin/user/unsuspend/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return users;
    } catch (error) {
        console.log(error);
    }
}