import React from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import { RiArrowDropRightLine } from 'react-icons/ri';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import MeasuringRefrigrator from '@/components/MeasuringGuide/MeasuringRefrigrator';
import MeasuringAppliances from '@/components/MeasuringGuide/MeasuringAppliances';

const MeasuringGuide = () => {
  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Measuring Guide</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Appliance Measuring Guide" description="Read some helpful tips on measuring your available space for your new appliance, like a washer dryer or refrigerator. We want to make sure you love your new appliance from the beginning and making sure they will fit with correct measurements is one more step in the right direction!" />
      </div>

      <MeasuringRefrigrator />

      <MeasuringAppliances />
      {/* Shop Austin Section */}
      <ShopAustinSection />

      <SatisfiedSection apiSectionName="measuring-guide-page-review" title="Testimonials" dots={true} />

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default MeasuringGuide;
