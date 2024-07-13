import React from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import { RiArrowDropRightLine } from 'react-icons/ri';
import RepairPartners from '@/components/ApplianceRepair/RepairPartners';
import RepairWork from '@/components/ApplianceRepair/RepairWork';
import Faqs from '@/components/ApplianceRepair/Faqs';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';

const ApplianceRepair = () => {
  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Appliance repair</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Appliance Repair Partners" description="Appliance Repair is tricky. We know appliances are essential which means when an appliance goes down you need a solution fast. Repairing your appliance is not a service we provide but, we know a few companies/pros that take their customer service as seriously as we do." />
      </div>

      {/* Our Applaince Repair Partner */}

      <RepairPartners />

      {/* Appliance Repair Work */}

      <RepairWork />

      {/* FAQS */}

      <Faqs />

      {/* Shop Austin Section */}

      <ShopAustinSection />

      {/* Client Reviews */}
      <div className="mb-3 xl:mb-10"></div>
      <SatisfiedSection page="appliance-repair" title="Join Thousands of Satisfied Customers." />

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default ApplianceRepair;
