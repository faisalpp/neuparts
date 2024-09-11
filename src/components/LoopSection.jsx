'use client';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { TbLoader3 } from "react-icons/tb";
import StayLoopSlider from '@/components/StayLoopSlider'

const LoopSection = () => {
  const [loopVideos, setLoopVideos] = useState([])
  const [video, setVideo] = useState('');
  const [loading,setLoading] = useState(true)

  const GetVideos = async () => {
    fetch('/api/front/static-video/product',{method:'GET'})
    .then((res)=>res.json())
    .then((data)=>{
      if(data.videos.length > 0){
        setLoopVideos(data.videos)
        setVideo(data.videos[0].url)
      }
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(false)
    })
  }

  useEffect(()=>{
    GetVideos()
  },[])

  return (
    <>
    {!loading && loopVideos.length > 0 ? 
    <div className="maincontainer mt-10 flex flex-col lg:mt-12">
      <h4 className="text-center text-2xl font-bold md:text-28px lg:text-32px">Helpful Appliance Parts Videos</h4>

      <div className="py-10 lg:mb-0 xl:py-60px">
       <div className="relative px-0 sm:px-5 md:px-10 lg:px-14 xl:px-20 2xl:px-120px">
        {loading ? 
        <div className="flex items-center justify-center h-72 w-full rounded-2xl object-cover md:h-[400px] md:w-full lg:h-[480px] lg:w-full xl:h-[651px] xl:w-full 2xl:w-full bg-black">
        <TbLoader3 className='text-white text-4xl animate-spin' />
       </div>
        : 
        <div className="col-start-1 col-end-6 h-72 w-full [&>div>*]:rounded-2xl object-cover md:h-[400px] md:w-full lg:h-[480px] lg:w-full xl:h-[651px] xl:w-full 2xl:w-full">
        <ReactPlayer
        url={video}
        width="100%"
        height="100%"
        light
        />
       </div>
       }
      </div>
       {loopVideos.length > 1 ?
        <div>
          <StayLoopSlider parentId="main-loop-div" child="loop-main-frame" loopVideos={loopVideos} setVideo={setVideo} video={video.url} />
        </div>:null}

        {/* <div className="mt-10 flex justify-center lg:mt-16">
          <Link href="/stay-in-loop" className="flex w-fit items-center rounded-md border-[1px] border-b3 px-4 py-2 font-semibold text-b3">
            <span className="text-sm">View All Videos</span>
            <BsArrowRightShort className="text-2xl" />
          </Link>
        </div> */}
      </div>
    </div>:null}
    </>
  );
};

export default LoopSection;
