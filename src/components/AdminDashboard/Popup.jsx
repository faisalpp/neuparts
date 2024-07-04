"use client";

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Popup = ({ state, setState, children, width, zindex, style }) => {
  return (
    <div className={`fixed ${state ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex items-center ${style ? style : ''} top-0 justify-center ${zindex ? zindex : 'z-50'} h-screen w-11/12 bg-black bg-opacity-50 transition-opacity duration-300`}>
      <div className={`relative flex bg-white ${zindex ? zindex : 'z-40'} rounded-xl p-5 ${width ? width : 'w-6/12'} transition-transform duration-300 transform ${state ? 'scale-100' : 'scale-0'}`}>
        {setState ? (
          <span onClick={() => setState(false)} className="absolute -right-8 top-0 cursor-pointer rounded-full bg-gray-700 px-1 py-1">
            <AiOutlineClose className="text-sm text-white" />
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default Popup;
