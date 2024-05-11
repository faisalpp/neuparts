import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, customStyle, iconColor }) => {
  return (
    <div className={`flex flex-col gap-4 rounded-[19.021px] p-10 lg:p-14 ${customStyle ? customStyle : 'bg-b21'}`}>
      <div className={`flex h-[88px] w-[88px] items-center justify-center rounded-full ${iconColor ? iconColor : 'bg-b3'}`}>
        <img src={`/svgs/` + icon} className="h-10 w-10" alt="" />
      </div>
      <h3 className="text-lg font-bold text-b18">{title}</h3>
      <p className="text-black">{description}</p>
      <div>
        <Link href="" className="inline-flex items-center gap-1 rounded-lg border border-b16 px-4 py-3 text-xs text-b16">
          Learn More
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
};

export default FeatureCard;
