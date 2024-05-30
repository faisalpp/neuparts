import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import BuyingHero from './BuyingHero';
import BuyingOptions from './BuyingOptions';

const AllBuyingOptions = () => {
  return (
    <div className="maincontainer">
      {/* Bread Crumb */}
      <div className="flex items-center py-10">
        <div className="flex flex-wrap items-center">
          <h5 className="text-xs text-b3">Champagne ENERGY STAR Samsung 4.5 cu. ft. Front Load Washer with Wi-Fi Connectivity and 7.5 cu. ft. Front Load Gas Dryer with Steam</h5>
          <RiArrowDropRightLine className="text-xl text-gray-500" />
          <h5 className="text-xs text-gray-500">Buying Options</h5>
        </div>
      </div>

      {/* Hero Section */}
      <BuyingHero />

      {/* Buying Options */}
      <BuyingOptions />
    </div>
  );
};

export default AllBuyingOptions;
