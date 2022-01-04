import { GET_LIST_CATEGORY } from '../../actions/ProductAction';

const initialState = {
  getListCategoryLoading: false,
  getListCategoryResult: false,
  getListCategoryError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LIST_CATEGORY:
      return {
        ...state,
        getListCategoryLoading: action.payload.loading,
        getListCategoryResult: action.payload.data,
        getListCategoryError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
