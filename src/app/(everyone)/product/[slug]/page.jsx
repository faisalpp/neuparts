import React from 'react';
import Product from './Product';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const Page = async ({ params }) => {
  const { slug } = params;

  return (
    <>
      <ProductSearchBar />
      <Product slug={slug} />
    </>
  );
};

export default Page;
