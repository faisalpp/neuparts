'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BiSearch } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import Rotate from '../svgs/Rotate';

const ProductCompatible = () => {
  const [modelNo, setModelNo] = useState('');
  const [partNo, setPartNo] = useState('123456');
  const [step, setStep] = useState(1);
  const handleSearchTab = () => {
    ('yes');
    if (partNo != '' && modelNo === '') {
      setStep(1);
    } else if (partNo != '' && modelNo != '') {
      setStep(2);
    }
  };
  return (
    <div className={`flex w-full max-w-7xl items-center justify-center gap-2.5 rounded-lg border border-b3 p-4 py-5 shadow-[0px_4px_24px_rgba(0,0,0,0.08)] md:gap-4 ${step == 2 && 'maxmd:flex-col'}`}>
      {/* After Model or Port Enter */}
      {step == 1 && (
        <>
          <button type="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold text-white">
            <IoExtensionPuzzleOutline className="h-6 w-6" />
            <span className="maxmd:hidden">Compatibility Check</span>
          </button>
          <input onChange={(e) => setModelNo(e.target.value)} type="text" value={modelNo} className="w-full max-w-96 rounded-lg border border-b3 bg-white px-4 py-3 text-xs text-[#979797] outline-none placeholder:text-[#979797]" placeholder="Enter your Model Number" />
          <button type="button" onClick={() => handleSearchTab()} className="button-hover flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-white">
            <BiSearch />
            <span className="ml-1 text-xs font-medium">Search</span>
          </button>
        </>
      )}

      {/* After Compatible */}
      {step == 2 && (
        <>
          <div className="flex items-center justify-center gap-2.5 md:gap-4">
            <button type="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold text-white md:hidden">
              <IoExtensionPuzzleOutline className="h-6 w-6" />
              <span className="maxmd:hidden">Compatibility Check</span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 min-w-10 place-items-center rounded border border-b1/20 bg-white">
                <Image width={100} height={100} quality={100} src="/p1.webp" className="h-6 w-6 object-contain" alt="" />
              </div>
              <h3 className="line-clamp-2 text-sm font-semibold">GE 1.7 cu. ft. Over the Range Microwave with Convenience Cooking Controls</h3>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 md:gap-4">
            <button type="button" className="flex h-full items-center gap-2 whitespace-nowrap rounded-lg border border-[#3F4C54] bg-b2 p-2 text-xs font-medium text-white">
              <Rotate className="h-4 w-4" />
              2345367
            </button>
            {modelNo === '2345367' ? (
              <div className="flex h-full items-center gap-1 rounded-lg bg-[#00EE34] px-2.5 py-1.5">
                <div className="grid h-6 min-w-6 place-items-center rounded-full bg-black text-[#00EE34]">
                  <FiCheck />
                </div>
                <span className="block text-xs font-extrabold text-b1">Compatible Part</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-lg bg-dark-red px-2.5 py-1.5">
                <div className="grid h-6 min-w-6 place-items-center rounded-full bg-white text-dark-red">
                  <RxCross2 />
                </div>
                <div className="line-clamp-1">
                  <span className="block text-xs font-extrabold leading-3 text-white">NOT COMPATIBLE</span>
                  <span className="block text-xs leading-3 text-white xl:whitespace-nowrap">Part(s) Shown Are Not Compatible</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCompatible;
