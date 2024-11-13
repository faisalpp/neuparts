import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import parse from 'html-react-parser';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Link from 'next/link';
import connect from '@/lib/db';
import HelpCategories from '@/models/helpsCategories';
import Posts from '@/models/posts';
import { notFound } from 'next/navigation';

const GetBlog = async (category, slug) => {
  await connect();

  const cat = await HelpCategories.findOne({ slug: category });
  if (cat) {
    const blog = await Posts.findOne({ postType: 'blog-help-support', slug: slug, category: cat._id });
    return { blog, category: cat };
  } else {
    notFound();
  }
};

const HelpCardPage = async ({ params }) => {
  const category = params[0];
  const slug = params[1];
  const data = await GetBlog(category, slug);

  function wrapper(inputString) {
    if (inputString) {
      return inputString[0].toUpperCase() + inputString.slice(1);
    }
  }

  return (
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
          <h5 className="text-[10px] text-b3 sm:text-xs">{data?.category ? wrapper(data.category.title) : null}</h5>
          <RiArrowDropRightLine className="text-base text-gray-500" />
          <h5 className="text-[10px] text-gray-500 sm:text-xs">{data?.blog ? data.blog.title : null}</h5>
        </div>
        {/* Bread Crumbs End */}
      </div>
      <div className="mx-auto w-full px-4 pb-10 sm:px-56 lg:px-[250px] lg:pb-16 xl:px-[270px] xl:pb-20 2xl:px-[310px]">
        <h1 className="mb-10 text-3xl font-bold">{data?.blog ? data.blog.title : null}</h1>
        {data?.blog ? parse(data.blog.content) : null}
      </div>
    </>
  );
};

export default HelpCardPage;
