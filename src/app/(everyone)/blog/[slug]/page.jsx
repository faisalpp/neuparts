import React from 'react';
import BlogArticle from './BlogArticle';

const Page = async ({ params }) => {
  const { slug } = params;
  return <BlogArticle slug={slug} />;
};

export default Page;
