'use client';
import React, { useEffect, useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import TextInput from '@/components/TextInput/TextInput';
import CustomSelect from '@/components/Reusable/CustomSelect';
import * as Yup from 'yup';
import BtnLoader from '@/components/Loader/BtnLoader';
import { useSelector } from 'react-redux';
import { BiLoaderAlt } from "react-icons/bi";
import {toast} from 'react-toastify'

const BillingInformation = () => {
  return (
    <>
      <MyAccount>
        <h2 className="mb-10 text-2xl font-bold">Billing Information</h2>
        <BillingInformationData />
      </MyAccount>
    </>
  );
};

export default BillingInformation;

const BillingInformationData = () => {

  const UserId = useSelector((state)=>state.auth.id)
 
  const [loading, setLoading] = useState(false);
  const [formData,setFormData] = useState({id:'',email:'',first_name:'',last_name:'',address:'',apartment:'',city:'',country:'usa',province:'alberta',postal_code:'',phone:''})
  const Countrys = [{ name: 'USA', value: 'usa' }];
  const Provinces = [
    { name: 'Alberta', value: 'alberta' },
  ];

  const getBillingAddress = async () => {
    setLoading(true);
    fetch(`/api/user/profile/billing-address/?userId=${UserId}`)
     .then((res) => res.json())
     .then((data) => {
     if (data.success) {
       setFormData(data.address)
       setLoading(false)
     } else {
      setLoading(false) 
     }
    }).catch((error)=>{
      setLoading(false)
    })
  };

  useEffect(() => {
    getBillingAddress();
  }, []);

  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData({...formData,[name]:value})
  }


  const updateShippingSchema = Yup.object().shape({
    userId: Yup.string().required('User Id is Required!'),
    email: Yup.string().required('Email is Required!'),
    first_name: Yup.string().nullable(),
    last_name: Yup.string().required('Last Name is Required!'),
    address: Yup.string().required('Address is Required!'),
    city: Yup.string().required('City is Required!'),
    country: Yup.string().required('Country is Required!'),
    province: Yup.string().required('Province is Required!'),
    postal_code: Yup.string().required('Postal Code is Required!'),
    phone: Yup.string().required('Phone is Required!'),
  });


  const SaveBillingAddress = async (e) => {
    e.preventDefault()
    
    try {
      await updateShippingSchema.validate({userId:UserId,...formData}, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const getToastId = toast.loading('Updating billing address...')
    fetch('/api/user/profile/billing-address', {method: 'PUT',
      headers: { 'Content-Type': 'application/json' },body: JSON.stringify({userId:UserId,...formData}),
    }).then((res) => res.json())
    .then((data) => {
      getBillingAddress()
      toast.update(getToastId, { render: 'Billing address updated!', type: 'success', autoClose: 1000, isLoading: false });
     }).catch((error) => {
      setFormData({id:'',email:'',first_name:'',last_name:'',address:'',apartment:'',city:'',country:'usa',province:'alberta',postal_code:'',phone:''})
      toast.update(getToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
    });
  };

  return (
    <>
    <form onSubmit={SaveBillingAddress} className="relative flex w-full flex-col gap-6 lg:max-w-[432px]">
    {loading ? 
      <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white/50">
        <BiLoaderAlt className='text-2xl animate-spin' />
      </div>
      :null}
        <TextInput name="email" title="Email" width="full" value={formData.email} onChange={handleChange} placeholder="Email" />
        <TextInput name="first_name" title="First Name" width="full" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
        <TextInput name="last_name" title="Last Name" width="full" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
        <TextInput name="address" title="Address" width="full" value={formData.address} onChange={handleChange} placeholder="Address" />
        <div className="grid grid-cols-2 gap-5">
         <CustomSelect fieldName='country' setState={handleChange} id="country_region" label="Country / region" Options={Countrys} />
         <CustomSelect fieldName='province' setState={handleChange} id="province" label="State / Province" Options={Provinces} />
        </div>
        <TextInput name="city" title="City" width="full" value={formData.city} onChange={handleChange} placeholder="City" />
        <TextInput name="postal_code" title="Post Code" width="full" value={formData.postal_code} onChange={handleChange} placeholder="Postal Code" />
        <TextInput name="phone" title="Phone" width="full" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-b3 py-3 text-xs font-medium text-white">
          {loading ? <BtnLoader style="w-4" /> : 'Save Changes'}
        </button>
      </form>
    </>
  );
};

export { BillingInformationData };
