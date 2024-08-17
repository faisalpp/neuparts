'use client';

import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import CartSlice from '@/app/GlobalRedux/slices/CartSlice'
import OrderSlice from '@/app/GlobalRedux/slices/OrderSlice'

const reducers = combineReducers({
  cart: CartSlice,
  order:OrderSlice
});

const persistConfig = {
  key: 'root',
  storage,
  devTools: true,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
  }); 
}