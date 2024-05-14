'use client';
import React, { useState, useEffect } from 'react';
import ProductsTypeCard from '@/components/Appliances/ProductsTypeCard';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import { RiArrowDropRightLine } from 'react-icons/ri';
import Loader from '@/components/Loader/Loader';

const ApplianceTypes = () => {
  const [applianceTypes, setApplianceTypes] = useState([
    {
      image: '/p1.webp',
      title: 'Appliance Types',
      slug: 'appliance-types',
    },
    {
      image: '/p1.webp',
      title: 'Appliance Types',
      slug: 'appliance-types',
    },
    {
      image: '/p1.webp',
      title: 'Appliance Types',
      slug: 'appliance-types',
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAppliances = async () => {};
    getAppliances();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Bread Crumbs Start */}
          <div className="maincontainer flex items-center pt-10">
            <div className="flex items-center">
              <h5 className="text-xs text-b3">Home</h5>
              <RiArrowDropRightLine className="text-xl text-b19" />
              <h5 className="text-xs text-[#5E5E5E]">Appliances</h5>
            </div>
          </div>
          {/* Bread Crumbs End */}
          <div className="maincontainer flex flex-col items-center gap-6 py-10 text-center lg:py-16 xl:py-20">
            <h2 className="text-32px font-bold text-[#111010] lg:text-4xl">Shop By Appliance Types</h2>
            <p className="mx-auto text-[#111010] md:w-3/4">We understand the value of your time and the importance of easy navigation, so we’ve carefully curated a selection of categories to make your search a breeze. Comb through our wide range of appliances type including trendy appliance, classic favorites, niche appliances, and more.</p>
          </div>
          {/* Product Types */}
          <div className="maincontainer pb-10 lg:pb-16 xl:pb-20">
            <ProductsTypeCard productstype={applianceTypes} />
          </div>

          {/* Shop Austin Section */}
          <ShopAustinSection />

          <NewsLetterSection backimage="/Newsletter.webp" />
        </>
      )}
    </>
  );
};

export default ApplianceTypes;
