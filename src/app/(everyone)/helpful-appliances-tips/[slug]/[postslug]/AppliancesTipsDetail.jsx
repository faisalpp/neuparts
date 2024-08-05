import React from 'react';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import TipsDetails from '@/components/AppliancesTips/TipsDetails';

const AppliancesTipsDetail = ({ slug, postslug }) => {
  return (
    <>
      <TipsDetails slug={slug} postslug={postslug} />

      {/* Shop Austin Section */}
      <ShopAustinSection />

      <div className="mb-3 xl:mb-10"></div>
      <SatisfiedSection page="help-appliance-tips" title="Join Thousands of Satisfied Customers." />

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default AppliancesTipsDetail;
