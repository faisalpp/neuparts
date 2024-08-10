'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { TbLoader3 } from 'react-icons/tb';

const Iframe2 = ({ isIframe, setIsIframe, style, src, title, icon, frameId, divId, genState, setGenState, thumbnail, thumbRounded }) => {
  //   const [isIframe,setIsIframe] = useState(true)
  const [trigger, setTrigger] = useState(false);
  const [isIframeLoader, setIsIframeLoader] = useState(false);

  useEffect(() => {
    const iframe = document.getElementById(frameId);
    if (iframe) {
      iframe.addEventListener('load', function () {
        setIsIframeLoader(false);
        iframe.removeAttribute('class');
        iframe.setAttribute('class', `${style}`);
      });
    }
  }, ['']);

  const handleLoader = () => {
    // Create a new iframe elemen
    const oldFrame = document.getElementById(frameId);
    if (oldFrame) {
      oldFrame.remove();
    }
    setTrigger(false);
    setIsIframeLoader(true);
    var iframe = document.createElement('iframe');
    iframe.title = title;
    iframe.src = src;
    iframe.setAttribute('class', 'h-0 w-0');
    iframe.setAttribute('id', frameId);
    var container = document.getElementById(divId);
    container.appendChild(iframe);
    setIsIframe(false);
    if (oldFrame) {
      setGenState(false);
    }
  };

  useEffect(() => {
    if (trigger) {
      handleLoader();
    }
  }, [trigger, genState]);

  return (
    <div className={`relative ${style} rounded-2xl`}>
      <div id={divId}></div>
      <div className={`relative ${isIframe || isIframeLoader ? 'flex h-full w-full items-center justify-center' : 'hidden'}`}>
        <div className="absolute z-[99px] flex h-full w-full rounded-xl bg-black/70"></div>
        {isIframe ? <AiFillPlayCircle onClick={() => setTrigger(true)} className={`${icon ? icon : 'hidden'} absolute cursor-pointer ${icon} text-white`} /> : null}
        {isIframeLoader ? <TbLoader3 className={`absolute cursor-wait ${icon ? icon : 'hidden'} ${icon} animate-spin text-white`} /> : null}
        {isIframeLoader || isIframe ? <Image width={1000} height={1000} quality={100} alt="thumbnail" title="thumbnail" src={thumbnail} className={`h-full w-full ${thumbRounded === 'false' ? null : 'rounded-2xl'}`} /> : null}
      </div>
    </div>
  );
};

export default Iframe2;
