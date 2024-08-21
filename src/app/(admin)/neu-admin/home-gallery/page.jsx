'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ActionBtns from '@/components/AdminDashboard/ActionBtns';
import TableNav from '@/components/AdminDashboard/TableNav';
import MediaPopup from '@/components/AdminDashboard/MediaPopup'
import Image from 'next/image';
import {IoCloseCircle} from 'react-icons/io5'

const Page = () => {
  const [images, setImages] = useState([]);
  const [mediaPopup,setMediaPopup] = useState(false)
  const [files,setFiles] = useState([])
  const [delLoader,setDelLoader] = useState(false)
  
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(24);

  const HandleGalleryImage = async (urls) => {
    const crtToastId = toast.loading('Uploading Image...')

    fetch('/api/admin/home-gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({urls:urls}) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { type: 'success',render:'Home gallery updated!', autoClose: 1000, isLoading: false });
          setReRender(true);
        } else {
          toast.update(crtToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
      });
  };

  useEffect(() => {
    if (files.length > 0) {
      let urls = [];
      files.forEach((file) => {
        urls.push(file.url);
      });
      HandleGalleryImage(urls)
      setFiles([]);
    }
  }, [files]);

    //handel empty page request
    const ManagePageCount = (id) => {
        // Filter out the deleted item from the data
        const newData = images.filter((item) => item.id !== id);
        // Calculate the total number of pages after deletion
        const newPageCount = Math.ceil(newData.length / limit);
        // If the current page is greater than the new page count, decrement the page
        if (page > newPageCount && page > 1) {
          setPage(page - 1);
        }
        setPageCount(newPageCount);
      };


  const DeleteImage = async (id) => {
    if (!id) {toast.error('Id required!');return;}

    // Show pending toast
    const delToastId = toast.loading('Removing gallery image...')
    setDelLoader(id)
    fetch('/api/admin/home-gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          ManagePageCount(id);
          setReRender(true);
          toast.update(delToastId, { render: 'Gallery image removed!', type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
        };
        setDelLoader(0)
      })
      .catch((error) => {
        toast.update(delToastId, { type: 'error', render:'Something went wrong!',autoClose: 3000, isLoading: false })
        setDelLoader(0);
      });
  };


  const FetchGallery = async () => {
    const getToastId = toast.loading('Loading gallery images...')
    fetch(`/api/admin/home-gallery/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.images.length > 0) {
          toast.update(getToastId, { render: 'Home Gallery Loaded!', type: 'success', autoClose: 1000, isLoading: false });
          setPageCount(data.pagination.pageCount);
          setImages(data.images);
        } else {
          toast.update(getToastId, { render: 'No Data Found!', type: 'info', autoClose: 1000, isLoading: false });
          setImages([]);
        }
      });
  };


  useEffect(() => {
    FetchGallery();
  }, [page]);

  useEffect(() => {
    if (reRender) {
      FetchGallery();
      setReRender(false);
    }
  }, [reRender]);


  return (
    <>
    <MediaPopup state={mediaPopup} setState={setMediaPopup} files={files} setFiles={setFiles} isMultiple={true} />
      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns buttons={[{ type: 'trigger', trigger:()=>{setMediaPopup(true)}, text: 'Upload' }]} />
        <div className="mt-10 flex h-full w-full flex-col px-5 py-5 shadow-xl border-2 rounded-md">
         <div className='flex flex-wrap gap-5 h-auto' >
          {images.length > 0 ? 
            images.map((image,i)=>(
                <div key={i} className="relative">
                <IoCloseCircle onClick={()=>DeleteImage(image._id)} className="absolute right-1 top-1 rounded-full bg-white text-lg text-red-400" />
                {delLoader === image._id ? <Image height={150} width={150} src='/del-loader.gif' className="absolute h-28 w-32 rounded-md border-2 px-2 py-2 cursor-pointer" /> : null}
                <Image height={150} width={150} src={image.url} className="h-28 w-32 rounded-md border-2 px-2 py-2" />
              </div>
             ) ):null}
        </div>
        {images.length === 0 ? <div className='flex justify-center items-center h-full' > <Image height={150} width={150} src='/not-found.webp' className="h-28 w-32" /></div>:null}
        </div>
          {pageCount > 1 ? <div className="flex justify-center w-100" ><TableNav page={page} setPage={setPage} pageCount={pageCount} /></div> : null}
      </div>
    </>
  );
};

export default Page;
