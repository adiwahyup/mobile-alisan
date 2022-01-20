import {
  SHOW_BY_USER_ID,
  USER_ORDER,
  ORDER_DETAIL,
  COUPON_ORDER,
} from '../../actions/HistoryAction';

const initialState = {
  showByUserIdLoading: false,
  showByUserIdResult: false,
  showByUserIdError: false,

  userOrderLoading: false,
  userOrderResult: false,
  userOrderError: false,

  orderDetailLoading: false,
  orderDetailResult: false,
  orderDetailError: false,

  couponOrderLoading: false,
  couponOrderResult: false,
  couponOrderError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_BY_USER_ID:
      return {
        ...state,
        showByUserIdLoading: action.payload.loading,
        showByUserIdResult: action.payload.data,
        showByUserIdError: action.payload.errorMessage,
      };
    case USER_ORDER:
      return {
        ...state,
        userOrderLoading: action.payload.loading,
        userOrderResult: action.payload.data,
        userOrderError: action.payload.errorMessage,
      };
    case ORDER_DETAIL:
      return {
        ...state,
        orderDetailLoading: action.payload.loading,
        orderDetailResult: action.payload.data,
        orderDetailError: action.payload.errorMessage,
      };
    case COUPON_ORDER:
      return {
        ...state,
        couponOrderLoading: action.payload.loading,
        couponOrderResult: action.payload.data,
        couponOrderError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
