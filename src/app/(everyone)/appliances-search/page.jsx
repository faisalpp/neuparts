import React from 'react';
import Products from './AllProducts';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const page = () => {
  return (
    <>
      <ProductSearchBar />
      <Products />
    </>
  );
};

export default page;
