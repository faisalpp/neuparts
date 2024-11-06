import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import BuyingHero from './BuyingHero';
import BuyingOptions from './BuyingOptions';

const AllBuyingOptions = ({ data }) => {
  
  return (
    <div className="maincontainer">
      {/* Bread Crumb */}
      <div className="flex items-center py-10">
        <div className="flex flex-wrap items-center">
          <h5 className="text-xs text-b3y
          ">Product</h5>
          <RiArrowDropRightLine className="text-xl text-gray-500" />
          <h5 className="text-xs text-b3">{data.product.title}</h5>
          <RiArrowDropRightLine className="text-xl text-gray-500" />
          <h5 className="text-xs text-gray-500">Buying Options</h5>
        </div>
      </div>

      {/* Hero Section */}
      <BuyingHero data={data} />

      {/* Buying Options */}
      {data.partproducts && data.partproducts.length > 0 && <BuyingOptions data={data.partproducts} />}
    </div>
  );
};

export default AllBuyingOptions;
