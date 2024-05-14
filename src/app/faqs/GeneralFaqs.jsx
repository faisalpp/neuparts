'use client';
import React, { useState, useEffect } from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import Faqs from '@/components/GeneralFaqs/Faqs';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import { RiArrowDropRightLine } from 'react-icons/ri';
import Iframe from '@/components/Reusable/Ifram';

const GeneralFaqs = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const GetSingleVideoMedia = async () => {};
    GetSingleVideoMedia();
  }, []);

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
      <div className="mx-auto w-full 3xl:max-w-1680px">
        {video && video.type === 'iframe' ? <Iframe icon="text-8xl" thumbnail={video.thumbnail} thumbRounded="false" divId={`faq-section-${video.type}`} frameId="faq-section-video" style="w-full h-[250px] md:h-[700px] 2xl:h-[920px]" src={video.url} title="Introducing our Next Generation of High End Kitchen Appliances | Miele" /> : null}
        {video && video.type !== 'iframe' ? <video controls autoPlay className="h-[250px] w-full object-cover md:h-[700px] 2xl:h-[920px]" src={video.url} /> : null}
      </div>

      {/* Faqs Tabs */}
      <Faqs />
      {/* Shop Austin Section */}
      <ShopAustinSection />

      {/* Reviews Section */}
      <SatisfiedSection apiSectionName="faq-page-review" title="Our Customers Are RAVING About Our Appliance Outlet" dots={true} />
      {/* End  */}
      <NewsLetterSection backimage="/Newsletter.webp" />
      {/* End Tabs*/}
    </>
  );
};

export default GeneralFaqs;
