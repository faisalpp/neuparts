'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderInfo:{},
}

  export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
      setOrderInfo: (state, action) => {
        state.orderInfo = action.payload
      }
    },
  });
  
  export const { setOrderInfo } = orderSlice.actions;
  
  export default orderSlice.reducer;