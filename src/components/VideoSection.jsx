'use client'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { TbLoader3 } from "react-icons/tb";

const VideoSection = ({type}) => {

  const [loading,setLoading] = useState(true)
  const [video,setVideo] = useState('')

  const GetSectionVideo = () => {
    fetch(`/api/front/static-video?type=${type}`,{method:'GET'})
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      if(data.success){
       setVideo(data.video.url)  
      }
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(false)
    })
  }

  useEffect(()=>{
   GetSectionVideo()
  },[])

  return (
    <div className="relative mx-auto w-full 3xl:max-w-1680px">
      <div className="flex items-center justify-center h-[250px] w-full md:h-[700px] 2xl:h-[920px] bg-black">
        <TbLoader3 className='text-white text-4xl animate-spin' />
      </div>
      {loading ? null :
      <div className="absolute top-0 h-[250px] w-full md:h-[700px] 2xl:h-[920px]">
      <ReactPlayer
        url={video}
        light
        width="100%"
        height="100%"
        className="object-cover"
      />
    </div>}
    </div>
  )
}

export default VideoSection