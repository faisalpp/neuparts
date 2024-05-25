'use client';
import React, { useState, useEffect } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import parse from 'html-react-parser';
import Loader2 from '@/components/Loader/Loader2';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';

const HelpCardPage = () => {
  const [blog, setBlog] = useState({ title: 'Lorem Ipsum Dolor', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero ultrices dis a arcu. Eu rhoncus, non suspendisse nec consequat enim. Proin natoque malesuada donec convallis lectus euismod nec, in. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero ultrices dis a arcu. Eu rhoncus, non suspendisse nec consequat enim. Proin natoque malesuada donec convallis lectus euismod nec, in.', category: 'help-category' });
  const [loading, setLoading] = useState(false);

  function wrapper(inputString) {
    if (inputString) {
      return inputString[0].toUpperCase() + inputString.slice(1);
    }
  }
  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <>
          <div className="mx-auto w-full px-4 py-10 sm:px-10 lg:px-16 2xl:px-120px 3xl:max-w-1680px">
            <Link href="/helpful-appliances-tips" className="mb-10 flex items-center gap-2 text-sm font-semibold text-b3 lg:hidden">
              <AiOutlineArrowLeft />
              Back
            </Link>
            {/* Bread Crumbs Start */}
            <div className="flex flex-wrap items-center">
              <h5 className="text-[10px] text-b3 sm:text-xs">Home</h5>
              <RiArrowDropRightLine className="text-base text-gray-500" />
              <h5 className="text-[10px] text-b3 sm:text-xs">Help & Support Center</h5>
              <RiArrowDropRightLine className="text-base text-gray-500" />
              <h5 className="text-[10px] text-b3 sm:text-xs">{blog ? wrapper(blog.category) : null}</h5>
              <RiArrowDropRightLine className="text-base text-gray-500" />
              <h5 className="text-[10px] text-gray-500 sm:text-xs">{blog ? blog.title : null}</h5>
            </div>
            {/* Bread Crumbs End */}
          </div>
          <div className="mx-auto w-full px-4 pb-10 sm:px-56 lg:px-[250px] lg:pb-16 xl:px-[270px] xl:pb-20 2xl:px-[310px]">
            <h1 className="mb-10 text-3xl font-bold">{blog ? blog.title : null}</h1>
            {blog ? parse(blog.content) : null}
          </div>
        </>
      )}
    </>
  );
};

export default HelpCardPage;
