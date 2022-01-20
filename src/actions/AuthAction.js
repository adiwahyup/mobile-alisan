import axios from 'axios';
import { Alert } from 'react-native';
import {
  API_URL,
  saveData,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = data => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, REGISTER_USER);

    axios
      .post(`${API_URL.url}/register`, data)
      .then(response => {
        const user = response.data.data;

        console.log('Data Registrasi: ', response.data);

        // SUCCESS
        Alert.alert(
          'Success',
          'You have successfully registered! Please login again.',
        );
        dispatchSuccess(dispatch, REGISTER_USER, user);

        // Save to local storage (AsyncStorage)
        saveData('user', user);
      })
      .catch(error => {
        // ERROR
        if (error.response.status === 400) {
          Alert.alert('Error', 'Email sudah digunakan!');
        }
        dispatchError(dispatch, REGISTER_USER, error);
      });
  };
};

export const loginUser = data => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, LOGIN_USER);

    axios
      .post(`${API_URL.url}/login`, data)
      .then(response => {
        console.log('User login: ', response.data);
        // SUCCESS
        saveData('token', response.data.access_token);

        dispatchSuccess(dispatch, LOGIN_USER, response.data);
        console.log('User login: ', response.data.user.data);

        saveData('user', response.data.user.data);
      })
      .catch(error => {
        if (error.response.status === 401) {
          // ERROR
          dispatchError(dispatch, LOGIN_USER, error.response.status);
          Alert.alert('Error', 'Email atau Password Salah');
        } else {
          Alert.alert('Error', 'Data Tidak Ditemukan');
        }

        return error;
      });
  };
};
