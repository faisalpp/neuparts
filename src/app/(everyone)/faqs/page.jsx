import React from 'react';
import GeneralFaqs from './GeneralFaqs';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const page = () => {
  return (
    <>
      <ProductSearchBar />
      <GeneralFaqs />
    </>
  );
};

export default page;
