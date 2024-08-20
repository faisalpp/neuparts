import React from 'react';
import NewsLetterSection from '@/components/NewsLetterSection';
import { FaTwitter } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiOutlineInstagram } from 'react-icons/ai';
import moment from 'moment';
import parse from 'html-react-parser';
import Link from 'next/link';
import connect from '@/lib/db';
import Post from '@/models/posts';
import { notFound } from 'next/navigation';

const GetBlog = async (slug) => {
  await connect();

  const Blog = await Post.findOne({ postType: 'blog', slug: slug });
  if (Blog) {
    return Blog;
  } else {
    notFound();
  }
};

const BlogArticle = async ({ slug }) => {
  const blog = await GetBlog(slug);

  const FormatDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  };

  return (
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

      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default BlogArticle;
