import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

const HelpAndSupportCard = ({ title, slug, category, shortDescription }) => {
  return (
    <>
      <Link href={`/help-and-support/${category}/${slug}`} className="rounded-2xl bg-[#F8FBFB] px-8 py-6">
        <div className="flex items-center justify-between text-b18">
          <h3 className="text-lg font-bold">{title}</h3>
          <span>
            <AiOutlineArrowRight className="text-lg" />
          </span>
        </div>
        <p className="mt-4 text-sm leading-6">{shortDescription}</p>
      </Link>
    </>
  );
};

export default HelpAndSupportCard;
