import React from 'react';
import FourStar from '@/components/svgs/FourStar';

const ConditionReview = () => {
  return (
    <div id="product-features" className="maincontainer flex flex-col bg-white py-10 lg:py-14 xl:py-60px">
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-b3/10 lg:py-8 maxlg:p-6">
        <div className="mt-2 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
          <FourStar />
          New
        </div>
        {/* <div className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-cyan px-3 py-1 text-xs font-semibold text-white">Certified Refurbished</div>
        <div className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-dark-light-cyan px-3 py-1 text-xs font-semibold text-white">New / Open Box</div>
        <div className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade B</div>
        <div className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade C</div>
        <div className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#FF9A3E] px-3 py-1 text-xs font-semibold text-white">Used • Grade D</div> */}
        <h3 className="text-[22px]">
          <span className="font-bold">Condition:</span> <span className="font-medium">Brand New</span>{' '}
        </h3>
        <p className="text-[22px] font-medium">What To Expect</p>
        <p className="md:text-center lg:px-10">If you are shopping for bargains you are in the right place! 3-star rated appliances get you an open box appliance that works perfectly, with moderate cosmetic damage like scratches or dents at the largest discounted price we offer. Customers purchasing 3 star appliances capitalize on our deepest discounts in exchange for larger cosmetic blemishes while still obtaining a 100% functional appliance.</p>
        {/* <p className="px-10 text-center text-sm">Our 4 Star line is for Austin&apos;s savviest shoppers! 4-star rated appliances get you an open box appliance that works perfectly, with minor to moderate cosmetic damage like scratches or dents at a great discount. Customers purchasing 4 star cosmetic Cosmetic Rating appliances are generally more accepting of more minor cosmetic blemishes for a deeper discount on the item while still obtaining a 100% functional appliance.</p> */}
        {/* <p className="px-10 text-center text-sm">If your shopping our 5 star appliances then you understand the value of a good deal! 5-star rated appliances get you an open box appliance that works perfectly, with very minor to no cosmetic damage like scratches or dents at a great discount. Our customers purchasing 5 star Cosmetic Cosmetic Rating appliances are generally looking for like new or new appliances while capitalizing on an open box discount vs a &quot;Scratch or Dent&quot; discounted appliance while still obtaining a 100% functional appliance.</p> */}
      </div>
    </div>
  );
};

export default ConditionReview;
