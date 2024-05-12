'use client';
import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { Transition } from '@headlessui/react';

const DropDown = ({ title, children }) => {
  const [drp, setDrp] = useState(false);
  const [isShowing, setIsShowing] = useState(true);

  return (
    <>
      <div className="flex h-auto w-full flex-col border-b-[1px] py-4">
        {/* Controller */}
        <div className="flex cursor-pointer items-center border-b-gray-300" onClick={() => setIsShowing((isShowing) => !isShowing)}>
          <h6 className="w-72 text-sm font-bold">{title}</h6>
          <div className="flex w-full items-center justify-end">{isShowing ? <RiArrowDropUpLine className="text-2xl" /> : <RiArrowDropDownLine className="text-2xl" />}</div>
        </div>
        {/* Body */}
        <Transition as="div" show={isShowing} className="mt-3 flex h-auto cursor-pointer flex-col gap-2">
          {children}
        </Transition>
      </div>
    </>
  );
};

export default DropDown;
