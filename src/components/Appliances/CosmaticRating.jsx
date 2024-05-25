import React from 'react';
import ProductCardSlider from '../ProductCardSlider';

const CosmaticRating = ({ section }) => {
  return (
    <div className="bg-b3/10 py-10 lg:py-14 xl:py-20">
      {/* Heading Start  */}
      <div className="maincontainer h-auto">
        <div className="flex flex-col items-center space-y-5 sm:px-4 md:px-10 lg:px-0">
          <h4 className="text-center text-2xl font-bold lg:text-start xl:text-3xl 2xl:text-4xl">Cosmetic Rating</h4>
          <p className="lg:sm mt-2 w-full text-center text-sm font-semibold leading-normal lg:w-8/12 xl:text-base">We rate our scratch and dent appliances by their cosmetic appearance (How they look). Appliances with lower cosmetic ratings get Deeper Discounts! You pick your level of savings!</p>
        </div>
        {/* Heading End */}

        {/* Products Card Start */}
        <ProductCardSlider section={section} />
      </div>
      {/* Products Card End */}
    </div>
  );
};

export default CosmaticRating;
