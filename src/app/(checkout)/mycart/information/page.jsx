import React from 'react';
import Information from './Information';
import StripeProvider from '../payment/StripeProvider'

const Page = () => {
  
  const private_key = process.env.NEXT_STRIPE_PRIVATE_KEY

  return (
  <StripeProvider>
   <Information PRIVATE_KEY={private_key} />
  </StripeProvider>
  );
};

export default Page;
