import React from 'react'
import TextInput from '../../TextInput/TextInput'
import SelectInput from '../../TextInput/SelectInput'
import UsStates from '../../../services/states'

const BillingAddressComp = ({errors,shippingAddress,setBillingAddress,billingAddress}) => {
        return (
        <div className='relative w-1/2' >
     <h3 className='font-semibold text-center' >Billing Address</h3>
     <h3 onClick={e=>{e.preventDefault();setBillingAddress(shippingAddress)}} className='absolute cursor-pointer right-0 text-blue-500 underline font-semibold text-[10px] text-end' >Copy Shipping Address</h3>
      {/* Conatct Information */}
       <TextInput width="full" name="Email" title="Email" iscompulsory="false" type="text" value={billingAddress.email} onChange={(e) =>setBillingAddress({...billingAddress,email:e.target.value})} error={errors && errors.includes('Billing Address Email is Required!') ? true : false} errormessage="Billing Address Email is Required!" placeholder="abc@gmail.com" />
      {/* Shipping */}
      <div className='space-y-14px mt-2'>
       <div className='grid grid-cols-2 gap-3'>
        <TextInput width="full" name="bfirstName" title="" iscompulsory="false" type="text" value={billingAddress.firstName} onChange={(e) =>setBillingAddress({...billingAddress,firstName:e.target.value})} error={errors && errors.includes('Billing Address First Name is Required!') ? true : false} errormessage="Billing Address First Name is Required!" placeholder="First Name (optional)" />
        <TextInput width="full" name="blastName" title="" iscompulsory="false" type="text" value={billingAddress.lastName} onChange={(e) =>setBillingAddress({...billingAddress,lastName:e.target.value})} error={errors && errors.includes('Billing Address Last Name is Required!') ? true : false} errormessage="Billing Address Last Name is Required!" placeholder="Last Name" />
        <div className="col-span-2 space-y-3">
         <TextInput width="full" name="baddress" title="" iscompulsory="false" type="text" value={billingAddress.address} onChange={(e) =>setBillingAddress({...billingAddress,address:e.target.value})} error={errors && errors.includes('Billing Address Address is Required!') ? true : false} errormessage="Billing Address Address is Required!" placeholder="Address" />
         <TextInput width="full" name="bappartment" title="" iscompulsory="false" type="text" value={billingAddress.appartment} onChange={(e) =>setBillingAddress({...billingAddress,apparment:e.target.value})} placeholder="Apartment, suite, etc. (optional)" />
         <TextInput width="full" name="bcity" title="" iscompulsory="false" type="text" value={billingAddress.city} onChange={(e) =>setBillingAddress({...billingAddress,city:e.target.value})}error={errors && errors.includes('Billing Address City is Required!') ? true : false} errormessage="Billing Address City is Required!" placeholder="City" />
         <div className='flex items-center space-x-5'>
          <SelectInput name="us_states" widthFull="true" onChange={(e) =>setBillingAddress({...billingAddress,state:e.target.value})} id="province" label="Province" options={UsStates} />
          <SelectInput name="us_states" widthFull="true" onChange={(e) =>setBillingAddress({...billingAddress,country:e.target.value})} id="country_region" label="Country / region" options={[{title:'United States',abbreviation:'US'}]} />
         </div>
         <div className='flex space-x-5 w-full'>
          <TextInput width="full" name="bpostalCode" title="" iscompulsory="false" type="text" value={billingAddress.postalCode} onChange={(e) =>setBillingAddress({...billingAddress,postalCode:e.target.value})} error={errors && errors.includes('Billing Address Postal Code is Required!') ? true : false} errormessage="Billing Address Postal Code is Required!" placeholder="Postal Code" />
          <TextInput width="full" name="bphone" title="" iscompulsory="false" type="text" value={billingAddress.phone} onChange={(e) =>setBillingAddress({...billingAddress,phone:e.target.value})} error={errors && errors.includes('Billing Address Phone is Required!') ? true : false} errormessage="Billing Address Phone is Required!" placeholder="Phone" />
         </div>
        </div>
       </div>
      
      </div>
     </div>
        )
}

export default BillingAddressComp