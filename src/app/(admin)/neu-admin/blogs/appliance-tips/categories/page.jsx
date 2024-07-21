"use client";

import React, { useEffect,useState } from 'react'
import {toast} from 'react-toastify'
import Table from '@/components/AdminDashboard/Table'
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns'
import TableNav from '@/components/AdminDashboard/TableNav'
import TdImage from '@/components/AdminDashboard/Table/TD/TdImage'
import Popup from '@/components/AdminDashboard/Popup'
import MediaPopup from '@/components/AdminDashboard/MediaPopup'
import * as Yup from "yup";


const Page = () => {
  
  const [createPopup,setCreatePopup] = useState(false);
  const [updatePopup,setUpdatePopup] = useState(false);
  const [mediaPopup,setMediaPopup] = useState(false)
  const [files,setFiles] = useState([])

  const [cats,setCats] = useState([]);
  const [rowLoader,setRowLoader] = useState(true);
  const [reRender,setReRender] = useState(false)
  const [page,setPage] = useState(1)
  const [pageCount,setPageCount] = useState(0)
  const [limit,setLimit] = useState(2)


  useEffect(()=>{
    if(files.length > 0){
      setFormData({...formData,thumbnail:files[0].url})
     }
   },[files])

  
  const [formData,setFormData] = useState({id:'',title:'',thumbnail:''})

  const HandleChange = (e) => {
    const {value,name} = e.target;
    setFormData({...formData,[name]:value})
  }

  const ValCat = Yup.object({
    title: Yup.string().required('Title is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
  })


  const CreateCategory = async (e) => {
      e.preventDefault()

      try {
        await ValCat.validate(formData, {abortEarly: false});
      } catch (error) {
        console.log(error)
        error?.inner?.forEach((err) => {
          toast.error(err.message);
        });
        return
      }

      const crtToastId = toast.promise(
        new Promise((resolve) => {
          // Placeholder promise that resolves when request completes
          setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
        }),
        {
          pending: 'Creating Blog Category...', // Show pending message
          success: 'Blog category created successfully!', // Show success message
          error: 'Failed to create blog category', // Show error message
          closeOnClick: false,
          closeOnEscape: false
        }
      );
      toast.update(crtToastId,{type:toast.TYPE?.PENDING,autoClose:1000,isLoading: true})
    
      fetch('/api/admin/blog/appliance-tips/category', {method: 'POST',
        headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
      }).then((res) => res.json())
       .then((resp) => {
        console.log(resp)
         if(resp.success){
          ResetFormData()
          toast.update(crtToastId,{type:'success',autoClose:1000,isLoading: false})
          setReRender(true)
          setCreatePopup(false)
         }else{
          toast.update(crtToastId,{type:'error',autoClose:1000,isLoading: false})
         }
        })
        .catch((error) => {
          toast.update(crtToastId,{type:'error',autoClose:1000,isLoading: false})
        });
  };

  const handleUpdatePopup = (data) => {
    const {_id,title,thumbnail} = data;
    setFormData({id:_id,title:title,thumbnail:thumbnail})
    setUpdatePopup(true)
  }


  const UpValCat = Yup.object({
    id: Yup.string().required('Id is required!'),
    title: Yup.string().required('Title is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
  })

  const UpdateFaqCat = async (e) => {
      e.preventDefault()
      
      try {
        await UpValCat.validate(formData, {abortEarly: false});
      } catch (error) {
        console.log(error)
        error?.inner?.forEach((err) => {
          toast.error(err.message);
        });
      }
      
           // Show pending toast
  const updToastId = toast.promise(
    new Promise((resolve) => {
      // Placeholder promise that resolves when request completes
      setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
    }),
    {
      pending: 'Updating blog category...', // Show pending message
      success: 'Blog category update successfully!', // Show success message
      error: 'Failed to update blog category', // Show error message
      closeOnClick: false,
      closeOnEscape: false
    }
  );
  toast.update(updToastId,{type:'info',autoClose:1000,isLoading: true})
   
      fetch('/api/admin/blog/appliance-tips/category', {method: 'PUT',
        headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
      }).then((res) => res.json())
       .then((resp) => {
         if(resp.success){
           setReRender(true)
           ResetFormData()
           setUpdatePopup(false)
           toast.update(updToastId,{render:resp.message,type:'success',autoClose:1000,isLoading: false})
         }else{
          toast.update(updToastId,{render:resp.message,type:'error',autoClose:1000,isLoading: false})
        }
        }).catch((error=>{
          toast.update(updToastId,{render:resp.message,type:'error',autoClose:1000,isLoading: false})
        }))
  };

   //handel empty page request
   const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = cats.filter(item => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  }

  const DeleteCat = async (id) => {
    if(!id){
      toast.error('Category id required!')
      return
    }

     // Show pending toast
  const delToastId = toast.promise(
    new Promise((resolve) => {
      // Placeholder promise that resolves when request completes
      setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
    }),
    {
      info: 'Deleting blog category...', // Show pending message
      success: 'Blog category deleted successfully!', // Show success message
      error: 'Failed to delete blog category', // Show error message
      closeOnClick: false,
      closeOnEscape: false
    }
  );

  toast.update(delToastId,{type:'info',autoClose:1000,isLoading: true})

    fetch('/api/admin/blog/appliance-tips/category', {method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },body: JSON.stringify({id:id}),
    }).then((res) => res.json())
    .then((resp) => {
      if(resp.success){
        ManagePageCount(id)
       setReRender(true)
       toast.update(delToastId,{type:'success',autoClose:1000,isLoading: false})
      }else{
       toast.update(delToastId,{type:'error',autoClose:1000,isLoading: false})
      }
     })
     .catch((error) => {
      toast.update(delToastId,{type:'error',autoClose:3000,isLoading: false})
    });
  }

 const FetchCats = async () => {
  setRowLoader(true)

     // Show pending toast
     const getToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        info: 'Getting blog categories...', // Show pending message
        success: 'Blog categories retrived successfully!', // Show success message
        error: 'Failed to get blog categories', // Show error message
        closeOnClick: false,
        closeOnEscape: false
      }
    );

    toast.update(getToastId,{type:'info',autoClose:1000,isLoading: true})
 try{
  fetch(`/api/admin/blog/appliance-tips/category/?page=${page}&limit=${limit}`)  
   .then((res) => res.json())
   .then((data) => {
    if(data.cats?.length > 0){
      toast.update(getToastId,{type:'success',autoClose:1000,isLoading: false}) 
      setPageCount(data.pagination.pageCount)
      setCats(data.cats)
    }else{
      toast.update(getToastId,{type:'error',autoClose:1000,isLoading: false})
       setCats([])
    }
    setRowLoader(false)
   })
  }catch(error){
    toast.update(getToastId,{type:'error',autoClose:1000,isLoading: false})
  }
 }

 // get team members data
 useEffect(() => {
  FetchCats()
 }, [page])

 useEffect(() => {
  if(reRender){
    FetchCats()
    setReRender(false);
  }
 }, [reRender])

 const ResetFormData = () => {
  setFormData({id:'',title:'',thumbnail:''})
 }

 useEffect(()=>{
  if(!createPopup){
    ResetFormData()
  }
 },[createPopup])

 useEffect(()=>{
  if(!updatePopup){
    ResetFormData()
  }
 },[updatePopup])


  return (
    <>
    <Popup state={createPopup} setState={setCreatePopup}  >
     <form onSubmit={CreateCategory} className='flex flex-col mx-10 py-5 w-full' >
     <h1 className='text-center text-xl font-semibold' >Create Category </h1>
      
      <div className='flex flex-col gap-3 py-10' >
       <div>
        <label for="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Title</label>
        <input name="title" value={formData.title} onChange={HandleChange} type="text" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       
       <div>
        <label for="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Thumbnail</label>
        <div className='flex border border-gray-500 py-2 px-3 rounded-md' >
         <input readOnly name="avatar" value={formData.thumbnail} type="text" placeholder="Select Single File" className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg bg-white px-5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 w-6/12 bg-gray-500" />
         <button type="button" onClick={()=>setMediaPopup(true)} className='bg-b4 px-4 py-1 rounded-md text-white' >Select</button>
        </div>
       </div>

       <button class="self-center w-fit text-md mt-3 px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
      </div> 

     </form>
    </Popup>

    <Popup state={updatePopup} setState={setUpdatePopup}  >
     <form onSubmit={UpdateFaqCat} className='flex flex-col mx-10 w-full' >
     <h1 className='text-center text-xl font-semibold' >Update Category </h1>
      
     <div className='flex flex-col gap-3 py-10' >
       <div>
        <label for="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Name</label>
        <input name="title" value={formData.title} onChange={HandleChange} type="text" placeholder="Lorem ipsum?" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       
       <div>
        <label for="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Thumbnail</label>
        <div className='flex border border-gray-500 py-2 px-3 rounded-md' >
         <input readOnly name="avatar" value={formData.thumbnail} type="text" placeholder="Select Single File" className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg bg-white px-5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 w-6/12 bg-gray-500" />
         <button type="button" onClick={()=>setMediaPopup(true)} className='bg-b4 px-4 py-1 rounded-md text-white' >Select</button>
        </div>
       </div>

       <button class="self-center w-fit text-md mt-3 px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
      </div> 

     </form>
    </Popup>

    <MediaPopup state={mediaPopup} setState={setMediaPopup} setFiles={setFiles} />
    <div className='flex flex-col mx-10' style={{height:'calc(100vh - 100px)'}} > 
     <ActionBtns buttons={[{type:'trigger',trigger:setCreatePopup,text:'Add Blog Category'}]} />
     <div className='flex flex-col items-center mt-10 h-full w-full' >
      <Table header={['Thumbnail','Title','slug','Actions']} >
      {/* hello pengea/dnd */}
      {rowLoader ? <RowLoader/> : cats?.length > 0 ?
       cats.map((cat,i)=>
        <Row Key={i} >
         <TdImage src={cat.thumbnail} css="w-20 h-14 object-fit rounded" />
         <Text text={cat.title} />
         <Text text={cat.slug} />
         <Actions id={cat._id} handleDelete={DeleteCat} data={cat} handleEdit={handleUpdatePopup} />
        </Row>
        )
       :
       <NoData colspan={4} alert="No Categories Found!" />
      }
      </Table>
      {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
     </div>
    </div>
    </>
  )
}

export default Page