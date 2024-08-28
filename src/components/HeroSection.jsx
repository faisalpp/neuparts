'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { Select, Option } from '@material-tailwind/react';
import { StoreData } from '@/provider';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/svgs/Spinner';

const HeroSection = () => {
  const { partNo, modelNo, filteredModels, setPartNo, showSuggestions, modelSuggestions, error, searchLoading, SearchResult, handleModelNoChange, handleSuggestionClick, setError, handleSearchClick } = useContext(StoreData);

  const [searchBy, setSearchBy] = useState('tab');

  const router = useRouter();

  // const handleSearchClick = async () => {
  //   if (modelNo && !modelSuggestions.includes(modelNo)) {
  //     setError('Invalid model number.');
  //   } else {
  //     // Navigate to the search page
  //     await SearchResult();
  //     router.push(`/products?modelno=${modelNo}&partno=${partNo}`);
  //   }
  // };

  return (
    <>
      <div className="bg-blue-gradient relative py-10 md:pb-24 lg:pt-16 xl:pb-28 xl:pt-20">
        <Image src="/hero-bg.webp" className="absolute inset-0 -z-10 h-full w-full" width={1000} height={1000} alt="Neuappliance" />
        <div className="maincontainer flex flex-col items-center space-y-4 text-center md:space-y-10 xl:w-full xl:max-w-[800px]">
          <h1 className="text-32px font-extrabold text-white lg:text-4xl xl:text-5xl 2xl:text-6xl maxxl:leading-tight">
            Discount Appliance Repair{' '}
            <span className="relative z-10">
              Parts
              <Image width={200} height={200} quality={100} src="/best-details.webp" alt="Best Details" className="absolute -bottom-[1.2rem] -right-[3.4rem] -z-[1] hidden h-auto w-20 lg:block xl:-bottom-[0.9rem] xl:-right-[3.2rem] 2xl:-bottom-[0.2rem] 2xl:-right-[2.8rem]" />
              <Image width={200} height={200} quality={100} src="/deal-line.webp" alt="Best Details" className="absolute -right-[0.7rem] bottom-[1.3rem] hidden h-auto w-9 lg:block xl:-right-[0.5rem] xl:bottom-[1.6rem] 2xl:-right-[0.1rem] 2xl:bottom-[2.3rem]" />
            </span>
          </h1>
          <p className="text-lg text-white">Come for the Savings. Stay for the Quality and Service.</p>
          <div className="w-full max-w-[900px] maxmd:!mt-7">
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setSearchBy('tab')} className={`${searchBy === 'tab' ? 'bg-darkpurple' : 'bg-[#C4C4C4]'} rounded-t-lg px-4 py-2 text-sm font-semibold text-white`}>
                Search By
              </button>
              <button type="button" onClick={() => setSearchBy('browse-by')} className={`${searchBy === 'browse-by' ? 'bg-darkpurple' : 'bg-[#C4C4C4]'} rounded-t-lg px-4 py-2 text-sm font-semibold text-white`}>
                Browse By Tab
              </button>
            </div>
            {searchBy == 'tab' && (
              <>
                <div className="grid grid-cols-1 gap-3 rounded-lg rounded-tl-none bg-[#EBF8FE] p-4 md:grid-cols-[auto_160px] md:gap-2">
                  <div className="relative grid gap-3 md:grid-cols-2 md:gap-2">
                    <div className="relative w-full">
                      <input type="text" value={modelNo} onChange={(e) => handleModelNoChange(e.target.value)} className="w-full rounded-lg border border-b3 px-6 py-4 text-dark-gray shadow-[0px_0px_16px_rgba(0,0,0,0.08)] outline-none placeholder:text-dark-gray maxmd:text-lg" placeholder="Enter model number" />
                      {showSuggestions && modelNo && (
                        <ul className="absolute top-full z-20 mt-2 w-full rounded-lg bg-white shadow-lg">
                          {filteredModels.map((model, index) => (
                            <li key={index} className="cursor-pointer px-4 py-2 text-left hover:bg-gray-200" onClick={() => handleSuggestionClick(model)}>
                              {model}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <input type="text" value={partNo} onChange={(e) => setPartNo(e.target.value)} className="w-full rounded-lg border border-b3 px-6 py-4 text-dark-gray shadow-[0px_0px_16px_rgba(0,0,0,0.08)] outline-none placeholder:text-dark-gray maxmd:text-lg" placeholder="Enter part number" />
                    <Image width={400} height={400} quality={100} src="/best-result.webp" alt="Best Results" className="absolute -bottom-[3.8rem] left-0 right-0 z-10 mx-auto h-auto w-72 maxmd:hidden" />
                  </div>
                  <button type="button" onClick={() => handleSearchClick()} className="button-hover flex h-full w-full items-center justify-center rounded-lg py-3 font-bold text-white md:max-w-40 maxmd:text-lg">
                    {searchLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <MdSearch className="mr-2 text-2xl" />
                        Search
                      </>
                    )}
                  </button>
                  {error && <span className="text-left text-sm text-red-500">{error}</span>}
                </div>
                <Image width={400} height={400} quality={100} src="/best-result.webp" alt="Best Results" className="mx-auto mt-2 h-auto w-72 md:hidden" />
              </>
            )}
            {searchBy == 'browse-by' && (
              <>
                <div className="md:gapgap-2 grid grid-cols-1 gap-3 rounded-lg rounded-tl-none bg-[#EBF8FE] p-4 md:grid-cols-[auto_160px]">
                  <div className="cc-select relative grid grid-cols-1 justify-start gap-3 md:grid-cols-2 md:gap-2 [&>div]:h-[61px]">
                    <Select
                      label="Select manufacturer"
                      size="md"
                      className="bg-white px-6 py-4 text-dark-gray shadow-[0px_0px_16px_rgba(0,0,0,0.08)]"
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
                      className="bg-white px-6 py-4 text-dark-gray shadow-[0px_0px_16px_rgba(0,0,0,0.08)]"
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
                    <Image width={400} height={400} quality={100} src="/best-result.webp" alt="Best Results" className="absolute -bottom-[3.8rem] left-0 right-0 z-10 mx-auto h-auto w-72 maxmd:hidden" />
                  </div>
                  <Link href="/appliances-search" className="button-hover flex h-full w-full items-center justify-center rounded-lg py-3 font-bold text-white md:max-w-40 maxmd:text-lg">
                    <MdSearch className="mr-2 text-2xl" />
                    Search
                  </Link>
                </div>
                <Image width={400} height={400} quality={100} src="/best-result.webp" alt="Best Results" className="mx-auto mt-2 h-auto w-72 md:hidden" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
