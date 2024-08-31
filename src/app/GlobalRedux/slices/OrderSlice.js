'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderInfo:{},
  loader:false,
  orderId:null
}

  export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      setOrderInfo: (state, action) => {
        state.orderInfo = action.payload
      },
      setOrderLoader:(state,action) => {
        state.loader = !state.loader
      },
      setOrderId:(state,action) => {

      }
    },
  });
  
  export const { setOrderInfo,setOrderLoader,setOrderId } = orderSlice.actions;
  
  export default orderSlice.reducer;