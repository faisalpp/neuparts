import React from 'react';
import BlogCard from './BlogCard';
import moment from 'moment';
import Image from 'next/image';

const RecentStories = ({ load, data, LoadMore }) => {
  const FormatDate = (date) => {
    return moment(date).format('MMMM D, YYYY');
  };

  return (
    <div className="mx-auto w-full px-4 pb-10 pt-5 sm:px-10 lg:px-16 lg:pb-16 xl:px-20 xl:pb-20 2xl:px-120px 3xl:max-w-1680px">
      {data.length > 0 ? (
        <>
          <h2 className="text-center text-2xl font-bold text-b18 xl:text-32px">Recent Stories</h2>
          <div className="my-10 grid grid-cols-1 gap-x-4 gap-y-10 md:!grid-cols-3 2xl:gap-6 xs:grid-cols-2">{data.length > 0 && data.map((blog, index) => <BlogCard key={index} image={blog.thumbnail ? blog.thumbnail : '/no-image.jfif'} title={blog.title.substr(0, 50)} date={FormatDate(blog.createdAt)} readMore={blog.slug} />)}</div>
          <div className="flex justify-center">
            <button type="button" onClick={LoadMore} className="rounded-lg border border-b3 bg-b3 px-4 py-3 text-xs font-medium text-white duration-300 hover:bg-white hover:text-b3">
              {load ? <Image width={400} height={400} quality={100} alt="Loader" src="loader-bg.gif" className="h-5 w-5" /> : 'Read More'}
            </button>
          </div>
        </>
      ) : (
        <div className="flex w-full justify-center">
          <Image width={400} height={400} quality={100} src="/not-found.webp" className="h-auto w-32" alt="Not Found" />
        </div>
      )}
    </div>
  );
};

export default RecentStories;
