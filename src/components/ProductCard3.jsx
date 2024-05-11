import React from 'react';
import { AiOutlineQuestionCircle, AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard3 = ({ isGrid, product }) => {
  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const firstImg = product.media ? product.media.find((item) => item.file === 'image') : '/p1.webp';

  return (
    <>
      {isGrid ? (
        <div className="w-12/12 flex h-fit cursor-pointer flex-col items-center rounded-2xl border-[1px] border-gray-200 py-5">
          <Link href={`/product/${product.slug}`}>
            <div className="relative">
              <Image width={400} height={400} quality={190} src={firstImg} alt="Product Feature Image" className={`h-[330px] w-[355px] object-contain`} />
              {product.salePrice !== '' ? <span className="absolute -top-2 right-0 rounded-2xl bg-b7 px-5 py-2 text-xs font-semibold">{(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}% OFF</span> : null}
            </div>
            <p className="line-clamp-3 px-5 text-sm font-semibold">{product.title}</p>
            {product.salePrice !== '' ? (
              <div className="mt-5 flex space-x-20">
                <h4 className="font-semibold text-b3">${product.salePrice}</h4>
                <div className="flex w-full items-center justify-end space-x-2">
                  <strike>${product.regPrice}</strike>
                  <span className="rounded-xl bg-b4 px-2 py-1 text-xs font-semibold">-{(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex space-x-20">
                <h4 className="font-semibold text-b3">${product.regPrice}</h4>
              </div>
            )}
            <div className="mt-4 flex space-x-20">
              <div className="flex items-center">
                <h4 className="w-20 min-w-20 text-sm font-semibold">Cosmetic Rating</h4>
                <AiOutlineQuestionCircle />
              </div>
              <StarIconPrinter numberOfTimes={parseInt(product.rating)} />{' '}
            </div>
            <div className="mt-2 flex items-center space-x-10">
              <div className="flex text-sm font-semibold">
                <h4>Discount</h4>&nbsp;%
              </div>
              <div className="w-[150px] rounded-lg bg-gray-100">
                <span className="flex h-2 w-28 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <Link className="h-fit" href={`/product/${product.slug}`}>
          <div className="flex w-full cursor-pointer space-x-2 rounded-2xl border-[1px] border-gray-200 px-2 py-5 lg:space-x-10 lg:px-8 lg:py-10">
            <div className="relative w-44 coxs:w-52">
              <Image width={400} height={400} quality={190} src={firstImg.data} alt="Product Feature Image" className="h-60 w-60 object-contain" />
              {product.salePrice !== '' ? <span className="absolute -top-4 right-0 flex rounded-2xl bg-b4 px-3 py-1 text-[8px] font-semibold sm:text-xs lg:-right-6 lg:-top-5 lg:py-2 coxs:text-[11px]">{(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}% OFF</span> : null}
            </div>

            <div className="flex w-[60%] flex-col px-1 lg:px-5 3xl:w-[55%]">
              <div className="relative">
                {/* <div className='absolute -top-3 lg:hidden flex justify-end w-full h-fit' ><span className='lg:hidden bg-b7 rounded-2xl font-semibold lg:px-5 px-4 py-2 lg:text-xs text-[9px]' >50% OFF</span></div> */}
                <p className="text-sm font-semibold lg:text-lg 3xl:text-xl">{product.title}</p>
              </div>

              <div className="mt-1 flex gap-1 sm:items-center lg:mt-5 coxs:gap-2 xs:mt-2 maxcosm:flex-col">
                <div className="flex items-center gap-6 sm:gap-10">
                  <h4 className="text-xs font-semibold text-b3 lg:text-[16px]">${product.salePrice != '' ? product.salePrice : product.regPrice}</h4>
                  {product.salePrice !== '' ? (
                    <span className="text-xs lg:text-[16px]">
                      <strike>${product.regPrice}</strike>
                    </span>
                  ) : null}
                </div>
                <div>{product.salePrice !== '' ? <span className="rounded-xl bg-b4 px-2 py-1 text-xs font-semibold">- {(100 - (product.salePrice / product.regPrice) * 100).toFixed(0)}%</span> : null}</div>
              </div>
              <div className="mt-1 flex flex-wrap gap-x-6 lg:mt-4 coxs:mt-2 coxs:items-center maxxs:flex-col">
                <div className="flex items-center gap-1 sm:gap-2">
                  <h4 className="w-max text-xs font-semibold lg:text-sm">
                    Cosmetic <br /> Rating
                  </h4>
                  <AiOutlineQuestionCircle />
                </div>
                <div className="flex items-center">
                  <StarIconPrinter numberOfTimes={product.rating} />
                </div>
              </div>
              <div className="mt-2 hidden items-center gap-3 sm:gap-x-6 xs:flex">
                <div className="flex items-center gap-1 text-xs font-semibold sm:gap-2 lg:text-sm">
                  <h4>Discount</h4>&nbsp;%
                </div>
                <div className="w-full rounded-lg bg-gray-100">
                  <span className="flex h-2 w-32 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ProductCard3;
