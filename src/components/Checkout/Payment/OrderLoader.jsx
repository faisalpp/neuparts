'use client'

import React from 'react'
import { BiLoaderAlt } from "react-icons/bi";
import { useSelector } from 'react-redux';

const OrderLoader = () => {
  
  const orderLoader = useSelector((state)=> state.order.loader)

  return (
    <>
    {orderLoader ? 
        <div className='fixed flex items-center justify-center w-full bg-white/90 z-10' style={{height:'100vh'}} >
         <div className='flex flex-col items-center gap-3' >
          <BiLoaderAlt className='animate-spin text-6xl text-b3' />
          <span className='text-black font-medium' >Your order&#39;s being processed</span>
         </div>
        </div>:null}
    </>
  )
}

export default OrderLoader