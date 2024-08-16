import AllProducts from '@/components/Products/AllProducts';
import React from 'react';

import queryString from 'query-string';

const getProducts = async (searchParams) => {
  const urlParams = {
    category: searchParams.category,
    type: searchParams.type,
    condition: searchParams.condition,
    'regular_price[gte]': searchParams.min,
    'regular_price[lte]': searchParams.max,
    is_sale: searchParams.sale,
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const res = await fetch(`${process.env.NEXT_BASE_API}/api/front/product?${searchQuery}`, requestOptions);
  const data = await res.json();
  return data;
};

const Page = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <AllProducts data={productsData} />;
};

export default Page;
