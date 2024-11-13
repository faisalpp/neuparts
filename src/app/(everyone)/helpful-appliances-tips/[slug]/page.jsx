'use client';
import React, { useState, useEffect } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import HelpAndSupportCard from '@/components/HelpAndSupportCard';
import Pagination2 from '@/components/Pagination/Pagination2';
import Image from 'next/image';

const Page = ({ params }) => {
  const { slug } = params;

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const [helpTabs, setHelpTabs] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getTipsCat = async (term) => {
    let search = '';
    if (term) {
      search = term;
    }

    const res = await fetch(`/api/front/blog/appliance-tips/by-category/?category=${slug}&page=${page}&limit=${limit}&search=${search}`);
    const data = await res.json();
    if (data.success) {
      setTotalCount(data.pagination.totalCount);
      setPage(data.pagination.pageCount);
      setHelpTabs(data.blogs);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTipsCat();
  }, []);

  const handleEnterKey = async (e) => {
    setLoading(true);
    setTimeout(() => {
      getTipsCat(e.target.value);
    }, 1000);
  };

  return (
    <>
      <div className="maincontainer flex flex-col gap-4 py-10">
        {/* Bread Crumbs Start */}
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b3" />
          <h5 className="text-xs text-black">Helpful Appliance Tips</h5>
        </div>
        {/* Bread Crumbs End */}
        <h1 className="text-32px font-bold text-b18 lg:text-40px">Helpful Appliance Tips</h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-[560px]">
          <input value={search} onKeyDown={(e) => handleEnterKey(e)} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="What do you need help with?" className="w-full rounded-lg border border-[rgba(0,0,0,0.16)] py-4 pl-10 pr-4 outline-none placeholder:text-xs placeholder:text-[#777E90]" />
          <AiOutlineSearch className="absolute left-4 top-5 text-base" />
        </div>
      </div>
      {/* Help and Support */}
      <div className="maincontainer flex flex-col pb-10 lg:pb-16 xl:pb-20">
        {loading ? (
          <div className="flex  w-full items-center justify-center">
            <Image width={200} height={200} quality={100} className="h-auto w-auto" alt="Loader" src="/loader2.gif" unoptimized />
          </div>
        ) : (
          <div className="tab-content w-full">
            {helpTabs.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {helpTabs.map((blog, index) => (
                  <HelpAndSupportCard key={index} title={blog.title} parent="gap-3 bg-[#F8FBFB] [&>div>h6]:maxmd:text-sm text-white p-4 md:px-8 md:py-6 rounded-xl border-none text-b18 h-auto" icon="text-xl text-black" textStyle="font-bold text-md text-b18" child="[&>p]:text-sm text-b18 font-normal" category="helpful-appliances-tips" subcategory={slug} slug={blog.slug} shortDescription={blog.content} />
                ))}
              </div>
            ) : (
              <div className="mt-10 flex h-full w-full justify-center">
                <Image width={400} height={400} quality={100} alt="Not Found" src="/not-found.webp" className="h-36 w-36" />
              </div>
            )}
          </div>
        )}
        {totalCount > 1 ? <Pagination2 page={page} setPage={setPage} totalPages={totalCount} /> : null}
      </div>
    </>
  );
};

export default Page;
