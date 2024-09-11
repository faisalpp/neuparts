"use client";

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Popup = ({ state, setState, children, width, zindex, style,height }) => {
  return (
    <div className={`fixed ${state ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} flex ${style ? style : ''} top-0 justify-center ${zindex ? zindex : 'z-10'} h-screen w-full bg-black bg-opacity-50 transition-opacity duration-300`}>
      <div style={{height: height ? height : 'calc(100vh - 50px)'}} className={`relative overflow-y-scroll overflow-x-hidden mt-5 flex bg-white ${zindex ? zindex : 'z-40'} rounded-xl p-5 ${width ? width : 'w-6/12'} transition-transform duration-300 transform ${state ? 'scale-100' : 'scale-0'}`}>
        {setState ? (
          <span onClick={() => setState(false)} className="absolute right-5 top-5 cursor-pointer rounded-full bg-gray-700 px-1 py-1">
            <AiOutlineClose className="text-sm text-white" />
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default Popup;
