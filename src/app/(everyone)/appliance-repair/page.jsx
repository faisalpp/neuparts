import React from 'react';
import ApplianceRepair from './ApplianceRepair';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const page = () => {
  return (
    <>
      <ProductSearchBar />
      <ApplianceRepair />;
    </>
  );
};

export default page;
