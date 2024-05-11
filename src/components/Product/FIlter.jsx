import React from 'react';
import TypeFilter from '@/components/DeskComp/Filter/TypeFilter';
import RatingFilter from '@/components/DeskComp/Filter/RatingFilter';
import SaleFilter from '@/components/DeskComp/Filter/SaleFilter';
import MultiRangeSlider from './MultiRangeSlider/MultiRangeSlider';
import Image from 'next/image';

const Filter = ({ loading, onClose, isFilter, categoriesFilters, ratingFilters, saleFilter, regularFilter, setQuery, query }) => {
  const handleFilterClick = (event) => {
    event.stopPropagation();
  };

  const modalClass = isFilter ? 'maxlg:flex maxlg:top-0 maxlg:bottom-0' : 'maxlg:-bottom-[420px] maxlg:opacity-0 maxlg:pointer-events-none';

  return (
    <>
      {loading ? (
        <div style={{ height: 'calc(100vh - 210px)' }} className="mb-2 flex w-72 items-center justify-center rounded-xl">
          <Image width={400} height={400} quality={100} alt="Loader" src="/loader2.gif" className="h-16 w-auto" />
        </div>
      ) : (
        <div className={`z-50 items-end duration-300 lg:sticky lg:top-10 lg:h-full lg:max-w-[240px] maxlg:fixed maxlg:left-0 maxlg:right-0 maxlg:bg-black/20 ${modalClass}`} onClick={onClose}>
          <div className="w-full flex-col pb-10 lg:flex maxlg:max-h-[398px] maxlg:overflow-y-auto maxlg:rounded-tl-2xl maxlg:rounded-tr-2xl maxlg:bg-white [&>div]:maxlg:px-10" onClick={handleFilterClick}>
            <div className="top-0 z-50 flex items-center justify-between border-b lg:pb-4 maxlg:sticky maxlg:bg-white maxlg:py-4 maxlg:shadow-md">
              <p className="text-base font-bold">Filters</p>
              <span
                onClick={() => {
                  setQuery({ isSale: true, salePrice: { $gte: 200, $lte: 8000 }, sort: 1 });
                }}
                className="cursor-pointer text-sm text-[#22A6AB] hover:underline lg:text-xs"
              >
                Reset Filters
              </span>
              <button onClick={onClose} className="rounded px-2 py-1 text-sm font-semibold duration-300 hover:bg-black/5 lg:hidden">
                Close
              </button>
            </div>
            <TypeFilter filt={query} setFilt={setQuery} filters={categoriesFilters} />
            <RatingFilter filt={query} setFilt={setQuery} filters={ratingFilters} />
            <MultiRangeSlider filt={query} setFilt={setQuery} min={9} max={9999} />
            <SaleFilter filt={query} setFilt={setQuery} sale={saleFilter} reg={regularFilter} />
            {/* <HeaderFilter /> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
