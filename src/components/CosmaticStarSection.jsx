import React from 'react';
import CosmaticCard from './CosmaticCard';

const CosmaticStarSection = () => {
  return (
    <div className="flex flex-col bg-b3/10 pt-14">
      {/* Heading Start  */}
      <div className="mt-5 flex flex-col items-center space-y-5 px-4 md:px-10 lg:px-0">
        <h4 className="text-center text-xl font-bold lg:text-start lg:text-2xl xl:text-[32px]">Our Cosmetic Star Rating System</h4>
        <p className="lg:sm mt-2 text-center text-sm font-semibold leading-normal lg:w-[980px] xl:text-[20px]">We rate our scratch and dent appliances by their cosmetic appearance (How they look). Appliances with lower cosmetic grades get Deeper Discounts! You pick your level of savings!</p>
      </div>
      {/* Heading End */}

      {/* Products Card Start */}
      <CosmaticCard />

      {/* Products Card End */}
    </div>
  );
};

export default CosmaticStarSection;
