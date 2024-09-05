'use client';
import React, { useState,useEffect } from 'react';
import CustomInput from '@/components/Reusable/CustomInput';
import CartCard from '@/components/Checkout/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { BiLoaderAlt } from "react-icons/bi";
import {applyCoupon,removeCoupon} from '@/app/GlobalRedux/slices/CartSlice'
import { toast } from 'react-toastify';
import { IoCloseCircle } from "react-icons/io5";
import { getCart,resetCart,setCartLoader } from '@/app/GlobalRedux/slices/CartSlice';

const Cart = () => {
 const router = useRouter()
 const dispatch = useDispatch()

 const cartLoader = useSelector((state)=>state.cart.cartLoader)
 const cartId = useSelector((state)=>state.cart.cartId)
 const cart = useSelector((state)=>state.cart.items)
 const subTotal = useSelector((state)=>state.cart.cartSubTotal)
 const shipping = useSelector((state)=>state.cart.shippingMethod)
 const Coupon = useSelector((state)=>state.cart.coupon)
 
 const Vat = useSelector((state)=>state.cart.cartVat)
 const grandTotal = useSelector((state)=>state.cart.cartGrandTotal)
 
 if(cart.length === 0 ){
   router.push('/mycart')
 }

 const [couponLoading,setCouponLoading] = useState(false)
 const [coupon,setCoupon] = useState('')

 const ApplyCoupon = async () => {
  if(coupon === ''){
    return toast.error('Invalid coupon code!')
  }
  setCouponLoading(true)
  const res = await dispatch(applyCoupon({code:coupon}))
  if(res.payload.success){
    toast.success('Coupon applied successfully!')
  }else{
    toast.error('Invalid coupon code!')
  }
  setCoupon('')
  setCouponLoading(false)
 }

 const RemoveCoupon = () => {
  dispatch(removeCoupon())
 }

 const GetCart = async () => {
   dispatch(setCartLoader())
   const res = await dispatch(getCart({cartId:cartId}))
   if(!res.payload.success){
    dispatch(resetCart())
   }
   dispatch(setCartLoader())
 }

 useEffect(()=>{
  GetCart()
 },[])

  return (
    <>
      <div className="bg-gradient h-full w-full max-w-full px-4 py-14 sm:px-11">
        <div className="relative mr-auto flex w-full max-w-[418px] flex-col gap-5 3xl:max-w-xl">
      {cartLoader ? <div className='absolute flex justify-center items-center rounded-md h-full bg-white/60 z-10 w-full' ><BiLoaderAlt className='animate-spin text-2xl' /></div>:null}
          <div className="flex w-full flex-col gap-6 rounded-lg bg-white px-4 py-4 sm:px-6"> 
            {cart.length > 0 ? cart.map((cat)=> cat.items.length > 0 ? cat.items.map((item,i)=> <CartCard Key={i} item={item} /> )  : null ) :null}     
          </div>
          <hr />
          <div className="flex w-full items-center gap-14px">
            <CustomInput state={coupon} setState={setCoupon}  colorStyle="border-b31 placeholder:text-b25" placeholder="Discount code" />
            {couponLoading? <button type="button" className="rounded-lg bg-b3 py-3 px-6 text-sm font-medium text-white"><BiLoaderAlt className='text-xl animate-spin' /></button>
            : <button onClick={ApplyCoupon} type="button" className="rounded-lg bg-b3 p-3 px-4 text-sm font-medium text-white">Apply</button>}
          </div>
          <hr />
          <div className="flex flex-col gap-3 [&>*]:text-sm">
            <div className="flex justify-between">
              <span className="text-b32">Subtotal</span>
              <span className="font-medium text-b16">${subTotal}</span>
            </div>
            {Coupon.status ? <div className="relative flex justify-between">
              <span className="text-b32">Coupon</span>
               <span className="bg-[gold] py-2 px-4 rounded-lg font-medium text-b16">{Coupon?.code} - <span className='text-red-500' >{Coupon?.type === 'Flat' ? '-$' : null}{Coupon?.value}{Coupon?.type === 'Percentage' ? '%' : null} Off</span></span>
               <IoCloseCircle onClick={RemoveCoupon} className='absolute -right-2 -top-2 text-lg text-red-500 cursor-pointer' />
            </div>:null}

            {shipping?.method === 'Shipping' ? <div className="flex justify-between">
              <span className="text-b32">Shipping</span>
              {shipping?.method === 'Shipping' ? 
               <span className="font-medium text-b16">{shipping?.rate != 'N/A' ? '$' : ''}{shipping?.rate}</span>
               :
                <span className="font-medium text-b25">*Calculated at next step</span>
              } 
            </div>:null}
            <div className="flex justify-between">
              <span className="text-b32">Taxes</span>
              <span className="font-medium text-b16">${Vat}</span>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <span className="font-medium text-b16">Total</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-b16">USD</span>
              <span className="text-2xl font-semibold tracking-032 text-b3">${grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
