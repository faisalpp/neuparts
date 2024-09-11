'use client';
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user:'',
  email:'',
  id:null
}

  export const cartSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
     setLogin: (state, action) => {
      state.user = action.payload
     },
     setEmail: (state,action) => {
      state.email = action.payload
     },
     setId: (state,action) => {
      state.id = action.payload
     }
    }
  });
  
  export const {setLogin,setEmail,setId} = cartSlice.actions;
  
  export default cartSlice.reducer;