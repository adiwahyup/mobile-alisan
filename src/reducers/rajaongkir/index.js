import {
  GET_CITY,
  GET_PROVINCE,
  GET_CITY_DETAIL,
  SHIPPING_COST,
} from '../../actions/RajaOngkirAction';

const initialState = {
  getProvinceLoading: false,
  getProvinceResult: false,
  getProvinceError: false,

  getCityLoading: false,
  getCityResult: false,
  getCityError: false,

  getCityDetailLoading: false,
  getCityDetailResult: false,
  getCityDetailError: false,

  costLoading: false,
  costResult: false,
  costError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROVINCE:
      return {
        ...state,
        getProvinceLoading: action.payload.loading,
        getProvinceResult: action.payload.data,
        getProvinceError: action.payload.errorMessage,
      };
    case GET_CITY:
      return {
        ...state,
        getCityLoading: action.payload.loading,
        getCityResult: action.payload.data,
        getCityError: action.payload.errorMessage,
      };
    case GET_CITY_DETAIL:
      return {
        ...state,
        getCityDetailLoading: action.payload.loading,
        getCityDetailResult: action.payload.data,
        getCityDetailError: action.payload.errorMessage,
      };
    case SHIPPING_COST:
      return {
        ...state,
        costLoading: action.payload.loading,
        costResult: action.payload.data,
        costError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
