import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: '',
  cart: '',
  admin: '',
  order: '',
  laundary: '',
  adminCart: ''
});

const persistConfig = {
  key: 'root',
  storage,
  devTools: true,
  blacklist: ['adminCart'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;