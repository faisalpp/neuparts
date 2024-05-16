import Image from 'next/image';
import { MdSearch } from 'react-icons/md';

const HeroSection = () => {
  return (
    <>
      <div className="bg-blue-gradient relative py-10 lg:py-16 xl:py-20">
        <Image src="/hero-bg.webp" className="absolute inset-0 -z-10 h-full w-full" width={1000} height={1000} alt="Neuappliance" />
        <div className="maincontainer flex flex-col items-center space-y-10 text-center">
          <h1 className="text-40px font-extrabold text-white lg:text-4xl xl:text-5xl 2xl:text-6xl maxxl:leading-tight">Austin&apos;s Best Deals For Scratch & Dent Appliances</h1>
          <p className="text-white">Come for the Savings. Stay for the Quality and Service.</p>
          <div className="w-full max-w-[900px]">
            <div className="flex items-center gap-1">
              <button type="button" className="rounded-t-lg bg-darkpurple px-4 py-2 text-sm font-semibold text-white">
                Search By
              </button>
              <button type="button" className="rounded-t-lg bg-[#C4C4C4] px-4 py-2 text-sm font-semibold text-white">
                Browse By Tab
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2 rounded-lg bg-[#EBF8FE] p-4 md:grid-cols-[auto_auto_160px]">
              <input type="text" className="border-c-blue outline-none w-full rounded-lg border px-6 py-4 text-[#979797] shadow-[0px_0px_16px_rgba(0,0,0,0.08)] placeholder:text-[#979797]" placeholder="Enter model number" />
              <input type="text" className="border-c-blue outline-none w-full rounded-lg border px-6 py-4 text-[#979797] shadow-[0px_0px_16px_rgba(0,0,0,0.08)] placeholder:text-[#979797]" placeholder="Enter part number" />
              <button type="button" className="bg-c-blue flex h-full w-full max-w-40 items-center justify-center rounded-lg font-bold text-white">
                <MdSearch className="mr-2 text-2xl" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
