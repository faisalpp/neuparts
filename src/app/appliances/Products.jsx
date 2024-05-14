'use client';
import React, { useState, useEffect } from 'react';
import ProductCard3 from '@/components/ProductCard3';
import ProductFilter from '@/components/Product/FIlter';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import { BsGrid, BsChevronDown } from 'react-icons/bs';
import Pagination from '@/components/Pagination/Pagination2';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Products = () => {
  const [categoriesFilters, setCategoriesFilters] = useState([
    {
      title: 'hello',
      slug: '',
      productCount: 4,
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
  const [saleFilter, setSaleFilter] = useState({});
  const [regularFilter, setRegularFilter] = useState({});
  const [products, setProducts] = useState([
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
    },
  ]);
  const [isGrid, setIsGrid] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [params, setParams] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [limit, setLimit] = useState(6);

  const GetQueryParams = () => {
    setInitLoad(true);
    // setLoading(true);
    // Create a URLSearchParams object from the query string
    const queryParamsObject = router.query;
    // Create an object to store the query parameters
    // const queryParamsObject = {};

    // // Iterate through the query parameters and store them in the object
    // for (const [key, value] of queryParams.entries()) {
    //   queryParamsObject[key] = value;
    // }
    // console.log(queryParamsObject)
    setParams({ isSale: true, salePrice: { $gte: 200, $lte: 8000 }, sort: 1, ...queryParamsObject });
  };

  const [filterLoading, setFilterLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(true);

  const getAppliancesBySection = async () => {
    setProducts([]);
  };

  useEffect(() => {
    if (!initLoad) {
      setTimeout(() => {
        getAppliancesBySection();
      }, 50);
    }
  }, [params, page]);

  useEffect(() => {
    GetQueryParams();
    GetAppliancesFilter();
  }, [router.query]);

  const GetAppliancesFilter = async () => {
    setInitLoad(false);
    setFilterLoading(false);
  };

  const handleCloseFilter = () => {
    setIsFilter(false);
  };

  return (
    <>
      {/* Bread Crumbs Start */}
      <div className="maincontainer mt-5 flex items-center py-5">
        <div className="flex items-center">
          <h5 className="text-xs text-blue-400">Home</h5>
          <RiArrowDropRightLine className="text-xl text-gray-500" />
          <h5 className="text-xs text-gray-400">Products</h5>
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

      <div className="maincontainer flex justify-center gap-12 xl:gap-x-60px">
        {/* Filters Start */}
        <ProductFilter loading={filterLoading} query={params} setQuery={setParams} saleFilter={saleFilter} regularFilter={regularFilter} categoriesFilters={categoriesFilters} ratingFilters={ratingFilters} onClose={handleCloseFilter} isFilter={isFilter} />
        {/* Filters End */}

        <div className={`grid ${isGrid ? 'grid-cols-1 lg:grid-cols-3 lg:gap-x-2' : 'grid-cols-1'} mb-10 w-full gap-y-5`}>
          {loading ? (
            <div className="flex w-full items-center justify-center">
              <Image width={400} height={400} quality={100} alt="Loading" src="/loader2.gif" className="h-20 w-20" />
            </div>
          ) : products?.length > 0 ? (
            <>
              {products.map((product, index) => (
                <ProductCard3 key={index} product={product} isGrid={isGrid} />
              ))}
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
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

export default Products;
