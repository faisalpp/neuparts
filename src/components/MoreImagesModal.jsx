'use client';
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Iframe from '../components/Reusable/Ifram';
import Image from 'next/image';

const MoreImagesModal = ({ state, setState, medias }) => {
  const frstImg = medias ? medias.find((item) => item.type === 'webp') : null;
  const [image, setImage] = useState(frstImg ? { file: frstImg.url, data: frstImg.url } : {});

  return (
    <div className={`fixed ${state ? 'flex' : 'hidden'} top-0 z-[120] h-screen w-full items-center justify-center bg-black/50`}>
      <div className="relative flex w-10/12 justify-center">
        <span onClick={() => setState(false)} className="absolute -right-10 cursor-pointer rounded-full bg-b3 px-1 py-1">
          <AiOutlineClose className="text-sm text-white" />
        </span>
        <div className="flex w-full flex-col rounded-xl bg-white py-8">
          <div className="flex w-full justify-center py-8">
            {image.url ? <Image width={400} height={400} quality={100} src={image?.url ? image.url : '/no-image.webp'} alt="" className="h-auto w-48" /> : null}
            {image.file === 'image' ? <Image width={400} height={400} quality={100} src={image.data} alt="" className="h-auto w-48" /> : null}
            {image.file === 'video' && image.type === 'url' ? <Iframe style="w-6/12" src={image.data} title="Modal Video" icon="text-5xl" frameId={`video-frame-modal-${(Math.random() * 100) / 5}`} divId={`video-frame-modal-wrapper-${(Math.random() * 100) / 5}`} thumbnail={image.thumbnail} /> : null}
            {image.file === 'video' && image.type === 'upload' ? <video className="w-6/12 rounded-2xl" controls src={image.data} /> : null}
          </div>
          <div className="mt-8 flex w-full items-center justify-center space-x-5">
            {medias &&
              medias.map((img, indx) => (
                <div key={indx} className="relative flex cursor-pointer items-center justify-center rounded-md border-[1px] border-b3 px-1 py-1">
                  {img.file === 'webp' ? (
                    <>
                      <div onClick={() => setImage({ file: img.url, type: img.type, data: img.url, thumbnail: img.url ? img.url : '' })} className="absolute h-full w-12 bg-transparent"></div>
                      <Image width={400} height={400} quality={100} src={img.url} alt="" className="h-[50px] w-[60px] object-contain" />
                    </>
                  ) : null}
                  {img.file === 'video' && img.type === 'url' ? (
                    <>
                      <div onClick={() => setImage({ file: img.file, type: img.type, data: img.data, thumbnail: img.preview ? img.preview : '' })} className="absolute z-10 h-20 w-20 bg-transparent"></div>
                      <Iframe style="w-20 h-20" src={img.data} title="Modal Video" icon="text-sm" frameId={`video-frame-modal-${(Math.random() * 100) / 5}`} divId={`video-frame-modal-wrapper-${(Math.random() * 100) / 5}`} thumbnail={img.preview} thumbRounded="false" />
                    </>
                  ) : null}
                  {img.file === 'video' && img.type === 'upload' ? (
                    <>
                      <div onClick={() => setImage({ file: img.file, type: img.type, data: img.data, thumbnail: img.preview ? img.preview : '' })} className="absolute z-10 h-20 w-20 bg-transparent"></div>
                      <video className="h-20 w-20" src={img.data} />
                    </>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreImagesModal;
