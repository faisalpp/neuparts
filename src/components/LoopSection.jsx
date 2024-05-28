'use client';
import React, { useEffect, useState } from 'react';
import StayLoopSlider from './StayLoopSlider';
import { BsArrowRightShort } from 'react-icons/bs';
import Iframe2 from '@/components/Reusable/Iframe2';
import IframeSkelton from '@/components/Reusable/IframeSkelton';
import Link from 'next/link';

const LoopSection = () => {
  const [loopVideo, setLoopVideo] = useState([
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ0', type: 'iframe', thumbnail: '/g8.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ1', type: 'iframe', thumbnail: '/g3.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ2', type: 'iframe', thumbnail: '/g4.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ3', type: 'iframe', thumbnail: '/g5.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ4', type: 'iframe', thumbnail: '/g6.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ5', type: 'iframe', thumbnail: '/g7.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ6', type: 'iframe', thumbnail: '/g2.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ7', type: 'iframe', thumbnail: '/g3.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ8', type: 'iframe', thumbnail: '/g5.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUmZ9', type: 'iframe', thumbnail: '/g7.webp' },
    { url: 'https://www.youtube.com/embed/WQWVW4DUm10', type: 'iframe', thumbnail: '/g8.webp' },
  ]);
  const [video, setVideo] = useState({ url: 'https://www.youtube.com/embed/WQWVW4DUmZ0', type: 'iframe', thumb: '/g8.webp' });
  const [type, setType] = useState('iframe');

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // Regenerate iframe
  const [genFrame, setGenFrame] = useState(false);

  const [isIframe, setIsIframe] = useState(true);

  return (
    // <div className='flex flex-col mt-12 3xl:max-w-1680px px-120px mx-auto' >
    <div className="maincontainer mt-10 flex flex-col lg:mt-12">
      <h4 className="text-center text-2xl font-bold md:text-28px lg:text-32px">Helpful Appliance Parts Videos</h4>

      <div className="py-10 lg:mb-0 xl:py-60px">
        <div className="px-0 sm:px-5 md:px-10 lg:px-14 xl:px-20 2xl:px-120px">
          {loopVideo.length === 0 ? <IframeSkelton style="col-start-1 col-end-6 object-cover w-full rounded-2xl 2xl:w-full xl:h-[651px] xl:w-full lg:w-full h-72 lg:h-[480px] md:w-full md:h-[400px]" /> : null}
          {loopVideo.length > 0 && type !== 'iframe' ? <video controls className="col-start-1 col-end-6 h-72 w-full rounded-2xl object-cover md:h-[400px] md:w-full lg:h-[480px] lg:w-full xl:h-[651px] xl:w-full 2xl:w-full" src={video} /> : null}
          {loopVideo.length > 0 && type === 'iframe' ? <Iframe2 isIframe={isIframe} setIsIframe={setIsIframe} thumbnail={video.thumb} genState={genFrame} setGenState={setGenFrame} divId="main-loop-div" frameId="loop-main-frame" icon="text-8xl" style="col-start-1 col-end-6 object-cover w-full rounded-2xl 2xl:w-full xl:h-[565px] xl:w-full lg:w-full h-72 lg:h-[440px] md:w-full md:h-[375px]" src={video.url} title={video.url} /> : null}
        </div>

        <div>
          <StayLoopSlider isIframe={isIframe} setIsIframe={setIsIframe} parentId="main-loop-div" child="loop-main-frame" setGenState={setGenFrame} page={page} setPage={setPage} totalPages={totalPages} loopVideo={loopVideo} setLoopVideo={setLoopVideo} setVideo={setVideo} video={video.url} />
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
