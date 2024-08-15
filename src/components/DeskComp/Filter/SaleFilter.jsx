'use client';
import React, { useState } from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import { Checkbox } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

const SaleFilter = () => {
  const [filterActive, setFilterActive] = useState(false);

  const router = useRouter();

  let queryParams;
  function handleClick(key, value) {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);
    }

    setFilterActive(value);

    if (value === false) {
      queryParams.delete(key);
    } else if (queryParams.has(key)) {
      queryParams.set(key, value);
    } else {
      queryParams.append(key, value);
    }
    const parth = window.location.pathname + '?' + queryParams.toString();
    router.push(parth);
  }

  return (
    <>
      <DropDown title="On Sale">
        <>
          {/* Item Start */}
          <div className="flex items-center">
            <div className="label-p-0 flex items-center gap-2">
              <Checkbox name="sale" ripple={false} checked={filterActive} onClick={(e) => handleClick('sale', !filterActive)} className="checked:bg-b3 checked:text-white" label={<span className="ml-2 flex">Yes</span>} />
            </div>
            <div className="flex w-full justify-end text-xs">
              <span>(1)</span>
            </div>
          </div>
        </>
      </DropDown>
    </>
  );
};

export default SaleFilter;
