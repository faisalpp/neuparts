"use client"
import React,{useEffect, useState} from 'react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import MediaPopup from '@/components/AdminDashboard/MediaPopup'
import * as Yup from "yup";
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation'

const Page = () => {
 
const [mediaPopup,setMediaPopup] = useState(false);
const [formData,setFormData] = useState({title:'',content:'',thumbnail:''})
const [categories,setCategories] = useState([])
const [files,setFiles] = useState([])
const router = useRouter()

useEffect(()=>{
  if(files.length > 0){
    setFormData({...formData,thumbnail:files[0].url})
   }
 },[files])

 const HandleChange = (e) => {
  const {value,name} = e.target;
  setFormData({...formData,[name]:value})
 }

 const GetCategories = async () => {
  fetch('/api/admin/post-categories?postType=appliance-tips', {method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
   .then((resp) => {
     console.log(resp)
     if(resp.success && resp.cats.length > 0){
      setCategories(resp.cats)
      setFormData({...formData,category:resp.cats[0]})
     }else{
      setCategories([])
     }
    })
    .catch((error) => {
      toast.error('Something went wrong!')
    });
 }

 useEffect(()=>{
  GetCategories()
 },[])


 const ValBlog = Yup.object({
  title: Yup.string().required('Title is required!'),
  content: Yup.string().required('Content is required!'),
  thumbnail: Yup.string().required('Thumbnail is required!'),
  category: Yup.object().required('Category is required!'),
 })

 const CreateBlog = async (e) => {
  e.preventDefault()

  try {
    await ValBlog.validate(formData, {abortEarly: false});
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
      pending: 'Creating Blog...', // Show pending message
      success: 'Blog created successfully!', // Show success message
      error: 'Failed to create blog', // Show error message
      closeOnClick: false,
      closeOnEscape: false
    }
  );
  toast.update(crtToastId,{type:toast.TYPE?.PENDING,autoClose:1000,isLoading: true})

  fetch('/api/admin/blog/appliance-tips', {method: 'POST',
    headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
  }).then((res) => res.json())
   .then((resp) => {
     if(resp.success){
      toast.update(crtToastId,{type:toast.TYPE?.SUCCESS,autoClose:1000,isLoading: false})
      router.push('/neu-admin/blogs/appliance-tips')
     }else{
      toast.update(crtToastId,{type:toast.TYPE?.ERROR,autoClose:1000,isLoading: false})
     }
    })
    .catch((error) => {
      toast.update(crtToastId,{type:toast.TYPE?.ERROR,autoClose:1000,isLoading: false})
    });
}; 

    

  return (
    <div className='flex justify-center' style={{minHeight:'calc(100vh - 25px)'}} >
      <MediaPopup state={mediaPopup} setState={setMediaPopup} setFiles={setFiles} /> 
    <div className='flex flex-col mx-24 gap-y-5' >
     <div className='flex justify-center w-full py-5' >
      <span className='text-3xl font-semibold' >Create Blog</span>
     </div>
     <form onSubmit={CreateBlog} className='flex flex-col gap-y-5 pb-5' >
      <div>
       <label for="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Title</label>
       <input name="title" value={formData.title} onChange={HandleChange}  type="text" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
      </div>

      <CKEditor
        editor={Editor}
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
        <label for="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Category</label>
        <select name="category" onChange={HandleChange} className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
         {categories.length > 0 ? 
          categories.map((cat)=>
         <option value={cat._id} >{cat.title}</option>):<option>No Categories Found!</option>}
        </select>
       </div>

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
    </div>
  )
}

export default Page