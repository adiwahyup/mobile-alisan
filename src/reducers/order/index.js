import { UPDATE_CART, POST_ORDER } from '../../actions/OrderAction';

const initialState = {
  updateCartLoading: false,
  updateCartResult: false,
  updateCartError: false,

  postOrderLoading: false,
  postOrderResult: false,
  postOrderError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        updateCartLoading: action.payload.loading,
        updateCartResult: action.payload.data,
        updateCartError: action.payload.errorMessage,
      };
    case POST_ORDER:
      return {
        ...state,
        postOrderLoading: action.payload.loading,
        postOrderResult: action.payload.data,
        postOrderError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
