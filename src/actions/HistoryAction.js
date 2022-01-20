import axios from 'axios';
import { Alert } from 'react-native';
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
  API_URL,
} from '../utils';

export const SHOW_BY_USER_ID = 'SHOW_BY_USER_ID';
export const USER_ORDER = 'USER_ORDER';
export const ORDER_DETAIL = 'ORDER_DETAIL';
export const COUPON_ORDER = 'COUPON_ORDER';

export const showByUserId = data => {
  return dispatch => {
    dispatchLoading(dispatch, SHOW_BY_USER_ID);
    const token = data.token;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };
    axios({
      method: 'GET',
      url: `${API_URL.url}/order/showbyuserid/` + data.user_id,
      headers: headers,
    })
      .then(response => {
        let order = response.data;
        console.log('show by user id', order);
        dispatchSuccess(dispatch, SHOW_BY_USER_ID, order);
      })
      .catch(error => {
        if (error.response.status === 400 || 401) {
          // Alert.alert('Anda harus login kembali');
        }
        // console.log('Error ShowOrderByUserId', error.response.status);
        dispatchError(dispatch, SHOW_BY_USER_ID, error);
        // alert(error);
      });
  };
};

export const yourOrder = data => {
  return async dispatch => {
    dispatchLoading(dispatch, USER_ORDER);
    const token = data.token;
    const order_id = data.order_id;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token,
    };

    axios({
      method: 'GET',
      url: `${API_URL.url}/user/order/show/` + order_id,
      headers: headers,
    })
      .then(resOrder => {
        dispatchLoading(dispatch, ORDER_DETAIL);
        return axios({
          method: 'GET',
          url: `${API_URL.url}/order/detail/show/` + order_id,
          headers: headers,
        })
          .then(resDetail => {
            // return axios({
            //   method: 'GET',
            //   url: `${API_URL.url}/coupon`,
            // }).then(resCoupon => {
            let userOrder = resOrder.data[1];
            console.log('action', userOrder);
            dispatchSuccess(dispatch, USER_ORDER, userOrder);
            console.log('ini order detal', resDetail.data);
            let orderDetail = resDetail.data;
            dispatchSuccess(dispatch, ORDER_DETAIL, orderDetail);
            // });
          })
          .catch(err => {
            dispatchError(dispatch, ORDER_DETAIL, err);
            Alert.alert('Error Order Detail', err.response);
          });
      })
      .catch(error => {
        console.log('Error Your Order', error.response);
        dispatchError(dispatch, USER_ORDER, error);
        Alert.alert('Error Your Order', error.response);
      });
  };
};
