import axios from 'axios';
import {
  API_URL,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../utils';

export const GET_LIST_PRODUCT = 'GET_LIST_PRODUCT';
export const GET_LIMIT_PRODUCT = 'GET_LIMIT_PRODUCT';
export const GET_DETAIL_PRODUCT = 'GET_DETAIL_PRODUCT';
export const GET_SSP = 'GET_SSP';
export const DELETE_PARAMS_PRODUCT = 'DELETE_PARAMS_PRODUCT';

export const getLimitProduct = data => {
  return async dispatch => {
    dispatchLoading(dispatch, GET_LIST_PRODUCT);

    axios
      .get(`${API_URL.url}/product/index`, data)
      .then(response => {
        // console.log('Data Limit: ', response.data);
        // SUCCESS

        const newItem = {
          ...response.data,
        };
        dispatchSuccess(dispatch, GET_LIST_PRODUCT, newItem);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, GET_LIST_PRODUCT, error);
        alert(error);
      });
  };
};
export const getListProduct = data => {
  return async dispatch => {
    dispatchLoading(dispatch, GET_LIST_PRODUCT);

    axios
      .get(`${API_URL.url}/product/index`, data)
      .then(response => {
        // console.log('Data Product screen: ', response.data);
        // SUCCESS

        const newItem = {
          ...response.data,
        };
        dispatchSuccess(dispatch, GET_LIST_PRODUCT, newItem);
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, GET_LIST_PRODUCT, error);
        alert(error);
      });
  };
};

export const getDetailProduct = product_slug => {
  return dispatch => {
    dispatchLoading(dispatch, GET_DETAIL_PRODUCT);

    axios({
      method: 'POST',
      url: `${API_URL.url}/product/showbyslug`,
      data: {
        product_slug: product_slug,
      },
    })
      .then(response => {
        console.log('size', response.data);
        dispatchLoading(dispatch, GET_SSP);

        const ssp = response.data.sizestock.map(size => {
          return {
            ssp_id: size.ssp_id,
            ssp_size: size.ssp_size,
          };
        });

        dispatchSuccess(dispatch, GET_SSP, ssp);
      })
      .catch(error => {
        dispatchError(dispatch, GET_SSP, error);
        alert(error);
      });
  };
};
