'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import Rotate from '@/components/svgs/Rotate';
import { FiCheck } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
import { StoreData } from '@/provider';
import Spinner from '@/components/svgs/Spinner';

const ProductSearchBar = () => {
  const { modelNo, partNo, filteredModels, showSuggestions, error, setPartNo, step, handleSearchClick, handleSuggestionClick, searchLoading, result, handleModelNoChange } = useContext(StoreData);

  const [searchBar, setSearchBar] = useState(false);

  const [thumbnail, setThumbnail] = useState(result.modelCategory?.thumbnail ? result.modelCategory.thumbnail : '/no-image.webp');

  return (
    <div className={`${step == 0 ? 'bg-white' : 'bg-[#14313D]'}`} id="productSearchBar">
      {/* Mobile Search Bar */}
      <div onClick={() => setSearchBar(!searchBar)} className="maincontainer flex cursor-pointer items-center justify-between gap-2 py-3 lg:hidden">
        {step == 0 && (
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-b3/10">
              <AiOutlineSearch className="h-6 w-6 text-b3" />
            </div>
            <span className="text-sm font-semibold text-b18">Search parts by</span>
          </div>
        )}
        {step >= 1 && (
          <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold text-white">
            <IoExtensionPuzzleOutline className="h-6 w-6" />
            Compatibility Check
          </button>
        )}
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-b3">
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.99996 4.96649C3.91107 4.96649 3.82774 4.95249 3.74996 4.92449C3.67218 4.89693 3.59996 4.84982 3.53329 4.78315L0.44996 1.69982C0.327738 1.5776 0.269516 1.42471 0.275294 1.24116C0.280627 1.05804 0.344404 0.905377 0.466627 0.783155C0.588849 0.660933 0.744405 0.599821 0.933294 0.599821C1.12218 0.599821 1.27774 0.660933 1.39996 0.783155L3.99996 3.38315L6.61663 0.766488C6.73885 0.644266 6.89174 0.585821 7.07529 0.591155C7.25841 0.596933 7.41107 0.660933 7.53329 0.783155C7.65552 0.905377 7.71663 1.06093 7.71663 1.24982C7.71663 1.43871 7.65552 1.59427 7.53329 1.71649L4.46663 4.78315C4.39996 4.84982 4.32774 4.89693 4.24996 4.92449C4.17218 4.95249 4.08885 4.96649 3.99996 4.96649Z" fill="white" />
          </svg>
        </div>
      </div>
      {/* End Mobile Search Bar */}

      <div className={`${searchBar ? 'py-5 maxlg:shadow-[0_75px_69px_-62px_rgb(0,0,0,0.25)]' : 'lg:py-5 maxlg:max-h-0'} ${step == 0 ? 'maxlg:bg-white' : 'bg-[#14313D]'} mobileSearcBar`}>
        {step == 0 && (
          <>
            <h3 className="mr-6 text-base lg:text-sm maxlg:font-semibold maxlg:text-b18">Search By</h3>
            <div className="flex gap-1 lg:items-center lg:gap-2 maxlg:mt-2 maxlg:flex-col">
              <label className="text-sm font-semibold lg:text-xs maxlg:text-b18">Model No.</label>
              <div className="relative w-full lg:max-w-40">
                <input onChange={(e) => handleModelNoChange(e.target.value)} type="text" value={modelNo} className="searchBar-input" placeholder="Enter model number" />
                {showSuggestions && modelNo && (
                  <ul className="max:h-32 absolute top-full z-20 mt-2 w-full overflow-y-scroll rounded-lg bg-white text-black">
                    {filteredModels.map((model, index) => (
                      <li key={index} className="cursor-pointer px-4 py-2 text-left hover:bg-gray-200" onClick={() => handleSuggestionClick(model)}>
                        {model}
                      </li>
                    ))}
                  </ul>
                )}
                {error && <span className="absolute -bottom-5 left-1 inline-flex text-left text-[13px] text-red-500">{error}</span>}
              </div>
            </div>
            <div className="flex gap-1 lg:items-center lg:gap-2 maxlg:mt-2 maxlg:flex-col">
              <label className="text-sm font-semibold lg:text-xs maxlg:text-b18">Port No.</label>
              <input onChange={(e) => setPartNo(e.target.value)} type="text" value={partNo} className="searchBar-input lg:max-w-40" placeholder="Enter part number" />
            </div>
            <button type="button" onClick={() => handleSearchClick('search-by')} className="button-hover flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-white lg:ml-2 maxlg:mt-3 maxlg:w-full">
              {searchLoading ? (
                <Spinner />
              ) : (
                <>
                  <BiSearch className="ml-1 text-xs font-medium" />
                  Search
                </>
              )}
            </button>
          </>
        )}
        {/* After Model Empty*/}
        {step == 1 && (
          <>
            <button type="button" className="hidden items-center gap-2 rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold lg:inline-flex">
              <IoExtensionPuzzleOutline className="h-6 w-6" />
              Compatibility Check
            </button>
            <div className="relative w-full max-w-96">
              <input onChange={(e) => handleModelNoChange(e.target.value)} type="text" value={modelNo} className="searchBar-input" placeholder="Enter your Model Number" />
              {showSuggestions && modelNo && (
                <ul className="max-h-32 absolute top-full z-20 mt-2 overflow-y-scroll rounded-lg bg-white text-black">
                  {filteredModels.map((model, index) => (
                    <li key={index} className="cursor-pointer px-4 py-2 text-left hover:bg-gray-200" onClick={() => handleSuggestionClick(model)}>
                      {model}
                    </li>
                  ))}
                </ul>
              )}
              {error && <span className="absolute -bottom-5 left-1 inline-flex text-left text-[13px] text-red-500">{error}</span>}
            </div>
            <button type="button" onClick={() => handleSearchClick('search-by')} className="button-hover flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-white lg:ml-2 maxlg:mt-4 maxlg:w-full">
              {searchLoading ? (
                <Spinner />
              ) : (
                <>
                  <BiSearch />
                  <span className="ml-1 text-xs font-medium">Search</span>
                </>
              )}
            </button>
          </>
        )}

        {/* After Compatible */}
        {step == 2 && (
          <>
            <button type="button" className="hidden items-center gap-2 whitespace-nowrap rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold lg:inline-flex">
              <IoExtensionPuzzleOutline className="h-6 w-6" />
              Compatibility Check
            </button>
            <div className="flex items-center gap-2.5">
              {result.modelCategory.thumbnail ? (
                <div className="grid h-10 min-w-10 place-items-center rounded bg-white">
                  <Image width={120} height={100} quality={100} onErrorCapture={() => setThumbnail('/no-image.webp')} src={thumbnail} className="h-6 w-6 object-contain" alt={result.product.title} />
                </div>
              ) : null}
              <div>
                <h3 className="line-clamp-2 text-sm font-semibold">{result.modelCategory?.description ? result.modelCategory.description : 'Title not available'}</h3>
              </div>
            </div>
            <button type="button" className="searchBar-model">
              <Rotate className="h-6 w-6" />
              Model Number: {modelNo}
            </button>

            {/* Parts Show Are Comaptible With Model */}
            {result.modelCategory && result.product && (
              <div className="flex items-start gap-1 rounded-lg bg-[#00EE34] px-2.5 py-1.5">
                <div className="grid h-6 min-w-6 place-items-center rounded-full bg-black text-[#00EE34]">
                  <FiCheck />
                </div>
                <div>
                  <span className="block text-xs font-extrabold leading-3 text-b1">MATCH</span>
                  <span className="block text-xs font-semibold leading-3 text-b1">Parts Shown are compatible with model</span>
                </div>
              </div>
            )}
            {/* Parts Show Are Not Comaptible With Model */}
            {!result.modelCategory && result.product && modelNo != '' && partNo != '' && (
              <div className="flex items-start gap-1 rounded-lg bg-dark-red px-2.5 py-1.5">
                <div className="grid h-6 min-w-6 place-items-center rounded-full bg-white text-dark-red">
                  <RxCross2 />
                </div>
                <div>
                  <span className="block text-xs font-extrabold leading-3 text-white">MATCH</span>
                  <span className="block text-xs leading-3 text-white">Parts Shown are Not compatible with model</span>
                </div>
              </div>
            )}

            {/* Model and Part NotCpmpatible */}
            {!result.modelCategory && !result.product && modelNo != '' && partNo != '' && (
              <div className="flex items-center gap-1 rounded-lg bg-dark-red px-2.5 py-1.5">
                <div className="grid h-6 min-w-6 place-items-center rounded-full bg-white text-dark-red">
                  <RxCross2 />
                </div>
                <div>
                  <span className="block text-xs font-extrabold leading-3 text-b1">NOT COMPATIBLE</span>
                  <span className="block text-xs leading-3 text-b1 xl:whitespace-nowrap">Part(s) Shown Are Not Compatible</span>
                </div>
              </div>
            )}
            {partNo != '' && modelNo != '' && (
              <div className="hidden h-full items-center rounded-lg bg-b3 px-2.5 py-3 lg:flex xl:whitespace-nowrap">
                <span className="block text-xs leading-3">Browse Compatible Parts</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSearchBar;
