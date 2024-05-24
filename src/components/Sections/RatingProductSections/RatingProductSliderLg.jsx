'use client';
import React from 'react';
import ProductCard2 from '../../ProductCard2';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';

const RatingProductSliderLg = ({ items, stars }) => {
  return (
    <>
      <CarouselProvider naturalSlideWidth={300} naturalSlideHeight={470} totalSlides={6} visibleSlides={3}>
        <ButtonNext className="absolute left-0 top-48 z-40 lg:-left-16 lg:top-52 xl:-left-10 xl:top-56">
          <div className="flex rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-400">
            <BsArrowLeftShort className="text-lg" />
          </div>
        </ButtonNext>
        <Slider className="ratingproductslider lg:mx-2">
          <Slide index={0}>
            <ProductCard2 stars={stars} />
          </Slide>
          <Slide index={1}>
            <ProductCard2 stars={stars} />
          </Slide>
          <Slide index={2}>
            <ProductCard2 stars={stars} />
          </Slide>
          <Slide index={3}>
            <ProductCard2 stars={stars} />
          </Slide>
          <Slide index={4}>
            <ProductCard2 stars={stars} />
          </Slide>
          <Slide index={5}>
            <ProductCard2 stars={stars} />
          </Slide>
        </Slider>
        <ButtonBack className="absolute right-0 top-48 z-40 lg:-right-8 lg:top-52 xl:-right-6 xl:top-56">
          <div className="group flex cursor-pointer rounded-full bg-b1/50 px-2 py-2 text-white hover:bg-cyan-500">
            <BsArrowRightShort className="text-xl" />
          </div>
        </ButtonBack>
      </CarouselProvider>
    </>
  );
};

export default RatingProductSliderLg;
