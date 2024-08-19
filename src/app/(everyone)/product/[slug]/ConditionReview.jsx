import React from 'react';
import FourStar from '@/components/svgs/FourStar';

const ConditionReview = ({ condition }) => {
  return (
    <div id="product-features" className="maincontainer flex flex-col bg-white py-10 lg:py-14 xl:py-60px">
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-b3/10 lg:py-8 maxlg:p-6">
        <div className={`mt-2 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white ` + condition().class}>
          {condition().slug == 'new' && <FourStar />}
          {condition().title}
        </div>
        <h3 className="text-[22px]">
          <span className="font-bold">Condition:</span> <span className="font-medium">{condition().title}</span>{' '}
        </h3>
        <p className="text-[22px] font-medium">What To Expect</p>
        <p className="md:text-center lg:px-10" dangerouslySetInnerHTML={{ __html: condition().description }}></p>
      </div>
    </div>
  );
};

export default ConditionReview;
