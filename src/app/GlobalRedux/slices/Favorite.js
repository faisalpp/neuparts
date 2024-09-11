'use client';
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {AddToFavorite,RemoveFromFavorite} from '@/app/GlobalRedux/api/favorite'

const initialState = {
  items:[]
}

export const addToFavoriteUser = createAsyncThunk("favorite/add/user", async (data) => {
    try{
      const response = await AddToFavorite(data); // Call your login API with the provided 
      if(response.success){
        return response; // Assuming your API response contains the user data
      }else{
        return response
      }
    }catch(error){
      return { payload: error.response, error: true };
    }
});


export const removeFromFavoriteUser = createAsyncThunk("favorite/remove/user", async (data) => {
    try{
      const response = await RemoveFromFavorite(data); // Call your login API with the provided 
      if(response.success){
        return response; // Assuming your API response contains the user data
      }else{
        return response
      }
    }catch(error){
      return { payload: error.response, error: true };
    }
});

  export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
      .addCase(addToFavoriteUser.fulfilled,(state,action)=>{
        if(action.payload.success){
          state.items = [action.payload.product,...state.items] 
        }
      })
      .addCase(removeFromFavoriteUser.fulfilled,(state,action)=>{
        if(action.payload.success){
          const newFavs = state.items.filter((fav)=>fav._id != action.payload._id)
          state.items = newFavs 
        }
      })
    }
  });
  
  export const {addToFavorite,removeFavorite} = cartSlice.actions;
  
  export default cartSlice.reducer;