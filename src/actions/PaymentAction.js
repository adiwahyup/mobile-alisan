import axios from 'axios';
import { API_TIMEOUT, URL_MIDTRANS, HEADER_MIDTRANS } from '../utils/constant';
import { dispatchError, dispatchLoading, dispatchSuccess } from '../utils';

export const SNAP_MIDTRANS = 'SNAP_MIDTRANS';

export const snapMidtrans = data => {
  return dispatch => {
    dispatchLoading(dispatch, SNAP_MIDTRANS);

    axios({
      method: 'POST',
      url: URL_MIDTRANS + 'transactions',
      headers: HEADER_MIDTRANS,
      data: data,
      timeout: API_TIMEOUT,
    })
      .then(function (response) {
        console.log('Response Midtrans: ', response.data);
        dispatchSuccess(dispatch, SNAP_MIDTRANS, response.data);
      })
      .catch(function (error) {
        dispatchError(dispatch, SNAP_MIDTRANS, error);

        alert(error);
      });
  };
};
