import React from 'react';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import TipsDetails from '@/components/AppliancesTips/TipsDetails';

const AppliancesTipsDetail = ({ slug }) => {
  return (
    <>
      <TipsDetails slug={slug} />

      {/* Shop Austin Section */}
      <ShopAustinSection />

      <SatisfiedSection title="Testimonials" />

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default AppliancesTipsDetail;
