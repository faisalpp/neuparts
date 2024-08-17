'use client';
import React, { useEffect, useState } from 'react';
import ProductCard2 from '@/components/ProductCard2';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const PupularParts = ({ type }) => {
  const [loading, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await fetch(`/api/front/home?section=${type}`);
    const data = await res.json();
    if (data.success) {
      console.log(data.data);

      setData(data.data);
    }
    setLoader(false);
  };

  useEffect(() => {
    getData();
  }, ['']);

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    draggable: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          draggable: true,
          slidesToShow: 2.3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          draggable: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 425,
        settings: {
          draggable: true,
          slidesToShow: 1.04,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Image width={200} height={200} quality={100} className="h-auto w-auto" alt="Loader" src="/loader2.gif" unoptimized />
        </div>
      ) : (
        data.length > 0 && (
          <div className="maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px">
            <h2 className="text-center text-2xl font-bold md:mb-4 lg:text-3xl xl:text-4xl">Popular Parts</h2>
            <div className="mt-10 2xl:mt-20">
              <Slider {...settings} className="howitworkslider">
                {data.map((item, index) => (
                  <ProductCard2 key={index} product={item} sliderstyle="mx-2" />
                ))}
              </Slider>
            </div>
            <div className="mt-16 flex justify-center">
              <Link href="/products" className="flex w-fit items-center rounded-md border-[1px] border-b3 px-4 py-3 font-semibold text-b3">
                <span className="lg:text-sm xl:text-[16px]">View All Parts</span>
                <BsArrowRightShort className="text-2xl" />
              </Link>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default PupularParts;
