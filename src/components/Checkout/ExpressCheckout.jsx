import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { GetStripePublishKey,createPaymentIntent } from '../../api/order';
import Toast from '../../utils/Toast'

const ExpressCheckout = () => {
  const [paymentReq, setPaymentReq] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const element = stripe.elements({
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
  })
  const expressCheckoutElement = element.create('expressCheckout')

  return (
    <fieldset className='border border-b31 rounded-md pb-5 px-5 pt-2'>
      <legend className='mx-auto text-b16 font-medium text-sm px-3'>Express checkout</legend>
      <div className='grid grid-cols-3 gap-2'>
        <button className='rounded text-white flex justify-center p-3 bg-[#5A31F4]'>
          <img src='/payment/shoppay.webp' alt='shoppay' className='h-[23px] object-contain' />
        </button>
        <button className='rounded text-white flex justify-center p-3 bg-[#113984]'>
          <img src='/payment/paypal.webp' alt='shoppay' className='h-[23px] object-contain' />
        </button>
        <expressCheckoutElement/>
        {/* {paymentReq && <PaymentRequestButtonElement options={{ paymentRequest: paymentReq }} />} */}
      </div>
    </fieldset>
  );
};

export default ExpressCheckout;
