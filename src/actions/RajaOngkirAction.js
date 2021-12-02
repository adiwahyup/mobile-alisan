import axios from 'axios';
import {
  API_RAJAONGKIR,
  API_HEADER_RAJAONGKIR,
  API_TIMEOUT,
} from '../utils/constant';

export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_CITY = 'GET_CITY';

export const getProvinceList = () => {
  return dispatch => {
    // LOADING
    dispatch({
      type: GET_PROVINCE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: 'get',
      url: API_RAJAONGKIR + 'province',
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then(response => {
        // ERROR
        if (response.status !== 200) {
          dispatch({
            type: GET_PROVINCE,
            payload: {
              loading: false,
              data: false,
              errorMessage: response,
            },
          });
        } else {
          // SUCCESS
          dispatch({
            type: GET_PROVINCE,
            payload: {
              loading: false,
              data: response.data ? response.data.rajaongkir.results : [],
              errorMessage: false,
            },
          });
        }
      })
      .catch(error => {
        // ERROR
        dispatch({
          type: GET_PROVINCE,
          payload: {
            loading: false,
            data: false,
            errorMessage: error,
          },
        });
        alert(error);
      });
  };
};

export const getCityList = province_id => {
  return dispatch => {
    // LOADING
    dispatch({
      type: GET_CITY,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: 'get',
      url: API_RAJAONGKIR + 'city?province=' + province_id,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then(response => {
        // ERROR
        if (response.status !== 200) {
          dispatch({
            type: GET_CITY,
            payload: {
              loading: false,
              data: false,
              errorMessage: response,
            },
          });
        } else {
          // SUCCESS
          dispatch({
            type: GET_CITY,
            payload: {
              loading: false,
              data: response.data ? response.data.rajaongkir.results : [],
              errorMessage: false,
            },
          });
        }
      })
      .catch(error => {
        // ERROR
        dispatch({
          type: GET_CITY,
          payload: {
            loading: false,
            data: false,
            errorMessage: error,
          },
        });
        alert(error);
      });
  };
};
