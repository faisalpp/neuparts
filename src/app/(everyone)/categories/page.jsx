import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';
import AllCategories from '@/components/Category/AllCategories';
import React from 'react';

const Page = ({ searchParams }) => {
  return (
    <>
      <ProductSearchBar />
      <AllCategories searchParams={searchParams} />
    </>
  );
};

export default Page;
