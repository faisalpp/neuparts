import React, { useState } from 'react'
import Popup from '../Popup'
import SelectInput from '../../TextInput/SelectInput'

const CreateMethod = ({popup,setPopup}) => {

    const [methods,setMethods] = useState(['Flat Rate','Free Pickup'])
    const [method,setMethod] = useState('flat-rate')

    return (
    <Popup state={popup} setState={setPopup} >
     <form className='flex flex-col space-y-3' >
      <h1 className="font-semibold text-center" >Add Shipping Method</h1>
      <p className='text-center text-xs text-b32' >Choose the shipping method you wish to add. Only Shipping Methods which support zones are listed.</p>
      <div className='flex flex-col items-center space-y-5 w-full justify-center' >
      <SelectInput name="categor" title="Select Method Type" iscompulsory="true" onChange={e =>setMethod(e.target.value)} options={methods} />
      <button type="submit" className='flex justify-center items-center cursor-pointer rounded-md py-1 w-32 bg-b3' ><a className='flex items-center text-center  w-fit px-4 py-1 rounded-md text-white font-semibold' ><span className='text-xs' >Add</span></a></button>      
      </div>
     
     </form>
    </Popup>
  )
}

export default CreateMethod