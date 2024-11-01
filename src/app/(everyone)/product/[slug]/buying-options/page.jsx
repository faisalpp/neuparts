import React from 'react';
import AllBuyingOptions from './AllBuyingOptions';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const fetchProducts = async (slug) => {
  const res = await fetch(`${process.env.NEXT_BASE_API}/api/front/buying-options?slug=${slug}`);
  const data = await res.json();
  if (data.success) {
    return data;
  } else {
    return { product: '' };
  }
};

const Page = async ({ params }) => {
  const { slug } = params;

  const data = await fetchProducts(slug);
  
  return (
    <>
      <ProductSearchBar />
      <AllBuyingOptions data={data} />
    </>
  );
};

export default Page;
