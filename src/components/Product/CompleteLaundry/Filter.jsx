'use client';
import React, { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import LaundryDryerCard from './LaundryDryerCard';
import LaundryWasherCard from './LaundaryWasherCard';
import BtnLoader from '../../Loader/BtnLoader';
import Pagination from '../../Pagination/Pagination2';
import Image from 'next/image';

const Filter = ({ type }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalCount, setTotalCount] = useState(1);

  const GetLaundaryAppliances = async () => {};

  useEffect(() => {
    GetLaundaryAppliances();
  }, [type, page]);

  const LaundaryFilter = ({ id, title, filters }) => {
    const [is, setIs] = useState('');
    return (
      <div
        onClick={() => {
          is === id ? setIs('') : setIs(id);
        }}
        className={`relative flex  cursor-pointer items-center gap-2 border-[1px] px-5 py-4 text-sm font-semibold text-black ${is === id ? 'rounded-full bg-b3 text-white' : 'rounded-full bg-white'}`}
      >
        <div className="flex items-center space-x-2">
          <span>{title}</span>
          <FiChevronDown className="text-lg" />
        </div>
        {is === id ? (
          <div className="absolute -bottom-36 left-0 h-32 w-full overflow-x-hidden overflow-y-scroll rounded-3xl border-[1px] bg-white">
            <div className="mt-3 flex h-32 w-full flex-col items-center space-y-2 text-white">
              {filters?.length > 0
                ? filters.map((filt, index) => (
                    <div key={index} className="flex w-11/12 justify-center rounded-md bg-white px-5 py-1 text-black">
                      <h3>{filt.title}</h3>
                    </div>
                  ))
                : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex items-center gap-8">
        <h3 className="whitespace-nowrap">Filter by </h3>
        <div className="flex flex-wrap items-center gap-2">
          <LaundaryFilter
            id="1"
            title="Cosmetic Ratings"
            filters={[
              { title: '3 Star Rating', link: '/products/?rating=3' },
              { title: '4 Star Rating', link: '/products/?rating=4' },
              { title: '5 Star Rating', link: '/products/?rating=5' },
            ]}
          />
          <LaundaryFilter
            id="2"
            title="Popular Features"
            filters={[
              { title: '3 Star Rating', link: '/products/?rating=3' },
              { title: '4 Star Rating', link: '/products/?rating=4' },
              { title: '5 Star Rating', link: '/products/?rating=5' },
            ]}
          />
          <LaundaryFilter
            id="3"
            title="Fuel Type"
            filters={[
              { title: '3 Star Rating', link: '/products/?rating=3' },
              { title: '4 Star Rating', link: '/products/?rating=4' },
              { title: '5 Star Rating', link: '/products/?rating=5' },
            ]}
          />
          <LaundaryFilter
            id="4"
            title="Popular Brands"
            filters={[
              { title: '3 Star Rating', link: '/products/?rating=3' },
              { title: '4 Star Rating', link: '/products/?rating=4' },
              { title: '5 Star Rating', link: '/products/?rating=5' },
            ]}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex h-80 w-full flex-col items-center justify-center">
          <BtnLoader />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-2">
          {type === 'dryer' ? products.map((product, index) => <LaundryWasherCard key={index} data={product} />) : null}
          {type === 'washer' ? products.map((product, index) => <LaundryDryerCard key={index} data={product} />) : null}
        </div>
      ) : (
        <div className="flex h-80 w-full items-center justify-center">
          <Image width={400} height={400} quality={100} src="/not-found.webp" className="h-auto w-32" alt="Not Found" />
        </div>
      )}
      {products.length > 0 ? <Pagination page={page} setPage={setPage} totalPages={totalCount} /> : null}
    </div>
  );
};

export default Filter;
