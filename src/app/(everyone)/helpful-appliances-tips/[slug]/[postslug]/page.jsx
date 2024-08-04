import React from 'react';
import AppliancesTipsDetail from './AppliancesTipsDetail';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const Page = async ({ params }) => {
  const { slug } = params;
  return (
    <>
      <ProductSearchBar />
      <AppliancesTipsDetail slug={slug} />
    </>
  );
};

export default Page;
