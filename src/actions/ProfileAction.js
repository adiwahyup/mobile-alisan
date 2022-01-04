import axios from 'axios';
import { API_URL, saveData } from '../utils';
import { dispatchLoading, dispatchSuccess, dispatchError } from '../utils';

const UPDATE_PROFILE = 'UPDATE_PROFILE';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const updateProfile = data => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, UPDATE_PROFILE);

    const newData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    };

    return axios
      .put(`${API_URL.url}/userProfile`, data)
      .then(response => {
        console.log(response.data);
        // SUCCESS
        dispatchSuccess(
          dispatch,
          UPDATE_PROFILE,
          response.data.user ? response : [],
        );
        saveData('user', newData);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, UPDATE_PROFILE, error);
      });
  };
};

export const changePassword = data => {
  return dispatch => {
    dispatchLoading(dispatch, CHANGE_PASSWORD);

    // check if email and password (login)
    axios
      .post(`${API_URL.url}/login`, data)
      .then(response => {
        // SUCCESS

        dispatchSuccess(dispatch, CHANGE_PASSWORD, response.data.user);

        saveData('user', response.data.user);
      })
      .catch(error => {
        if (error.response.status === 401) {
          // ERROR
          dispatchError(dispatch, CHANGE_PASSWORD, error.response.status);
          alert(error, 'Data tidak ditemukan');
        }
        return error;
      });

    // if success update password
  };
};
