'use client';
import React, { useEffect, useState } from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import { RiArrowDropRightLine } from 'react-icons/ri';
import SatisfiedSection from '@/components/SatisfiedSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import ApplianceParts from '@/components/OurCompanies/ApplianceParts';
import ApplianceOutlet from '@/components/OurCompanies/ApplianceOutlet';
import ApplianceWholeSale from '@/components/OurCompanies/ApplianceWholeSale';
import { AiOutlineArrowDown } from 'react-icons/ai';
import Iframe from '@/components/Reusable/Ifram';

const OurCompanies = () => {
  const [video, setVideo] = useState({ url: 'https://www.youtube.com/embed/WQWVW4DUmZ0', type: 'iframe', thumbnail: '/g8.webp' });

  return (
    <>
      <div className="maincontainer pt-10 lg:pt-16 xl:pt-20">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Our Companies</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Our Companies" description="Dedicated to providing innovative solutions for the appliance market. Our focus on customer service and out of the box thinking have allowed us to provide our community with savings on all things appliances." />

        <p className="mt-5 w-full text-b16 md:w-2/3 3xl:w-[1135px] maxmd:text-center">Our Appliance Outlets, Appliance Parts Store, and Appliance Wholesale Program each offer revolutionary solutions to problems within the Appliance Industry.</p>

        <a href="#outlets-parts" className="mt-6 inline-flex items-center justify-center gap-1 rounded-lg border border-b3 px-4 py-3 text-xs font-medium text-b3 maxsm:w-full">
          Learn More{' '}
          <span>
            <AiOutlineArrowDown className="text-base" />
          </span>
        </a>
      </div>

      {/* Cards */}
      <div id="outlets-parts" className="maincontainer grid grid-cols-1 gap-x-4 gap-y-10 py-16 md:grid-cols-2 xl:py-20 2xl:grid-cols-3 2xl:py-120px 3xl:gap-6">
        <ApplianceOutlet />

        <ApplianceParts />

        <ApplianceWholeSale />
      </div>

      {/* Video Section */}
      <div className="mx-auto w-full 3xl:max-w-1680px">
        {video && video.type === 'iframe' ? <Iframe icon="text-8xl" thumbnail={video.thumbnail} thumbRounded="false" divId={`comanies-section-${video.type}`} frameId="companies-section-video-our" style="w-full h-[250px] md:h-[700px] 2xl:h-[920px]" src={video.url} title="Introducing our Next Generation of High End Kitchen Appliances | Miele" /> : null}
        {video && video.type !== 'iframe' ? <video controls autoPlay className="h-[250px] w-full object-cover md:h-[700px] 2xl:h-[920px]" src={video.url} /> : null}
      </div>

      {/* Shop Austin Section */}
      <ShopAustinSection />
      {/* Client Reviews */}

      {/* Client Reviews */}
      <div className="mb-3 xl:mb-10"></div>
      <SatisfiedSection page="our-companies" title="Join Thousands of Satisfied Customers." />

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default OurCompanies;
