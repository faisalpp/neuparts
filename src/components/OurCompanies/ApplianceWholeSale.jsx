import React from 'react';
import Link from 'next/link';
import { BiLinkExternal, BiPlayCircle } from 'react-icons/bi';
import ScratchSvg2 from '@/components/svgs/ScratchSvg2';
import Image from 'next/image';

const ApplianceWholeSale = () => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-b8 px-3 2xl:p-7 xs:p-10 3xl:p-10 maxcosm:py-5">
      <a href="http://neuappliancewholesale.com/" target="_new">
        <Image width={400} height={400} quality={100} src="/nueapplianceswholesale.webp" alt="nueapplianceswholesale" className="h-16 w-auto" />
      </a>
      <div className="flex flex-col gap-3 text-b18">
        <h3 className="text-2xl font-bold">Neu Appliance Wholesale</h3>
        <p className="leading-6">Wholesale distributor of appliance liquidation inventory like Scratch and dent, customer return or salvage appliances by the truckload. We are appliance dealers&apos; best option for wholesale appliance inventory in bulk.</p>
      </div>
      <div className="flex flex-col gap-3 text-b18">
        <p className="font-bold">Our wholesale customers use our services to stock their showrooms with quality appliance inventory supply by the truckload including:</p>
        <ul className="grid grid-cols-2 gap-2 text-b18">
          {SupplyLists.map((item, index) => (
            <li key={index} className="flex items-center gap-2 rounded-lg bg-[#F6FDFE] py-4 pl-4 pr-2 md:py-6">
              <div className="h-8 w-8">
                <ScratchSvg2 />
              </div>
              <p className="text-[10px] font-medium md:text-sm">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="inline-flex flex-col gap-2 pt-6 sm:flex-row lg:pt-[57px]">
        <Link href="https://www.neuappliancewholesale.com" className="flex items-center justify-center gap-1 rounded-lg bg-b3 px-4 py-3 text-xs font-medium text-white">
          <span>Go to Neu Appliance Wholesale</span>
          <span>
            <BiLinkExternal className="text-sm text-white" />
          </span>
        </Link>
        <Link href="https://www.youtube.com/watch?v=UjUl8PSALbM" target="_blank" className="flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-xs font-medium text-b3">
          <span>
            <BiPlayCircle className="text-sm text-b3" />
          </span>
          <span>Watch Video</span>
        </Link>
      </div>
    </div>
  );
};

export default ApplianceWholeSale;

const SupplyLists = ['Scratch & Dent Appliances', 'Customer Return Appliances', 'Salvage Appliances', 'Used Appliances', 'General Liquidation Appliances', 'and more'];
