import React from 'react';
import AppliancesTipsDetail from './AppliancesTipsDetail';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const Page = async ({ params }) => {
  const { slug, postslug } = params;
  return (
    <>
      <ProductSearchBar />
      <AppliancesTipsDetail slug={slug} postslug={postslug} />
    </>
  );
};

export default Page;
