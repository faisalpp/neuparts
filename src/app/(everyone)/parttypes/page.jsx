import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';
import AllParts from '@/components/Parttype/AllParts';
import React from 'react';

const Page = ({ searchParams }) => {
  return (
    <>
      <ProductSearchBar />
      <AllParts searchParams={searchParams} />
    </>
  );
};

export default Page;
