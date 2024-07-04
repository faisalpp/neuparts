"use client";

import React, { useEffect,useState } from 'react'
import {toast} from 'react-toastify'
import Table from '@/components/AdminDashboard/Table'
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import Tablet from '@/components/AdminDashboard/Table/TD/Tablet';
import TdImage from '@/components/AdminDashboard/Table/TD/TdImage';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns'
import FileInput from '@/components/AdminDashboard/Inputs/File'
import TableNav from '@/components/AdminDashboard/TableNav'
import Popup from '@/components/AdminDashboard/Popup'
import * as Yup from "yup";
import {limitString} from '@/utils/index'



const Page = () => {
  
  const [createPopup,setCreatePopup] = useState(false);
  const [updatePopup,setUpdatePopup] = useState(false);
  const [teamMembers,setTeamMembers] = useState([]);
  const [rowLoader,setRowLoader] = useState(true);
  const [reRender,setReRender] = useState(false)
  const [page,setPage] = useState(1)
  const [pageCount,setPageCount] = useState(0)
  const [limit,setLimit] = useState(2)
  
  const [formData,setFormData] = useState({id:'',name:'',bio:'',role:'',avatar:''})

  const HandleChange = (e) => {
    const {value,name} = e.target;
    setFormData({...formData,[name]:value})
  }

  const ValMember = Yup.object({
    name: Yup.string().required('Name is required!'),
    bio: Yup.string().required('Bio is required!'),
    role: Yup.string().required('Role is required!'),
    avatar: Yup.string().required('Avatar is required!'),
  })


  const CreateTeamMember = async (e) => {
      e.preventDefault()
      
      try {
        await ValMember.validate(formData, {abortEarly: false});
        console.log("Form Submitted", formData);
    
      fetch('/api/admin/team-member', {method: 'POST',
        headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
      }).then((res) => res.json())
       .then((resp) => {
         if(resp.success){
          setFormData({name:'',bio:'',role:'',avatar:''});
          toast.success(resp.message)
          setReRender(true)
          setCreatePopup(false)
         }else{
          toast.error('Something Went Wrong!')
         }
        })
        .catch((error) => {
          toast.error('Something Went Wrong!')
          console.error('Error creating team member:', error);
        });
      
      
      } catch (error) {
        console.log(error)
        error?.inner?.forEach((err) => {
          toast.error(err.message);
        });
      }
  };

  const UpdateTeamMember = async (e) => {
      e.preventDefault()
      
      try {
        await ValMember.validate(formData, {abortEarly: false});
    
           // Show pending toast
  const updToastId = toast.promise(
    new Promise((resolve) => {
      // Placeholder promise that resolves when request completes
      setTimeout(resolve, 3000); // Show for 3 seconds or until resolved
    }),
    {
      pending: 'Updating Team Member...', // Show pending message
      success: 'Team Member update successfully!', // Show success message
      error: 'Failed to update Team Member', // Show error message
      closeOnClick: false,
      closeOnEscape: false
    }
  );
 

      fetch('/api/admin/team-member', {method: 'PUT',
        headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
      }).then((res) => res.json())
       .then((resp) => {
         if(resp.success){
           setReRender(true)
           setFormData({name:'',bio:'',role:'',avatar:''});
           setUpdatePopup(false)
           toast.update(updToastId,{render:resp.message,type:toast.TYPE?.SUCCESS,autoClose:3000,isLoading: false})
         }else{
          toast.update(updToastId,{render:resp.message,type:toast.TYPE?.ERROR,autoClose:3000,isLoading: false})
         }
        })
      } catch (error) {
        console.log(error)
        error?.inner?.forEach((err) => {
          toast.error(err.message);
        });
      }
  };


  const DeleteTeamMember = async (id) => {
    if(!id){
      toast.error('Team Member id required!')
      return
    }

     // Show pending toast
  const delToastId = toast.promise(
    new Promise((resolve) => {
      // Placeholder promise that resolves when request completes
      setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
    }),
    {
      pending: 'Deleting Team Member...', // Show pending message
      success: 'Team Member deleted successfully!', // Show success message
      error: 'Failed to delete Team Member', // Show error message
      closeOnClick: false,
      closeOnEscape: false
    }
  );

    fetch('/api/admin/team-member', {method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },body: JSON.stringify({id:id}),
    }).then((res) => res.json())
    .then((resp) => {
      if(resp.success){
       setReRender(true)
       toast.update(delToastId,{render:resp.message,type:toast.TYPE.SUCCESS,autoClose:1000,isLoading: false})
      }else{
       toast.update(delToastId,{type:toast.TYPE.ERROR,autoClose:3000,isLoading: false})
      }
     })
     .catch((error) => {
      // toast.update(delToastId,{type:toast.TYPE.ERROR,autoClose:3000,isLoading: false})
       console.error('Error deleting team member:', error);
    });
  }

 const FetchTeamMembers = async () => {
  setRowLoader(true)

     // Show pending toast
     const getToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Getting Team Member...', // Show pending message
        success: 'Team Members retrived successfully!', // Show success message
        error: 'Failed to get Team Members', // Show error message
        closeOnClick: false,
        closeOnEscape: false
      }
    );

  fetch(`/api/admin/team-member/?page=${page}&limit=${limit}`)  
   .then((res) => res.json())
   .then((data) => {
    if(data.members.length > 0){
      toast.update(getToastId,{render:data.message,type:toast.TYPE?.SUCCESS,autoClose:1000,isLoading: false}) 
      setPageCount(data.pagination.pageCount)
      setTeamMembers(data.members)
    }else{
      toast.update(getToastId,{render:data.message,type:toast.TYPE?.ERROR,autoClose:1000,isLoading: false})
       setTeamMembers([])
    }
    setRowLoader(false)
   })
 }

 // get team members data
 useEffect(() => {
  FetchTeamMembers()
 }, [page])

 useEffect(() => {
  if(reRender){
  setTimeout(() => {
    FetchTeamMembers()
    setReRender(false);
  }, 2000);
  }
 }, [reRender])
 


  return (
    <>
    <Popup state={createPopup} setState={setCreatePopup}  >
     <form onSubmit={CreateTeamMember} className='flex flex-col mx-10 w-full' >
     <h1 className='text-center text-xl font-semibold' >Create Team Member </h1>
      
      <div className='flex flex-col gap-3 my-10' >
       <div>
        <label for="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Name</label>
        <input name="name" value={formData.name} onChange={HandleChange} type="text" placeholder="John Doe" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       <div>
        <label for="bio" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Bio</label>
        <textarea name="bio" value={formData.bio} onChange={HandleChange}  className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
        </textarea>
       </div>
       <div>
        <label for="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Role</label>
        <input name="role" value={formData.role} onChange={HandleChange} type="text" placeholder="CEO" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       <div>
        <label for="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Role</label>
        <input name="avatar" value={formData.avatar} onChange={HandleChange} type="text" placeholder="CEO" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       {/* <FileInput change={HandleChange} inputName="avatar" title="Avatar" /> */}
       <button class="self-center w-fit text-md mt-3 px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
      </div> 

     </form>
    </Popup>

    <Popup state={updatePopup} setState={setUpdatePopup}  >
     <form onSubmit={UpdateTeamMember} className='flex flex-col mx-10 w-full' >
     <h1 className='text-center text-xl font-semibold' >Update Team Member </h1>
      
      <div className='flex flex-col gap-3 my-10' >
       <div>
        <label for="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Name</label>
        <input name="name" value={formData.name} onChange={HandleChange} type="text" placeholder="John Doe" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       <div>
        <label for="bio" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Bio</label>
        <textarea name="bio" value={formData.bio} onChange={HandleChange}  className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
        </textarea>
       </div>
       <div>
        <label for="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Role</label>
        <input name="role" value={formData.role} onChange={HandleChange} type="text" placeholder="CEO" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       <div>
        <label for="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">Role</label>
        <input name="avatar" value={formData.avatar} onChange={HandleChange} type="text" placeholder="CEO" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
       </div>
       {/* <FileInput change={HandleChange} inputName="avatar" title="Avatar" /> */}
       <button class="self-center w-fit text-md mt-3 px-6 py-3 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
      </div> 

     </form>
    </Popup>


    <div className='flex flex-col mx-10' style={{height:'calc(100vh - 100px)'}} > 
     <ActionBtns trigger={setCreatePopup} />
     <div className='flex flex-col items-center mt-10 h-full w-full' >
      <Table header={['Avatar','Name','Bio','Role','Actions']} >
      {/* hello pengea/dnd */}
      {rowLoader ? <RowLoader/> : teamMembers?.length > 0 ?
       teamMembers.map((member,i)=>
        <Row Key={i} >
         <TdImage src={member.avatar} css="w-16" />
         <Text text={member.name} />
         <Text text={limitString(member.bio,200)} />
         <Tablet text={member.role} />
         <Actions id={member._id} handleDelete={DeleteTeamMember} data={member} setFormData={setFormData}  setUpdatePopup={setUpdatePopup} />
        </Row>
        )
       :
       <NoData colspan={4} alert="No Team Members Found!" />
      }
      </Table>
      {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
     </div>
    </div>
    </>
  )
}

export default Page