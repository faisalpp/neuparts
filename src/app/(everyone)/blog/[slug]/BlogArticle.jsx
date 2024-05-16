'use client';
import React, { useEffect, useState } from 'react';
import NewsLetterSection from '@/components/NewsLetterSection';
import SatisfiedSection from '@/components/SatisfiedSection';
import { FaTwitter } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiOutlineInstagram } from 'react-icons/ai';
import moment from 'moment';
import parse from 'html-react-parser';
import Loader2 from '@/components/Loader/Loader2';
import Link from 'next/link';

const BlogArticle = ({ slug }) => {
  const [blog, setBlog] = useState({
    title: 'Blog Title',
    content: '',
    createdAt: '',
  });

  const [loading, setLoading] = useState(false);

  const GetBlog = async () => {};

  useEffect(() => {
    GetBlog();
  }, []);

  const FormatDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  };

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <>
          <div className="mx-auto w-full px-4 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20 xl:py-20 2xl:px-120px">
            <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-10 md:gap-14">
              <div>
                <h1 className="mb-4 text-28px font-bold leading-tight sm:text-4xl lg:text-40px coxs:text-3xl">{blog ? blog.title : null}</h1>
                <span className="tracking-[-0.4px] md:text-xl">{blog ? FormatDate(blog.createdAt) : null}</span>
              </div>
              <div>{parse(blog.content)}</div>

              {/* Share Post */}
              <div className="flex gap-2">
                <Link href="" className="flex h-10 w-10 items-center justify-center rounded-full border border-b3 bg-b3 p-3 text-white duration-300 hover:bg-white hover:text-b3">
                  <FaTwitter />
                </Link>
                <Link href="" className="flex h-10 w-10 items-center justify-center rounded-full border border-b3 bg-b3 p-3 text-white duration-300 hover:bg-white hover:text-b3">
                  <RiLinkedinFill />
                </Link>
                <Link href="" className="flex h-10 w-10 items-center justify-center rounded-full border border-b3 bg-b3 p-3 text-white duration-300 hover:bg-white hover:text-b3">
                  <AiOutlineInstagram />
                </Link>
              </div>
            </div>
          </div>

          <SatisfiedSection apiSectionName="blog-page-review" title="Our Customers Are RAVING About Our Appliance Outlet" dots={true} />

          <NewsLetterSection backimage="/Newsletter.webp" />
        </>
      )}
    </>
  );
};

export default BlogArticle;
