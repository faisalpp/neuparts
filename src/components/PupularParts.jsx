'use client';
import React, { useEffect, useState } from 'react';
import ProductCard2 from '@/components/ProductCard2';
import Link from 'next/link';
import { BsArrowRightShort } from 'react-icons/bs';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PupularParts = () => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 6,
    // draggable: false,
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

  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);

  const GetPopularParts = async () => {
    const res = await fetch('/api/front/popular-parts');
    const data = await res.json();
    if (data.success) {
      setProducts(data.products);
      setLoader(false);
    }
  };

  useEffect(() => {
    GetPopularParts();
  }, []);

  return (
    <>
      {loader ? null : products.length > 0 ? (
        <div className="maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px">
          <h2 className="text-center text-2xl font-bold md:mb-4 lg:text-3xl xl:text-4xl">Popular Parts</h2>
          <div className="mt-10 2xl:mt-20">
            <Slider {...settings} className="howitworkslider">
              {products.map((item, index) => (
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
      ) : null}
    </>
  );
};

export default PupularParts;
