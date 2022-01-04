import {
  GET_LIST_PRODUCT,
  GET_DETAIL_PRODUCT,
  GET_SSP,
  GET_LIST_PRODUCT_BY_CATEGORY,
  SAVE_KEYWORD_PRODUCT,
  DELETE_PARAMS_PRODUCT,
} from '../../actions/ProductAction';

const initialState = {
  getListProductLoading: false,
  getListProductResult: false,
  getListProductError: false,

  getDetailProductLoading: false,
  getDetailProductResult: false,
  getDetailProductError: false,

  getSspLoading: false,
  getSspResult: false,
  getSspError: false,

  category_id: false,
  categoryName: false,
  keyword: false,
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
    case GET_LIST_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        category_id: action.payload.category_id,
        categoryName: action.payload.categoryName,
      };
    case DELETE_PARAMS_PRODUCT:
      return {
        ...state,
        category_id: false,
        categoryName: false,
        keyword: false,
      };
    case SAVE_KEYWORD_PRODUCT:
      return {
        ...state,
        keyword: action.payload.data,
      };
    default:
      return state;
  }
}
