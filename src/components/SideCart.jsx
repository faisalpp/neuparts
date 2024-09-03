'use client';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowRight, AiOutlineClose } from 'react-icons/ai';
import {BsCart3} from 'react-icons/bs'
import SideCartCard from './Cart/SideCartCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart,getCart,setCartLoader,resetCart } from '@/app/GlobalRedux/slices/CartSlice';

const SideCart = ({ cartMenuRef }) => {
  const route = useRouter();
  const dispatch = useDispatch()
  const sCart = useSelector((state)=>state.cart.sCart)
  const CartItems = useSelector((state)=>state.cart.items)
  const cartId = useSelector((state)=>state.cart.cartId)
  const cartCount = useSelector((state)=>state.cart.cartCount)
  const subTotal = useSelector((state)=>state.cart.cartSubTotal)

  const [loading, setLoading] = useState(false);

  const GetCart = async () => {
   if(sCart){
    dispatch(setCartLoader())
    const res = await dispatch(getCart({cartId:cartId}))
    if(!res.payload.success){
     dispatch(resetCart())
    }
    dispatch(setCartLoader())
   }
  }

  useEffect(()=>{
   GetCart()
  },[sCart])

 
  return (
    <div className={` ${sCart ? 'right-0 top-0' : '-right-[200%]'} fixed z-[999] h-screen  w-full bg-black/60 duration-500 maxcosm:pl-12`}>
      <div ref={cartMenuRef} className={` ${sCart ? '' : 'hidden'} relative float-right mx-auto h-full w-full bg-white lg:!max-w-[480px] xs:max-w-[310px]`}>
        <button
          onClick={() => dispatch(toggleCart())}
          className="xy-center absolute -left-[2.7rem] top-0 z-40 bg-b3 duration-200 lg:!left-auto lg:right-6 lg:top-5 lg:bg-white xs:-left-12 maxlg:h-10 maxlg:w-10 maxlg:rounded-full maxlg:text-white maxlg:hover:bg-b3  maxlg:hover:text-white"
        >
          <AiOutlineClose className="text-xl" />
        </button>
        <div className="flex h-full w-full flex-col overflow-y-auto">
          <div className="sticky top-0 flex items-center justify-between bg-white px-4 py-5 lg:px-6 maxlg:rounded-t-2xl">
            <div className="flex items-center gap-x-3">
              <h4 className="font-bold">My Cart</h4>
              <span className="xy-center h-5 w-5 rounded-full bg-b3 text-xs text-white">{cartCount}</span>
            </div>
          </div>
          {loading ? (
            <div className="xy-center h-full w-full">
              <Image width={200} height={200} quality={100} alt="Loading" src="/loader-bg.gif" className="ml-2 h-10 w-10" />
            </div>
          ) : (
            <>
            {CartItems.length > 0 ? CartItems.map((cat,index)=>(
              <div key={index} style={{ height: 'calc(100vh - 200px)' }} className="flex flex-col overflow-y-auto px-4 lg:px-5">
                <div className="flex items-center gap-2 rounded-t-md border border-b1/10 bg-b3/10 p-3 lg:p-4">
                  <div className="min-w-[74px] rounded bg-white px-1 py-1 lg:w-[84px] lg:py-2">
                    <Image width={200} height={200} quality={100} className="h-auto w-20" src={cat.cat_image} alt="calendar_month" />
                  </div>
                  <h3 className="line-clamp-3 text-xs font-semibold lg:text-sm">{cat.cat_title}</h3>
                </div>
                <div className="mb-3 flex w-full flex-col gap-6 space-y-2 border border-b1/10 px-3 lg:px-5">{cat.items.map((item, i) => <SideCartCard indx={`${i}-item`} key={`${i}-item`} catId={cat.cat_id} cartId={cartId} item={item} />)}</div>
              </div>
               )):(
            <div className='flex flex-col px-2 space-y-5 w-full justify-center items-center h-full' >
              <Image width={100} height={100} quality={100} src="/bag.webp" />
              <h1 className='font-extrabold' >Your Cart is Empty</h1>
              <h2 className='text-center' >Lorem Ipsum Doller Sit Amet, Consecture Audipicsing Elit</h2>
              <button type='button' className='xy-center rounded-lg bg-b3 py-3 text-white font-medium w-1/2 text-sm'><BsCart3 className='mr-2' /> Start Shopping</button>
            </div>
               )}

              {CartItems.length > 0 ? 
              <div className="relative flex flex-col justify-end gap-4 border-t border-gray-300 p-4 lg:gap-6 lg:p-6 maxlg:pb-0">
                <div className="flex justify-between">
                  <span className="text-sm maxlg:font-medium">Order Total</span>
                  <span className="font-bold">${subTotal}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleCart())
                    route.push('/mycart');
                  }}
                  type="button" className={`rounded-lg text-xs font-medium text-white bg-b3 flex justify-center gap-2 px-4 py-3`}>
                  Proceed to Checkout
                  <AiOutlineArrowRight className="text-base" />
                </button>
              </div>
              :null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideCart;
