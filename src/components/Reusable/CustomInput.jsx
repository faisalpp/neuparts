'use client';
import React from 'react';

const CustomInput = ({ label, type, placeholder, state, setState, colorStyle, icon }) => {
  return (
    <div className="w-full">
      <label className="h-full">
        {label ? <span className="mb-2 block text-xs font-semibold text-b16">{label}</span> : null}
        <div className="relative h-full">
          <input type={type ? type : 'text'} className={`h-[46px]  w-full rounded-lg border px-4 text-xs text-black outline-none placeholder:text-xs ${colorStyle ? colorStyle : 'border-[rgba(0,0,0,0.16)] placeholder:text-black/40'}`} placeholder={placeholder} onChange={(e) => setState(e.target.value)} value={state} />
          {icon ? <img src={'/svgs/' + icon} className="pointer-events-none absolute right-4 top-3 h-[18px] w-[18px] object-contain" alt="" /> : null}
        </div>
      </label>
    </div>
  );
};

export default CustomInput;
