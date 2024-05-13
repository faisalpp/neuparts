import React from 'react';
import Product from './Product';

const Page = async ({ params }) => {
  const { slug } = params;
  return <Product slug={slug} />;
};

export default Page;
