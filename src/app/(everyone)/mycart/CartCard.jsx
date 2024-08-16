'use client';
import React, { useState } from 'react';
import FourStar from '@/components/svgs/FourStar';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';
import ToolTip from '@/components/ToolTip';
import { IoBagCheckOutline } from 'react-icons/io5';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import {deleteFromCart,addToCart,removeFromCart} from '@/app/GlobalRedux/slices/CartSlice'
import { BiLoaderAlt } from "react-icons/bi";

const CartCard = (props) => {
  const [delLoading,setDelLoading] = useState(false)
  const [cartLoading,setCartLoading] = useState(false)
  const dispatch = useDispatch()
  const cartId = useSelector((state)=>state.cart.cartId)
  const [quantity, setQuantity] = useState(props.item.quantity);

  const AddToCart = async () => {
    setCartLoading(true)
    const res = await dispatch(addToCart({productId:props.item.id,cartId:cartId,quantity:1,cartRender:false}))
    if(res.payload.success){
      setCartLoading(false)
      setQuantity(quantity+1)
    }else{
      setCartLoading(false)
    }
  };

  const RemoveToCart = async () => {
    setCartLoading(true)
    const res = await dispatch(removeFromCart({productId:props.item.id,cartId:cartId,quantity:1}))
    if(res.payload.success){
      setCartLoading(false)
      setQuantity(quantity-1)
    }else{
      setCartLoading(false)
    }
  };

  const DeleteFromCart = async () => {
    setDelLoading(true) 
    const res = await dispatch(deleteFromCart({catId:props.catId,productId:props.item._id,cartId:cartId}))
    if(res.payload.success){
     setDelLoading(false) 
    }
   }

  return (
    <div className="relative mt-3 flex w-full justify-start gap-3 p-5 shadow-[0px_4px_20px_rgba(9,67,89,0.08)] md:p-6 maxsm:flex-col">
      <Image width={400} height={400} quality={100} src={props.item.thumbnail} className="mx-auto h-auto w-40 object-contain p-4" alt={props.item.title} />
      <div className="flex w-full flex-col justify-center gap-4">
        <div className="flex w-full justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold md:text-base lg:text-xl">{props.item.title}</h3>
          <button type="button" onClick={()=>DeleteFromCart()} className="grid h-10 min-w-10 place-items-center rounded-full bg-b3/10 maxlg:absolute maxlg:right-2 maxlg:top-2">
            {delLoading ? <RiDeleteBin6Line className="animate-bounce text-base text-red-500" /> : <RiDeleteBin6Line className="text-base text-b3" />}
          </button>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 whitespace-nowrap maxmd:w-full maxmd:justify-between">
            <span className="flex items-center rounded-full bg-b13 px-3 py-2 text-xs font-semibold text-white">
              <IoBagCheckOutline className="mr-1 text-sm" />
              In Stock
            </span>
            <span className="text-xs font-medium text-b1/65">Only 2 left</span>
          </div>
          <div className="nowrap flex items-center gap-2 maxmd:w-full maxmd:justify-between">
            <label htmlFor="" className="text-xs font-semibold text-b25 md:text-sm">
              Quantity
            </label>
            <div className="relative w-24">
              <button type="button" onClick={() => RemoveToCart()} className={`absolute left-2 top-2 grid h-6 w-6 place-items-center rounded-full text-sm font-medium leading-3 text-white ${quantity === 1 ? 'pointer-events-none bg-b3/25 text-gray-400' : 'bg-b3'}`}>
                <MinusIcon className="h-4 w-4" />
              </button>
              {cartLoading ? <div className="absolute flex items-center justify-center bg-white/80 w-24 rounded-xl z-10 h-10" ><BiLoaderAlt className="text-xl animate-spin" /></div>:null}
              <input type="number" value={props.item.quantity} className="remove-arrow h-10 w-24 rounded-full bg-[#F3F3F3] px-8 text-center text-sm font-semibold text-black outline-none hover:border-b3/90" />
              <button type="button" onClick={() => AddToCart()} className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-b3 text-sm font-medium leading-3 text-white">
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-5 whitespace-nowrap sm:items-center maxmd:order-2 maxmd:w-full maxmd:justify-between">
            <div className="flex items-center gap-5">
              <h4 className="font-semibold text-b3 md:text-xl">${props.item.is_sale ? props.item.sale_price : props.item.regular_price}</h4>
              {props.item.is_sale ? <strike className="text-sm md:text-lg">${props.item.regular_price}</strike> : null}
            </div>
            {props.item.is_sale ? <span className="flex w-fit rounded-2xl bg-b4 px-2 py-1 text-10px font-semibold text-black sm:text-xs md:px-3 md:py-2 md:text-sm">-{(((props.item.regular_price - props.item.sale_price) / props.item.regular_price) * 100).toFixed(1)}%</span> : null}
          </div>
          <div className="flex items-center gap-2 maxmd:w-full maxmd:justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-b25">Condition</span>
              <span>
                <ToolTip dimension="w-4 h-4" color="text-b25" />
              </span>
            </div>
            <div className="flex items-center gap-2">
              {props.item.condition == 'new' && (
                <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                  <FourStar />
                  New
                </div>
              )}
              {props.item.condition == 'certified' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>}
              {props.item.condition == 'used' && <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-c-orange px-3 py-1 text-xs font-semibold text-white">Used • Grade D</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
