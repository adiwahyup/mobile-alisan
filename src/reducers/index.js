import { combineReducers } from 'redux';
import RajaOngkirReducer from './rajaongkir';
import AuthReducer from './auth';
import ProfileReducer from './profile';
import ProductReducer from './product';
import CategoryReducer from './category';
import CartReducer from './cart';
import PaymentReducer from './payment';
import OrderReducer from './order';
import HistoryReducer from './history';

const rootReducer = combineReducers({
  RajaOngkirReducer,
  AuthReducer,
  ProfileReducer,
  ProductReducer,
  CategoryReducer,
  CartReducer,
  PaymentReducer,
  OrderReducer,
  HistoryReducer,
});

export default rootReducer;
