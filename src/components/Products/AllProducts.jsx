'use client';

import React, { useEffect, useState } from 'react';
import ProductCard3 from '@/components/ProductCard3';
import ProductFilter from '@/components/Product/FIlter';
import FilterSvg from '@/components/svgs/FilterSvg';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import { BsGrid } from 'react-icons/bs';
import Pagination from '@/components/Pagination/Pagination2';
import Image from 'next/image';
import queryString from 'query-string';

const AllProducts = ({ searchParams }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isGrid, setIsGrid] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    const urlParams = {
      category: searchParams.category,
      parttype: searchParams.type,
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

    const res = await fetch(`/api/front/product?${searchQuery}`, requestOptions);
    const data = await res.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  function calculateTotalPages(totalProducts, productsPerPage) {
    return Math.ceil(totalProducts / productsPerPage);
  }

  return (
    <>
      <div className="maincontainer mt-5 flex items-center py-5">
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-gray-500" />
          <h5 className="text-xs text-b1">Products</h5>
        </div>
        <div className="flex w-full items-center justify-end space-x-5 text-b1/65">
          <BsGrid className={`cursor-pointer ${isGrid && 'text-b3'}`} onClick={() => setIsGrid(true)} />
          <FaBars className={`cursor-pointer ${!isGrid && 'text-b3'}`} onClick={() => setIsGrid(false)} />
        </div>
      </div>
      <button type="button" className="maincontainer mb-5 flex items-center justify-center gap-2 rounded-md border border-b3 px-4 py-3 text-xs font-semibold text-b3 lg:hidden" onClick={() => setIsFilter(true)}>
        <FilterSvg />
        Filters
      </button>

      <div className="maincontainer flex justify-center gap-12 xl:gap-x-60px">
        <ProductFilter loading={loading} query={searchParams} onClose={() => setIsFilter(false)} isFilter={isFilter} />

        <div className={`grid ${isGrid ? 'grid-cols-2 gap-x-2 xl:grid-cols-3' : 'grid-cols-1'} mb-10 w-full items-start gap-y-5`}>
          {loading ? (
            <div className="mt-5 flex w-full items-center justify-center md:mt-10">
              <Image width={80} height={80} alt="Loader" quality={100} src="/loader2.gif" className="h-20 w-20" unoptimized />
            </div>
          ) : data?.products?.length > 0 ? (
            <>
              {data.products.map((product, index) => (
                <ProductCard3 key={index} product={product} isGrid={isGrid} />
              ))}
              <div className={isGrid ? 'col-span-2 xl:col-span-3' : ''}>
                <Pagination totalPages={calculateTotalPages(data.productCount, 10)} />
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-center">
              <Image width={400} height={400} quality={100} alt="Not Found" src="/not-found.webp" className="h-40 w-40" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
