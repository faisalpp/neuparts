'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import Rotate from '@/components/svgs/Rotate';
import { FiCheck } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';

const ProductSearchBar = () => {
  const [searchBar, setSearchBar] = useState(false);
  const [modelNo, setModelNo] = useState('');
  const [partNo, setPartNo] = useState('');
  const [step, setStep] = useState(0);
  const handleSearchTab = () => {
    if (partNo != '' && modelNo === '') {
      setStep(1);
    } else if (modelNo != '') {
      setStep(2);
    }
  };
  return (
    <div id="product-search-bar" className={`${step == 0 ? 'bg-white' : 'bg-[#14313D]'} sticky top-[68px] z-40 lg:top-[136px] lg:z-50 lg:bg-[#14313D] maxlg:shadow-[0px_4px_20px_rgba(0,0,0,0.08)]`}>
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

      <div className={`${searchBar ? 'py-5 maxlg:shadow-[0_75px_69px_-62px_rgb(0,0,0,0.25)]' : 'lg:py-5 maxlg:max-h-0'} ${step == 0 ? 'maxlg:bg-white' : 'bg-[#14313D]'} mx-auto max-w-7xl items-center justify-center gap-4 px-[4%] text-white duration-200 sm:px-[6%] lg:flex lg:w-[90%] lg:px-0 2xl:w-[85%] 3xl:max-w-1680px maxlg:absolute maxlg:inset-x-0 maxlg:top-16 maxlg:w-full maxlg:overflow-hidden`}>
        {step == 0 && (
          <>
            <h3 className="mr-6 text-base lg:text-sm maxlg:font-semibold maxlg:text-b18">Search By</h3>
            <div className="flex gap-1 lg:items-center lg:gap-2 maxlg:mt-2 maxlg:flex-col">
              <label className="text-sm font-semibold lg:text-xs maxlg:text-b18">Model No.</label>
              <input onChange={(e) => setModelNo(e.target.value)} type="text" value={modelNo} className="w-full rounded-lg border border-b3 bg-white px-4 py-3 text-xs text-b18 outline-none placeholder:text-[#979797] lg:max-w-40" placeholder="Enter model number" />
            </div>
            <div className="flex gap-1 lg:items-center lg:gap-2 maxlg:mt-2 maxlg:flex-col">
              <label className="text-sm font-semibold lg:text-xs maxlg:text-b18">Port No.</label>
              <input onChange={(e) => setPartNo(e.target.value)} type="text" value={partNo} className="w-full rounded-lg border border-b3 bg-white px-4 py-3 text-xs text-b18 outline-none placeholder:text-[#979797] lg:max-w-40" placeholder="Enter model number" />
            </div>
            <button type="button" onClick={() => handleSearchTab()} className="button-hover flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-white lg:ml-2 maxlg:mt-3 maxlg:w-full">
              <BiSearch />
              <span className="ml-1 text-xs font-medium">Search</span>
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
            <input onChange={(e) => setModelNo(e.target.value)} type="text" value={modelNo} className="w-full max-w-96 rounded-lg border border-b3 bg-white px-4 py-3 text-xs text-b18 outline-none placeholder:text-[#979797]" placeholder="Enter your Model Number" />
            <button type="button" onClick={() => handleSearchTab()} className="button-hover flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-white lg:ml-2 maxlg:mt-4 maxlg:w-full">
              <BiSearch />
              <span className="ml-1 text-xs font-medium">Search</span>
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
            <div className="flex w-full items-center gap-2.5 lg:w-1/3">
              <div className="grid h-8 min-w-8 place-items-center rounded bg-white">
                <Image width={100} height={100} quality={100} src="/p1.webp" className="h-6 w-6 object-contain" alt="" />
              </div>
              <h3 className="line-clamp-2 text-sm font-semibold">GE 1.7 cu. ft. Over the Range Microwave with Convenience Cooking Controls</h3>
            </div>
            <button type="button" className="flex h-full items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#3F4C54] bg-b2 p-3 text-xs font-semibold lg:p-2 lg:text-sm maxlg:my-4 maxlg:w-full">
              <Rotate className="h-6 w-6" />
              Model Number: 2345367
            </button>
            {/* Parts Show Are Comaptible With Model */}
            {partNo === '' && modelNo === '2345367' && (
              <div className="flex items-start gap-1 rounded-lg bg-[#00EE34] px-2.5 py-1.5">
                <div className="grid h-6 min-w-6 place-items-center rounded-full bg-black text-[#00EE34]">
                  <FiCheck />
                </div>
                <div>
                  <span className="block text-xs font-extrabold leading-3 text-b1">MATCH</span>
                  <span className="block text-xs leading-3 text-b1">Parts Shown are compatible with model</span>
                </div>
              </div>
            )}
            {/* Parts Show Are Not Comaptible With Model */}
            {partNo === '' && modelNo != '2345367' && modelNo != '' && (
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
            {/* Model and Part Cpmpatible */}
            {modelNo === '2345367' && partNo === '123456' && (
              <div className="flex h-full items-center gap-1 rounded-lg bg-[#00EE34] px-2.5 py-1.5">
                <div className="grid h-6 min-w-6 place-items-center rounded-full bg-black text-[#00EE34]">
                  <FiCheck />
                </div>
                <span className="block text-xs font-extrabold text-b1">Compatible Part</span>
              </div>
            )}

            {/* Model and Part NotCpmpatible */}
            {modelNo != '2345367' && partNo != '123456' && modelNo != '' && partNo != '' && (
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
