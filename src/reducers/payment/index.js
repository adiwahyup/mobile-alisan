import { SNAP_MIDTRANS } from '../../actions/PaymentAction';

const initialState = {
  snapMidtransLoading: false,
  snapMidtransResult: false,
  snapMidtransError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SNAP_MIDTRANS:
      return {
        ...state,
        snapMidtransLoading: action.payload.loading,
        snapMidtransResult: action.payload.data,
        snapMidtransError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
