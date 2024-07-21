import React from 'react';
import HelpCardPage from './HelpCardPage';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const page = ({params}) => {
  return (
    <>
      <ProductSearchBar />
      <HelpCardPage params={params.params} />
    </>
  );
};

export default page;
