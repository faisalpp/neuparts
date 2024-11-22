'use client';
import React, { useEffect, useState } from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import { Checkbox } from '@material-tailwind/react';
import FourStar from '@/components/svgs/FourStar';
import { useRouter, useSearchParams } from 'next/navigation';

const TypeFilter = ({ filters }) => {
  const searchParams = useSearchParams();

  const [filterActive, setFilterActive] = useState(searchParams.get('condition') || '');

  const router = useRouter();

  let queryParams;
  function handleClick(key, value) {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);
    }

    setFilterActive(value);

    if (value === filterActive) {
      queryParams.delete(key);
      setFilterActive('');
    } else if (queryParams.has(key)) {
      queryParams.set(key, value);
    } else {
      queryParams.append(key, value);
    }
    const parth = window.location.pathname + '?' + queryParams.toString();
    router.push(parth);
  }

  const conditionClass = (condition) => {
    return condition == 'new' ? 'bg-dark-light-cyan' : condition == 'like-new-open-box' ? 'bg-dark-light-cyan' : condition == 'certified-refurbished' ? 'bg-dark-cyan' : 'bg-[#FF9A3E]';
  };

  useEffect(() => {
    setFilterActive(searchParams.get('condition') || '');
  }, [searchParams.get('condition')]);

  return (
    <>
      <DropDown title="Comatic Rating">
        {/* Item Start */}
        {filters.map((item, index) =>
          item.productCount === 0 ? null : (
            <div key={index} className="flex items-center">
              <div className="label-p-0 flex items-center gap-2">
                <Checkbox
                  name="condition"
                  onClick={(e) => handleClick('condition', item.slug)}
                  // checked={filterActive === item.slug}
                  defaultChecked={filterActive === item.slug}
                  label={
                    <span className="ml-2 flex">
                      <div className={'inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white ' + conditionClass(item.slug)}>
                        {item.slug === 'new' && <FourStar />}
                        {item.title}
                      </div>
                    </span>
                  }
                  ripple={false}
                  className="checked:!bg-b3 checked:!text-white"
                />

                {/* <Checkbox ripple={false} checked={false} className="border-none checked:bg-b3 checked:text-white" /> */}
              </div>
              <div className="flex w-full justify-end text-xs">
                <span>({item.productCount})</span>
              </div>
            </div>
          )
        )}

        {/* Item End */}
      </DropDown>
    </>
  );
};

export default TypeFilter;
