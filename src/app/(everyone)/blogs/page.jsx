import React from 'react';
import Blogs from './Blogs';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const page = () => {
  return (
    <>
      <ProductSearchBar />
      <Blogs />;
    </>
  );
};

export default page;
