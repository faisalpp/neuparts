import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Popup = ({ state, setState, children, width, zindex, style }) => {
  return (
    <div className={`fixed ${state ? 'flex' : 'hidden'} items-center ${style ? style : null} top-0 justify-center ${zindex ? zindex : 'z-50'} h-screen w-full bg-black/50`}>
      <div className={`relative flex justify-center bg-white ${zindex ? zindex : 'z-40'} rounded-xl p-5 ${width ? width : 'w-6/12'}`}>
        {setState ? (
          <span onClick={() => setState(false)} className="absolute -right-8 top-0 cursor-pointer rounded-full bg-b3 px-1 py-1">
            <AiOutlineClose className="text-sm text-white" />
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default Popup;
