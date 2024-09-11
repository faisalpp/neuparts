'use client';
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  cart:[],
}

// export const applyCoupon = createAsyncThunk("cart/coupon", async (data) => {
//     try{
//       const response = await ApplyCoupon(data); // Call your login API with the provided 
//       if(response.success){
//         return response; // Assuming your API response contains the user data
//       }else{
//         return response
//       }
//     }catch(error){
//       return { payload: error.response, error: true };
//     }
// });

  export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

    }
  });
  
  export const {} = cartSlice.actions;
  
  export default cartSlice.reducer;