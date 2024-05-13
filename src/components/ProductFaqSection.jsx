import React from 'react';
import Faqs from './GeneralFaqs/Faqs';

const ProductFaqSection = () => {
  return (
    <>
      <div id="faq">
        <h2 className="maincontainer mb-5 text-center text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">FREQUENTLY ASKED QUESTIONS</h2>
        <Faqs />
      </div>
    </>
  );
};

export default ProductFaqSection;
