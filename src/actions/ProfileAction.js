import axios from 'axios';
import { API_TIMEOUT, API_URL, saveData } from '../utils';
import { dispatchLoading, dispatchSuccess, dispatchError } from '../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const updateProfile = data => {
  console.log(data);
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, UPDATE_PROFILE);

    const newProfile = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
    };

    axios({
      method: 'post',
      url: `${API_URL.url}/editprofile/` + data.id,
      timeout: API_TIMEOUT,
      data: newProfile,
    })
      .then(response => {
        console.log(response.data);
        // SUCCESS
        dispatchSuccess(
          dispatch,
          UPDATE_PROFILE,
          response.data ? response : [],
        );
        saveData('user', newProfile);
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
