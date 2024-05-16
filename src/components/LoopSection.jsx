'use client';
import React, { useEffect, useState } from 'react';
import StayLoopSlider from './StayLoopSlider';
import { BsArrowRightShort } from 'react-icons/bs';
import Iframe2 from '@/components/Reusable/Iframe2';
import IframeSkelton from '@/components/Reusable/IframeSkelton';
import Link from 'next/link';

const LoopSection = () => {
  const [loopVideo, setLoopVideo] = useState([]);
  const [video, setVideo] = useState({ url: '', thumb: '' });
  const [type, setType] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Regenerate iframe
  const [genFrame, setGenFrame] = useState(false);

  useEffect(() => {
    const GetSingleVideoMedia = async () => {};
    GetSingleVideoMedia();
  }, [limit, page]);

  const [isIframe, setIsIframe] = useState(true);

  return (
    // <div className='flex flex-col mt-12 3xl:max-w-1680px px-120px mx-auto' >
    <div className="maincontainer mt-10 flex flex-col lg:mt-12">
      <div className="flex w-full flex-col items-center justify-center space-y-3">
        <h4 className="text-center text-2xl font-bold lg:text-4xl xl:text-4xl">Stay In The Loop</h4>
        <p className="w-11/12 text-center text-sm font-medium lg:w-7/12 lg:text-xl xl:w-[990px] xl:text-xl">Keep up with our videos about appliances we sell, New stock at our outlet store, product reviews, sales and much more!</p>
      </div>

      <div className="py-10 lg:mb-0 lg:py-16">
        {loopVideo.length === 0 ? <IframeSkelton style="col-start-1 col-end-6 object-cover w-full rounded-2xl 2xl:w-full xl:h-[651px] xl:w-full lg:w-full h-72 lg:h-[480px] md:w-full md:h-[400px]" /> : null}
        {loopVideo.length > 0 && type !== 'iframe' ? <video controls className="col-start-1 col-end-6 h-72 w-full rounded-2xl object-cover md:h-[400px] md:w-full lg:h-[480px] lg:w-full xl:h-[651px] xl:w-full 2xl:w-full" src={video} /> : null}
        {loopVideo.length > 0 && type === 'iframe' ? <Iframe2 isIframe={isIframe} setIsIframe={setIsIframe} thumbnail={video.thumb} genState={genFrame} setGenState={setGenFrame} divId="main-loop-div" frameId="loop-main-frame" icon="text-8xl" style="col-start-1 col-end-6 object-cover w-full rounded-2xl 2xl:w-full xl:h-[651px] xl:w-full lg:w-full h-72 lg:h-[480px] md:w-full md:h-[400px]" src={video.url} title={video.url} /> : null}
        <div>
          <StayLoopSlider isIframe={isIframe} setIsIframe={setIsIframe} parentId="main-loop-div" child="loop-main-frame" setGenState={setGenFrame} page={page} setPage={setPage} totalPages={totalPages} loopVideo={loopVideo} setLoopVideo={setLoopVideo} setVideo={setVideo} video={video} />
        </div>
        <div className="mt-10 flex justify-center lg:mt-16">
          <Link href="/stay-in-loop" className="flex w-fit items-center rounded-md border-[1px] border-b3 px-4 py-2 font-semibold text-b3">
            <span className="text-sm">View All Videos</span>
            <BsArrowRightShort className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoopSection;
