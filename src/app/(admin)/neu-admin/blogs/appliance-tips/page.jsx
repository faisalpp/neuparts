"use client";

import React, { useEffect,useState } from 'react'
import {toast} from 'react-toastify'
import Table from '@/components/AdminDashboard/Table'
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import TdImage from '@/components/AdminDashboard/Table/TD/TdImage';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns'
import TableNav from '@/components/AdminDashboard/TableNav'



const Page = () => {

  const [blogs,setBlogs] = useState([]);
  const [rowLoader,setRowLoader] = useState(true);
  const [reRender,setReRender] = useState(false)
  const [page,setPage] = useState(1)
  const [pageCount,setPageCount] = useState(0)
  const [limit,setLimit] = useState(10)
  const [search, setSearch] = useState('');
  const [by, setBy] = useState('all');

   //handel empty page request
   const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = blogs.filter(item => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  }

  const DeleteBlog = async (id) => {
    if(!id){
      toast.error('Blog id required!')
      return
    }

     // Show pending toast
  const delToastId = toast.loading('Deleting Blog...')

    fetch('/api/admin/blog/appliance-tips', {method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },body: JSON.stringify({id:id}),
    }).then((res) => res.json())
    .then((resp) => {
      if(resp.success){
        ManagePageCount(id)
       setReRender(true)
       toast.update(delToastId,{render:resp.message,type:'success',autoClose:1000,isLoading: false})
      }else{
       toast.update(delToastId,{type:'error',autoClose:1000,isLoading: false})
      }
     })
     .catch((error) => {
      toast.update(delToastId,{type:'error',autoClose:1000,isLoading: false})
    });
  }

 const FetchBlogs = async () => {
  setRowLoader(true)

  // Show pending toast
  const getToastId = toast.loading('Getting Blogs...')

  fetch(`/api/admin/blog/appliance-tips/?page=${page}&limit=${limit}&search=${search}&by=${by}`)  
   .then((res) => res.json())
   .then((data) => {
    if(data.blogs.length > 0){
      toast.update(getToastId,{render:data.message,type:'success',autoClose:1000,isLoading: false}) 
      setPageCount(data.pagination.pageCount)
      setBlogs(data.blogs)
    }else{
      toast.update(getToastId,{render:'No blogs found!',type:'error',autoClose:1000,isLoading: false})
       setBlogs([])
    }
    setRowLoader(false)
   })
 }

 // get team members data
 useEffect(() => {
  FetchBlogs()
 }, [page])

 useEffect(() => {
  if(reRender){
    FetchBlogs()
    setReRender(false);
  }
 }, [reRender])


  return (
    <>
    <div className='flex flex-col mx-10' style={{height:'calc(100vh - 100px)'}} > 
     <ActionBtns buttons={[{type:'link',text:'Add Blog',link:'/neu-admin/blogs/appliance-tips/add-blog'},{type:'link',text:'Categories',link:'/neu-admin/blogs/appliance-tips/categories'},
      {type:'search',placeholder:'Type here to search by title',options:[{title:'By Title',value:'title'}],field:search,setField:setSearch,search:FetchBlogs}
     ]}  />
     <div className='flex flex-col items-center mt-10 h-full w-full' >
      <Table header={['Thumbnail','Title','Slug','Category','Actions']} >
      {/* hello pengea/dnd */}
      {rowLoader ? <RowLoader count={5}  /> : blogs?.length > 0 ?
       blogs.map((blog,i)=>
        <Row Key={i} >
         <TdImage src={blog.thumbnail} css="w-20 h-14 object-fit rounded" />
         <Text text={blog.title} />
         <Text text={blog.slug} />
         <Text text={blog.joinedCategory.title} />
         <Actions id={blog._id} handleDelete={DeleteBlog} data={blog} isEditLink={true} editLink={`/neu-admin/blogs/appliance-tips/update-blog/${blog.slug}`}/>
        </Row>
        )
       :
       <NoData colspan={4} alert="No Blogs Found!" />
      }
      </Table>
      {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
     </div>
    </div>
    </>
  )
}

export default Page