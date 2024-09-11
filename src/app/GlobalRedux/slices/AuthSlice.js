'use client';
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {jwtVerify} from 'jose'

const initialState = {
  user:'',
  email:'',
  id:null
}


export const authCookieUser = createAsyncThunk("auth/cookie/user", async (data) => {
  try{
    const {payload} = await jwtVerify(data.cookieValue,data.key,{algorithms:['HS256']});
    return payload;
  }catch(error){
    return { payload: error.response, error: true };
  }
});

export const authCookieAdmin = createAsyncThunk("auth/cookie/admin", async (data) => {
  try{
    const {payload} = await jwtVerify(data.cookieValue,data.key,{algorithms:['HS256']});
    return payload;
  }catch(error){
    return { payload: error.response, error: true };
  }
});


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
    },
    extraReducers: (builder) => {
      builder
      .addCase(authCookieUser.fulfilled,(state,action)=>{
       state.id = action.payload.id
       state.user = 'user'
       state.email = action.payload.email
      })
      .addCase(authCookieAdmin.fulfilled,(state,action)=>{
       state.id = action.payload.id
       state.user = 'admin'
       state.email = action.payload.email
      })
    }
  });
  
  export const {setLogin,setEmail,setId} = cartSlice.actions;
  
  export default cartSlice.reducer;