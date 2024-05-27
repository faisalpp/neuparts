import React from 'react';
import MyCart from './MyCart';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const page = () => {
  return (
    <>
      <ProductSearchBar />
      <MyCart />
    </>
  );
};

export default page;
