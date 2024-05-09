import React from 'react'
import {FiChevronDown} from 'react-icons/fi'


const SelectInput = (props) => {
    const options = props.options || [{title:'Not Found'}]
    const name = props.name
    
  return (
     <>
     {name === 'us_states' ?
     <div className={`${props.widthFull === 'true' ? 'w-full' : 'w-1/2'}`} >
     {props.title ? <h5 className='text-xs font-semibold mb-2' >{props.title} {props.iscompulsory === 'true' ? <i className='text-red-500' >*</i> : null}</h5>:null}{props.error ? <h5 className='text-red-500 text-xs' >{props.error ? props.errormessage : null}</h5>:null}
     <div className='relative'>
     <select {...props} className={`border ${props.error ? 'border-red-500' :'border-[rgba(0,0,0,0.16)]'} rounded-lg ${props.height ? props.height :'h-10'} ${props.textSize ? props.textSize : 'text-sm'} px-4 w-full outline-none appearance-none`}>
      {options && options.length>0 ? options.map((option,index)=><option key={index} value={option.abbreviation} >{option.title}</option>):<option>{props.title} Not Found!</option>}
     </select>
      <div className='absolute flex items-center right-0 top-0 pr-1 h-full' >
      <FiChevronDown />
      </div>
     </div>
    </div>
     :
     <div className={`${props.widthFull === 'true' ? 'w-full' : 'w-1/2'}`} >
           {props.title ? <h5 className='text-xs font-semibold mb-2' >{props.title} {props.iscompulsory === 'true' ? <i className='text-red-500' >*</i> : null}</h5>:null}{props.error ? <h5 className='text-red-500 text-xs' >{props.error ? props.errormessage : null}</h5>:null}
           <div className='relative'>
           <select {...props} className={`border ${props.error ? 'border-red-500' :'border-[rgba(0,0,0,0.16)]'} rounded-lg ${props.height ? props.height :'h-10'} ${props.textSize ? props.textSize : 'text-sm'} px-4 w-full outline-none appearance-none`}>
            {options.length>0 ? options.map((option,index)=><option key={index} value={props.name === 'category'? option._id: props.name !== 'category' && option.title? option.title.toLowerCase().replace(/\s/g,'-'): option.toLowerCase().replace(/\s/g,'-')} >{option.title ? option.title:option.replace(/\-/g,' ')}</option>):<option>{props.title} Not Found!</option>}
           </select>
            <div className='absolute flex items-center right-0 top-0 pr-1 h-full' >
            <FiChevronDown />
            </div>
           </div>
          </div>}
     </> 
  )
}

export default SelectInput