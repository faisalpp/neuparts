import React, { useState } from 'react'
import TextInput from '../../TextInput/TextInput'
import SelectInput from '../../TextInput/SelectInput'
import Popup from '../Popup'
import { useDispatch, useSelector } from 'react-redux'
import {setTax} from '../../../store/adminCart'

const Tax = ({state,setState}) => {

  const dispatch = useDispatch()
  const [taxType,setTaxType] = useState('percentage')
  const [taxAmount,setTaxAmount] = useState(0)
  const subTotal = useSelector((state)=>state.adminCart.subTotal)
  const shipping = useSelector((state)=>state.adminCart.shipping)

  const HandleTax = () => {
    if(!taxAmount){
      return Toast('Amount Or Percentage Required!','error',1000)
    }
    let am = subTotal;
    if(shipping.type !== 'free shipping' && shipping.shipping !== 'Free'){
      am += shipping.shipping;
    }
    if(taxType === 'percentage'){
     const tx = ((parseInt(taxAmount)/100) * am);
     console.log(typeof(tx))
     dispatch(setTax(tx))
    }else{
      const tx = taxAmount + am;
      dispatch(setTax(tx.toFixed(2)))
    }
    setTaxAmount(0)
    setState(false)
  }

  return (
    <Popup state={state} setState={setState} zindex="z-[99]" >
    <div className=' w-full' >
     <h3 className='text-center font-semibold' >Add Tax</h3>
     <div className='flex items-center space-x-2 mt-2' >
      <SelectInput widthFull="true" title="Tax Type" height="h-8" onChange={e=>setTaxType(e.target.value)} textSize="text-xs capitalize" options={['percentage','flat rate']}  />
      <TextInput width="full" name="postalCode" title="Tax Rate" iscompulsory="false" type="number" value={taxAmount} onChange={(e) =>setTaxAmount(e.target.value)} placeholder="0" /> 
     </div>
     <button onClick={HandleTax} type="button" className='text-xs bg-b6 px-3 py-1 rounded-lg text-white' >Apply</button>
    </div> 
   </Popup>
  )
}

export default Tax