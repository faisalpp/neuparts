'use client';
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {AddToCart,RemoveFromCart,DeleteFromCart} from '../api/cart'

const initialState = {
  cart:{},
  items:[],  
  sCart:false,
  cartId:null,
  cartCount:0,
  cartSubTotal:0.00
}

// Create an async thunk for the Add To Cart
export const addToCart = createAsyncThunk("cart/add", async (data) => {
    try{
      const response = await AddToCart(data); // Call your login API with the provided data
      if(response.success){
        return response; // Assuming your API response contains the user data
      }else{
        return response
      }
    }catch(error){
      return { payload: error.response, error: true };
    }
  });

// Create an async thunk for the Remove from Cart
export const removeFromCart = createAsyncThunk("cart/remove", async (data) => {
    try{
      const response = await RemoveFromCart(data); // Call your login API with the provided data
      if(response.success){
        return response; // Assuming your API response contains the user data
      }else{
        return response
      }
    }catch(error){
      return { payload: error.response, error: true };
    }
  });

  // Create an async thunk for the Delete from Cart
export const deleteFromCart = createAsyncThunk("cart/delete", async (data) => {
    try{
      const response = await DeleteFromCart(data); // Call your login API with the provided data
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
      resetCart: (state, action) => {
        state.cart = {}
        state.cartCount = 0
      },
      toggleCart: (state, action) => {
        state.sCart = !state.sCart 
      },
      hideCart: (state, action) => {
        state.sCart = false 
      }
    },
    extraReducers: (builder) => {
      builder
       .addCase(addToCart.fulfilled, (state, action) => {
        const {cart,cartRender} = action.payload;
        if(cart){
         state.cart = cart
         state.cartId = cart._id
         state.sCart = cartRender ? true : false
         state.items = cart.categories
         state.cartCount = 0;
         if(cart.categories.length > 0){
          cart.categories.forEach((cat)=>{
           if(cat.items.length > 0){
            cat.items.forEach((it)=>{
             state.cartCount += it.quantity
             let price = it.is_sale ? it.sale_price : it.regular_price
             let subTotal = state.cartSubTotal + price
             state.cartSubTotal = parseFloat(subTotal.toFixed(2))
            })
           }
          })
         }
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const {cart} = action.payload;
        if(cart){
         state.cart = cart
         state.cartId = cart._id
         state.items = cart.categories
         if(cart.categories.length > 0){
          cart.categories.forEach((cat)=>{
           if(cat.items.length > 0){
            cat.items.forEach((it)=>{
             state.cartCount -= it.quantity
             let price = it.is_sale ? it.sale_price : it.regular_price
             let subTotal = state.cartSubTotal - price
             state.cartSubTotal = parseFloat(subTotal.toFixed(2))
            })
           }else{
            state.cartCount = 0;
            state.cartSubTotal = 0.00;
           }
          })
         }else{
          state.cartCount = 0;
          state.cartSubTotal = 0.00;
         }
        }
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        const {cart} = action.payload;
        if(cart){
         state.cart = cart
         state.cartId = cart._id
         state.items = cart.categories
         if(cart.categories.length > 0){
          cart.categories.forEach((cat)=>{
           if(cat.items.length > 0){
            cat.items.forEach((it)=>{
             state.cartCount -= it.quantity
             let price = it.is_sale ? it.sale_price : it.regular_price
             let subTotal = state.cartSubTotal - price
             state.cartSubTotal = parseFloat(subTotal.toFixed(2))
            })
           }else{
            state.cartCount = 0;
            state.cartSubTotal = 0;
           }
          })
         }else{
          state.cartCount = 0;
          state.cartSubTotal = 0;
         }
        }
      })
    },
    
  });
  
  export const { toggleCart,hideCart,resetCart } = cartSlice.actions;
  
  export default cartSlice.reducer;