import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const CompatibleAppliance = () => {
  const [modelNo, setModelNo] = useState([
    {
      modelNo: 'WF45B6300AC',
      partNo: 'WF45B6300AC',
      thirdNo: 'WF45B6300AC',
    },
    {
      modelNo: 'WF45B6300AC',
      partNo: 'WF45B6300AC',
      thirdNo: 'WF45B6300AC',
    },
    {
      modelNo: 'WF45B6300AC',
      partNo: 'WF45B6300AC',
      thirdNo: 'WF45B6300AC',
    },
    {
      modelNo: 'WF45B6300AC',
      partNo: 'WF45B6300AC',
      thirdNo: 'WF45B6300AC',
    },
    {
      modelNo: 'WF45B6300AC',
      partNo: 'WF45B6300AC',
      thirdNo: 'WF45B6300AC',
    },
    {
      modelNo: 'WF45B6300AC',
      partNo: 'WF45B6300AC',
      thirdNo: 'WF45B6300AC',
    },
    {
      modelNo: 'WF45B6300AC',
      partNo: 'WF45B6300AC',
      thirdNo: 'WF45B6300AC',
    },
  ]);
  return (
    <div className="bg-b3/5" id="testimonials-view">
      <div className="maincontainer flex flex-col justify-center py-10 lg:py-16 xl:py-20 2xl:py-120px">
        <h2 className="mb-4 text-center text-2xl font-bold lg:text-3xl xl:text-4xl">
          Part <span className="text-dark-red">LGWM0L2CRV2T2</span>
        </h2>
        <h2 className="my-14 mb-4 text-center text-2xl font-bold xl:my-60px xl:text-32px">Compatible Appliance Model Numbers</h2>
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2 maxsm:flex-col">
          <input type="text" className="w-full rounded-lg border border-white bg-white px-4 py-3 text-sm font-medium outline-none duration-200 placeholder:font-medium placeholder:text-b1/50 focus:border-b3" placeholder="Search your model number to check compatibility" />
          <button type="button" className="button-hover flex cursor-pointer items-center justify-center rounded-md px-4 py-3 text-white">
            <BiSearch />
            <span className="ml-1 text-xs font-medium">Search</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="mt-14 rounded-2xl border border-b1/10 bg-white xl:mt-60px maxmd:w-[768px]">
            <div className="p-6">Model Numbers</div>
            <div className="h-[435px] overflow-y-auto">
              {modelNo.map((item, index) => (
                <div key={index} className="grid grid-cols-3">
                  <div className="border-r border-t border-b1/10 p-6">{item.modelNo}</div>
                  <div className="border-r border-t border-b1/10 p-6">{item.partNo}</div>
                  <div className="border-r border-t border-b1/10 p-6">{item.thirdNo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompatibleAppliance;
