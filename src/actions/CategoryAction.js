import axios from 'axios';
import {
  API_URL,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../utils';

export const GET_LIST_CATEGORY = 'GET_LIST_CATEGORY';

export const getListCategory = data => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_CATEGORY);

    axios
      .get(`${API_URL.url}/category/index`, data)
      .then(response => {
        // console.log('Data Product: ', response.data);
        // SUCCESS
        let item = response.data ? response.data : [];
        let dataItem = { ...item };

        dispatchSuccess(dispatch, GET_LIST_CATEGORY, dataItem);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, GET_LIST_CATEGORY, error);
        // alert(error);
        // console.log(error);
      });
  };
};
