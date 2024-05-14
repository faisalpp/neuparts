import React from 'react';
import Link from 'next/link';
import { BiLinkExternal, BiPlayCircle } from 'react-icons/bi';
import SolutionSvg from '@/components/svgs/SolutionSvg';
import Image from 'next/image'

const ApplianceParts = () => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-[rgba(248,211,87,0.08)] px-3 2xl:p-7 xs:p-10 3xl:p-10 maxcosm:py-5">
      <a href="https://www.neuapplianceparts.com/" target="_new">
        <Image width={400} height={400} src="/nueappliancesparts.webp" alt="nueappliancesparts" className="h-16 w-auto" />
      </a>
      <div className="flex flex-col gap-3 text-b18">
        <h3 className="text-2xl font-bold">Neu Appliance Parts</h3>
        <p className="leading-6">Replacing an appliance part can be difficult and expensive. Correctly identifying which part you need and limited applianceion rates make finding Affordable In-Stock parts nearly impossible.</p>
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-3 text-b18">
          <p className="font-bold">Neu Appliance Parts provides the solution you are looking for:</p>
          <div className="flex flex-col gap-3 text-b18">
            <p>Our Website&apos;s Tools For Success include:</p>
            <ul className="flex flex-col gap-2">
              {ToolLists.map((item, index) => (
                <li key={index} className="flex items-start gap-3 py-[15px]">
                  <div className="h-10 w-10">
                    <SolutionSvg />
                  </div>
                  <p className="text-sm font-medium">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="inline-flex flex-col gap-2 pt-6 sm:flex-row">
          <Link href="http://neuapplianceparts.com" target="_blank" className="flex items-center justify-center gap-1 rounded-lg bg-b4 px-4 py-3 text-xs font-medium text-b16">
            <span>Go to Neu Appliance Parts</span>
            <BiLinkExternal className="text-sm text-b18" />
          </Link>
          <Link href="https://youtu.be/GliOcJH2pSM" target="_blank" className="flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-[#071822] px-4 py-3 text-xs font-medium text-[#071822]">
            <BiPlayCircle className="text-sm text-[#071822]" />
            <span>Watch Video</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplianceParts;

const ToolLists = ['Revolutionary Appliance Parts store specializing in providing deeply discounted In-Stock appliance parts.', 'Specializing in Open Box and Like/New Appliance parts to save our customers money, our appliance processing center uninstalls tens of thousands of Like New appliance parts from new scratch and dent appliances every year.', 'Offering the public and appliance repair professionals an affordable solution for otherwise hard to source or expensive appliance parts.'];
