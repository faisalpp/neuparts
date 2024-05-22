import React from 'react';
import Products from '@/components/Products/AllProducts';
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
