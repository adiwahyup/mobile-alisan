import axios from 'axios';
import {
  API_URL,
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
} from '../utils';

export const GET_LIST_PRODUCT = 'GET_LIST_PRODUCT';
export const GET_DETAIL_PRODUCT = 'GET_DETAIL_PRODUCT';
export const GET_SSP = 'GET_SSP';
export const GET_LIST_PRODUCT_BY_CATEGORY = 'GET_LIST_PRODUCT_BY_CATEGORY';
export const DELETE_PARAMS_PRODUCT = 'DELETE_PARAMS_PRODUCT';
export const SAVE_KEYWORD_PRODUCT = 'SAVE_KEYWORD_PRODUCT';

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

// export const popularProduct = data => {
//   return dispatch => {
//     dispatchLoading(dispatch, GET_LIST_PRODUCT);

//     axios
//       .get(`${API_URL.url}/product/index`, data)
//       .then(response => {
//         console.log('Data Product homescreen: ', response.data);
//         // SUCCESS

//         const newItem = {
//           ...response.data,
//         };
//         dispatchSuccess(dispatch, GET_LIST_PRODUCT, newItem);
//       })
//       .catch(error => {
//         console.log('error product', error);
//         // ERROR
//         dispatchError(dispatch, GET_LIST_PRODUCT, error);
//         // alert(error);
//       });
// const headers = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
// };
// axios({
//   method: 'GET',
//   url: `${API_URL.url}/product/index`,
//   headers: headers,
//   data: data,
// })
//   .then(response => {
//     const newItem = {
//       ...response.data,
//     };
//     dispatchSuccess(dispatch, GET_LIST_PRODUCT, newItem);
//   })
//   .catch(error => {
//     console.log('test error homescreen', error);

//     dispatchError(dispatch, GET_LIST_PRODUCT, error);
//     alert(error);
//   });
//   };
// };

export const getDetailProduct = product_slug => {
  return dispatch => {
    dispatchLoading(dispatch, GET_DETAIL_PRODUCT);

    // axios
    //   .post(`${API_URL.url}/product/showbyslug`, {
    //     params: { product_slug: product_slug },
    //   })
    //   .then(response => {
    //     dispatchLoading(dispatch, GET_SSP);

    //     const ssp = response.data.sizestock.map(size => {
    //       return {
    //         ssp_id: size.ssp_id,
    //         ssp_size: size.ssp_size,
    //       };
    //     });
    //     dispatchSuccess(dispatch, GET_SSP, ssp);

    //     dispatchSuccess(dispatch, GET_DETAIL_PRODUCT, response.data);
    //   })
    //   .catch(error => {
    //     // ERROR
    //     dispatchError(dispatch, GET_DETAIL_PRODUCT, error);
    //     alert(error);
    //   });
    // const product_slug = {
    //   product_slug: product_slug,
    // };
    // const headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // };
    axios({
      method: 'POST',
      url: `${API_URL.url}/product/showbyslug`,
      data: {
        product_slug: product_slug,
      },
    })
      .then(response => {
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

export const getProductByCategory = (id, categoryName) => ({
  type: GET_LIST_PRODUCT_BY_CATEGORY,
  payload: {
    category_id: id,
    caregoryName: categoryName,
  },
});

export const deleteParamsProduct = () => ({
  type: DELETE_PARAMS_PRODUCT,
});
