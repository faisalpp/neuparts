'use client';
import React from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import { Checkbox } from '@material-tailwind/react';
import FourStar from '@/components/svgs/FourStar';

const TypeFilter = () => {
  return (
    <>
      <DropDown title="Comatic Rating">
        {/* Item Start */}
        <div className="flex items-center">
          <div className="label-p-0 flex items-center gap-2">
            <Checkbox ripple={false} checked={true} className="border-none checked:bg-b3 checked:text-white" />
            <span className="flex">
              <div className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                <FourStar />
                New
              </div>
            </span>
          </div>
          <div className="flex w-full justify-end text-xs">
            <span>(84)</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="label-p-0 flex items-center gap-2">
            <Checkbox ripple={false} checked={false} className="border-none bg-b1/10 checked:bg-b3 checked:text-white" />
            <span className="flex">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-3 py-1 text-xs font-semibold text-white">New / Open Box</div>
            </span>
          </div>
          <div className="flex w-full justify-end text-xs">
            <span>(84)</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="label-p-0 flex items-center gap-2">
            <Checkbox ripple={false} checked={false} className="border-none bg-b1/10 checked:bg-b3 checked:text-white" />
            <span className="flex">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>
            </span>
          </div>
          <div className="flex w-full justify-end text-xs">
            <span>(84)</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="label-p-0 flex items-center gap-2">
            <Checkbox ripple={false} checked={false} className="border-none bg-b1/10 checked:bg-b3 checked:text-white" />
            <span className="flex">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade A</div>
            </span>
          </div>
          <div className="flex w-full justify-end text-xs">
            <span>(84)</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="label-p-0 flex items-center gap-2">
            <Checkbox ripple={false} checked={false} className="border-none bg-b1/10 checked:bg-b3 checked:text-white" />
            <span className="flex">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade B</div>
            </span>
          </div>
          <div className="flex w-full justify-end text-xs">
            <span>(84)</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="label-p-0 flex items-center gap-2">
            <Checkbox ripple={false} checked={false} className="border-none bg-b1/10 checked:bg-b3 checked:text-white" />
            <span className="flex">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade C</div>
            </span>
          </div>
          <div className="flex w-full justify-end text-xs">
            <span>(84)</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="label-p-0 flex items-center gap-2">
            <Checkbox ripple={false} checked={false} className="border-none bg-b1/10 checked:bg-b3 checked:text-white" />
            <span className="flex">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade D</div>
            </span>
          </div>
          <div className="flex w-full justify-end text-xs">
            <span>(84)</span>
          </div>
        </div>
        {/* Item End */}
      </DropDown>
    </>
  );
};

export default TypeFilter;
