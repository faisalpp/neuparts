'use client';
import React, { useEffect, useState } from 'react';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import { useRouter, useSearchParams } from 'next/navigation';

const TypeFilter = ({ type, title, filters }) => {
  const searchParams = useSearchParams();
  const [filterActive, setFilterActive] = useState(searchParams.get(type) || 'all');

  const totalProductCount = filters.reduce((acc, curr) => acc + curr.productCount, 0);

  const router = useRouter();

  let queryParams;
  const handleFilterparams = (key, value) => {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);
    }
    setFilterActive(value);
    if (value === 'all') {
      queryParams.delete(key);
    } else if (queryParams.has(key)) {
      queryParams.set(key, value);
    } else {
      queryParams.append(key, value);
    }
    const parth = window.location.pathname + '?' + queryParams.toString();
    router.push(parth);
  };

  useEffect(() => {
    setFilterActive(searchParams.get(type) || 'all');
  }, [searchParams.get(type)]);

  return (
    <>
      <DropDown title={title}>
        <>
          <div onClick={(e) => handleFilterparams(type, 'all')} className={`flex text-sm hover:underline ` + (filterActive == 'all' && 'font-bold')}>
            <h4>All</h4>
            <div className="flex w-full justify-end text-xs">
              <span>({totalProductCount})</span>
            </div>
          </div>
          {filters.map(
            (item, index) =>
              item.productCount > 0 && (
                <span key={index} onClick={(e) => handleFilterparams(type, item.slug)}>
                  <div className={`flex text-sm hover:underline ` + (filterActive == item.slug && 'font-bold')}>
                    <h4 className="w-full">{item.title}</h4>
                    <div className="flex justify-end text-xs">
                      <span>({item.productCount})</span>
                    </div>
                  </div>
                </span>
              )
          )}
        </>
      </DropDown>
    </>
  );
};

export default TypeFilter;
