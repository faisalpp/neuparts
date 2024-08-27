'use client'

import React,{useEffect,useState} from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

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
    return <h2>Loading...</h2>
 }

}

export default StripeProvider