'use client';
import React, { useState } from 'react';
import CosmaticSlider from '../CosmaticSlider';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

const MassiveAppliance = ({ sliderstyle, title, customstyle }) => {
  const [relatedProducts, setRelatedProducts] = useState([
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
    {
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus non nam et explicabo assumenda. Molestias aperiam repudiandae ex eum!',
      author: 'Auhtor',
      rating: 4,
    },
  ]);

  return (
    <>
      {relatedProducts?.length > 0 ? (
        <div className="bg-b8">
          <div className={'maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px ' + customstyle}>
            <h2 className="mb-5 text-center text-2xl font-bold lg:mb-10 xl:mb-[60px] xl:text-32px">{title}</h2>

            <CosmaticSlider products={relatedProducts} sliderstyle={sliderstyle} />

            <div className="mt-10 flex justify-center lg:mt-14 xl:mt-[60px]">
              <Link href="" className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-sm font-medium text-b3 duration-300 hover:gap-2 3xl:text-base maxsm:w-full">
                <span>View More</span>
                <AiOutlineArrowRight className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MassiveAppliance;
