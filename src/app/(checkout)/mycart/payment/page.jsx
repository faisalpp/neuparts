import React from 'react';
import Payment from './Payment';
import StripeProvider from './StripeProvider'

const Page = async () => {

  const private_key = process.env.NEXT_STRIPE_PRIVATE_KEY

  return (
   <StripeProvider>
    <Payment PRIVATE_KEY={private_key} />
   </StripeProvider>
  )
};

export default Page;
