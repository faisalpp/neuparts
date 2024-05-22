import Image from 'next/image';
import React from 'react';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import Rotate from '@/components/svgs/Rotate';
import { FiCheck } from 'react-icons/fi';

const ProductSearchBar = () => {
  return (
    <div className="hidden bg-[#14313D] lg:block">
      <div className="maincontainer flex w-full max-w-6xl items-center justify-center gap-4 py-5 text-white">
        {/* <h3 className="mr-6 text-sm text-white">Search By</h3>
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold">Model No.</label>
        <input type="text" className="w-full max-w-40 rounded-lg border border-b3 bg-white px-4 py-3 text-xs text-[#979797] outline-none placeholder:text-[#979797]" placeholder="Enter model number" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold">Port No.</label>
        <input type="text" className="w-full max-w-40 rounded-lg border border-b3 bg-white px-4 py-3 text-xs text-[#979797] outline-none placeholder:text-[#979797]" placeholder="Enter model number" />
      </div>
      <button type="button" className="button-hover ml-2 flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-white">
        <BiSearch />
        <span className="ml-1 text-xs font-medium">Search</span>
      </button> */}

        {/* After Model or Port Enter */}

        {/* <button type="button" className="inline-flex items-center gap-2 rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold">
        <IoExtensionPuzzleOutline className="h-6 w-6" />
        Compatibility Check
      </button>
      <input type="text" className="w-full max-w-96 rounded-lg border border-b3 bg-white px-4 py-3 text-xs text-[#979797] outline-none placeholder:text-[#979797]" placeholder="Enter your Model Number" />
      <button type="button" className="button-hover ml-2 flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-white">
        <BiSearch />
        <span className="ml-1 text-xs font-medium">Search</span>
      </button> */}

        {/* After Compatible */}
        <button type="button" className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold">
          <IoExtensionPuzzleOutline className="h-6 w-6" />
          Compatibility Check
        </button>
        <div className="flex w-1/3 items-center gap-2.5">
          <div className="grid h-8 min-w-8 place-items-center rounded bg-white">
            <Image width={100} height={100} quality={100} src="/p1.webp" className="h-6 w-6 object-contain" alt="" />
          </div>
          <h3 className="text-sm font-semibold">GE 1.7 cu. ft. Over the Range Microwave with Convenience Cooking Controls</h3>
        </div>
        <button type="button" className="inline-flex h-full items-center gap-2 whitespace-nowrap rounded-lg border border-[#3F4C54] bg-b2 p-2 text-sm font-semibold">
          <Rotate className="h-6 w-6" />
          Model Number: 2345367
        </button>
        <div className="flex items-start gap-1 rounded-lg bg-[#00EE34] px-2.5 py-1.5">
          <div className="grid h-6 min-w-6 place-items-center rounded-full bg-black text-[#00EE34]">
            <FiCheck />
          </div>
          <div>
            <span className="leadin3 block text-xs font-extrabold text-b1">MATCH</span>
            <span className="block text-xs leading-3 text-b1">Parts Shown are compatible with model</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchBar;
