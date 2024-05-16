import React from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import BackHome from '@/components/BackHome';
import { RiArrowDropRightLine } from 'react-icons/ri';
import SatisfiedSection from '@/components/SatisfiedSection';
import ReviewSection from '@/components/ReviewSection';
import RecentlyAddedSection from '@/components/Appliances/RecentlyAddedSection';

const Page = () => {
  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <BackHome className="mb-10 md:hidden" />

        <div className="hidden items-center md:flex">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Testimonials</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Testimonials" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt " />
      </div>
      <SatisfiedSection apiSectionName="our-showroom-page-review" SectionStyle="!pt-0 !px-0 !pb-16" title="Join Thousands of Satisfied Customers." dots={false} />
      <SatisfiedSection apiSectionName="our-showroom-page-review" SectionStyle="!pt-0" dots={true} />

      <div className="testimonialreviews bg-b3 pt-10 lg:pb-10 lg:pt-20">
        <ReviewSection buttonactive={true} />
      </div>

      <div className="bg-b3/[8%]">
        <RecentlyAddedSection title="Shop Appliances On Sale" active={true} buttonname="Shop All Appliances On Sale" />
      </div>
    </>
  );
};

export default Page;
