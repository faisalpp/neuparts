import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const BlogCard = ({ image, title, date, readMore }) => {
  const [thumbnail,setThumbnail] = useState(image ? image : '/no-image.webp')
  return (
    <div className="grid grid-cols-1 gap-5 xl:p-6 2xl:p-[30px]">
      <Link href={`/blog/${readMore}`}>
        <Image onErrorCapture={()=>setThumbnail('/no-image.webp')} width={400} height={400} quality={100} src={thumbnail} alt="" className="h-48 w-full lg:h-52 xl:h-[238px]" />
      </Link>
      <div className="flex flex-col gap-[10px]">
        <span className="text-xs font-semibold uppercase text-b24">{date}</span>
        <Link href={`/blog/${readMore}`}>
          <h3 className="font-bold lg:text-lg xl:text-xl">{title}</h3>
        </Link>
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
