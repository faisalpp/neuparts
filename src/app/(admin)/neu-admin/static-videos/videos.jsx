'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ActionBtns from '@/components/AdminDashboard/ActionBtns';
import TableNav from '@/components/AdminDashboard/TableNav';
import Popup from '@/components/AdminDashboard/Popup';
import * as Yup from 'yup';
import MediaPopup from '@/components/AdminDashboard/MediaPopup';
import Image from 'next/image';
import ReactPlayer from 'react-player'
import {IoCloseCircle} from 'react-icons/io5'

const Videos = () => {
  const [mediaPopup, setMediaPopup] = useState(false);
  const [files,setFiles] = useState([])

  const [createPopup, setCreatePopup] = useState(false);

  const [videos, setVideos] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [delLoader, setDelLoader] = useState(false);
  const [type,setType] = useState('product-page')
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const [formData, setFormData] = useState({ id:'',url: '', pages: [] });

  useEffect(() => {
    if (files.length > 0) {
      setFormData({ ...formData, url: files[0].url });
      setFiles([]);
    }
  }, [files]);

  const ValReview = Yup.object({
    url: Yup.string().required('Url is required!'),
    page: Yup.string().required('Page is required!'),
  });

  const CreateReview = async (e) => {
    e.preventDefault();

    try {
      await ValReview.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const crtToastId = toast.loading('Uploading Video...')

    fetch('/api/admin/static-videos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setFormData({ id: '', url: '',page: '' });
          toast.update(crtToastId, { type: 'success',render:'Video uploaded!', autoClose: 1000, isLoading: false });
          setReRender(true);
          setCreatePopup(false);
        } else {
          toast.update(crtToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
      });
  };



  //handel empty page request
  const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = reviews.filter((item) => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  };

  const DeleteVideo = async (id) => {
    if (!id) {
      toast.error('Video id required!');
      return;
    }
     
    setDelLoader(true)
    // Show pending toast
    const delToastId = toast.loading('Deleting video...')

    fetch('/api/admin/static-videos', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          ManagePageCount(id);
          setReRender(true);
          toast.update(delToastId, { render: 'Video delete successfull!', type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
        }
        setDelLoader(false)
      })
      .catch((error) => {
        toast.update(delToastId, { type: 'error',render:'Something went wrong!', autoClose: 3000, isLoading: false });
        setDelLoader(false)
      });
  };

  const FetchVideos = async () => {
    // Show pending toast
    const getToastId = toast.loading('Getting videos...')

    fetch(`/api/admin/static-videos/?page=${page}&limit=${limit}&type=${type}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.videos.length > 0) {
          toast.update(getToastId, {type:'success', autoClose: 1000, isLoading: false });
          setPageCount(data.pagination.pageCount);
          setVideos(data.videos);
        } else {
          toast.update(getToastId, { render: 'No data found!', type:'info', autoClose: 1000, isLoading: false });
          setVideos([]);
        }
      })
      .catch((error)=>{
        toast.update(getToastId, { render: 'Something went wrong!', type:'error', autoClose: 1000, isLoading: false });
        setVideos([]);
      })
  };

  useEffect(() => {
    FetchVideos();
  }, [page,type]);

  useEffect(() => {
    if (reRender) {
      FetchVideos();
      setReRender(false);
    }
  }, [reRender]);

  const handlePages = (e) => {
    const { checked,title } = e.target;
    if (checked) {
    setFormData({ ...formData, page: title });
    }
  };

  return (
    <>
      <Popup state={createPopup} setState={setCreatePopup}>
        <form onSubmit={CreateReview} className="mx-10 flex w-full flex-col py-5">
          <h1 className="text-center text-xl font-semibold">Upload Static Video</h1>
          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Video
              </label>
              <div className="flex rounded-md border border-gray-500 px-3 py-2">
                <input readOnly name="avatar" value={formData.url} type="text" placeholder="Select Single File" className="block w-6/12 w-full rounded-lg bg-gray-500 bg-white px-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-500" />
                <button type="button" onClick={() => setMediaPopup(true)} className="rounded-md bg-b4 px-4 py-1 text-white">
                  Select
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="pages" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Pages
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="radio" name="page" title="product-page" />
                  <span className="text-sm">Product Page</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="radio" name="page" title="our-story" />
                  <span className="text-sm">Our Story</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="radio" name="page" title="our-companies" />
                  <span className="text-sm">Our Companies</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="radio" name="page" title="our-showroom" />
                  <span className="text-sm">Our Showroom</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="radio" name="page" title="faqs" />
                  <span className="text-sm">Faq&quot;s</span>
                </div>
              </div>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <MediaPopup state={mediaPopup} setState={setMediaPopup} files={files} setFiles={setFiles} isMultiple={false} />
      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns buttons={[{ type: 'trigger', trigger:()=>{setCreatePopup(true)}, text: 'Upload' },{type:'drop-down',setState:setType,options:[{name:'Product Page',value:'product-page'},{name:'Our Story',value:'our-story'},{name:'Our Companies',value:'our-companies'},{name:'Our Showroom',value:'our-showroom'},{name:'Faqs',value:'faqs'}]}]} />
        <div className="mt-10 flex h-full w-full flex-col px-5 py-5 shadow-xl border-2 rounded-md">
         <div className='flex flex-wrap gap-5 h-auto' >
          {videos.length > 0 ? 
            videos.map((video,i)=>(
                <div key={i} className="relative">
                <IoCloseCircle onClick={()=>DeleteVideo(video._id)} className="absolute right-1 top-1 rounded-full bg-white text-lg text-red-400" />
                {delLoader === video._id ? <Image height={150} width={150} src='/del-loader.gif' className="absolute h-full w-64 rounded-md px-2 py-2 cursor-pointer" /> : null}
                <ReactPlayer url={video.url} width={180} height={130} />
              </div>
             ) ):null}
        </div>
        {videos.length === 0 ? <div className='flex justify-center items-center h-full' > <Image height={150} width={150} src='/not-found.webp' className="h-28 w-32" /></div>:null}
        </div>
          {pageCount > 1 ? <div className="flex justify-center w-100" ><TableNav page={page} setPage={setPage} pageCount={pageCount} /></div> : null}
      </div>
    </>
  );
};

export default Videos;
