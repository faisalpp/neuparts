'use client';
import React, { useEffect, useState } from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import { RiArrowDropRightLine } from 'react-icons/ri';
import NewsLetterSection from '@/components/NewsLetterSection';
import RecentStories from '@/components/Blogs/RecentStories';
import { AiOutlineArrowDown } from 'react-icons/ai';
import Loader2 from '@/components/Loader/Loader2';

const Blogs = () => {
  const [clicks, setClicks] = useState(0);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog1.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog2.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog3.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog4.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog5.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog6.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog7.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog8.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
    {
      title: 'Congue gravida semper fusce eu et elementum. Mi tempor.',
      slug: 'test-blog',
      thumbnail: '/blogs/blog9.webp',
      createdAt: '2023-08-07T20:08:48.296+00:00',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    GetBlogs();
  }, []);

  const GetBlogs = async () => {};

  const MoreBlogs = async (nextPage) => {};

  const LoadMore = () => {
    if (clicks < page) {
      setPage((prevPage) => prevPage + 1);
      setClicks((prevClicks) => prevClicks + 1);
      MoreBlogs(page + 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <>
          <div className="mx-auto w-full px-4 py-10 sm:px-10 lg:px-16 lg:py-16 xl:px-20 xl:py-20 2xl:px-120px 3xl:max-w-1680px">
            {/* Bread Crumbs Start */}
            <div className="flex items-center">
              <h5 className="text-xs text-b3">Home</h5>
              <RiArrowDropRightLine className="text-xl text-b19" />
              <h5 className="text-xs text-black">Blog</h5>
            </div>
            {/* Bread Crumbs End */}
            <ApplianceDetail title="Appliance Industry Blog" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla. Phasellus non felis eu lectus pellentesque tincidunt. Sed eget facilisis tortor. Nulla eget imperdiet ex, consectetur pharetra ligula." />

            <button type="button" className="mt-6 inline-flex items-center gap-1 rounded-lg border border-b3 px-4 py-3 text-xs font-medium text-b3">
              See All Stories{' '}
              <span>
                <AiOutlineArrowDown className="text-base" />
              </span>
            </button>
          </div>

          {/* Recent Stories */}
          <RecentStories load={load} data={blogs} LoadMore={LoadMore} />

          <NewsLetterSection backimage="/Newsletter.webp" />
        </>
      )}
    </>
  );
};

export default Blogs;
