'use client';
import React, { useEffect, useState } from 'react';
import CosmaticSlider from '../CosmaticSlider';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';

const MassiveAppliance = ({ sliderstyle, title, customstyle }) => {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);

  const GetProducts = async () => {
    const res = await fetch('/api/front/popular-parts');
    const data = await res.json();
    if (data.success) {
      setProducts(data.products);
    }
    setLoader(false);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <>
      {loader ? (
        <div style={{ height: 'calc(100vh - 210px)' }} className="mb-2 flex w-72 items-center justify-center rounded-xl">
          <Image width={400} height={400} quality={100} alt="Loader" src="/loader2.gif" className="h-16 w-auto" />
        </div>
      ) : products.length > 0 ? (
        <div className="bg-b3/10">
          <div className={'maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px ' + customstyle}>
            <h2 className="mb-5 text-center text-2xl font-bold lg:mb-10 xl:mb-[60px] xl:text-32px">{title}</h2>

            <CosmaticSlider products={products} sliderstyle={sliderstyle} />

            <div className="mt-10 flex justify-center lg:mt-14 xl:mt-[60px]">
              <Link href="" className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-b3 px-4 py-3 text-sm font-medium text-b3 duration-300 hover:gap-2 3xl:text-base maxsm:w-full">
                <span>View More</span>
                <AiOutlineArrowRight className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MassiveAppliance;
