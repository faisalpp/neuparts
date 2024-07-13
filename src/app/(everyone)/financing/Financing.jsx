import React from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import { RiArrowDropRightLine } from 'react-icons/ri';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import PayTermCard from '@/components/Financing/PayTermCard';
import PriceRangeCard from '@/components/Financing/PriceRangeCard';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import Link from 'next/link';
import ShopAustinSection from '@/components/Appliances/ShopAustinSection';

const Financing = () => {
  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Blog</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Financing with Acima" description="Dedicated to providing innovative solutions for the appliance market. Our focus on customer service and out of the box thinking have allowed us to provide our community with savings on all things appliances." />
        <p className="mt-5 w-full text-b16 md:w-2/3 3xl:w-[1135px] maxmd:text-center">Our Appliance Outlets, Appliance Parts Store, and Appliance Wholesale Program each offer revolutionary solutions to problems within the Appliance Industry.</p>
        <a href="#apply-financing" className="mt-6 inline-flex items-center justify-center gap-1 rounded-lg border border-b3 px-4 py-3 text-xs font-medium text-b3 maxsm:w-full maxsm:text-sm">
          Apply for Financing{' '}
          <span>
            <AiOutlineArrowDown className="text-base" />
          </span>
        </a>
      </div>

      {/* Pay terms Cards */}
      <div className="maincontainer pb-10 pt-5 lg:pb-16 xl:pb-20 2xl:pb-120px [&>*]:text-b18">
        <h2 className="mx-auto w-full max-w-[720px] text-center text-2xl font-bold leading-8 xl:text-32px xl:leading-10">Acima is a third party NO-CREDIT NEEDED financing option.</h2>
        <p className="mx-auto mt-6 max-w-[640px] text-center leading-6">Here are some techniques that will help you pay the least and maximize your bang for your buck. In plain English, Acima purchases the items from us (Neu Appliances) and leases them to you until you pay it off. Once you pay it off, you own them.</p>
        <h3 className="my-10 text-center text-xl font-bold">Lease terms are 12 months with 3 ways to pay it off:</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PayTermCard image="timer.webp" title="Within 90 Days" description="You only pay: Initial Payment + $25 + Total" />
          <PayTermCard image="calendar.webp" title="Early Buyout Option" description="Usually 75% of the remaining payments owed" />
          <PayTermCard image="clock.webp" title="Full 12 Month Lease" description="Roughly 2x the cash price remaining" />
        </div>
      </div>

      {/* Pricing Range Cards */}

      <div className="bg-b3/10" id="apply-financing">
        <div className="maincontainer py-10 pt-5 lg:py-16 xl:py-20 2xl:py-120px [&>*]:text-b18">
          <h2 className="mx-auto w-full max-w-[778px] text-center text-2xl font-bold leading-8 xl:text-32px xl:leading-10">Neu Appliances recommends only purchasing what you can afford, stay in your price range.</h2>
          <p className="mx-auto mt-6 max-w-[640px] text-center leading-6">Acima is a 3rd party and has no affiliation with Neu Appliances. That&apos;s why we can give you our scoop on their offer without their influence.</p>
          <div className="my-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:my-12 xl:my-16 xl:grid-cols-3 2xl:my-[72px] [&>*:nth-child(1)>ul>li:nth-child(1)]:!items-start [&>*:nth-child(1)>ul>li:nth-child(2)]:!items-start [&>*:nth-child(1)>ul>li:nth-child(4)]:!items-start">
            <PriceRangeCard title="Requirements" items={['US government-issued photo ID and SS# or ITIN#', '3 month history with current employer or source of income', 'Checking account for at least 90 days', 'Deposit $1,000 or more into your checking account', 'Positive checking account activity']} />
            <PriceRangeCard title="Pros" items={['Fast Approval', 'No Credit Needed', 'Build Your Credit', '90 Day Payoff \n (Initial Payment) + (Price) + ($25)', 'Positive checking account activity']} />
            <PriceRangeCard title="Cons" items={['Can be expensive if not paid off in 90 days']} />
          </div>
          <div className="flex justify-center gap-2 maxsm:flex-col">
            <Link href="" className="inline-flex items-center justify-center gap-1 rounded-lg border bg-b3 px-4 py-3 text-xs font-medium text-white">
              Apply Now{' '}
              <div className="flex h-4 w-4 items-center">
                <BiLinkExternal className="h-4 w-4 text-white" />
              </div>
            </Link>
            <Link href="" className="inline-flex items-center justify-center gap-1 rounded-lg border border-b3 px-4 py-3 text-xs font-medium text-b3">
              View Acima FAQs
            </Link>
          </div>
        </div>
      </div>

      {/* Shop Austin Section */}
      <ShopAustinSection />

      {/* Client Reviews */}
      <div className="mb-3 xl:mb-10"></div>
      <SatisfiedSection page="financing" title="Join Thousands of Satisfied Customers." />

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default Financing;
