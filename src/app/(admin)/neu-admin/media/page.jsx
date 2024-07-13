"use client"
import React, { useEffect, useState,useRef } from 'react'
import Image from 'next/image'
import {toast} from 'react-toastify'
import { MdDelete,MdContentCopy } from "react-icons/md";
import { RiFolderVideoFill } from "react-icons/ri";
import {limitString,copyLinkToClipboard} from '@/utils/index'
import Popup from '@/components/AdminDashboard/Popup'
import * as Yup from "yup";

const Page = () => {

  const [media,setMedia] = useState([])
  const [loading,setLoading] = useState(true)
  const [delId,setDelId] = useState(null)
  const fileInputRef = useRef(null);

  const GetMedia = async () => {
    setLoading(true)
    const res = await fetch('/api/media',{method:'GET'});
    if(res.ok){
      const data = await res.json()
      setMedia(data.media)
    }else{
      toast.error('Something Went Wrong!')
    }
    setLoading(false)
  }

  useEffect(()=>{
    GetMedia()
  },[])

  const DeleteMedia = async (id) => {
    setDelId(id)
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id })
    };
    try{
    const res = await fetch('/api/aws',requestOptions);
    const data = await res.json()
    if(!res.ok){
     toast.error('Something went wrong!');
     setDelId(null)
     return
    }
    if(!data.success){
      console.log(data)
      toast.error('Something went wrong!');
      setDelId(null)
      return
    }
    toast.success('Media Deleted Successfully!');
    GetMedia()
   }catch(error){
    console.error('Fetch error:', error);
    toast.error('Something went wrong!');
    setDelId(null);
   }
  }


  const UploadSelectedMedia = async (e) => {
    const updToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 2000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Uploading Media...', // Show pending message
        success: 'Media upload successfully!', // Show success message
        error: 'Media upload failed', // Show error message
        closeOnClick: false,
        closeOnEscape: false
      }
    );



    const file = e.target.files[0];
    if(!file){
      toast.error('No Media Selected!')
      return
    }
    toast.update(updToastId,{type:toast.TYPE?.PENDING,autoClose:2000,isLoading: true})
    const formData = new FormData();
    formData.append('file',file)
    
    const requestOptions = {
      method: 'POST',
      body: formData
    };
    try{
    const res = await fetch('/api/aws',requestOptions);
    const data = await res.json()
    if(!res.ok){
     toast.error('Something went wrong!');
     toast.update(updToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
     fileInputRef.current.value = '';
     return
    }
    if(!data.success){
      console.log(data)
      toast.error('Something went wrong!');
      toast.update(updToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
      fileInputRef.current.value = '';
      return
    }
    toast.update(updToastId,{type:toast.TYPE?.SUCCESS,autoClose:2000,isLoading: false})
    fileInputRef.current.value = '';
    GetMedia()
   }catch(error){
    console.error('Fetch error:', error);
    toast.error('Something went wrong!');
    toast.update(updToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
    fileInputRef.current.value = '';
   }

  }
  

  const [mediaPopup,setMediaPoppup] = useState(false)

  const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
  const [mediaData,setMediaData] = useState({id:'',name:'',alt:'',type:'',url:'',atch:[]})
  const urlRef = useRef(null)

  const HandleMediaPopup = (med) => {
    setMediaData({id:med._id,name:med.name,alt:med.alt,type:med.type,url:med.url,atch:med.attachments})
    setMediaPoppup(true)
  }

  const UpdateMedia = async (e) => {
    e.preventDefault()

    const MediaVal = Yup.object({
      id: Yup.string().required('Id is required!'),
      name: Yup.string().required('Name is required!'),
      alt: Yup.string().required('Alt is required!'),
    })
    
    const {id,name,alt} = mediaData;

    try{
      await MediaVal.validate({id,name,alt}, {abortEarly: false});
    }catch(error){
      console.log(error)
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      }); 
      return
    }

    const delToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve,2000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Updating Media...', // Show pending message
        success: 'Media update successfully!', // Show success message
        error: 'Media update failed', // Show error message
        closeOnClick: false,
        closeOnEscape: false
      }
    );

    toast.update(delToastId,{type:toast.TYPE?.PENDING,autoClose:2000,isLoading: true})
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({id:id,name:name,alt:alt})
    };
    try{
    const res = await fetch('/api/media',requestOptions);
    const data = await res.json()
    if(!res.ok){
     toast.update(delToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
     return
    }
    if(!data.success){
      toast.update(delToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
      return
    }
    toast.update(delToastId,{type:toast.TYPE?.SUCCESS,autoClose:2000,isLoading: false})
    GetMedia()
    setMediaData({id:'',name:'',alt:'',type:'',url:'',atch:[]})
    setMediaPoppup(false)
   }catch(error){
    toast.update(delToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
   }

  }

  const [urlEmbed,setUrlEmbed] = useState('')

  const SaveUrl = async () => {
    if(urlEmbed===''){
      toast.error('Invalid youtube url!')
    }

    const embedToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 2000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Saving youtube url...', // Show pending message
        success: 'Youtube url saved!', // Show success message
        error: 'Saving url failed!', // Show error message
        closeOnClick: false,
        closeOnEscape: false
      }
    );

    toast.update(embedToastId,{type:toast.TYPE?.PENDING,autoClose:2000,isLoading: true})
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({url:urlEmbed})
    };
    try{
    const res = await fetch('/api/media/links',requestOptions);
    const data = await res.json()
    console.log(data)
    if(!res.ok){
     toast.update(embedToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
     return
    }
    if(!data.success){
      toast.update(embedToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
      return
    }
    toast.update(embedToastId,{type:toast.TYPE?.SUCCESS,autoClose:2000,isLoading: false})
    GetMedia()
    setUrlEmbed('')
   }catch(error){
    console.log(error)
    toast.update(embedToastId,{type:toast.TYPE?.ERROR,autoClose:2000,isLoading: false})
   }


  }


  return (
    <>
     <Popup state={mediaPopup} setState={setMediaPoppup} width="w-8/12" style="right-0" >
      <div className='flex items-center w-full py-5 px-5' >
       <div className='w-6/12' >
       {imageFormats.includes(mediaData.type) ?
        <Image width={200} height={200} alt={mediaData.alt} className='rounded-md h-56 w-72' src={mediaData.url} />:null}
       {videoFormats.includes(mediaData.type) ?
        <video controls className='rounded-md h-60 w-72' src={mediaData.url} />:null}
       {mediaData.type === 'embed' ?
         <iframe className='rounded-md h-60 w-72' src={mediaData.url} ></iframe>
         :null}
       </div>
       <div className='flex flex-col w-6/12' >
        <span className='text-center font-bold' >Media Settings</span>
        <form onSubmit={UpdateMedia} className='flex flex-col gap-5 mt-5' >
         <div className='flex gap-3 items-center' >
          <span className='text-sm' >Name:</span>
          <input type="text" className='border text-sm w-full px-1 py-1 rounded-sm' value={mediaData.name} onChange={(e)=>setMediaData({...mediaData,name:e.target.value})} />
         </div>
         <div className='flex gap-2 items-center' >
          <span className='text-sm' >Alt&nbsp;Tag:</span>
          <input type="text" className='border text-sm w-full px-1 py-1 rounded-sm' value={mediaData.alt} onChange={(e)=>setMediaData({...mediaData,alt:e.target.value})} />
         </div>
         <div className='flex gap-2' > 
          <div className='flex gap-2 items-center' >
           <span className='text-sm' >Type:</span>
           <input type="text" readOnly className='border text-sm px-1 py-1 outline-none cursor-not-allowed rounded-sm' value={mediaData.type} onChange={(e)=>setMediaData({...mediaData,type:e.target.value})} />
          </div>
          <div className='flex gap-4 items-center' >
           <span className='text-sm' >Status:</span>
           {mediaData.atch.length > 0 ? 
           <span className='text-xs bg-b10 px-2 py-1 rounded-xl text-white' >Attached</span>:
           <span className='text-xs bg-b7 px-2 py-1 rounded-xl text-white' >Detached</span>}
          </div>
          </div>
         <div className='flex gap-4 items-center' >
          <span className='text-sm' >Link:</span>
          <a ref={urlRef} href={mediaData.url} target='__blank' className='flex flex-wrap text-xs text-blue-500 underline' >{limitString(mediaData.url,35)}</a>
          <MdContentCopy onClick={()=>copyLinkToClipboard(urlRef,mediaData.url)} className='shadow-sm cursor-pointer' />
         </div>
         <button className='bg-b9 px-3 py-1 rounded text-white cursor-pointer' >Update</button>
        </form>
       </div>
      </div> 
     </Popup>  

     <div className='flex flex-col bg-white border border-gray-300 rounded-md shadow-xl mx-10 mt-5' style={{minHeight: 'calc(100vh - 120px)',maxHeight: 'calc(100vh - 120px)'}} >
      
       <div className='flex gap-10 text-black py-3 px-5 border-b border-gray-200' >
        <span onClick={()=>fileInputRef.current.click()} className='bg-b9 px-3 py-1 rounded text-white cursor-pointer' >Upload</span>
        <input ref={fileInputRef} onChange={(e)=>UploadSelectedMedia(e)} type="file" accept='image/*,video/*' className='hidden' />
        <div className='flex gap-2 items-center' >
          <span className='text-sm' >Youtube:</span>
          <div className='border border-gray-400 rounded pl-2' >
           <input value={urlEmbed} onChange={(e)=>setUrlEmbed(e.target.value)} type='text'  className="text-sm outline-none" placeholder='Any youtube url' />
           <span onClick={()=>SaveUrl()} className='bg-b3 text-white text-[14px] cursor-pointer py-1 px-2 rounded-r' >Insert</span>
          </div>
        </div>
       </div> 
       {/* media files */}
       {loading ? <div className='flex justify-center items-center w-full ' style={{minHeight: 'calc(100vh - 120px)',maxHeight: 'calc(100vh - 120px)'}} ><Image width={70} height={70} src="/loader2.gif" /></div> : media.length > 0 ?
       <div className='flex flex-wrap gap-3 mx-5 my-2 overflow-y-scroll' style={{minHeight: 'calc(100vh - 200px)',maxHeight: 'calc(100vh - 200px)'}} >
        {media.map((med,i)=>
         (imageFormats.includes(med.type) ? 
        <div key={i}  className="relative w-32 h-28 shadow-md cursor-pointer group hover:shadow-lg transition-shadow duration-300">
         <span onClick={()=>DeleteMedia(med._id)} className="absolute opacity-0 group-hover:opacity-100 right-2 top-2 bg-white rounded cursor-pointer transition-opacity duration-300">
            <MdDelete className="text-red-500" />
         </span>
         {delId === med._id ? <Image height={100} width={200} className="absolute rounded-md h-full w-full opacity-80" src="/del-loader.gif" />:null}
          <Image onClick={()=>HandleMediaPopup(med)} height={100} width={100} alt={med.alt} className="rounded-md h-full w-full" src={med.url} />
        </div>
        : videoFormats.includes(med.type) ? 
        <div key={i} onClick={()=>HandleMediaPopup(med)} className="relative border border-gray-300 flex flex-col items-center justify-center w-32 h-28 shadow-md cursor-pointer group hover:shadow-lg transition-shadow duration-300">
         <span onClick={()=>DeleteMedia(med._id)} className="absolute opacity-0 group-hover:opacity-100 right-2 top-2 bg-white rounded cursor-pointer transition-opacity duration-300">
            <MdDelete className="text-red-500" />
         </span>
         {delId === med._id ? <Image height={100} width={200} className="absolute rounded-md h-full w-full opacity-80" src="/del-loader.gif" />:null}
         <div className='flex flex-col items-center' onClick={()=>HandleMediaPopup(med)} >  
          <RiFolderVideoFill className='text-5xl' />
          <span>{limitString(med.name,6)+med.type}</span>
         </div>
        </div>
        :med.type === 'embed' ? 
        <div key={i} onClick={()=>HandleMediaPopup(med)} className="relative border border-gray-300 flex flex-col items-center justify-center w-32 h-28 shadow-md cursor-pointer group hover:shadow-lg transition-shadow duration-300">
        <span onClick={()=>DeleteMedia(med._id)} className="absolute opacity-0 group-hover:opacity-100 right-2 top-2 bg-white rounded cursor-pointer transition-opacity duration-300">
           <MdDelete className="text-red-500" />
        </span>
        {delId === med._id ? <Image height={100} width={200} className="absolute rounded-md h-full w-full opacity-80" src="/del-loader.gif" />:null}
        <div className='flex flex-col items-center' onClick={()=>HandleMediaPopup(med)} >  
         <RiFolderVideoFill className='text-5xl' />
         <span>{limitString(med.name,6)+med.type}</span>
        </div>
       </div>
        : null )
        
        )}
       </div>
       : <div className='flex justify-center items-center h-72 w-full ' ><h2>No Media Files Found!</h2></div> }
     </div>

     </>
  )
}

export default Page