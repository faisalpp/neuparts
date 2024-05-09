import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'

const Popup = ({state,setState,children,width,zindex,style}) => {
  return (
    <div className={`fixed ${state?'flex':'hidden'} items-center ${style?style:null} justify-center top-0 ${zindex?zindex:'z-50'} h-screen bg-black/50 w-full`} >
     <div className={`relative flex justify-center bg-white ${zindex?zindex:'z-40'} p-5 rounded-xl ${width?width:'w-6/12'}`}>
     {setState ? <span onClick={()=>setState(false)} className='absolute top-0 -right-8 bg-b3 rounded-full px-1 py-1 cursor-pointer' ><AiOutlineClose className='text-sm text-white' /></span>:null}
     {children}
     </div>
    </div>
  )
}

export default Popup