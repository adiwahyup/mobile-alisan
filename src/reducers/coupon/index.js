import { GET_COUPON } from '../../actions/CouponAction';

const initialState = {
  getCouponLoading: false,
  getCouponResult: false,
  getCouponError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUPON:
      return {
        ...state,
        getCouponLoading: action.payload.loading,
        getCouponResult: action.payload.data,
        getCouponError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
