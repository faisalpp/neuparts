'use client';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Wwsl from './Wwsl';

const WwslSection = () => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          draggable: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          draggable: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 425,
        settings: {
          draggable: true,
          slidesToShow: 1.03,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      {/* What We Sell Section Start */}
      <div className="flex w-full flex-col bg-b3/10 py-14 xl:py-20">
        <h4 className="text-center text-4xl font-bold">What We Sell</h4>
        <div className="maincontainer mb-5 mt-14 xl:mt-16">
          <Slider {...settings} className="pb-5 lg:pb-0">
            {wwslList.map((item, index) => (
              <Wwsl key={index} img={item.icon} title={item.title} description={item.description} note={item.note} />
            ))}
          </Slider>
          <p className="mt-10 px-4 text-center text-lg font-bold text-t1 xl:px-0 2xl:px-0 ">We deliver customers deep discounts by liquidating thousands of appliances from big box retailers right here in Austin, Tx!</p>
        </div>
      </div>
      {/* What We Sell Section End */}
    </>
  );
};
const wwslList = [
  { icon: '/wwsl1.webp', title: 'Scratch and Dent Appliances', description: 'Our Deep discounts on Scratch and Dent Appliances may include cosmetic imperfections like: scratches, dents, dings, scuffs or other marks that occurred during shipping, handling, or even during the manufacturing process.  We grade these appliances and apply huge savings!', note: 'The bigger the dent, the bigger the discount!' },
  { icon: '/wwsl2.webp', title: 'Floor Model & Display Appliances', description: "Floor Model and Display Model Appliances have been displayed in a showroom or retail store to show it's features and functions. Floor and Display Model appliances may have scratches or dents that occurred from this. Our deep discounts make these a great deal for the buyer!", note: 'The bigger the dent, the bigger the discount!' },
  { icon: '/wwsl3.webp', title: 'Open Box Appliances', description: 'Open Box Appliances have had their packaging opened for any reason but typically include appliances that were purchased and returned by a customer. If the Open Box Appliance has any cosmetic scratches or dents we provide huge discounts!', note: 'The bigger the dent, the bigger the discount!' },
  { icon: '/wwsl4.webp', title: 'Overstock Appliances', description: 'Overstock Appliances are brand new appliances that were purchased by a retailer or distributor in excess. Neu Appliance Outlet liquidates Overstock Appliances at huge discounts compared to their original price. We test, inspect and grade each appliance. Our huge discounts of Overstock A  ppliances keep our customers raving about our business!', note: 'The bigger the dent, the bigger the discount!' },
];
export default WwslSection;
