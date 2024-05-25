import React from 'react';
import DeliveryMap from './Map/DeliveryMap';
import Image from 'next/image';

const MapSection = () => {
  return (
    <>
      <div className="bg-b3/10">
        <h4 className="py-10 text-center text-xl font-bold lg:py-14 lg:text-2xl xl:py-60px xl:text-3xl 2xl:text-4xl">Neu Local Delivery Area</h4>
        <div className="maincontainer relative h-full pb-10 lg:pb-14 xl:pb-20">
          <Image alt="free" width={700} height={700} quality={100} src="/free.webp" className="absolute right-0 top-10 z-40 w-20 lg:-right-8 lg:top-5 lg:w-36 xl:-right-10 xl:top-0 xl:w-52" />

          {/* Map Section End */}
          <DeliveryMap customStyle="flex flex-col lg:grid grid-cols-3 3xl:grid-cols-4 items-center [&>#map_cc]:col-span-2 [&>#ap_cc]:3xl:col-span-3" />

          {/* <div className='bg-red-500 w-11/12 h-[490px] rounded-2xl' ></div> */}
        </div>
      </div>
    </>
  );
};

export default MapSection;
