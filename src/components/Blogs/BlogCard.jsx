import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BlogCard = ({ image, title, date, readMore }) => {
  return (
    <div className="grid grid-cols-1 gap-5 xl:p-6 2xl:p-[30px]">
      <Image width={400} height={400} quality={100} src={image ? image : '/no-image.jfif'} alt="" className="h-48 w-full lg:h-52 xl:h-[238px]" />
      <div className="flex flex-col gap-[10px]">
        <span className="text-xs font-semibold uppercase text-b24">{date}</span>
        <h3 className="font-bold lg:text-lg xl:text-xl">{title}</h3>
      </div>
      <div>
        <Link href={`/blog/${readMore}`} className="rounded border border-b3 px-5 py-[10px]  text-xs font-bold text-b3 duration-300 hover:bg-b3 hover:text-white">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
