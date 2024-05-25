import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import FaqAccordion from './FaqAccordion';
import Image from 'next/image';

const InspectionScoreSection = () => {
  return (
    <>
      <div id="inspections" className="bg-b3/10">
        <div className="maincontainer flex flex-col items-center py-10 lg:py-14 xl:py-20">
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col items-center gap-5 2xl:gap-10">
              <h4 className="text-center text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">Our 100-Point Quality Inspections Score</h4>
              <p className="w-full text-center font-normal xl:text-xl 2xl:text-2xl">
                Quality matters. That’s why every product we sell is run through our extensive 100-point checklist. <br /> Every product you see meets perfect scores for Cosmetic Rating, quality, performance, and more
              </p>

              {/* CArd */}
              <div className="flex w-full flex-col rounded-lg bg-white px-5 py-5 md:w-2/3">
                <h4 className="text-xl font-semibold">Our Quality Control</h4>
                {/* Contaienr */}
                <div className="mt-4 flex flex-col space-y-4">
                  {/* Inspection card long */}
                  <div className="flex items-center rounded-md bg-[rgba(61,139,187,0.08)] px-5 py-4">
                    <div className="flex w-full items-center justify-between text-sm font-bold">
                      <h4 className="font-bold">Mechanical Test</h4>
                      <div className="flex items-center justify-end">
                        <div className="flex items-center space-x-3">
                          <AiOutlineCheckCircle className="text-xl text-b12" />
                          <h6 className="font-sm font-medium">Passed</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Inspection card long */}
                  <div className="flex items-center rounded-md bg-[rgba(61,139,187,0.08)] px-5 py-4">
                    <div className="flex w-full items-center justify-between text-sm font-bold">
                      <h4 className="font-bold">Cosmetic Inspection</h4>
                      <div className="flex items-center justify-end">
                        <div className="flex items-center space-x-3">
                          <AiOutlineCheckCircle className="text-xl text-b12" />
                          <h6 className="font-sm font-medium">Passed</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Inspection card long */}
                  <div className="flex items-center rounded-md bg-[rgba(61,139,187,0.08)] px-5 py-4">
                    <div className="flex w-full items-center justify-between text-sm font-bold">
                      <h4 className="font-bold">Mechanical Inspection</h4>
                      <div className="flex items-center justify-end">
                        <div className="flex items-center space-x-3">
                          <AiOutlineCheckCircle className="text-xl text-b12" />
                          <h6 className="font-sm font-medium">Passed</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center rounded-md bg-[rgba(61,139,187,0.08)] px-5 py-4">
                    <div className="flex w-full items-center justify-between text-sm font-bold">
                      <h4 className="font-bold">Final QC Check</h4>
                      <div className="flex items-center justify-end">
                        <div className="flex items-center space-x-3">
                          <AiOutlineCheckCircle className="text-xl text-b12" />
                          <h6 className="font-sm font-medium">Passed</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Guide */}
          <FaqAccordion
            title="See our Inspection Checklists"
            parent="w-full md:w-2/3 mt-2 bg-b3 text-white bg- p-6 rounded-xl h-auto"
            icon="text-xl"
            textStyle="font-medium text-sm"
            child="[&>p]:text-sm mt-6"
            answer={
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-3">
                  <Image width={200} height={200} quality={100} src="/tick.webp" className="h-4 w-4" alt="tick" />
                  <p>Lorem ipsum dolor sit amet</p>
                </li>
                <li className="flex items-center gap-3">
                  <Image width={200} height={200} quality={100} src="/tick.webp" className="h-4 w-4" alt="tick" />
                  <p>Lorem ipsum dolor sit amet</p>
                </li>
                <li className="flex items-center gap-3">
                  <Image width={200} height={200} quality={100} src="/tick.webp" className="h-4 w-4" alt="tick" />
                  <p>Lorem ipsum dolor sit amet</p>
                </li>
                <li className="flex items-center gap-3">
                  <Image width={200} height={200} quality={100} src="/tick.webp" className="h-4 w-4" alt="tick" />
                  <p>Lorem ipsum dolor sit amet</p>
                </li>
              </ul>
            }
            isExpand={true}
          />
        </div>
      </div>
    </>
  );
};

export default InspectionScoreSection;
