'use client';
import React, { useState } from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import { Checkbox } from '@material-tailwind/react';
import { useRouter, useSearchParams } from 'next/navigation';

const SaleFilter = ({ countSale }) => {
  const searchParams = useSearchParams();
  const [filterActive, setFilterActive] = useState(searchParams.get('sale') || false);

  const router = useRouter();

  let queryParams;
  const handleClick = (key, value) => {
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
    const path = window.location.pathname + '?' + queryParams.toString();
    router.push(path);
  }

  return (
    <>
      <DropDown title="On Sale">
        <>
          {/* Item Start */}
          <div className="flex cursor-pointer items-center">
            <div className="label-p-0 flex items-center gap-2">
              <Checkbox name="sale" ripple={false} onClick={(e) => handleClick('sale', !filterActive)} defaultChecked={filterActive} className="checked:bg-b3 checked:text-white" label={<span className="ml-2 flex">Yes</span>} />
            </div>
            <div className="flex w-full justify-end text-xs">
              <span>({countSale})</span>
            </div>
          </div>
        </>
      </DropDown>
    </>
  );
};

export default SaleFilter;
