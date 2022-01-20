import {
  GET_LIST_PRODUCT,
  GET_LIMIT_PRODUCT,
  GET_DETAIL_PRODUCT,
  GET_SSP,
} from '../../actions/ProductAction';

const initialState = {
  getListProductLoading: false,
  getListProductResult: false,
  getListProductError: false,

  getLimitProductLoading: false,
  getLimitProductResult: false,
  getLimitProductError: false,

  getDetailProductLoading: false,
  getDetailProductResult: false,
  getDetailProductError: false,

  getSspLoading: false,
  getSspResult: false,
  getSspError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_PRODUCT:
      return {
        ...state,
        getListProductLoading: action.payload.loading,
        getListProductResult: action.payload.data,
        getListProductError: action.payload.errorMessage,
      };
    case GET_LIMIT_PRODUCT:
      return {
        ...state,
        getLimitProductLoading: action.payload.loading,
        getLimitProductResult: action.payload.data,
        getLimitProductError: action.payload.errorMessage,
      };
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        getDetailProductLoading: action.payload.loading,
        getDetailProductResult: action.payload.data,
        getDetailProductError: action.payload.errorMessage,
      };
    case GET_SSP:
      return {
        ...state,
        getSspLoading: action.payload.loading,
        getSspResult: action.payload.data,
        getSspError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
