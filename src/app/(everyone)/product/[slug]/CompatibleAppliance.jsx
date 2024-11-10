'use client';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BiLoaderAlt } from 'react-icons/bi';
import { FiCheck } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

const CompatibleAppliance = ({ product }) => {
  const [models, setModels] = useState([]);
  const [modelNo, setModelNo] = useState('');
  const [loading, setLoading] = useState(true);
  const [modelCompatible, setModelCompatible] = useState(false);
  const [result, setResult] = useState(false);
  const resultRef = useRef(null);

  const fetchModels = async () => {
    await fetch(`/api/front/product/single/models?slug=${product.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setModels(data.models);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleSearch = () => {
    if (modelNo) {
      // Convert both user input and models to lowercase for case-insensitive comparison
      const isCompatible = models.some((model) => model.toLowerCase() === modelNo.toLowerCase());
      setModelCompatible(isCompatible);
      setResult(true);

      // Scroll to the result section
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="bg-b3/5" id="testimonials-view">
      <div className="maincontainer py-10 lg:py-16 xl:py-20 2xl:py-120px">
        {result ? (
          <h2 ref={resultRef} className="mb-14 text-center text-2xl font-bold xl:my-60px xl:text-32px">
            Compatible Appliances with Part <span className="text-dark-red">{product.part_number}</span>
          </h2>
        ) : (
          <>
            <h2 className="mb-4 text-center text-2xl font-bold lg:text-3xl xl:text-4xl">
              Part <span className="text-dark-red">{product.part_number}</span>
            </h2>
            <h2 className="my-14 mb-4 text-center text-2xl font-bold xl:my-60px xl:text-32px">Compatible Appliance Model Numbers</h2>
          </>
        )}

        {loading ? (
          <div className="flex justify-center py-10">
            <BiLoaderAlt className="animate-spin text-3xl" />
          </div>
        ) : (
          <>
            <div className="mx-auto flex w-full max-w-2xl items-center gap-2 maxsm:flex-col">
              <input type="text" value={modelNo} onChange={(e) => setModelNo(e.target.value)} className="w-full rounded-lg border border-white bg-white px-4 py-3 text-sm font-medium outline-none duration-200 placeholder:font-medium placeholder:text-b1/50 focus:border-b3" placeholder="Search your model number to check compatibility" />
              <button type="button" onClick={handleSearch} className="button-hover flex cursor-pointer items-center justify-center rounded-md px-4 py-3 text-white">
                <BiSearch />
                <span className="ml-1 text-xs font-medium">Search</span>
              </button>
            </div>
            {result && (
              <div className="mt-14 flex md:w-11/12 mx-auto items-center gap-2 rounded-md bg-white px-4 py-4 md:gap-4 lg:px-8 xl:mt-60px maxlg:flex-wrap">
                <Image src={product.thumbnail ?? '/no-image.webp'} className="h-14 w-14 object-contain md:h-20 md:w-20" width={80} height={80} quality={100} alt={product.title} />
                <h2 className="line-clamp-1 text-lg font-semibold maxlg:flex-1">{product.title}</h2>

                {modelCompatible ? (
                  <div className="flex items-center gap-1 rounded-lg bg-[#00EE34] px-2.5 py-1.5 text-xs font-semibold lg:whitespace-nowrap maxlg:basis-full">
                    <div className="grid h-6 min-w-6 place-items-center rounded-full bg-black text-[#00EE34]">
                      <FiCheck />
                    </div>
                    Compatible Part
                  </div>
                ) : (
                  <div className="flex items-start gap-1 rounded-lg bg-dark-red px-2.5 py-1.5 xl:whitespace-nowrap maxlg:basis-full">
                    <div className="grid h-6 min-w-6 place-items-center rounded-full bg-white text-dark-red">
                      <RxCross2 />
                    </div>
                    <div>
                      <span className="block text-xs font-extrabold leading-3 text-white">NOT COMPATIBLE</span>
                      <span className="block text-xs leading-3 text-white">
                        Part {product.part_number} is not compatible with model number {modelNo}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="overflow-x-auto">
              <div className="mt-14 rounded-2xl border border-b1/10 bg-white xl:mt-60px maxmd:w-[768px]">
                <div className="p-6 font-bold text-b16">Model Numbers</div>
                <div className="max-h-[435px] overflow-y-auto">
                  <div className="grid grid-cols-3">
                    {models.length > 0 &&
                      models.map((item, index) => (
                        <div key={index} className={`border-r font-bold text-b16 border-t border-b1/10 p-6 ${item.toLowerCase() === modelNo.toLowerCase() ? 'bg-[#00EE3421]' : ''}`}>
                          {item}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompatibleAppliance;
