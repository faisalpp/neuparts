"use client"
import React,{ useEffect, useState } from 'react'
import MediaPopup from '@/components/AdminDashboard/MediaPopup'

const Page = () => {

 const [mediaPopup,setMediaPopup] = useState(false)
 const [files,setFiles] = useState([]);

 useEffect(() => {
   console.log(files)
 }, [files])
 

  return (
    <>
    <MediaPopup state={mediaPopup} setState={setMediaPopup} setFiles={setFiles} />
    <div>
      <button onClick={()=>setMediaPopup(true)} type='button' >Test</button>  
    </div>
    </>
  )
}

export default Page