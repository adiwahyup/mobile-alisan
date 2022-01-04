import Firebase from '../config/Firebase';
import {
  dispatchLoading,
  dispatchSuccess,
  dispatchError,
  discount,
} from '../utils';

export const ADD_CART = 'ADD_CART';
export const GET_LIST_CART = 'GET_LIST_CART';
export const CART_PRODUCT = 'CART_PRODUCT';
export const DELETE_CART = 'DELETE_CART';

export const addCart = data => {
  console.log('data', data);
  return dispatch => {
    dispatchLoading(dispatch, ADD_CART);

    Firebase.database()
      .ref('carts/' + data.id)
      .once('value', querySnapshot => {
        if (querySnapshot.val()) {
          // If Exist Update Main Cart

          const mainCart = querySnapshot.val();
          const updatedWeight =
            parseInt(data.qty) * parseInt(data.product.product_weight);
          const updatedPrice =
            parseInt(data.qty) *
            parseFloat(
              discount(data.product_price, data.product.product_discount),
            );
          // parseInt(data.qty) * parseInt(data.product_price);

          Firebase.database()
            .ref('carts')
            .child(data.id)
            .update({
              totalPrice: mainCart.totalPrice + updatedPrice,
              totalWeight: mainCart.totalWeight + updatedWeight,
            })
            .then(response => {
              // If success, save this to Cart Detail
              dispatch(toCartDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, ADD_CART, error);
              alert(error);
            });
        } else {
          // Save main cart
          const mainCart = {
            user: data.id,
            date: new Date().toISOString().substring(0, 10),
            totalPrice:
              parseInt(data.qty) *
              parseFloat(
                discount(data.product_price, data.product.product_discount),
              ),
            totalWeight:
              parseInt(data.qty) * parseInt(data.product.product_weight),
          };

          Firebase.database()
            .ref('carts')
            .child(data.id)
            .set(mainCart)
            .then(response => {
              // If success, save this to cart detail
              dispatch(toCartDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, ADD_CART, error);
              alert(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, ADD_CART, error);
        alert(error);
      });
  };
};

export const toCartDetail = data => {
  return dispatch => {
    const orders = {
      product_id: data.ssp_id,
      product_name: data.product.product_name,
      product_price: data.product_price,
      product_weight: data.product.product_weight,
      product_discount: data.product.product_discount,
      product_picture: data.product_picture,
      product_size: data.product_size,
      qty: data.qty,
      totalPrice:
        parseInt(data.qty) *
        parseFloat(discount(data.product_price, data.product.product_discount)),
      totalWeight: parseInt(data.qty) * parseFloat(data.product.product_weight),
    };

    Firebase.database()
      .ref('carts/' + data.id)
      .child('cart')
      .push(orders)
      .then(response => {
        dispatchSuccess(dispatch, ADD_CART, response);
      })
      .catch(error => {
        dispatchError(dispatch, ADD_CART, error);
        alert(error);
      });
  };
};

export const getListCart = id => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_CART);

    Firebase.database()
      .ref('carts/' + id)
      .once('value', querySnapshot => {
        let data = querySnapshot.val();

        dispatchSuccess(dispatch, GET_LIST_CART, data);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_CART, error);
        alert(error);
      });
  };
};

export const cartProduct = id => {
  return dispatch => {
    dispatchLoading(dispatch, CART_PRODUCT);

    Firebase.database()
      .ref('carts/' + id)
      .child('cart')
      .once('value', querySnapshot => {
        let data = querySnapshot.val();
        // console.log('action cartProduct', data);

        dispatchSuccess(dispatch, CART_PRODUCT, data);
      })
      .catch(error => {
        dispatchError(dispatch, CART_PRODUCT, error);
        alert(error);
      });
  };
};

export const deleteCart = (id, mainCart, cart) => {
  return dispatch => {
    dispatchLoading(dispatch, DELETE_CART);

    const totalNewPrice = mainCart.totalPrice - cart.totalPrice;

    const totalNewWeight = mainCart.totalWeight - cart.totalWeight;

    if (totalNewPrice === 0) {
      // delete main cart & detail

      Firebase.database()
        .ref('carts')
        .child(mainCart.user)
        .remove()
        .then(response => {
          dispatchSuccess(dispatch, DELETE_CART, 'Cart succesfully deleted');
        })
        .catch(error => {
          dispatchError(dispatch, DELETE_CART, error);
          alert(error);
        });
    } else {
      // update main cart
      Firebase.database()
        .ref('carts')
        .child(mainCart.user)
        .update({
          totalWeight: totalNewWeight,
          totalPrice: totalNewPrice,
        })
        .then(response => {
          // delete orders/cart detail
          dispatch(deleteCartDetail(id, mainCart));
        })
        .catch(error => {
          dispatchError(dispatch, DELETE_CART, error);
          alert(error);
        });
    }
  };
};

export const deleteCartDetail = (id, mainCart) => {
  return dispatch => {
    Firebase.database()
      .ref('carts/' + mainCart.user)
      .child('cart')
      .child(id)
      .remove()
      .then(response => {
        dispatchSuccess(dispatch, DELETE_CART, 'Cart succesfully deleted');
      })
      .catch(error => {
        dispatchError(dispatch, DELETE_CART, error);
        alert(error);
      });
  };
};
