'use client';
import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';

const BreadCrumb = () => {
  const location = usePathname();

  return (
    <div className="my-4 flex items-center">
      <h5 className="text-xs font-medium text-b3">Cart</h5>
      <RiArrowDropRightLine className={`text-xl text-b19 ${location.pathname === '/mycart/information' ? 'active' : ''}`} />
      <h5 className="text-xs font-medium text-b17">Information</h5>
      <RiArrowDropRightLine className="text-xl text-b19" />
      <h5 className="text-xs text-b17">Shipping</h5>
      <RiArrowDropRightLine className="text-xl text-b19" />
      <h5 className="text-xs text-b17">Payment</h5>
    </div>
  );
};

export default BreadCrumb;
