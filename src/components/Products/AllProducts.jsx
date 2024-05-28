'use client';
import React, { useState } from 'react';
import ProductCard3 from '@/components/ProductCard3';
import ProductFilter from '@/components/Product/FIlter';
import FilterSvg from '@/components/svgs/FilterSvg';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import { BsGrid, BsChevronDown } from 'react-icons/bs';
import Pagination from '@/components/Pagination/Pagination2';
import Image from 'next/image';

const AllProducts = () => {
  const [categoriesFilters, setCategoriesFilters] = useState([
    {
      title: 'Appliance Type',
      category: [
        {
          title: 'Refrigirators',
          slug: '',
          productCount: 84,
        },
        {
          title: 'Refrigirators',
          slug: '',
          productCount: 84,
        },
        {
          title: 'Refrigirators',
          slug: '',
          productCount: 84,
        },
        {
          title: 'Refrigirators',
          slug: '',
          productCount: 84,
        },
      ],
    },
    {
      title: 'Part Type',
      category: [
        {
          title: 'Belts',
          slug: '',
          productCount: 84,
        },
        {
          title: 'Doors',
          slug: '',
          productCount: 84,
        },
        {
          title: 'Racks',
          slug: '',
          productCount: 84,
        },
        {
          title: 'Rollers',
          slug: '',
          productCount: 84,
        },
      ],
    },
  ]);
  const [ratingFilters, setRatingFilters] = useState([
    {
      _id: 3,
      count: 4,
    },
    {
      _id: 4,
      count: 4,
    },
    {
      _id: 5,
      count: 4,
    },
  ]);
  const [saleFilter, setSaleFilter] = useState([{ count: 99 }]);
  const [regularFilter, setRegularFilter] = useState({});
  const [products, setProducts] = useState([
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
  ]);
  const [isGrid, setIsGrid] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({ isSale: true, salePrice: { $gte: 200, $lte: 8000 }, sort: 1 });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  const [filterLoading, setFilterLoading] = useState(false);

  const handleCloseFilter = () => {
    setIsFilter(false);
  };
  return (
    <>
      <div className="maincontainer mt-5 flex items-center py-5">
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-gray-500" />
          <h5 className="text-xs text-b1">Products</h5>
        </div>
        {/*  */}
        <div className="flex w-full items-center justify-end space-x-5 text-b1/65">
          <BsGrid className={`cursor-pointer ${isGrid && 'text-b3'}`} onClick={() => setIsGrid(true)} />
          <FaBars className={`cursor-pointer ${!isGrid && 'text-b3'}`} onClick={() => setIsGrid(false)} />
        </div>
      </div>
      <button type="button" className="maincontainer mb-5 flex items-center justify-center gap-2 rounded-md border border-b3 px-4 py-3 text-xs font-semibold text-b3 lg:hidden" onClick={() => setIsFilter(true)}>
        <FilterSvg />
        Filters
      </button>
      {/* Bread Crumbs End */}

      <div className="maincontainer flex justify-center gap-12 xl:gap-x-60px">
        {/* Filters Start */}
        <ProductFilter loading={filterLoading} query={params} setQuery={setParams} saleFilter={saleFilter} regularFilter={regularFilter} categoriesFilters={categoriesFilters} ratingFilters={ratingFilters} onClose={handleCloseFilter} isFilter={isFilter} />
        {/* Filters End */}

        <div className={`grid ${isGrid ? 'grid-cols-2 gap-x-2 xl:grid-cols-3' : 'grid-cols-1'} mb-10 w-full gap-y-5`}>
          {loading ? (
            <div className="flex w-full items-center justify-center">
              <Image width={400} height={400} alt="Loader" quality={100} src="/loader2.gif" className="h-20 w-20" />
            </div>
          ) : products?.length > 0 ? (
            <>
              {products.map((product, index) => (
                <ProductCard3 key={index} product={product} isGrid={isGrid} />
              ))}
              <div className={isGrid ? 'col-span-2 xl:col-span-3' : ''}>
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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
