'use client';
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {AddToCart,RemoveFromCart,DeleteFromCart,GetCart,DeleteCart} from '../api/cart'
import {ApplyCoupon} from '../api/coupon'

const initialState = {
  cart:{},
  items:[],  
  sCart:false,
  cartId:null,
  shippingMethod:{method:'Pickup',rate:'Free'},
  coupon:{status:false},
  cartCount:0,
  cartSubTotal:0.00,
  cartVat:0.00,
  cartGrandTotal:0.00,
  roundOff:0.00,
  cartLoader:false
}


function adjustAmount(amount) {
  // Get the decimal part by subtracting the integer part
  const decimalPart = amount - Math.floor(amount);
  let adjustAmount = 0.00;
  // Check if the decimal part is less than 0.5
  if (decimalPart < 0.5) {
      // Calculate the difference needed to reach 0.5
      adjustAmount = 0.5 - decimalPart;
      const Amount = amount + adjustAmount
      return [Amount,adjustAmount];
  }
  
  // If already 0.5 or more, return the original amount
  return [amount,adjustAmount];
}

export const applyCoupon = createAsyncThunk("cart/coupon", async (data) => {
    try{
      const response = await ApplyCoupon(data); // Call your login API with the provided 
      if(response.success){
        return response; // Assuming your API response contains the user data
      }else{
        return response
      }
    }catch(error){
      return { payload: error.response, error: true };
    }
});


export const getCart = createAsyncThunk("cart/get", async (data) => {
    try{
      const response = await GetCart(data); // Call your login API with the provided 
      if(response.success){
        return response; // Assuming your API response contains the user data
      }else{
        return response
      }
    }catch(error){
      return { payload: error.response, error: true };
    }
});

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


  // Create an async thunk for the Delete from Cart
