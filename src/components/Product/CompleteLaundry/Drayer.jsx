import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ToolTip from '../../ToolTip';

const Drayer = () => {
  const DRYER = useSelector((state) => state.laundary?.dryer);

  const StarIconPrinter = ({ numberOfTimes }) => {
    const starIcons = Array.from({ length: numberOfTimes }, (_, index) => (
      <AiFillStar key={index} className="text-lg text-b7" /> // Render the star icon component for each iteration
    ));

    return <div className="mt-2 flex items-center">{starIcons}</div>; // Render the array of star icons
  };

  const ExtendTag = ({ name }) => {
    return (
      <>
        {name === 'top-refrigerator-bottom-freezer' ? (
          <div className="flex h-fit w-fit cursor-pointer flex-col items-center rounded-md border-[1px] border-[rgba(0,0,0,0.15)] px-2 py-2 hover:shadow-md">
            <h5 className="text-[9px] font-medium">TOP REFRIGERAOTR</h5>
            <span className="flex h-[1px] w-full bg-[rgba(0,0,0,0.15)]"></span>
            <h5 className="text-[9px] font-medium">BOTTOM FREEZER</h5>
          </div>
        ) : null}
        {name === 'top-freezer-bottom-refrigerator' ? (
          <div className="flex h-fit w-fit cursor-pointer flex-col items-center rounded-md border-[1px] border-[rgba(0,0,0,0.15)] px-2 py-2 hover:shadow-md">
            <h5 className="text-[9px] font-medium">TOP FREEZER</h5>
            <span className="flex h-[1px] w-full bg-[rgba(0,0,0,0.15)]"></span>
            <h5 className="text-[9px] font-medium">BOTTOM REFRIGERAOTR</h5>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      {DRYER ? (
        <div className="flex w-full flex-col items-center gap-4">
          <h4 className="text-xl font-semibold">Dryer</h4>
          <div className="w-full rounded-xl border-[1px] border-b3 bg-white py-6 pr-7 2xl:pr-12">
            <div className="flex w-full flex-col items-start gap-4 xl:flex-row xl:gap-0 2xl:flex-row">
              <div className="h-[209px] w-full max-w-[195px]">
                <img src={DRYER.media} className="h-full w-full object-contain" alt="" />
              </div>
              <div className="grid w-full grid-cols-1 gap-4 2xl:p-0 2xl:pl-7">
                <p className="mb-2 line-clamp-1 font-semibold leading-5">{DRYER.title}</p>
                <div className="flex items-center gap-x-5">
                  <span className="text-xl font-semibold text-b3">${DRYER.isSale ? DRYER.salePrice : DRYER.regPrice}</span>
                  {DRYER.isSale ? <strike className="text-b23">${DRYER.regPrice}</strike> : null}
                  {DRYER.isSale ? <span className="flex rounded-full bg-b4 px-2 py-1 text-xs font-semibold text-b16">-{(100 - (DRYER.salePrice / DRYER.regPrice) * 100).toFixed(0)}%</span> : null}
                </div>
                <div className="flex items-center gap-5 xl:gap-[5px] 2xl:gap-[10px]">
                  <div className="flex items-center gap-1">
                    <h4 className="w-max text-xs font-semibold text-b15 lg:text-sm">Cosmetic Rating</h4>
                    <ToolTip color="text-b15/80" />
                  </div>
                  <div className="flex items-center">
                    <StarIconPrinter numberOfTimes={DRYER.rating} />
                  </div>
                </div>
                <div className="flex items-center gap-5 xl:gap-4 2xl:gap-10">
                  <h4 className="text-xs font-semibold text-b15 lg:text-sm">Appliance Brand</h4>
                  <h4 className="w-max text-xs font-medium capitalize text-black lg:text-sm">{DRYER.brand}</h4>
                </div>
                <div className="hidden items-center gap-6 lg:flex 2xl:gap-x-14 ">
                  <div className="flex text-sm font-semibold text-b15">
                    <h4>Discount</h4>&nbsp;%
                  </div>
                  <div className="w-full rounded-lg bg-gray-100">
                    <span className="flex h-2 w-32 rounded-lg bg-gradient-to-r from-b4 to-b7"></span>
                  </div>
                </div>
                <ul className="flex w-full flex-col gap-y-3  text-black">
                  {/* <li>. Lorem ipsum dolor alter miler amigos</li> */}
                  {DRYER?.bulletDescription?.length > 0 ? DRYER?.bulletDescription.slice(0, 3).map((bullet) => <li className="text-[11px]">{bullet}</li>) : null}
                </ul>
                <div className="flex flex-col">
                  <h5 className="text-sm font-semibold xl:text-xs">Dryer Options</h5>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {DRYER.tags
                      ? DRYER.tags.map((item, index) => (
                          <>
                            {item.selected ? <ExtendTag id={item.id} name={item.el} selected={item.selected} /> : null}
                            {item.selected ? (
                              <div key={index} className={`border-[rgba(0,0,0,0.15)]} flex h-fit w-fit cursor-pointer items-center space-x-1 rounded-md border-[1px] px-3 py-2 hover:shadow-md`}>
                                {item.icon !== '' ? <img src={`/tags/${item.icon}.png`} className="h-6 w-6" /> : null}
                                <span>
                                  <h5 className="text-[10px] font-medium">{item.name}</h5>
                                </span>
                              </div>
                            ) : null}
                          </>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center gap-4">
          <h4 className="text-xl font-semibold">Dryer</h4>
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-b31 py-10">
            <div className="flex flex-col items-center space-y-3">
              <FaQuestion className="mb-4 text-4xl" />
              <div className="flex justify-center">
                <Link href="" className="flex items-center rounded-md bg-b7 px-4 py-3 text-xs font-bold text-white">
                  <span className="">Choose A Dryer</span>
                  <BsArrowRightShort className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drayer;
