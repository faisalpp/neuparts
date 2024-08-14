import AllProducts from '@/components/Products/AllProducts';
import React from 'react';

import queryString from 'query-string';

const getProducts = async (searchParams) => {
  const urlParams = {
    category: searchParams.category,
    type: searchParams.type,
  };

  const searchQuery = queryString.stringify(urlParams);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch(`http://localhost:3000/api/front/product?${searchQuery}`, requestOptions);
  const data = await res.json();
  return data;
};

const Page = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <AllProducts data={productsData} />;
};

export default Page;
