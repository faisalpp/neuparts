import React from 'react';
import CaretDown from '@/components/svgs/CaretDown';

const CustomSelect = ({ label, id, Options, setState }) => {
  return (
    <div className="relative">
      <select id={id} onChange={(e) => setState(e.target.value)} className="w-full appearance-none rounded-lg border border-b31 px-[11px] pb-1 pt-[19px] text-sm font-medium text-b16 outline-none">
        {Options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <label htmlFor={id} className="absolute left-[11px] top-[5px] text-xs text-b25">
        {label}
      </label>
      <div className="absolute bottom-0 right-3 top-0 flex h-full items-center justify-end">
        <div className="border-l border-b31 py-[5px] pl-3">
          <CaretDown />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
