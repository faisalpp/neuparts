'use client';
import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { Transition } from '@headlessui/react';

const DropDown = ({ title, children, titleClass, iconClass, noactive }) => {
  const [drp, setDrp] = useState(false);
  const [isShowing, setIsShowing] = useState(noactive ? false : true);

  return (
    <>
      <div className={`flex h-auto w-full flex-col border-b-[1px] ${noactive ? '' : 'py-4'}`}>
        {/* Controller */}
        <div className="flex cursor-pointer items-center border-b-gray-300" onClick={() => setIsShowing((isShowing) => !isShowing)}>
          <h3 className={`w-full text-sm font-bold ${titleClass}`}>{title}</h3>
          <div className="flex items-center justify-end">{isShowing ? <RiArrowDropUpLine className={`text-2xl ${iconClass}`} /> : <RiArrowDropDownLine className={`text-2xl ${iconClass}`} />}</div>
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
