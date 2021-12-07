import {
  readAllUsers,
  suspendProfile,
  unSuspendProfile
} from '../actions/admin';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { read } from '../actions/profile';
import { deleteProfile } from '../actions/profile';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useHistory } from 'react-router-dom';
import { DeleteOutlined, StopOutlined, CheckOutlined } from '@ant-design/icons';
const Admin = () => {
  const { getAccessTokenSilently } = useAuth0();
  //state
  const [profile, setProfile] = useState({});
  const [image, setImage] = useState({});
  const [users, setUsers] = useState([]);

  // grab history
  const history = useHistory();

  // Grab auth token from state
  const { auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserProfile();
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*
   * Method to load user porifle from profile action
   * */
  const loadUserProfile = async () => {
    try {
      // Read the user profile with the profile userId
      let res = await read(auth._id);

      // set profile to user state
      setProfile(res.data);
      if (profile.admin === false) {
        toast.error('You are not an admin');
        history.push('/');
      }
      // // set image to user state
      setImage(`${process.env.REACT_APP_API}/profile/image/${res.data._id}`);
    } catch (error) {
      // log an error to the console.
      console.log(error);
    }
  };
  /*
   * Method to grab all users
   */
  const getAllUsers = async () => {
    try {
      // get access token
      const token = await getAccessTokenSilently();
      // // get all users
      let res = await readAllUsers(token);
      setUsers(res.data);
    } catch (error) {
      // log an error to the console.
      console.log(error);
    }
  };
  /**
   * @description Method to handle a Profile Delete
   * @author Cyrus Duncan
   * @date 19/09/2021
   * @returns {*} returns user to dashboard with a succuess popup or displays and error
   */
  const handleProfileDelete = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      // create a variable that deletes a profile based off of token and profile id
      let res = await deleteProfile(token, userId);
      // create and alert that profile has been deleted
      toast.success('Profile has been deleted');
      // send the user to the dashboard
      history.push('/dashboard');
      // return response variable
      return res;
    } catch (error) {
      // log an error
      console.log(error);
    }
  };
  /*
   * Method to handle user suspension
   *   Date 1/12/2021
   */
  const handleUserSuspension = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      // create a variable that deletes a profile based off of token and profile id
      let res = await suspendProfile(token, userId);
      // create and alert that profile has been deleted
      toast.success('User has been suspended');
      // send the user to the dashboard
      history.push('/dashboard');
      // return response variable
      return res;
    } catch (error) {
      // log an error
      console.log(error);
    }
  };
  /*
   *
   * Method to handle user unSuspension
   */
  const handleUserUnSuspension = async (userId) => {
    try {
      const token = await getAccessTokenSilently();
      // create a variable that deletes a profile based off of token and profile id
      let res = await unSuspendProfile(token, userId);
      // create and alert that profile has been deleted
      toast.success('User has been unsuspended');
      // return response variable
      return res;
    } catch (error) {
      // log an error
      console.log(error);
    }
  };
  return (
    <>
      <div id="page-container" className="main-admin">
        <div className="side-bar">
          <div className="side-bar-icons">
            <div className="side-bar-logo text-center py-3">
              <img
                src={profile.image || image}
                className="img-fluid rounded-circle border bg-secoundry mb-3 "
                alt="Profile"
              />
            </div>
            <div className="icons d-flex flex-column align-items-center">
              <a
                href="/admin/hotels"
                className="set-width text-center display-inline-block my-1"
              >
                <i className="fa fa-home"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="main-body-content w-100">
          <div className="table-responsive bg-light ets-pt">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {console.log(users)}
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.content}</td>
                    <td>{user.location}</td>
                    <td>
                      <img
                        src={user.image}
                        alt="hotel"
                        width="100"
                        height="100"
                        className="img-fluid"
                      />
                    </td>
                    <td>{user.isSuspended ? 'Suspended' : 'UnSuspended'}</td>
                    <td>
                      <DeleteOutlined
                        onClick={() => handleProfileDelete(user._id)}
                        className="text-danger"
                        alt="edit"
                      />{' '}
                      <StopOutlined
                        onClick={() => handleUserSuspension(user._id)}
                        className="text-danger"
                      />{' '}
                      <CheckOutlined
                        onClick={() => handleUserUnSuspension(user._id)}
                        className="text-success"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
