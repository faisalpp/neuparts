import React from 'react';
import WasherCard from './WasherCard';
import { FaPlus } from 'react-icons/fa';
import EmptyDryerCard from './EmptyDryerCard';
// import EmptyDryerCard from './EmptyDryerCard';

const LaunderySet = () => {
  return (
    <>
      <div className="maincontainer flex flex-col bg-b3/10 py-10 lg:py-14 xl:py-20">
        <div className="flex w-full justify-center text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">
          <h4>Complete Your Laundry Set</h4>
        </div>
        {/* Continer */}
        <div className="mt-10 flex w-full justify-center">
          {/* Inner Contaienr */}
          <div className="flex w-full items-center justify-center gap-5 lg:gap-10 maxlg:flex-col">
            {/* Washer Card */}
            <WasherCard />
            <span>
              <FaPlus className="text-b3" />
            </span>
            <EmptyDryerCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunderySet;
