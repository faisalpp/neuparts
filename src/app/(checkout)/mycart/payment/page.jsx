import React from 'react';
import Payment from './Payment';
import StripeProvider from './StripeProvider'

const Page = async () => {
  return (
   <StripeProvider>
    <Payment />
   </StripeProvider>
  )
};

export default Page;
