'use client';
import React, { useEffect, useState } from 'react';
import SProductCard from '../components/SProductCard';
import { BsArrowRightShort } from 'react-icons/bs';
// import { GetAppliances } from '../api/frontEnd'
import Link from 'next/link';
import Image from 'next/image';

const ApplianceSection = ({ category, title, Style, linktitle }) => {
  const [applianceTypes, setApplianceTypes] = useState([
    {
      id: 'appliacne',
      product: [
        {
          title: 'Refrigerators',
          image: '/p1.webp',
          link: '',
        },
        {
          title: 'Washers & Dryers',
          image: '/p1.webp',
          link: '',
        },
        {
          title: 'Dishwashers',
          image: '/p1.webp',
          link: '',
        },
        {
          title: 'Washing Machines',
          image: '/p1.webp',
          link: '',
        },
        {
          title: 'Microwave',
          image: '/p1.webp',
          link: '',
        },
        {
          title: 'Ranges',
          image: '/p1.webp',
          link: '',
        },
      ],
    },
    {
      id: 'parts',
      product: [
        {
          title: 'Hoses & Pipes',
          image: '/parts-door.webp',
          link: '',
        },
        {
          title: 'Motors & Pulleys',
          image: '/parts-door.webp',
          link: '',
        },
        {
          title: 'Bolt & Knots',
          image: '/parts-door.webp',
          link: '',
        },
        {
          title: 'Racks & Trays',
          image: '/parts-door.webp',
          link: '',
        },
        {
          title: 'Doors',
          image: '/parts-door.webp',
          link: '',
        },
        {
          title: 'Sensors',
          image: '/parts-door.webp',
          link: '',
        },
      ],
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
    <div className={`flex flex-col items-center bg-b3/10 py-10 lg:py-14 xl:py-28 ${Style}`}>
      <h2 className="mb-4 px-3 text-center text-2xl font-bold md:text-3xl xl:text-4xl">{title}</h2>
      <div className="maincontainer mt-10 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:gap-10 2xl:gap-x-10 2xl:gap-y-14">
        {applianceTypes && category === 'appliance' && applianceTypes[0].product.map((item, index) => <SProductCard key={index} title={item.title} image={item.image} link={`/appliances/${item.slug}`} />)}
        {applianceTypes && category === 'parts' && applianceTypes[1].product.map((item, index) => <SProductCard key={index} title={item.title} image={item.image} link={`/appliances/${item.slug}`} />)}
      </div>
      <div className="mt-16 flex justify-center px-3">
        <Link href="/applianceTypes" className="flex w-fit items-center rounded-md border-[1px] border-b3 px-4 py-3 font-semibold text-b3">
          <span className="text-base">{linktitle}</span>
          <BsArrowRightShort className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default ApplianceSection;
