import Image from 'next/image';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

const ProductCard = ({ categorySlug, title, image, rating, brandimage, brandname, colorimage, colorname }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      {title || rating ? (
        <div className="rounded-2xl border border-gray-300 p-3 maxmd:mx-auto maxmd:max-w-[330px]">
          <Image width={400} height={400} quality={100} src={image} className="mx-auto h-80 w-auto" alt={title} />
          <div className="mt-5 flex w-full flex-col items-center gap-2 lg:mt-2">
            {rating ? <h3 className="font-semibold">{capitalizeFirstLetter(categorySlug.replace(/\-/g, ' '))}</h3> : <h3 className="font-semibold">{title}</h3>}
            {rating ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">Cosmetic Rating:</span>
                <StarIconPrinter numberOfTimes={parseInt(rating)} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {brandimage ? (
        // Popular Brands
        <div className="populerbrands">
          <div className="flex h-[133px] items-center justify-center rounded-2xl border border-gray-300 p-3">
            <Image width={400} height={400} quality={100} src={brandimage} className="h-[133px] w-auto object-contain" alt={brandname} />
          </div>
          <h3 className="mt-3 px-3 text-center font-semibold">{brandname}</h3>
        </div>
      ) : // End Popular Brands
      null}
      {colorimage ? (
        <div className="colortype">
          <Image width={400} height={400} quality={100} src={colorimage} className="h-44 w-auto object-cover sm:h-56 xs:h-52" alt={colorname} />
          <h3 className="mt-3 px-2 text-center font-semibold">{colorname}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
