'use client';
import React, { useEffect, useState } from 'react';
import SProductCard from '../components/SProductCard';
import { BsArrowRightShort } from 'react-icons/bs';
// import { GetAppliances } from '../api/frontEnd'
import Link from 'next/link';
import Image from 'next/image';

const ApplianceSection = ({ title, Style }) => {
  const [applianceTypes, setApplianceTypes] = useState([
    {
      title: 'Appliance',
      image: '/p1.webp',
      link: '',
    },
    {
      title: 'Appliance',
      image: '/p1.webp',
      link: '',
    },
    {
      title: 'Appliance',
      image: '/p1.webp',
      link: '',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppliances = async () => {
      // const res = await GetAppliances({ limit: 5 });
      // if (res.status === 200) {
      //   setApplianceTypes(res.data.categories);
      //   setLoading(false)
      // }
    };
    getAppliances();
  }, []);

  return (
    <div className={`flex flex-col items-center bg-b8 px-4 py-10 md:px-10 lg:py-14 xl:py-28 ${Style}`}>
      <h2 className="mb-4 text-center text-xl font-bold xl:text-4xl">{title}</h2>
      <div className="maincontainer mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 2xl:gap-x-10 2xl:gap-y-14">
        {applianceTypes && applianceTypes.map((item, index) => <SProductCard key={index} title={item.title} image={item.image} link={`/appliances/${item.slug}`} />)}
        {/* All Appliances */}
        <Link href="/applianceTypes">
          <div className="maxmd:mx-auto maxmd:max-w-[330px]">
            <div className="flex flex-col items-center justify-center rounded-xl border-[1px] border-gray-200 bg-white p-10">
              <Image width={400} height={400} quality={100} alt="all" src="/all.webp" className="h-56" />
            </div>
            <h4 className=" mt-2 text-lg font-bold xl:text-xl">All Appliances</h4>
          </div>
        </Link>
      </div>
      <div className="mt-16 flex justify-center">
        <Link href="/applianceTypes" className="flex w-fit items-center rounded-md border-[1px] border-b3 px-4 py-3 font-semibold text-b3">
          <span className="lg:text-sm xl:text-[16px]">View All Categories</span>
          <BsArrowRightShort className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default ApplianceSection;
