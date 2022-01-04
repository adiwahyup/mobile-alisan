import {
  ADD_CART,
  GET_LIST_CART,
  CART_PRODUCT,
  DELETE_CART,
} from '../../actions/CartAction';

const initialState = {
  addCartLoading: false,
  addCartResult: false,
  addCartError: false,

  getListCartLoading: false,
  getListCartResult: false,
  getListCartError: false,

  cartProductLoading: false,
  cartProductResult: false,
  cartProductError: false,

  deleteCartLoading: false,
  deleteCartResult: false,
  deleteCartError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CART:
      return {
        ...state,
        addCartLoading: action.payload.loading,
        addCartResult: action.payload.data,
        addCartError: action.payload.errorMessage,
      };

    case CART_PRODUCT:
      return {
        ...state,
        cartProductLoading: action.payload.loading,
        cartProductResult: action.payload.data,
        cartProductError: action.payload.errorMessage,
      };

    case GET_LIST_CART:
      return {
        ...state,
        getListCartLoading: action.payload.loading,
        getListCartResult: action.payload.data,
        getListCartError: action.payload.errorMessage,
      };
    case DELETE_CART:
      return {
        ...state,
        deleteCartLoading: action.payload.loading,
        deleteCartResult: action.payload.data,
        deleteCartError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
