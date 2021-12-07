import Profile from '../../Models/profile';
import User from '../../Models/User';
/**
 * @description Method to read all users
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 */
export const ReadAllUsers = async (req, res) => {
    try {

        const users = await Profile.find({});
        res.json(users);
    } catch(error) {
        console.log(error);
    }
}
/**
 * @description suspend user by id
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 */
export const suspendUser = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        profile.isSuspended = true;
        await profile.save();
        const user = await User.findById(profile.user);
        user.isSuspended = true;
        await user.save();
        res.json(profile);
    } catch(error) {
        console.log(error);
    }
}
/**
 * @description Method to unsuspend user
 * @author Cyrus Duncan
 * @date 01/12/2021
 * @param {*} req
 * @param {*} res
 */
export const unsuspendUser = async (req, res) => {
    try {
        // method to find profile by id
        const profile = await Profile.findById(req.params.id);
        // method to set suspended profile
        profile.isSuspended = false;
        // save the profile
        await profile.save();

        const user = await User.findById(profile.user);
        user.isSuspended = false;
        await user.save();
        res.json(profile);
    } catch(error) {
        console.log(error);
    }
}

