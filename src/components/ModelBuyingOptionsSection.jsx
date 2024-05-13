import React from 'react';
import ModelBuyingOptionCard from './ModelBuyingOptionCard';
import ModelBuyingOptionCardDisabled from './ModelBuyingOptionCardDisabled';
import { AiFillStar, AiOutlineDollarCircle } from 'react-icons/ai';
import { FaFire } from 'react-icons/fa';
import { FiLink2 } from 'react-icons/fi';
import Link from 'next/link';

const ModelBuyingOptionsSection = ({ slug, threeStar, fourStar, fiveStar, modelNo, title, disabledImg, rating }) => {
  return (
    <>
      <div id="compare" className="mx-auto w-full items-center px-4 py-14 md:px-10 lg:px-16 xl:px-20 xl:py-20 2xl:px-[180px] 3xl:max-w-1680px">
        <h4 className="text-center text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">Buying Options for Model Number {modelNo}</h4>

        <div>
          <div className="flex w-full flex-col items-center justify-center pt-14 xl:pt-20">
            <div className="flex h-full w-full rounded-md border border-gray-200">
              {/* Specifications */}
              <div className="h-12/12 mb-[90px] hidden flex-col items-center justify-end whitespace-nowrap lg:flex">
                <div className="flex flex-col gap-7 px-6 pr-12 2xl:pl-6">
                  <h6 className="text-sm font-bold xl:text-base">Cosmetic Ratings</h6>
                  <h6 className="text-sm font-bold xl:text-base">Price</h6>
                  <h6 className="text-sm font-bold xl:text-base">Model Number</h6>
                  <h6 className="text-sm font-bold xl:text-base">ID #</h6>
                  <h6 className="text-sm font-bold xl:text-base">Cosmetic Condition</h6>
                  <h6 className="text-sm font-bold xl:text-base">Mechanical Test</h6>
                  <h6 className="text-sm font-bold xl:text-base">Inspections</h6>
                  <h6 className="text-sm font-bold xl:text-base">Warranty</h6>
                  <h6 className="text-sm font-bold xl:text-base">Class</h6>
                </div>
              </div>

              <div className="flex w-full flex-col border border-b-0 border-r-0 border-t-0 border-gray-200">
                <div className="py-3">
                  <div className="flex w-full justify-center text-sm font-semibold text-[#111010]">
                    <h5>{title}</h5>
                  </div>
                </div>

                <div className="flex justify-center border-t maxlg:flex-wrap">
                  {threeStar ? (
                    <ModelBuyingOptionCard
                      slug={slug}
                      image={threeStar.media}
                      slugg={threeStar.slug}
                      price={threeStar.isSale ? threeStar.salePrice : threeStar.regPrice}
                      modelNo={threeStar.modelNo}
                      itemId={threeStar.itemId}
                      rating={threeStar.rating}
                      cosmaticcondition="Moderate Cosmetic Damage"
                      bestValue={
                        <span className="flex items-center rounded-2xl bg-b9 px-4 py-1 text-xs xl:text-sm">
                          <AiOutlineDollarCircle className="mr-1" /> Best Value
                        </span>
                      }
                    />
                  ) : (
                    <ModelBuyingOptionCardDisabled
                      image={disabledImg}
                      price={600}
                      modelNo={123456}
                      itemId={654321}
                      rating={3}
                      cosmaticcondition="Moderate Cosmetic Damage"
                      bestValue={
                        <span className="flex items-center rounded-2xl bg-b32/60 px-4 py-1 text-xs xl:text-sm">
                          <AiOutlineDollarCircle className="mr-1" /> Best Value
                        </span>
                      }
                    />
                  )}
                  {fourStar ? (
                    <ModelBuyingOptionCard
                      slug={slug}
                      image={fourStar.media}
                      slugg={fourStar.slug}
                      price={fourStar.isSale ? fourStar.salePrice : fourStar.regPrice}
                      modelNo={fourStar.modelNo}
                      itemId={fourStar.itemId}
                      rating={fourStar.rating}
                      cosmaticcondition="Minor Cosmetic Damage"
                      bestValue={
                        <span className="flex items-center rounded-2xl bg-b3 px-4 py-1 text-xs xl:text-sm">
                          <FaFire className="mr-1" />
                          Most Popular
                        </span>
                      }
                    />
                  ) : (
                    <ModelBuyingOptionCardDisabled
                      image={disabledImg}
                      price={800}
                      modelNo={123456}
                      itemId={654321}
                      rating={4}
                      cosmaticcondition="Minor Cosmetic Damage"
                      bestValue={
                        <span className="flex items-center rounded-2xl bg-b32/60 px-4 py-1 text-xs xl:text-sm">
                          <FaFire className="mr-1" />
                          Most Popular
                        </span>
                      }
                    />
                  )}
                  {fiveStar ? (
                    <ModelBuyingOptionCard
                      slug={slug}
                      image={fiveStar.media}
                      slugg={fiveStar.slug}
                      price={fiveStar.isSale ? fiveStar.salePrice : fiveStar.regPrice}
                      modelNo={fiveStar.modelNo}
                      itemId={fiveStar.itemId}
                      rating={fiveStar.rating}
                      cosmaticcondition="Very Minor- No Cosmetic"
                      bestValue={
                        <span className="flex items-center rounded-2xl bg-b7 px-4 py-1 text-xs xl:text-sm">
                          <AiFillStar className="mr-1 text-white" />
                          Premium Condition
                        </span>
                      }
                    />
                  ) : (
                    <ModelBuyingOptionCardDisabled
                      image={disabledImg}
                      price={1200}
                      modelNo={123456}
                      itemId={654321}
                      rating={5}
                      cosmaticcondition="Very Minor- No Cosmetic"
                      bestValue={
                        <span className="flex items-center rounded-2xl bg-b32/60 px-4 py-1 text-xs xl:text-sm">
                          <AiFillStar className="mr-1 text-white" />
                          Premium Condition
                        </span>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 text-center">
          <Link href={`/products/buying-options/?modelNo=${modelNo}`} className="mx-auto mt-5 flex items-center justify-center gap-1 font-semibold text-b7">
            <FiLink2 stroke-width="3" /> View More Buying Options
          </Link>
        </div>
      </div>
    </>
  );
};

export default ModelBuyingOptionsSection;
