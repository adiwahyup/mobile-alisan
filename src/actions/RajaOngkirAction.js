import axios from 'axios';
import {
  API_RAJAONGKIR,
  API_HEADER_RAJAONGKIR,
  API_HEADER_RAJAONGKIR_COST,
  ORIGIN_CITY,
  API_TIMEOUT,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../utils';

export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_CITY = 'GET_CITY';
// export const GET_CITY_DETAIL = 'GET_CITY_DETAIL';
export const SHIPPING_COST = 'SHIPPING_COST';

export const getProvinceList = () => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, GET_PROVINCE);

    axios({
      method: 'get',
      url: API_RAJAONGKIR + 'province',
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_PROVINCE, response);
        } else {
          // SUCCESS
          dispatchSuccess(
            dispatch,
            GET_PROVINCE,
            response.data ? response.data.rajaongkir.results : [],
          );
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, GET_PROVINCE, error);

        alert(error);
      });
  };
};

export const getCityList = province_id => {
  return dispatch => {
    // LOADING
    dispatchLoading(dispatch, GET_CITY);

    axios({
      method: 'get',
      url: API_RAJAONGKIR + 'city?province=' + province_id,
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatchError(dispatch, GET_CITY, response);
        } else {
          // SUCCESS
          dispatchSuccess(
            dispatch,
            GET_CITY,
            response.data ? response.data.rajaongkir.results : [],
          );
        }
      })
      .catch(error => {
        // ERROR
        dispatchError(dispatch, GET_CITY, error);

        alert(error);
      });
  };
};

// export const getCityDetail = city_id => {
//   return dispatch => {
//     // LOADING
//     dispatchLoading(dispatch, GET_CITY_DETAIL);

//     axios({
//       method: 'get',
//       url: API_RAJAONGKIR + 'city?id=' + city_id,
//       timeout: API_TIMEOUT,
//       headers: API_HEADER_RAJAONGKIR,
//     })
//       .then(response => {
//         if (response.status !== 200) {
//           // ERROR
//           dispatchError(dispatch, GET_CITY_DETAIL, response);
//         } else {
//           // SUCCESS
//           dispatchSuccess(
//             dispatch,
//             GET_CITY,
//             response.data ? response.data.rajaongkir.results : [],
//           );
//         }
//       })
//       .catch(error => {
//         // ERROR
//         dispatchError(dispatch, GET_CITY_DETAIL, error);
//         alert(error);
//       });
//   };
// };

export const shippingCost = (data, expedition) => {
  return dispatch => {
    dispatchLoading(dispatch, SHIPPING_COST);

    const formData = new URLSearchParams();
    formData.append('origin', ORIGIN_CITY);
    formData.append('destination', data.city.city_id);
    formData.append('weight', data.totalWeight);
    formData.append('courier', expedition.courier);

    axios({
      method: 'POST',
      url: API_RAJAONGKIR + 'cost',
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR_COST,
      data: formData,
    })
      .then(response => {
        if (response.status === 200) {
          const results = response.data.rajaongkir.results[0].costs;
          const services = results.map(service => {
            return service;
          });
          // SUCCESS
          dispatchSuccess(dispatch, SHIPPING_COST, services);
        } else {
          // ERROR
          dispatchError(dispatch, SHIPPING_COST, response);
        }
      })
      .catch(error => {
        dispatchError(dispatch, SHIPPING_COST, error);
        alert('Please fill in the form accordingly');
      });
  };
};
