import axios from 'axios';
import Firebase from '../config/Firebase';
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
  API_URL,
} from '../utils';

export const UPDATE_CART = 'UPDATE_CART';
export const POST_ORDER = 'POST_ORDER';

export const updateCart = params => {
  return dispatch => {
    dispatchLoading(dispatch, UPDATE_CART);

    const id = params.user_id;

    Firebase.database()
      .ref('carts/' + id)
      .remove()
      .then(response => {
        dispatchSuccess(dispatch, UPDATE_CART, response ? response : []);
      })
      .catch(error => {
        dispatchError(dispatch, UPDATE_CART, error);
        alert(error);
      });
  };
};

export const postOrder = data => {
  console.log('test data masuk post order: ', data);
  return dispatch => {
    dispatchLoading(dispatch, POST_ORDER);

    const cart = data.productCart.map(item => {
      return {
        product_id: item.product_id,
        product_name: item.product_name,
        product_price: item.product_price,
        product_weight: item.product_weight,
        product_discount: item.product_discount,
        product_picture: item.product_picture,
        product_size: item.product_size,
        qty: item.qty,
      };
    });

    const req = {
      address: data.address,
      totalOrder: data.subTotal,
      total_weight: data.totalWeight,
      province: data.city.province,
      district: data.city.city_id,
      type: data.city.type,
      postal_code: data.city.postal_code,
      expedition: data.expedition.courier,
      package: data.service,
      shipping_costs: data.shippingCost,
      estimation: data.estimation,
      // subprice: data.subTotal,
    };
    const user_id = data.user_id;

    const item = {
      productCart: cart,
      request: req,
      user_id: user_id,
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    axios({
      method: 'POST',
      url: `${API_URL.url}/checkout`,
      headers: headers,
      data: item,
    })
      .then(response => {
        console.log('response api', response.data);
        let order = response.data;
        dispatchSuccess(dispatch, POST_ORDER, order);
      })
      .catch(error => {
        dispatchError(dispatch, POST_ORDER, error);
        alert(error);
      });
  };
};
