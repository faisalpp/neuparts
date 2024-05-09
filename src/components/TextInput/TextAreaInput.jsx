import React from 'react'

const TextAreaInput = (props) => {
  return (
  <div className={`flex flex-col space-y-1 ${props.width === 'full' ? 'w-full' : 'w-1/2'}`}>
    <h5 className='text-xs font-semibold' >{props.title} {props.iscompulsory === 'true' ? <i className='text-red-500' >*</i> : null}</h5><h5 className='text-red-500 text-xs' >{props.error ? props.errormessage : null}</h5>
    <textarea {...props} className={`text-sm outline-none border-[1px] ${props.error?'border-red-500':'border-b31'} w-full px-2 py-3 rounded-md ${props.height?props.height:''} overflow-x-hidden overflow-y-scroll`}></textarea>
  </div>
  )
}

export default TextAreaInput