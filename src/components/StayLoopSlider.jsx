'use client';
import React, { useState, useEffect } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { FaCirclePlay } from 'react-icons/fa6';
import { BsFillStopCircleFill } from 'react-icons/bs';
import Hammer from 'hammerjs';
import Image from 'next/image';

const StayLoopSlider = ({ isIframe, setIsIframe, parentId, child, page, setPage, totalPages, video, loopVideo, setLoopVideo, setVideo, setGenState }) => {
  useEffect(() => {
    let box = document.getElementById('id3');
    setBox(box);

    const swipeableEl = document.getElementById('id3');
    if (swipeableEl) {
      const hammer = Hammer(swipeableEl);
      hammer.on('swipeleft', () => btnprev());
      hammer.on('swiperight', () => btnnext());
    }
  }, []);

  const [Box, setBox] = useState();

  const btnprev = () => {
    // ('prev')
    page > 1 ? setPage(page - 1) : setPage(1);
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft - width;
  };
  const btnnext = () => {
    // ('next')
    page < totalPages && setPage(page + 1);
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft + width;
  };

  const HandleParentChange = (e, data) => {
    e.preventDefault();
    const parent = document.getElementById(parentId);
    const child2 = document.getElementById(child);
    //  (parent)
    if (parent && child2) {
      child2.remove();
    }
    //  setGenState(true);
    setIsIframe(true);
    setVideo(data);
  };

  return (
    <>
      <div className="relative my-8">
        <button onClick={btnprev} className="absolute -right-10 top-0 z-40 h-full">
          <div className="group hidden cursor-pointer rounded-full bg-black/50 px-1 py-1 text-white hover:bg-cyan-500 lg:flex">
            <BsArrowRightShort className="text-xl" />
          </div>
        </button>
        <button onClick={btnnext} className="absolute -left-10 top-0 z-40 h-full">
          <div className="group hidden cursor-pointer rounded-full bg-black/50 px-1 py-1 text-white hover:bg-cyan-500 lg:flex">
            <BsArrowLeftShort className="text-xl" />
          </div>
        </button>
        <div id="id3" className="flex space-x-3 overflow-x-hidden scroll-smooth">
          {loopVideo.length > 0
            ? loopVideo.map((item, index) => (
                <div key={index} className="relative">
                  {/* <div onClick={e=>HandleParentChange(e,{url:item.url,thumb:item.thumbnail})} className="absolute flex items-center justify-center cursor-pointer z-40 rounded-2xl xl:h-[150px] xl:w-[200px] lg:w-[200px] lg:h-32 w-32 h-32 " > */}
                  {/* <div onClick={()=>{}} className="absolute flex items-center justify-center cursor-pointer z-40 rounded-2xl xl:h-[150px] xl:w-[200px] lg:w-[200px] lg:h-32 w-32 h-32 " > */}
                  {/* </div> */}
                  {item.type === 'iframe' ? (
                    <div className="relative h-32 w-44 lg:h-32 lg:w-[170px] xl:h-[142px]">
                      <div onClick={(e) => HandleParentChange(e, { url: item.url, thumb: item.thumbnail })} className="absolute z-[99px] flex h-full w-full cursor-pointer items-center justify-center rounded-xl">
                        {video === item.url ? <BsFillStopCircleFill className="rounded-full bg-white text-4xl text-[#8B8B8B]" /> : <FaCirclePlay className="rounded-full bg-white text-4xl text-[#8B8B8B]" />}
                      </div>
                      <Image width={400} height={400} quality={100} alt={item.thumbnail} src={item.thumbnail} className="h-32 w-44 rounded-2xl lg:w-[170px] xl:h-[142px]" />
                    </div>
                  ) : null}
                  {item.type !== 'iframe' ? (
                    <div className="relative">
                      <div onClick={(e) => HandleParentChange(e, { url: item.url, thumb: item.thumbnail })} className="absolute z-[99px] flex h-full w-full cursor-pointer items-center justify-center rounded-xl ">
                        {video === item.url ? <BsFillStopCircleFill className="rounded-full bg-white text-4xl text-[#8B8B8B]" /> : <FaCirclePlay className="rounded-full bg-white text-4xl text-[#8B8B8B]" />}
                      </div>
                      <video className="h-32 w-32 rounded-2xl lg:w-[142px] xl:h-[170px] " src={item.url} />
                    </div>
                  ) : null}
                  {/* {item.type !== 'iframe' ? <video className='xl:h-[150px] xl:w-[200px] lg:w-[200px] lg:h-32 w-32 h-32 rounded-2xl ' src={item.url} /> : null} */}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default StayLoopSlider;
