'use client';
import Tag from '@/components/svgs/Tag';
import { AiOutlineHeart } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import ProductFilter from '@/components/Product/FIlter';
import FilterSvg from '@/components/svgs/FilterSvg';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { FaBars } from 'react-icons/fa';
import { BsGrid } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import Pagination from '@/components/Pagination/Pagination2';
import Image from 'next/image';
import queryString from 'query-string';
import ModelCategories from '../Appliances/ModelCategories';
import { BiSearch } from 'react-icons/bi';
import ApplianceGrid from '../Appliances/ApplianceGrid';
import { StoreData } from '@/provider';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AllProducts = ({ searchParams }) => {
  const { searchLoading, result, modelNo,defaultMinPrice, defaultMaxPrice } = useContext(StoreData);

  const router  = useRouter() ;

  const [searchModelNo, setSearchModelNo] = useState(searchParams?.partno ? searchParams.partno : '');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isGrid, setIsGrid] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  const getProducts = async () => {
    // if (onlyCategoryPresent) {
    //   setModelNo('');
    //   setPartNo('');
    //   setResult('');
    // }

    setLoading(true);
    const urlParams = {
      category: searchParams.category,
      parttype: searchParams.type,
      condition: searchParams.condition,
      'regular_price[gte]': searchParams.min || defaultMinPrice,
      'regular_price[lte]': searchParams.max || defaultMaxPrice,
      is_sale: searchParams.sale,
      page: searchParams.page,
      model_no: searchParams.modelno,
      part_number: searchParams.partno,
      manufacturer: searchParams.manufacturer,
    };

    const searchQuery = queryString.stringify(urlParams);

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
//
    const res = await fetch(`/api?${searchQuery}`, requestOptions);
    const allData = await res.json();
    console.log(allData)
    setData(allData);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  function calculateTotalPages(totalProducts, productsPerPage) {
    return Math.ceil(totalProducts / productsPerPage);
  }

  const [thumbnail, setThumbnail] = useState(result.modelCategory?.thumbnail ? result.modelCategory.thumbnail : '/no-image.webp');


  const ProductsSkelton = () => {
    return (
      <div className="flex w-full items-center space-x-2 rounded-2xl border-[1px] border-gray-200 px-2 py-5 lg:space-x-10 lg:px-8 lg:py-10">
       <div className="h-auto w-[124px] object-contain md:h-60 md:w-60 md:p-4 maxxs:w-[80px] bg-gray-200 rounded-md animate-pulse"></div>

      <div className="flex w-[60%] flex-col gap-3 px-1 lg:px-5 3xl:w-[55%]">
          <button type="button" className="my-2 flex w-full text-gray-200">
            <AiOutlineHeart className={`h-6 w-6`} /> Add to favorites
          </button>
        
        <div>
          <h3 className="line-clamp-2 text-gray-200 text-sm font-semibold lg:text-lg 3xl:text-xl bg-gray-200 rounded-xl">product.title</h3>
        </div>

        <div className="flex items-center gap-1 coxs:gap-2 maxxs:flex-wrap">
          <span className="w-[74px] text-xs font-semibold leading-4 text-gray-200 sm:w-[87.1px] sm:text-sm">
            Part <br /> Number
          </span>
          <Tag />
          <div className="inline-flex rounded-full bg-gray-200 animate-pulse px-3 py-1 text-xs font-medium text-gray-200">product.part_number</div>
        </div>
        <div className="flex items-center gap-1 coxs:gap-2 maxxs:flex-wrap">
          <span className="text-xs font-semibold text-gray-200 sm:text-sm">Price Range</span>
          <Tag />
          <div className="inline-flex rounded-full bg-gray-200 animate-pulse px-1 py-1 text-xs font-medium text-white sm:px-3">
            $0 - $0
          </div>
        </div>
        <span className="flex items-center font-semibold text-gray-200 underline maxsm:text-sm">
          0 Buying Options →
        </span>
      </div>
    </div>
    )
  }

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
            <BsGrid className={`cursor-pointer ${isGrid && 'text-b3'}`} onClick={() => setIsGrid(true)} />
            <FaBars className={`cursor-pointer ${!isGrid && 'text-b3'}`} onClick={() => setIsGrid(false)} />
          </div>
        </div>
        <button type="button" className="my-5 flex w-full items-center justify-center gap-2 rounded-md border border-b3 px-4 py-3 text-xs font-semibold text-b3 lg:hidden" onClick={() => setIsFilter(true)}>
          <FilterSvg />
          Filters
        </button>

        {/* Bread Crumbs End */}

        {/* Product Search Details */}

        {!searchLoading && searchParams.tab !== 'all' && searchParams.tab && result && modelNo ? (
          <div className="product-search-details">
            {/* Product Model Details */}
            {result.modelCategory ? (
              <>
                <div className="mt-6 grid grid-cols-1 items-center gap-10 rounded-lg border border-b3 bg-b3/10 p-6 md:mt-8 md:grid-cols-[220px_auto] md:p-8">
                  {result.modelCategory.thumbnail ? (
                    <div className="grid place-items-center rounded-lg bg-white py-7">
                      <Image onErrorCapture={() => setThumbnail('/no-image.webp')} src={thumbnail} className="h-40 w-40 object-contain" alt="Dish Water" width={600} height={600} quality={100} />
                    </div>
                  ) : null}
                  <div>
                    <div className="inline-flex rounded-lg border border-b2 px-3 py-3 font-semibold text-b2 md:px-4">Appliance Repair and Replacement parts for {modelNo}</div>
                    <h2 className="mt-4 text-xl font-bold text-b1 md:text-2xl lg:text-32px">Model Number: {modelNo}</h2>
                    {result.modelCategory.description ? <p className="mt-2.5 text-lg font-medium text-b1 md:text-xl 2xl:text-2xl">{result.modelCategory.description}</p> : null}
                  </div>
                </div>
                {/* End Model Details */}

                {/* Part Number to search */}
                <div className="my-10 md:my-20 2xl:my-100px">
                  <h2 className="mt-4 text-2xl font-bold text-b1 lg:text-[30px]">Model Number: {modelNo}</h2>
                  <div className="mt-8 flex max-w-[910px] items-center gap-2 maxsm:flex-col">
                    <div className="relative w-full">
                      <CiSearch className="absolute left-4 top-3.5 h-7 w-7 text-b1/30" />
                      <input value={searchModelNo} onChange={(e) => setSearchModelNo(e.target.value)} type="text" className="h-14 w-full rounded-lg border border-[#F6F7F9] bg-[#F6F7F9] pl-14 text-sm font-medium outline-none duration-200 placeholder:font-medium placeholder:text-b1/30 focus:border-b3" placeholder="Know your part number? Enter it here..." />
                    </div>
                    <button onClick={()=>searchModelNo != '' ? router.push(`/products?partno=${searchModelNo}&modelno=${modelNo}&tab=search-by&sale=true`):toast.info('Part number is required!')} className="button-hover flex cursor-pointer items-center justify-center rounded-md px-6 py-5 text-white maxmd:w-full">
                      <BiSearch />
                      <span className="ml-1 text-xs font-medium">Search</span>
                    </button>
                  </div>
                </div>

                {/* Model Categoris */}
                {result.partTypes.length > 0 ? <ModelCategories data={result} modelNo={modelNo} /> : null}

                <h2 className="mb-10 mt-10 text-2xl font-semibold text-b1 md:mb-20">
                  Compatible Parts for Model <span className="text-dark-red">{modelNo}</span>
                </h2>
              </>
            ) : null}
          </div>
        ) : null}
        {/* Product Filters */}

        <div className="flex justify-center gap-12 xl:gap-x-60px">
          <ProductFilter loading={loading} query={searchParams} onClose={() => setIsFilter(false)} isFilter={isFilter} />

          <div className={`grid ${isGrid ? 'grid-cols-2 gap-x-2 xl:grid-cols-3' : 'grid-cols-1'} mb-10 mt-5 w-full items-start gap-y-5`}>
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <ProductsSkelton key={i} />
              ))
            ) : data?.products?.length > 0 ? (
              <>
                {data.products.map((product, index) => (
                  <ApplianceGrid key={index} product={product} isGrid={isGrid} />
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
      </div>
    </>
  );
};

export default AllProducts;
