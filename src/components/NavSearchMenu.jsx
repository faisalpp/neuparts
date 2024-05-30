import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const NavSearchMenu = ({ searchMenu, setSearchMenu }) => {
  return (
    <div className={`${searchMenu ? 'border-b3 pb-5 pt-3 lg:border' : 'pointer-events-none max-h-0'} absolute top-[68px] w-full overflow-hidden bg-b1 px-4 duration-300 lg:top-0 lg:w-72 lg:rounded-lg lg:bg-b2 maxlg:left-0  maxlg:right-0 maxlg:shadow-2xl`}>
      <div className="mb-2.5 inline-flex cursor-pointer items-center gap-1 text-white lg:text-b3" onClick={() => setSearchMenu(!searchMenu)}>
        <BiSearch className="w-full max-w-3.5 maxlg:hidden" />
        <span className="text-base font-medium lg:text-xs">
          Search <span className="lg:hidden">By</span>
        </span>
        <ChevronDownIcon className="w-full max-w-3 maxlg:hidden" />
      </div>
      <label htmlFor="model_no" className="mb-1 block text-sm font-semibold text-white lg:hidden">
        Model No.
      </label>
      <input type="text" className="w-full rounded-lg border border-b3 bg-white p-3 text-xs font-medium text-black outline-none placeholder:font-semibold placeholder:text-[#979797]" placeholder="Model Number" />
      <label htmlFor="model_no" className="mb-1 mt-2 block text-sm font-semibold text-white lg:hidden">
        Part No.
      </label>
      <input type="text" className="w-full rounded-lg border border-b3 bg-white p-3 text-xs font-medium text-black outline-none placeholder:font-semibold placeholder:text-[#979797] lg:mt-2" placeholder="Part Number" />
      <button type="button" className="button-hover mt-4 flex h-10 w-full cursor-pointer items-center justify-center rounded-md px-4 text-white lg:mt-2">
        <BiSearch />
        <span className="ml-1 text-base font-medium lg:text-xs">Search</span>
      </button>
    </div>
  );
};

export default NavSearchMenu;
