'use client'
import React, { useEffect, useState } from 'react';
import NewsLetterSection from '@/components/NewsLetterSection';
import { FaTwitter } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiOutlineInstagram } from 'react-icons/ai';
import moment from 'moment';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const BlogArticle = ({ slug }) => {
  
  const [blog,setBlog] = useState()
  const [loading,setLoading] = useState(true)
  const router = useRouter()

  const GetBlog = async () => {
    fetch(`/api/front/blog?slug=${slug}`)
    .then((res)=>res.json())
    .then((data)=>{setBlog(data.blog);setLoading(false)})
    .catch((error)=>{
     router.push('/404')
    })
  }

  useEffect(()=>{
   GetBlog()
  },[])

  const FormatDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  };

  return (
    <>
     {loading ? 
     <div class="max-w-4xl mx-auto p-4">
     
     <div class="bg-gray-300 h-64 md:h-80 w-full rounded-lg animate-pulse"></div>
   
   
     <div class="mt-6">
       <div class="bg-gray-300 h-6 w-3/4 rounded-lg animate-pulse"></div>
     </div>
   
     <div class="mt-4 space-y-4">
       <div class="bg-gray-300 h-4 w-full rounded-lg animate-pulse"></div>
       <div class="bg-gray-300 h-4 w-5/6 rounded-lg animate-pulse"></div>
       <div class="bg-gray-300 h-4 w-2/3 rounded-lg animate-pulse"></div>
       <div class="bg-gray-300 h-4 w-4/5 rounded-lg animate-pulse"></div>
     </div>
   </div>   
     :
      <div className="mx-auto w-full px-4 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20 xl:py-20 2xl:px-120px">
        <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-10 md:gap-14">
          <div>
            <h1 className="mb-4 text-28px font-bold leading-tight sm:text-4xl lg:text-40px coxs:text-3xl">{blog ? blog?.title : null}</h1>
            <span className="tracking-[-0.4px] md:text-xl">{blog ? FormatDate(blog?.createdAt) : null}</span>
          </div>
          <div>{parse(blog?.content ? blog.content : '')}</div>

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
       }
      <NewsLetterSection backimage="/Newsletter.webp" />
    </>
  );
};

export default BlogArticle;
