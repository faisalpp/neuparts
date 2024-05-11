'use client';
import React, { useEffect, useState } from 'react';
import { BsGrid } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { AiFillStar, AiOutlineArrowRight } from 'react-icons/ai';
import ToolTip from '@/components/ToolTip';
import Pagination from '@/components/Pagination/Pagination2';
import Image from 'next/image';
import Link from 'next/link';

const BuyingOptions = ({ rating, modelNo, threeStarCount, fourStarCount, fiveStarCount }) => {
  const [isGrid, setIsGrid] = useState(true);
  const StarIconPrinter = ({ numberOfTimes, color }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className={`${color ? color : 'text-b7'} text-lg`} /> // Render the star icon component for each iteration
    ));

    return <div className="flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const [filter, setFilter] = useState('all');
  const [options, setOptions] = useState([
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      modelNo: '213213',
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      modelNo: '213213',
      bulletDescription: ['2123213', '123213', '2132131'],
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      modelNo: '213213',
    },
    {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, autem!',
      isSale: true,
      salePrice: 279.0,
      regPrice: 230.0,
      rating: 5,
      modelNo: '213213',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalCount, setTotalCount] = useState(1);

  const GetBuyingOptions = async () => {};

  useEffect(() => {
    GetBuyingOptions();
  }, [filter, page]);

  return (
    <div className="my-60px">
      <div className="flex w-full justify-between whitespace-nowrap">
        <h2 className="text-2xl font-bold text-black">Buying Options</h2>
        <div className="flex w-full items-center justify-end space-x-5">
          <BsGrid className={`cursor-pointer ${isGrid ? 'text-b3' : ''}`} onClick={() => setIsGrid(true)} />
          <FaBars className={`cursor-pointer ${isGrid ? '' : 'text-b3'}`} onClick={() => setIsGrid(false)} />
        </div>
      </div>
      <div className="my-10 flex items-center gap-8">
        <h3>Filter by Cosmetic Ratings</h3>
        <div className="flex items-center gap-10px">
          <button onClick={() => setFilter('all')} className={`rounded-full border border-b33 px-5 py-4 text-sm font-semibold hover:shadow-md`}>
            Show All
          </button>
          {fiveStarCount > 0 ? (
            <button onClick={() => setFilter(5)} className={`flex items-center justify-center gap-10px rounded-full border border-b33 px-5 py-4 text-sm font-semibold shadow-sm hover:shadow-md `}>
              5 Star rating <StarIconPrinter numberOfTimes={5} />
            </button>
          ) : (
            <div className={`flex cursor-not-allowed items-center justify-center gap-10px rounded-full border border-b33 bg-b31/20 px-5 py-4 text-sm font-semibold  shadow-sm hover:shadow-md `}>
              5 Star rating <StarIconPrinter numberOfTimes={5} color="text-b31" />
            </div>
          )}
          {fourStarCount > 0 ? (
            <button onClick={() => setFilter(4)} className={`flex items-center justify-center gap-10px rounded-full border border-b33 px-5 py-4 text-sm font-semibold shadow-sm hover:shadow-md `}>
              4 Star rating <StarIconPrinter numberOfTimes={4} />
            </button>
          ) : (
            <div className={`flex cursor-not-allowed items-center justify-center gap-10px rounded-full border border-b33 bg-b31/20 px-5 py-4 text-sm font-semibold shadow-sm hover:shadow-md `}>
              4 Star rating <StarIconPrinter numberOfTimes={4} color="text-b31" />
            </div>
          )}
          {threeStarCount > 0 ? (
            <button onClick={() => setFilter(3)} className={`flex items-center justify-center gap-10px rounded-full border border-b33 px-5 py-4 text-sm font-semibold shadow-sm hover:shadow-md `}>
              3 Star rating <StarIconPrinter numberOfTimes={3} />
            </button>
          ) : (
            <div className={`flex cursor-not-allowed items-center justify-center gap-10px rounded-full border border-b33 bg-b31/20 px-5 py-4 text-sm font-semibold shadow-sm hover:shadow-md `}>
              3 Star rating <StarIconPrinter numberOfTimes={3} color="text-b31" />
            </div>
          )}
        </div>
      </div>
      {/* Product Card */}
      {loading ? (
        <div style={{ height: 'calc(100vh - 100px)' }} className="flex w-full items-center justify-center">
          <Image width={400} height={400} alt="loader2" quality={100} src="/loader2.gif" className="h-18 w-auto" />
        </div>
      ) : options?.length > 0 ? (
        <>
          <div className={`grid gap-6 ${isGrid ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {options.map((item, index) => (
              <div key={index} className={`rounded-2xl border border-b14 p-6 ${isGrid ? '' : 'flex items-center gap-4'}`}>
                <div className="relative min-h-[270px] min-w-[222px]">
                  <Image width={400} height={400} quality={100} src={item.media ? item.media.find((item) => item.file === 'image').data : ''} alt="p1" className={`h-[270px] w-[222px] object-contain ${isGrid ? 'mx-auto' : ''}`} />
                  <div className="absolute -right-3 -top-3 flex items-center justify-center rounded-full bg-b7 px-3 py-2 text-sm font-semibold text-b16">{(100 - (item.salePrice / item.regPrice) * 100).toFixed(0)}% Off</div>
                </div>
                <div className="mt-6 flex w-full flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-b15">ID Number</span>
                    {item.itemId}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-b15">Model Number</span>
                    {item.modelNo}
                  </div>
                  <div className="flex items-center gap-10px">
                    <h3 className="flex w-max items-center gap-1 text-xs font-semibold text-b15 lg:text-sm">
                      Cosmetic <br /> Rating <ToolTip color="text-b15" />
                    </h3>
                    <StarIconPrinter numberOfTimes={item.rating} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold text-b3">${item.isSale ? item.salePrice : item.regPrice}</span>
                    {item.isSale ? (
                      <span className="flex items-center gap-2">
                        <strike className="text-b23">${item.regPrice}</strike> <span className="rounded-full bg-b4 px-2 py-1 text-xs font-semibold text-b16">- {(100 - (item.salePrice / item.regPrice) * 100).toFixed(0)}%</span>
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-10px">
                    <span className="text-sm font-semibold text-b15">Disbcount %</span>
                    <div className="grow rounded-lg bg-black/[0.08]">
                      <span className="flex h-2 w-3/5 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
                    </div>
                  </div>
                  <Link href={`/product/${item.slug}`} className="flex w-full items-center justify-center gap-1 rounded-lg bg-b7 px-4 py-3 text-xs font-semibold text-white hover:underline">
                    View Appliance <AiOutlineArrowRight className="text-white" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} setPage={setPage} totalPages={totalCount} />
        </>
      ) : (
        <div style={{ height: 'calc(100vh - 100px)' }} className="flex w-full items-center justify-center">
          <Image width={400} height={400} quality={100} alt="Not Found" src="/not-found.webp" className="h-auto w-32" />
        </div>
      )}
    </div>
  );
};

export default BuyingOptions;
