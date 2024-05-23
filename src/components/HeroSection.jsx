'use client';
import Image from 'next/image';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { Select, Option } from '@material-tailwind/react';

const HeroSection = () => {
  const [searchBy, setSearchBy] = useState('tab');
  return (
    <>
      <div className="bg-blue-gradient relative py-10 md:pb-24 lg:pt-16 xl:pb-28 xl:pt-20">
        <Image src="/hero-bg.webp" className="absolute inset-0 -z-10 h-full w-full" width={1000} height={1000} alt="Neuappliance" />
        <div className="maincontainer flex flex-col items-center space-y-10 text-center xl:w-full xl:max-w-[800px]">
          <h1 className="text-40px font-extrabold text-white lg:text-4xl xl:text-5xl 2xl:text-6xl maxxl:leading-tight">
            Discount Appliance Repair{' '}
            <span className="relative z-10">
              Parts
              <Image width={200} height={200} quality={100} src="/best-details.webp" alt="Best Details" className="absolute -bottom-[1.2rem] -right-[3.4rem] -z-[1] hidden h-auto w-20 lg:block xl:-bottom-[0.9rem] xl:-right-[3.2rem] 2xl:-bottom-[0.2rem] 2xl:-right-[2.8rem]" />
              <Image width={200} height={200} quality={100} src="/deal-line.webp" alt="Best Details" className="absolute -right-[0.7rem] bottom-[1.3rem] hidden h-auto w-9 lg:block xl:-right-[0.5rem] xl:bottom-[1.6rem] 2xl:-right-[0.1rem] 2xl:bottom-[2.3rem]" />
            </span>
          </h1>
          <p className="text-white xl:text-lg">Come for the Savings. Stay for the Quality and Service.</p>
          <div className="w-full max-w-[900px]">
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setSearchBy('tab')} className={`${searchBy === 'tab' ? 'bg-darkpurple' : 'bg-[#C4C4C4]'} rounded-t-lg px-4 py-2 text-sm font-semibold text-white`}>
                Search By
              </button>
              <button type="button" onClick={() => setSearchBy('browse-by')} className={`${searchBy === 'browse-by' ? 'bg-darkpurple' : 'bg-[#C4C4C4]'} rounded-t-lg px-4 py-2 text-sm font-semibold text-white`}>
                Browse By Tab
              </button>
            </div>
            {searchBy == 'tab' && (
              <div className="grid grid-cols-1 gap-2 rounded-lg rounded-t-none bg-[#EBF8FE] p-4 md:grid-cols-[auto_160px]">
                <div className="relative grid gap-2 md:grid-cols-2">
                  <input type="text" className="text-dark-gray placeholder:text-dark-gray w-full rounded-lg border border-b3 px-6 py-3 shadow-[0px_0px_16px_rgba(0,0,0,0.08)] outline-none md:py-4" placeholder="Enter model number" />
                  <input type="text" className="text-dark-gray placeholder:text-dark-gray w-full rounded-lg border border-b3 px-6 py-3 shadow-[0px_0px_16px_rgba(0,0,0,0.08)] outline-none md:py-4" placeholder="Enter part number" />
                  <Image width={400} height={400} quality={100} src="/best-result.webp" alt="Best Results" className="absolute -bottom-[3.8rem] left-0 right-0 z-10 mx-auto h-auto w-72" />
                </div>
                <button type="button" className="button-hover flex h-full w-full max-w-40 items-center justify-center rounded-lg py-3 font-bold text-white">
                  <MdSearch className="mr-2 text-2xl" />
                  Search
                </button>
              </div>
            )}
            {searchBy == 'browse-by' && (
              <div className="grid grid-cols-1 gap-2 rounded-lg rounded-t-none bg-[#EBF8FE] p-4 md:grid-cols-[auto_160px]">
                <div className="cc-select relative grid justify-start gap-2 md:grid-cols-2 [&>div]:h-[47.33px] md:[&>div]:h-[57.33px]">
                  <Select
                    label="Select manufacturer"
                    size="md"
                    className="text-dark-gray bg-white px-6 py-3 shadow-[0px_0px_16px_rgba(0,0,0,0.08)] md:py-4"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    {[1, 2, 3, 4].map((item, index) => (
                      <Option key={index} className="text-left">
                        Manufacturer {item}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    label="Select category"
                    size="md"
                    className="text-dark-gray bg-white px-6 py-3 shadow-[0px_0px_16px_rgba(0,0,0,0.08)] md:py-4"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                  >
                    {[1, 2, 3, 4].map((item, index) => (
                      <Option key={index} className="text-left">
                        Category {item}
                      </Option>
                    ))}
                  </Select>
                  <Image width={400} height={400} quality={100} src="/best-result.webp" alt="Best Results" className="absolute -bottom-[3.8rem] left-0 right-0 z-10 mx-auto h-auto w-72" />
                </div>
                <button type="button" className="button-hover flex h-full w-full max-w-40 items-center justify-center rounded-lg py-3 font-bold text-white">
                  <MdSearch className="mr-2 text-2xl" />
                  Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
