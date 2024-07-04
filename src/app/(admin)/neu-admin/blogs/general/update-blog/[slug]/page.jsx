"use client"
import React,{useEffect, useState} from 'react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import MediaPopup from '@/components/AdminDashboard/MediaPopup'
import * as Yup from "yup";
import {toast} from 'react-toastify'
import { useRouter,notFound } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

const Page = ({params}) => {
 const [mediaPopup,setMediaPopup] = useState(false);
 const [formData,setFormData] = useState({title:'',content:'',thumbnail:''})
 const [loading,setLoading] = useState(true)
 const [files,setFiles] = useState([])
 const router = useRouter()

 const GetBlogs = () => {
  if(params.slug){
    fetch(`/api/front/blog/general/?slug=${params.slug}`,{method:'GET', headers: { 'Content-Type': 'application/json' }})
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data)
     if(data.success){
      const {_id,title,slug,content,thumbnail} = data.blog;
      setFormData({id:_id,title:title,slug:slug,content:content,thumbnail:thumbnail})
      setLoading(false)
    }else{
      return <notFound/>
     }
    })
    .catch((error)=>{
      console.log(error)
     toast.error('Something went wrong!')
     router.push('/neu-admin/blogs/general')
    })
  }
 }

 useEffect(()=>{
  GetBlogs()
 },[])


useEffect(()=>{
  if(files.length > 0){
    setFormData({...formData,thumbnail:files[0].url})
   }
 },[files])


 const HandleChange = (e) => {
  const {value,name} = e.target;
  setFormData({...formData,[name]:value})
 }

 const ValBlog = Yup.object({
  id: Yup.string().required('Id is required!'),
  title: Yup.string().required('Title is required!'),
  content: Yup.string().required('Content is required!'),
  thumbnail: Yup.string().required('Thumbnail is required!'),
 })

 const UpdateBlog = async (e) => {
  e.preventDefault()

  const crtToastId = toast.promise(
    new Promise((resolve) => {
      // Placeholder promise that resolves when request completes
      setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
    }),
    {
      pending: 'Updating Blog...', // Show pending message
      success: 'Blog updated successfully!', // Show success message
      error: 'Failed to update blog', // Show error message
      closeOnClick: false,
      closeOnEscape: false
    }
  );
  toast.update(crtToastId,{type:toast.TYPE?.PENDING,autoClose:1000,isLoading: true})
  
  try {
    await ValBlog.validate(formData, {abortEarly: false});

  fetch('/api/admin/blog/general', {method: 'PUT',
    headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
  }).then((res) => res.json())
   .then((resp) => {
    console.log(resp)
     if(resp.success){
      toast.update(crtToastId,{type:toast.TYPE?.SUCCESS,autoClose:1000,isLoading: false})
      router.push('/neu-admin/blogs/general')
     }else{
      toast.update(crtToastId,{type:toast.TYPE?.ERROR,autoClose:1000,isLoading: false})
     }
    })
    .catch((error) => {
      toast.update(crtToastId,{type:toast.TYPE?.ERROR,autoClose:1000,isLoading: false})
    });
  
  
  } catch (error) {
    console.log(error)
    error?.inner?.forEach((err) => {
      toast.error(err.message);
    });
  }
}; 

    

  return (
   <> 
   {loading ? 
    <div className='flex justify-center items-center' style={{minHeight:'calc(100vh - 25px)'}} >
     <Image width={50} height={10} src="/loader2.gif" className='h-24 w-20'  />
    </div>
    :
    <div className='flex justify-center' style={{minHeight:'calc(100vh - 25px)'}} >
      <MediaPopup state={mediaPopup} setState={setMediaPopup} setFiles={setFiles} /> 
    <div className='flex flex-col mx-24 gap-y-5' >
     <div className='flex justify-center w-full py-5' >
      <span className='text-3xl font-semibold' >Update Blog</span>
     </div>
     <form onSubmit={UpdateBlog} className='flex flex-col gap-y-5 pb-5' >
      <div className='flex justify-end' >
       <Link href={`/blogs/${formData.slug}`} className='bg-c-orange px-2 rounded text-white' >View Article</Link>
      </div>
      
      <div>
       <label for="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Title</label>
       <input name="title" value={formData.title} onChange={HandleChange}  type="text" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
      </div>

      <CKEditor
        editor={Editor}
        data={formData.content || ''}
        onChange={(e,editor)=>setFormData({...formData,content:editor.getData()})}
        config={{
          height: '250px', // Set the initial height
          toolbar: [
            'alignment',
            'autoImage',
            'autoLink',
            'autoformat',
            'blockQuote',
            'bold',
            'essentials',
            'fontSize',
            'heading',
            'image',
            'imageCaption',
            'imageUpload',
            'imageToolbar',
            'italic',
            'link',
            'list',
            'mediaEmbed',
            'paragraph',
            'undo',
            'redo',
            'bulletedList',
            'numberedList'
          ]
        }}
        onReady={(editor) => {
          editor.ui.view.editable.element.style.minHeight = "250px";
        }}
        onBlur={(event, editor) => {
          editor.ui.view.editable.element.style.minHeight = '250px';
        }}
        onFocus={(event, editor) => {
          editor.ui.view.editable.element.style.minHeight = "250px";
        }}
      />

       <div>
        <label for="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Thumbnail</label>
        <div className='flex border border-gray-500 py-2 px-3 rounded-md' >
         <input readOnly name="avatar" value={formData.thumbnail} type="text" placeholder="Select Single File" className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg bg-white px-5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 w-6/12 bg-gray-500" />
         <button type="button" onClick={()=>setMediaPopup(true)} className='bg-b4 px-4 py-1 rounded-md text-white' >Select</button>
        </div>
       </div>

       <div className='flex justify-center w-full' >
        <button className='bg-b3 px-4 py-1 rounded text-white' >Submit</button>
       </div>

     </form>


     </div>
    </div>}
    </>
  )
}

export default Page