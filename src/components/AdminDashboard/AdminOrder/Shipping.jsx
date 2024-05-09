import React, { useEffect, useState } from 'react'
import TextInput from '../../TextInput/TextInput'
import Popup from '../Popup'
import { CheckZip } from '../../../api/frontEnd'
import {setShipping} from '../../../store/adminCart';
import {IoMdCheckmark} from 'react-icons/io'
import {GoAlert} from 'react-icons/go'
import Toast from '../../../utils/Toast';
import { useDispatch, useSelector } from 'react-redux';

const Shipping = ({state,setState,shippingAddress}) => {

  const dispatch = useDispatch()
  const [flat,setFlat] = useState(0)
  const [rate,setRate] = useState(0)
  const [code,setCode] = useState('')
  const [zipSuccess,setZipSuccess] = useState(false)
  const [zipError,setZipError] = useState(false)
  const [changeZip,setChangeZip] = useState(false)
  const shipping = useSelector((state)=>state.adminCart.shipping)

  const GetShippingFee = async () => {
    setZipSuccess(false);
    setZipError(false);
    setChangeZip(true);
     const res = await CheckZip({zip:code})
     if(res.data.status === 200){
      setRate(res.data.zip.location.rate)
      setZipError(false);
      setChangeZip(false);
      setZipSuccess(true);
     }else{   
      setZipSuccess(false);  
      setZipError(true);
      setChangeZip(false);
    } 
  };

  useEffect(() => {
    if (code?.length === 5) {
      GetShippingFee();
    }
   }, [code])

   const ApplyShipping = (e) => {
    e.preventDefault()
    if(rate === 0){
      Toast('Shipping Fee Required!','error',1000)
    }else{
     dispatch(setShipping({type:'delivery',location:code,shipping:rate}))
     setRate(0)
     setCode('')
     setState(false)
    }
   }
   
   const ApplyFlatShipping = (e) => {
    e.preventDefault()
    if(flat === 0){
      Toast('Shipping Fee Required!','error',1000)
    }else{
     dispatch(setShipping({...shipping,location:shippingAddress.postalCode,shipping:flat}))
     setRate(0)
     setCode('')
     setState(false)
    }
   }


  return (
    <Popup state={state} setState={setState} zindex="z-[99]" >
     <div className=' w-full' >
      <h3 className='text-center font-semibold' >Add Shipping</h3>
      <div className='flex items-center space-x-5 w-full' >
       <div className='flex flex-col w-1/2 space-y-2 items-center justify-center space-x-2 mt-2' >
        <TextInput width="full" value={flat} onChange={(e)=>setFlat(e.target.value)} title="Flat Shipping Fee" iscompulsory="false" type="number" placeholder="0" /> 
        <button onClick={e=>ApplyFlatShipping(e)} className='text-xs bg-b6 px-3 py-1 rounded-lg text-white' >Apply</button>
       </div>
       <div className='flex flex-col w-1/2 space-y-2 items-center justify-center space-x-2 mt-2' >
        <div className='relative gap-x-2 flex items-center col-span-2 md:col-span-1 [&>*]:h-full w-full'>
           {changeZip?<div className='absolute top-3 z-40 flex right-0 rounded-lg items-center w-fit justify-end px-2' ><img src="/loader-bg.gif" className='w-4 h-4' /></div>:null}
           {zipSuccess?<div className='absolute top-3 z-40 flex rounded-lg items-center w-fit right-0 justify-end px-2 text-xl text-green-500' ><IoMdCheckmark/></div>:null}
           {zipError?<div className='absolute top-3 z-40 flex rounded-lg items-center w-fit justify-end px-2 right-1 text-xl text-red-500' ><GoAlert/></div>:null}
           <TextInput value={code} onChange={e=>setCode(e.target.value)} title="Fetch From ZipCode" iscompulsory="false" type="text" placeholder="73301" /> 
           <TextInput value={rate} disabled title="Shipping Rate" iscompulsory="false" type="number" placeholder="0" /> 
          </div>
        <button onClick={e=>ApplyShipping(e)} className='text-xs bg-b6 px-3 py-1 rounded-lg text-white' >Apply</button>
       </div>
      </div>
     </div> 
    </Popup>
  )
}

export default Shipping