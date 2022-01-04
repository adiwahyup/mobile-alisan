import axios from 'axios';
import Firebase from '../config/Firebase';
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
  URL_MIDTRANS_STATUS,
  HEADER_MIDTRANS,
  API_TIMEOUT,
  API_URL,
} from '../utils';

export const ORDER_HISTORY = 'ORDER_HISTORY';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const orderHistory = id => {
  return dispatch => {
    dispatchLoading(dispatch, ORDER_HISTORY);

    Firebase.database()
      .ref('history')
      .orderByChild('user')
      .equalTo(id)
      .once('value', querySnapshot => {
        let data = querySnapshot.val();
        dispatchSuccess(dispatch, ORDER_HISTORY, data);
        // console.log('order hisotry action', data);
      })
      .catch(error => {
        dispatchError(dispatch, ORDER_HISTORY, error);
        alert(error);
      });
  };
};

export const updateStatus = order_id => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_STATUS);

    axios({
      method: 'GET',
      url: URL_MIDTRANS_STATUS + `${order_id}/status`,
      headers: HEADER_MIDTRANS,
      timeout: API_TIMEOUT,
    })
      .then(response => {
        const status =
          response.data.transaction_status === 'settlement' ||
          response.data.transaction_status === 'capture'
            ? 'paid'
            : response.data.transaction_status
            ? response.data.transaction_status
            : 'pending';

        // Update history in db
        axios
          .put(`${API_URL.url}/order`, {
            data: { order_id: { order_status: status } },
          })
          .then(response => {
            // SUCCESS
            dispatchSuccess(dispatch, UPDATE_STATUS, response ? response : []);
          })
          .catch(error => {
            dispatchError(dispatch, UPDATE_STATUS, error);
            alert(error);
          });
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_STATUS, error);
        alert(error);
      });
  };
};
