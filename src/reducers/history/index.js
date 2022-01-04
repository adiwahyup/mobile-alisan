import { ORDER_HISTORY, UPDATE_STATUS } from '../../actions/HistoryAction';

const initialState = {
  orderHistoryLoading: false,
  orderHistoryResult: false,
  orderHistoryError: false,

  updateStatusLoading: false,
  updateStatusResult: false,
  updateStatusError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ORDER_HISTORY:
      return {
        ...state,
        orderHistoryLoading: action.payload.loading,
        orderHistoryResult: action.payload.data,
        orderHistoryError: action.payload.errorMessage,
      };
    case UPDATE_STATUS:
      return {
        ...state,
        updateStatusLoading: action.payload.loading,
        updateStatusResult: action.payload.data,
        updateStatusError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
