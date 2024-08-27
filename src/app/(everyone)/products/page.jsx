import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';
import AllProducts from '@/components/Products/AllProducts';
import React from 'react';

const Page = ({ searchParams }) => {
  return (
    <>
      <ProductSearchBar />
      <AllProducts searchParams={searchParams} />
    </>
  );
};

export default Page;
