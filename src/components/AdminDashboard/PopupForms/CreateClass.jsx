import React,{useState} from 'react'
import Popup from '../Popup'
import TextInput from '../../TextInput/TextInput'
import TextAreaInput from '../../TextInput/TextAreaInput'

const CreateClass = ({popup,setPopup}) => {

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  
  return (
  <Popup state={popup} setState={setPopup} >
    <form className='flex flex-col items-center space-y-3 w-full' >
     <h1 className="font-semibold text-center" >Create Shipping Class</h1>
      <div className='flex flex-col items-center space-y-5 w-full' >
       <TextInput title="Class Name" iscompulsory="true" type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter Shipping Zone Name"  />
       <TextAreaInput title="Description" type="text" value={description} change={(e)=>setDescription(e.target.value)} placeholder="Enter Zone Description..."  />       
      </div>
      <button type="submit" className='flex text-center justify-center items-center cursor-pointer rounded-md py-1 w-32 bg-b3' ><a className='flex items-center text-center  w-fit px-4 py-1 rounded-md text-white font-semibold' ><span className='text-xs' >Create</span></a></button>      
    </form>
  </Popup>
  )
}

export default CreateClass