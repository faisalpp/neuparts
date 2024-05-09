import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Iframe from '../components/Reusable/Ifram'

const MoreImagesModal = ({ state, setState, medias }) => {
  const frstImg = medias ? medias.find(item => item.file === 'image') : null;
  const [image, setImage] = useState(frstImg ? {file:frstImg.file,data:frstImg.data} : {})

  return (
    <div className={`fixed ${state ? 'flex' : 'hidden'} items-center justify-center top-0 z-50 h-screen bg-black/50 w-full`} >
      <div className='relative flex justify-center w-10/12'>
        <span onClick={() => setState(false)} className='absolute -right-10 bg-b3 rounded-full px-1 py-1 cursor-pointer' ><AiOutlineClose className='text-sm text-white' /></span>
        <div className='flex flex-col bg-white w-full py-8 rounded-xl' >
          <div className='flex w-full justify-center' >
               {image.file === 'image' ? <img  src={image.data} alt='' className='w-48' />:null}
                {image.file === 'video' && image.type === 'url' ? <Iframe style="w-6/12" src={image.data} title="Modal Video" icon="text-5xl" frameId={`video-frame-modal-${Math.random()*100/5}`} divId={`video-frame-modal-wrapper-${Math.random()*100/5}`} thumbnail={image.thumbnail} />:null}
                {image.file === 'video' && image.type === 'upload' ? <video className="w-6/12 rounded-2xl" controls  src={image.data} />:null}
          </div>
          <div className='flex justify-center mt-8 items-center space-x-5 w-full' >
            {medias && medias.map((img,indx) => 
              <div key={indx} className='relative flex items-center justify-center border-[1px] border-b3 rounded-md px-1 py-1 cursor-pointer' >
                {img.file === 'image' ? <><div onClick={() => setImage({file:img.file,type:img.type,data:img.data,thumbnail:img.preview ? img.preview : '' })} className="absolute bg-transparent w-12 h-full" ></div><img  src={img.data} alt='' className='w-12' /></>:null}
                {img.file === 'video' && img.type === 'url' ? <><div onClick={() => setImage({file:img.file,type:img.type,data:img.data,thumbnail:img.preview ? img.preview : '' })} className="absolute z-10 bg-transparent w-20 h-20" ></div><Iframe style="w-20 h-20" src={img.data} title="Modal Video" icon="text-sm" frameId={`video-frame-modal-${Math.random()*100/5}`} divId={`video-frame-modal-wrapper-${Math.random()*100/5}`} thumbnail={img.preview} thumbRounded="false" /></>:null}
                {img.file === 'video' && img.type === 'upload' ? <><div onClick={() => setImage({file:img.file,type:img.type,data:img.data,thumbnail:img.preview ? img.preview : '' })} className="absolute z-10 bg-transparent w-20 h-20" ></div><video className="w-20 h-20" src={img.data} /></>:null}
              </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoreImagesModal