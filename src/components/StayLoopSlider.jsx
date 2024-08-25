'use client';
import React, { useState, useEffect } from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import Hammer from 'hammerjs';
import ReactPlayer from 'react-player'

const StayLoopSlider = ({ loopVideos,setVideo, video }) => {
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
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft - width;
  };
  const btnnext = () => {
    let width = Box.clientWidth;
    Box.scrollLeft = Box.scrollLeft + width;
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
          {loopVideos.length > 0
            ? loopVideos.map((item, index) => (
                <div key={index} className="relative">
                  <div className="h-32 w-32 [&>div>*]:rounded-2xl lg:w-[142px] xl:h-[150px] " >
                  <div onClick={()=>setVideo(item.url)} className="absolute top-0 h-32 w-32 [&>div>*]:rounded-2xl lg:w-[142px] xl:h-[150px] cursor-pointer" ></div>
                   <ReactPlayer
                     url={item.url}
                     width="100%"
                     height="100%"
                     light
                     />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default StayLoopSlider;
