import { combineReducers } from 'redux';
import RajaOngkirReducer from './rajaongkir';
import AuthReducer from './auth';
import ProfileReducer from './profile';
import ProductReducer from './product';
import CartReducer from './cart';
import PaymentReducer from './payment';
import OrderReducer from './order';
import HistoryReducer from './history';
import CouponReducer from './coupon';

const rootReducer = combineReducers({
  RajaOngkirReducer,
  AuthReducer,
  ProfileReducer,
  ProductReducer,
  CartReducer,
  PaymentReducer,
  OrderReducer,
  HistoryReducer,
  CouponReducer,
});

export default rootReducer;
