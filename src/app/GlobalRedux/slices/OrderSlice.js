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
         state.orderId = action.payload
      },
      resetOrder:(state,action) => {
        state.orderInfo = {}
        state.loader = false
        state.orderId = null
      }
    },
  });
  
  export const { setOrderInfo,setOrderLoader,setOrderId,resetOrder } = orderSlice.actions;
  
  export default orderSlice.reducer;