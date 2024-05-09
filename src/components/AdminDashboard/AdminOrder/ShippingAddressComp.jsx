import React from 'react'
import UsStates from '../../../services/states'
import TextInput from '../../TextInput/TextInput'
import SelectInput from '../../TextInput/SelectInput'
import {IoMdCheckmark} from 'react-icons/io'
import {GoAlert} from 'react-icons/go'

const ShippingAddressComp = ({shippingAddress,setShippingAddress,errors,changeZip,zipSuccess,zipError}) => {
        return (
        <div className='w-1/2' >
     <h3 className='font-semibold text-center' >Shipping Address</h3>
      {/* Conatct Information */}
       <TextInput width="full" name="Email" title="Email" iscompulsory="false" type="text" value={shippingAddress.email} onChange={(e) =>setShippingAddress({...shippingAddress,email:e.target.value})} error={errors && errors.includes('Shipping Address Email is Required!') ? true : false} errormessage="Shipping Address Email is Required!" placeholder="abc@gmail.com" />
      {/* Shipping */}
      <div className='space-y-14px mt-2'>
       <div className='grid grid-cols-2 gap-3'>
        <TextInput width="full" name="firstName" title="" iscompulsory="false" type="text" value={shippingAddress.firstName} onChange={(e) =>setShippingAddress({...shippingAddress,firstName:e.target.value})} error={errors && errors.includes('Shipping Address First Name is Required!') ? true : false} errormessage="Shipping Address First Name is Required!" placeholder="First Name (optional)" />
        <TextInput width="full" name="lastName" title="" iscompulsory="false" type="text" value={shippingAddress.lastName} onChange={(e) =>setShippingAddress({...shippingAddress,lastName:e.target.value})} error={errors && errors.includes('Shipping Address Last Name is Required!') ? true : false} errormessage="Shipping Address Last Name is Required!" placeholder="Last Name" />
        <div className="col-span-2 space-y-3">
         <TextInput width="full" name="address" title="" iscompulsory="false" type="text" value={shippingAddress.address} onChange={(e) =>setShippingAddress({...shippingAddress,address:e.target.value})} error={errors && errors.includes('Shipping Address Address is Required!') ? true : false} errormessage="Shipping Address Address is Required!" placeholder="Address" />
         <TextInput width="full" name="appartment" title="" iscompulsory="false" type="text" value={shippingAddress.appartment} onChange={(e) =>setShippingAddress({...shippingAddress,apparment:e.target.value})} error={errors && errors.includes('Shipping Address Apartment, suite is Required!') ? true : false} errormessage="Shipping Address Apartment, suite is Required!" placeholder="Apartment, suite, etc. (optional)" />
         <TextInput width="full" name="city" title="" iscompulsory="false" type="text" value={shippingAddress.city} onChange={(e) =>setShippingAddress({...shippingAddress,city:e.target.value})}error={errors && errors.includes('Shipping Address City is Required!') ? true : false} errormessage="Shipping Address City is Required!" placeholder="City" />
         <div className='flex items-center space-x-5'>
          <SelectInput name="us_states" widthFull="true" onChange={(e) =>setShippingAddress({...shippingAddress,state:e.target.value})} id="province" label="Province" options={UsStates} />
          <SelectInput name="us_states" widthFull="true" onChange={(e) =>setShippingAddress({...shippingAddress,country:e.target.value})} id="country_region" label="Country / region" options={[{title:'United States',abbreviation:'US'}]} />
         </div>
         <div className='flex space-x-5'>
          <div className='relative  col-span-2 md:col-span-1 [&>*]:h-full w-full'>
           {/* {changeZip?<div className='absolute z-40 flex right-0 rounded-lg items-center w-fit justify-end px-2' ><img src="/loader-bg.gif" className='w-4 h-4' /></div>:null}
           {zipSuccess?<div className='absolute z-40 flex rounded-lg items-center w-fit right-0 justify-end px-2 text-xl text-green-500' ><IoMdCheckmark/></div>:null}
           {zipError?<div className='absolute z-40 flex rounded-lg items-center w-fit justify-end px-2 right-1 text-xl text-red-500' ><GoAlert/></div>:null} */}
           <TextInput width="full" name="postalCode" title="" iscompulsory="false" type="text" value={shippingAddress.postalCode} onChange={(e)=>setShippingAddress({...shippingAddress,postalCode:e.target.value})} error={errors && errors.includes('Shipping Address Postal Code is Required!') ? true : false} errormessage="Shipping Address Postal Code is Required!" placeholder="Postal Code" />
          </div>
          <TextInput width="full" name="phone" title="" iscompulsory="false" type="text" value={shippingAddress.phone} onChange={(e) =>setShippingAddress({...shippingAddress,phone:e.target.value})} error={errors && errors.includes('Shipping Address Phone is Required!') ? true : false} errormessage="Shipping Address Phone is Required!" placeholder="Phone" />
         </div>
        </div>
       </div>
      
      </div>
     </div>
        )
}

export default ShippingAddressComp