export const deleteCart = createAsyncThunk("cart/delete-single", async (data) => {
    try{
      const response = await DeleteCart(data); // Call your login API with the provided data
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
        state.cart = {},
        state.items = [],  
        state.cartId = null,
        state.cartCount = 0,
        state.cartSubTotal = 0.00,
        state.cartVat = 0.00,
        state.cartGrandTotal = 0.00,
        state.roundOff = 0.00
        state.coupon = {status:false},
        state.shippingMethod = {method:'Pickup',rate:'Free'}
      },
      toggleCart: (state, action) => {
        state.sCart = !state.sCart 
      },
      hideCart: (state, action) => {
        state.sCart = false 
      },
      setCartLoader: (state,action) => {
        state.cartLoader = action.payload
      },
      setShippingStatus: (state,action) => {
        state.shippingMethod = {status:false}
      },
      calcShipping: (state,action) => {
       const {method,rate} = action.payload
       state.shippingMethod = action.payload
        state.cartCount = 0;
        state.cartSubTotal= 0;
        if(state.items.length > 0){
         state.items.forEach((cat)=>{
          if(cat.items.length > 0){
           cat.items.forEach((it)=>{
            let tmpQuantity = 0;
            tmpQuantity += it.quantity 
            state.cartCount = tmpQuantity
            let price = it.is_sale ? it.sale_price : it.regular_price
            let subTotal = state.cartSubTotal + (price * tmpQuantity)
            state.cartSubTotal = subTotal
            if(method === 'Shipping' && rate != 'N/A'){
             subTotal += parseFloat(rate)
            }
            const Vat = (subTotal * (10/100)).toFixed(2)
            state.cartVat = Vat
            const GrandTotal = parseFloat(subTotal) + parseFloat(state.cartVat)
            const MakeIt5 = adjustAmount(GrandTotal)
            state.cartGrandTotal = MakeIt5[0].toFixed(2)
            state.roundOff = MakeIt5[1].toFixed(2)
           })
          }
         })
        }
      },
      removeCoupon:(state,action)=>{
        state.cartCount = 0;
        state.cartSubTotal= 0;
        if(state.items.length > 0){
         state.items.forEach((cat)=>{
          if(cat.items.length > 0){
           cat.items.forEach((it)=>{
            let tmpQuantity = 0;
            tmpQuantity += it.quantity 
            state.cartCount = tmpQuantity
            let price = it.is_sale ? it.sale_price : it.regular_price
            let subTotal = state.cartSubTotal + (price * tmpQuantity)
            state.cartSubTotal = subTotal
            if(state.shippingMethod.method === 'Shipping' && state.shippingMethod.rate != 'N/A'){
             subTotal += parseFloat(state.shippingMethod.rate)
            }
            const Vat = (subTotal * (10/100)).toFixed(2)
            state.cartVat = Vat
            const GrandTotal = parseFloat(subTotal) + parseFloat(state.cartVat)
            const MakeIt5 = adjustAmount(GrandTotal)
            state.cartGrandTotal = MakeIt5[0].toFixed(2)
            state.roundOff = MakeIt5[1].toFixed(2)
           })
          }
         })
        }
        state.coupon = {status:false}
      }
    },
    extraReducers: (builder) => {
      builder
       .addCase(applyCoupon.fulfilled,(state,action)=>{
        const data = action.payload
        if(data.success){
         state.coupon = {...data.coupon,status:true}
         state.cartCount = 0;
         state.cartSubTotal= 0;
         if(state.items.length > 0){
          state.items.forEach((cat)=>{
           if(cat.items.length > 0){
            cat.items.forEach((it)=>{
             let tmpQuantity = 0;
             tmpQuantity += it.quantity 
             state.cartCount = tmpQuantity
             let price = it.is_sale ? it.sale_price : it.regular_price
             let subTotal = state.cartSubTotal + (price * tmpQuantity)
             // Coupon Calculation
             if(data.coupon.type === 'Flat'){
              subTotal -= parseFloat(data.coupon.value) 
             }
             if(data.coupon.type === 'Percentage'){
               const calc = (subTotal * (parseFloat(data.coupon.value)/100))
               subTotal -= calc
             }
             // Coupon Calculation
             state.cartSubTotal = subTotal.toFixed(2)
             if(state.shippingMethod.method === 'Shipping' && state.shippingMethod.rate != 'N/A'){
              subTotal += parseFloat(state.shippingMethod.rate)
             }
             const Vat = (subTotal * (10/100)).toFixed(2)
             state.cartVat = Vat
             const GrandTotal = parseFloat(subTotal) + parseFloat(state.cartVat)
             const MakeIt5 = adjustAmount(GrandTotal)
             state.cartGrandTotal = MakeIt5[0].toFixed(2)
             state.roundOff = MakeIt5[1].toFixed(2)
            })
           }
          })
         }
        }
       })
       .addCase(getCart.fulfilled,(state,action)=>{
        const data = action.payload;
        if(data.success){
          state.cart = data.cart
          state.cartId = data.cart._id
          state.items = data.cart.categories
          state.cartCount = 0;
          state.cartSubTotal = 0;
          if(data.cart.categories.length > 0){
           data.cart.categories.forEach((cat)=>{
            if(cat.items.length > 0){
             cat.items.forEach((it)=>{
              let tmpQuantity = 0;
              tmpQuantity += it.quantity 
              state.cartCount = tmpQuantity
              let price = it.is_sale ? it.sale_price : it.regular_price
              let subTotal = state.cartSubTotal + (price * tmpQuantity)
              // Coupon Calculation
             if(state.coupon?.type === 'Flat'){
              subTotal -= parseFloat(data.value) 
             }
             if(state.coupon?.type === 'Percentage'){
               const calc = (subTotal * (parseFloat(state.coupon?.value)/100))
               subTotal -= calc
             }
             // Coupon Calculation
              state.cartSubTotal = parseFloat(subTotal.toFixed(2))
              if(state.shippingMethod.method === 'Shipping' && state.shippingMethod.rate != 'N/A'){
                subTotal += parseFloat(state.shippingMethod.rate)
              }
              const Vat = (subTotal * (10/100)).toFixed(2)
              state.cartVat = Vat
              const GrandTotal = parseFloat(subTotal) + parseFloat(state.cartVat)
              const MakeIt5 = adjustAmount(GrandTotal)
              state.cartGrandTotal = MakeIt5[0].toFixed(2)
              state.roundOff = MakeIt5[1].toFixed(2)
             })
            }
           })
          }
        } 
       }) 
       .addCase(addToCart.fulfilled, (state, action) => {
        const {cart,cartRender} = action.payload;
        if(cart){
         state.cart = cart
         state.cartId = cart._id
         state.sCart = cartRender ? true : false
         state.items = cart.categories
         state.cartCount = 0;
         state.cartSubTotal= 0;
         if(cart.categories.length > 0){
          cart.categories.forEach((cat)=>{
           if(cat.items.length > 0){
            cat.items.forEach((it)=>{
             let tmpQuantity = 0;
             tmpQuantity += it.quantity 
             state.cartCount = tmpQuantity
             let price = it.is_sale ? it.sale_price : it.regular_price
             let subTotal = state.cartSubTotal + (price * tmpQuantity)
             // Coupon Calculation
             if(state.coupon?.type === 'Flat'){
               subTotal -= parseFloat(data.value) 
              }
              if(state.coupon?.type === 'Percentage'){
                const calc = (subTotal * (parseFloat(state.coupon?.value)/100))
                subTotal -= calc
              }
              // Coupon Calculation
             state.cartSubTotal = parseFloat(subTotal.toFixed(2))
             if(state.shippingMethod?.method === 'Shipping' && state.shippingMethod?.rate != 'N/A'){
              subTotal += parseFloat(state.shippingMethod.rate)
             }
             const Vat = (subTotal * (10/100)).toFixed(2)
             state.cartVat = Vat
             const GrandTotal = parseFloat(subTotal) + parseFloat(state.cartVat)
             const MakeIt5 = adjustAmount(GrandTotal)
             state.cartGrandTotal = MakeIt5[0].toFixed(2)
             state.roundOff = MakeIt5[1].toFixed(2)
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
             state.cartCount -= 1
             let price = it.is_sale ? it.sale_price : it.regular_price
             let subTotal = state.cartSubTotal - price
             // Coupon Calculation
             if(state.coupon?.type === 'Flat'){
              subTotal -= parseFloat(data.value) 
             }
             if(state.coupon?.type === 'Percentage'){
               const calc = (subTotal * (parseFloat(state.coupon?.value)/100))
               subTotal -= calc
             }
             // Coupon Calculation
             state.cartSubTotal = parseFloat(subTotal.toFixed(2))
             if(state.shippingMethod.method === 'Shipping' && state.shippingMethod.rate != 'N/A'){
              subTotal += parseFloat(state.shippingMethod.rate)
             }
             const Vat = (subTotal * (10/100)).toFixed(2)
             state.cartVat = Vat
             const GrandTotal = parseFloat(subTotal) + parseFloat(state.cartVat)
             const MakeIt5 = adjustAmount(GrandTotal)
             state.cartGrandTotal = MakeIt5[0].toFixed(2)
             state.roundOff = MakeIt5[1].toFixed(2)
            })
           }
          })
         }else{
          state.cartCount = 0;
          state.cartSubTotal = 0.00;
          state.coupon = {status:false}
          state.cartVat = 0.00
          state.cartGrandTotal = 0.00
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
             // Coupon Calculation
             if(state.coupon?.type === 'Flat'){
              subTotal -= parseFloat(data.value) 
             }
             if(state.coupon?.type === 'Percentage'){
               const calc = (subTotal * (parseFloat(state.coupon?.value)/100))
               subTotal -= calc
             }
             // Coupon Calculation
             state.cartSubTotal = parseFloat(subTotal.toFixed(2))
             if(state.shippingMethod.method === 'Shipping' && state.shippingMethod.rate != 'N/A'){
              subTotal += parseFloat(state.shippingMethod.rate)
             }
             const Vat = (subTotal * (10/100)).toFixed(2)
             state.cartVat = Vat
             const GrandTotal = parseFloat(subTotal) + parseFloat(state.cartVat)
             const MakeIt5 = adjustAmount(GrandTotal)
             state.cartGrandTotal = MakeIt5[0].toFixed(2)
             state.roundOff = MakeIt5[1].toFixed(2)
            })
           }
          })
         }else{
          state.cartCount = 0;
          state.cartSubTotal = 0.00;
          state.coupon = {status:false}
          state.cartVat = 0.00
          state.cartGrandTotal = 0.00
         }
        }
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cart = {},
        state.items = [],  
        state.cartId = null,
        state.cartCount = 0,
        state.cartSubTotal = 0.00,
        state.cartVat = 0.00,
        state.cartGrandTotal = 0.00,
        state.roundOff = 0.00
        state.coupon = {status:false},
        state.shippingMethod = {method:'Pickup',rate:'Free'}
      })
    },
    

    
  });
  
  export const { toggleCart,hideCart,resetCart,calcShipping,setShippingStatus,setCartLoader,removeCoupon } = cartSlice.actions;
  
  export default cartSlice.reducer;