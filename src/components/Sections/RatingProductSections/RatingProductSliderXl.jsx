'use client';
import React from 'react';
import ProductCard2 from '../../ProductCard2';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const RatingProductSliderXl = ({ items, stars }) => {
  const data = items;

  return (
    <>
      <CarouselProvider naturalSlideWidth={300} naturalSlideHeight={480} totalSlides={data.length} visibleSlides={4}>
        <ButtonNext className="absolute z-40 lg:-left-10 lg:top-52 xl:-left-16 xl:top-56">
          <div className="flex rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-400">
            <BsArrowLeftShort className="text-lg" />
          </div>
        </ButtonNext>
        <Slider className="ratingproductslider pb-44 2xl:pb-20 coxl:pb-32 3xl:pb-0">
          {data?.map((item, index) => (
            <Slide key={index} index={0}>
              <ProductCard2 product={item} />
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="absolute right-10 z-40 lg:-right-10 lg:top-52 xl:-right-14 xl:top-56">
          <div className="group flex cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500">
            <BsArrowRightShort className="text-xl" />
          </div>
        </ButtonBack>
      </CarouselProvider>
    </>
  );
};

export default RatingProductSliderXl;
