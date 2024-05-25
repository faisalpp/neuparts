'use client';
import React, { useState } from 'react';
import ApplianceGrid from '@/components/Appliances/ApplianceGrid';
import ProductFilter from '@/components/Product/FIlter';
import ModelCategories from '@/components/Appliances/ModelCategories';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { CiSearch } from 'react-icons/ci';
import { FaBars } from 'react-icons/fa';
import { BsGrid, BsChevronDown } from 'react-icons/bs';
import Pagination from '@/components/Pagination/Pagination2';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';

const AllProducts = () => {
  const [modelNo, setModelNo] = useState('');

  const [categoriesFilters, setCategoriesFilters] = useState([
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
      title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text',
      isSale: true,
      salePrice: 279.0,
      regPrice: 399.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text',
      isSale: true,
      salePrice: 279.0,
      regPrice: 399.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text',
      isSale: true,
      salePrice: 279.0,
      regPrice: 399.0,
      rating: 5,
    },
    {
      slug: 'product-test',
      image: '/popular-parts.webp',
      title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text',
      isSale: true,
      salePrice: 279.0,
      regPrice: 399.0,
      rating: 5,
    },
  ]);
  const [isGrid, setIsGrid] = useState(true);
  const [isFilter, setIsFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const [params, setParams] = useState({ isSale: true, salePrice: { $gte: 200, $lte: 8000 }, sort: 1 });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [filterLoading, setFilterLoading] = useState(false);

  const handleCloseFilter = () => {
    setIsFilter(false);
  };
  return (
    <>
      <div className="maincontainer">
        <div className="mt-10 flex items-center">
          <div className="flex items-center">
            <h5 className="text-xs text-b3">Home</h5>
            <RiArrowDropRightLine className="text-xl text-gray-500" />
            <h5 className="whitespace-nowrap text-xs text-b1">All Products</h5>
          </div>
          <div className="flex w-full items-center justify-end space-x-5">
            <BsGrid className="cursor-pointer" onClick={() => setIsGrid(true)} />
            <FaBars className="cursor-pointer" onClick={() => setIsGrid(false)} />
          </div>
          <button className="ml-5 flex items-center gap-2 text-sm font-semibold lg:hidden" onClick={() => setIsFilter(true)}>
            Filters <BsChevronDown className="stroke-1 text-xs" />
          </button>
        </div>
        {/* Bread Crumbs End */}

        {/* Product Model Details */}
        <div className="mt-8 grid grid-cols-1 items-center gap-10 rounded-lg border border-b3 bg-b3/10 p-8 md:grid-cols-[220px_auto]">
          <div className="grid place-items-center rounded-lg bg-white py-7">
            <Image src="/dish-water.webp" className="h-40 w-40 object-contain" alt="Dish Water" width={600} height={600} quality={100} />
          </div>
          <div>
            <div className="inline-flex rounded-lg border border-b2 px-4 py-3 font-semibold text-b2">Appliance Repair and Replacement parts for 234567</div>
            <h2 className="mt-4 text-2xl font-bold text-b1 lg:text-32px">Model Number: 234567</h2>
            <p className="mt-2.5 text-xl font-medium text-b1 2xl:text-2xl">Frigidaire 24&quot; Front Control Built-In Dishwasher, 62dba - Stainless Steel</p>
          </div>
        </div>
        {/* End Model Details */}

        {/* Part Number to search */}
        <div className="my-20 2xl:my-100px">
          <h2 className="mt-4 text-2xl font-bold text-b1 lg:text-[30px]">Model Number: 234567</h2>
          <div className="mt-8 flex max-w-[910px] items-center gap-2 maxsm:flex-col">
            <div className="relative w-full">
              <CiSearch className="absolute left-4 top-3.5 h-7 w-7 text-b1/30" />
              <input onChange={(e) => setModelNo(e.target.value)} type="text" value={modelNo} className="h-14 w-full rounded-lg border border-[#F6F7F9] bg-[#F6F7F9] pl-14 text-sm font-medium outline-none duration-200 placeholder:font-medium placeholder:text-b1/30 focus:border-b3" placeholder="Know your part number? Enter it here..." />
            </div>
            <button type="button" className="button-hover flex cursor-pointer items-center justify-center rounded-md px-6 py-5 text-white">
              <BiSearch />
              <span className="ml-1 text-xs font-medium">Search</span>
            </button>
          </div>
        </div>

        {/* Model Categoris */}
        <ModelCategories />

        <h2 className="mb-20 mt-10 text-2xl font-semibold text-b1">
          Compatible Parts for Model <span className="text-dark-red">2345367</span>
        </h2>
        {/* Product Filters */}

        <div className="flex justify-center gap-12 xl:gap-x-60px">
          {/* Filters Start */}
          <ProductFilter onsale={false} filterheader={false} loading={filterLoading} query={params} setQuery={setParams} saleFilter={saleFilter} regularFilter={regularFilter} categoriesFilters={categoriesFilters} ratingFilters={ratingFilters} onClose={handleCloseFilter} isFilter={isFilter} />
          {/* Filters End */}

          <div className={`grid ${isGrid ? 'grid-cols-1 gap-x-5 md:grid-cols-2 lg:gap-x-2 xl:grid-cols-3' : 'grid-cols-1'} mb-10 w-full gap-y-5`}>
            {loading ? (
              <div className="flex w-full items-center justify-center">
                <Image width={400} height={400} alt="Loader" quality={100} src="/loader2.gif" className="h-20 w-20" />
              </div>
            ) : products?.length > 0 ? (
              <>
                {products.map((product, index) => (
                  <ApplianceGrid key={index} product={product} isGrid={isGrid} />
                ))}
                <div className={isGrid ? 'md:col-span-2 xl:col-span-3' : ''}>
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
      </div>
    </>
  );
};

export default AllProducts;
