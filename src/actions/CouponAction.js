import axios from 'axios';
import { Alert } from 'react-native';
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
  API_URL,
} from '../utils';

export const GET_COUPON = 'GET_COUPON';

export const getCoupon = data => {
  console.log('action coupon', data);
  return dispatch => {
    dispatchLoading(dispatch, GET_COUPON);

    const coupon = {
      coupon: data.coupon,
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios({
      method: 'GET',
      url: `${API_URL.url}/coupon`,
      headers: headers,
      params: coupon,
    })
      .then(response => {
        dispatchSuccess(dispatch, GET_COUPON, response.data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_COUPON, error);
        Alert.alert('Error', 'Kupon Tidak Ditemukan');
      });
  };
};
