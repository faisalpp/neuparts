import AllProducts from '@/components/Products/AllProducts';
import React from 'react';

const Page = ({ searchParams }) => {
  return <AllProducts searchParams={searchParams} />;
};

export default Page;
