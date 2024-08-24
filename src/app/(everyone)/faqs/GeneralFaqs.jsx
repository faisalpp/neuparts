'use client';
import React, { useState, useEffect } from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import Faqs from '@/components/GeneralFaqs/Faqs';
import FaqForm from './FaqForm';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import { RiArrowDropRightLine } from 'react-icons/ri';
import VideoSection from '@/components/VideoSection'

const GeneralFaqs = () => {

  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-[#C3C2C2]" />
          <h5 className="text-xs text-b17">FAQs</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail descStyle="3xl:w-[817px]" title="Frequently Asked Questions" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phasellus non felis eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula." />
      </div>

      <VideoSection type='faqs' />

      {/* Faqs Tabs */}
      <Faqs />

      {/* FAQ's Form */}
      <FaqForm />

      {/* Shop Austin Section */}
      <ShopAustinSection />

      {/* Reviews Section */}
      <div className="mb-3 xl:mb-10"></div>
      <SatisfiedSection page="faqs" title="Join Thousands of Satisfied Customers." dots={true} />
      {/* End  */}
      <NewsLetterSection backimage="/Newsletter.webp" />
      {/* End Tabs*/}
    </>
  );
};

export default GeneralFaqs;
