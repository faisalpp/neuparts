'use client';

import React, { useEffect, useState } from 'react';
import TypeFilter from '@/components/DeskComp/Filter/TypeFilter';
import RatingFilter from '@/components/DeskComp/Filter/RatingFilter';
import SaleFilter from '@/components/DeskComp/Filter/SaleFilter';
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import Image from 'next/image';
import HeaderFilter from '@/components/DeskComp/Filter/HeaderFilter';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const Filter = ({ filterheader, onClose, isFilter, saleFilter, setQuery, query }) => {
  const [loading, setLoading] = useState(true);
  const [Categories, setCategories] = useState([]);
  const [PartTypes, setPartTypes] = useState([]);
  const [Conditions, setConditions] = useState([]);
  const [onsale, setOnSale] = useState(false);
  const router = useRouter();

  const handleFilterClick = (event) => {
    event.stopPropagation();
  };

  const getFilters = async () => {
    const res = await fetch('/api/front/filters');
    const data = await res.json();
    setCategories(data.categories);
    setPartTypes(data.parttypes);
    setConditions(data.conditions);
    setLoading(false);
  };

  useEffect(() => {
    getFilters();
  }, ['']);

  const modalClass = isFilter ? 'maxlg:flex maxlg:top-[67px] maxlg:bottom-0' : 'maxlg:-bottom-[420px] maxlg:opacity-0 maxlg:pointer-events-none';

  return (
    <>
      {loading ? (
        <div style={{ height: 'calc(100vh - 210px)' }} className="mb-2 flex w-72 items-center justify-center rounded-xl">
          <Image width={400} height={400} quality={100} alt="Loader" src="/loader2.gif" className="h-16 w-auto" />
        </div>
      ) : (
        <div className={`z-40 items-end duration-200 lg:sticky lg:top-28 lg:h-full lg:w-full lg:max-w-60 maxlg:fixed maxlg:left-0 maxlg:right-0 maxlg:bg-black/20 maxlg:bg-white ${modalClass}`} onClick={onClose}>
          <div className="w-full flex-col lg:flex maxlg:h-full maxlg:overflow-y-auto" onClick={handleFilterClick}>
            <div className="top-0 z-40 flex items-center justify-between border-b border-b1/10 lg:pb-4 maxlg:sticky maxlg:mx-[5%] maxlg:bg-white maxlg:py-4">
              <button type="button" onClick={onClose} className="flex items-center gap-2 text-base font-semibold maxlg:font-bold">
                <ArrowLeftIcon className="w- h-4 stroke-[2.5px] lg:hidden" /> Filters
              </button>
              <span
                onClick={() => {
                  setQuery({ isSale: true, salePrice: { $gte: 200, $lte: 8000 }, sort: 1 });
                }}
                className="cursor-pointer text-sm text-[#22A6AB] hover:underline lg:text-xs"
              >
                Reset Filters
              </span>
            </div>
            <div className="pb-5 lg:pb-10 maxlg:px-[5%]">
              {Categories.length > 0 && <TypeFilter type="category" title="Appliance Type" filters={Categories} />}
              {PartTypes.length > 0 && <TypeFilter type="type" title="Part Type" filters={PartTypes} />}

              <RatingFilter />
              {/* {filterheader != false && <HeaderFilter />} */}
              <MultiRangeSlider filt={query} setFilt={setQuery} min={9} max={9999} />
              <SaleFilter filt={query} setFilt={setQuery} sale={saleFilter} reg={onsale} />
            </div>
            <div className="sticky bottom-0 z-40 grid grid-cols-2 lg:hidden">
              <button type="button" className="bg-b1 px-2 py-4 text-white">
                Clear Filters
              </button>
              <button type="button" className="button-hover px-2 py-4">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
