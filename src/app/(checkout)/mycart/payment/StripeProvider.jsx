'use client'

import React,{useEffect,useState} from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { BiLoaderAlt } from "react-icons/bi";

const StripeProvider = ({children}) => {

  const [StripePromise,setStripePromise] = useState(null)

  const LoadStripe = async () => {
      const Key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      const stripe = await loadStripe(Key)
      setStripePromise(stripe)
  }

  useEffect(()=>{
   LoadStripe()
  },[])

 if(StripePromise){
  return (
   <Elements stripe={StripePromise} >
    {children}
   </Elements>
  )
 }else{
    return (
      <div className='fixed flex items-center justify-center w-full bg-white/90 z-10' style={{height:'100vh'}} >
         <div className='flex flex-col items-center gap-3' >
          <BiLoaderAlt className='animate-spin text-6xl text-b3' />
         </div>
        </div>
    )
 }

}

export default StripeProvider