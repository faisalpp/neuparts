import React from 'react';
import BlogArticle from './BlogArticle';
import ProductSearchBar from '@/components/DeskComp/ProductSearchBar';

const Page = async ({ params }) => {
  const { slug } = params;
  return (
    <>
      <ProductSearchBar />
      <BlogArticle slug={slug} />;
    </>
  );
};

export default Page;
