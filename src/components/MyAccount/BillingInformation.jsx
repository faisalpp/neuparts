'use client';
import React, { useEffect, useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import TextInput from '@/components/TextInput/TextInput';
import SelectInput from '@/components/TextInput/SelectInput';
import * as Yup from 'yup';
import BtnLoader from '@/components/Loader/BtnLoader';

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
  const userId = '';

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('usa');
  const [city, setCity] = useState('');
  const [state, setState] = useState('alabama');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const getBillingAddress = async () => {
    //   const res = await GetBillingAddress({_id:userId})
    //   if(res.status === 200 && res.data.billingAddress){
    //     setId(res.data.billingAddress._id)
    //     setEmail(res.data.billingAddress.email)
    //     setFirstName(res.data.billingAddress.firstName)
    //     setLastName(res.data.billingAddress.lastName)
    //     setAddress(res.data.billingAddress.address)
    //     setCountry(res.data.billingAddress.country)
    //     setCity(res.data.billingAddress.city)
    //     setState(res.data.billingAddress.state)
    //     setPostalCode(res.data.billingAddress.postalCode)
    //     setPhone(res.data.billingAddress.phone)
    //   }
  };

  useEffect(() => {
    getBillingAddress();
  }, []);

  const createShippingSchema = Yup.object().shape({
    userId: Yup.string().required('User Id is Required!'),
    email: Yup.string().required('Email is Required!'),
    firstName: Yup.string().nullable(),
    lastName: Yup.string().required('Last Name is Required!'),
    address: Yup.string().required('Address is Required!'),
    city: Yup.string().required('City is Required!'),
    country: Yup.string().required('Country is Required!'),
    state: Yup.string().required('State is Required!'),
    postalCode: Yup.string().required('Postal Code is Required!'),
    phone: Yup.string().required('Phone is Required!'),
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const HandleBillingAddress = async (e) => {
    //  e.preventDefault()
    //  setLoading(true)
    //  try{
    //    const data = {userId,email,firstName,lastName,address,city,country,state,postalCode,phone}
    //    await createShippingSchema.validate(data, { abortEarly: false });
    //    const res = await updateBillingAddress({...data,id:id})
    //    if(res.status === 200){
    //     setLoading(false)
    //     Toast(res.data.msg,'success',1000)
    //     getBillingAddress()
    //    }else{
    //     setLoading(false)
    //     Toast(res.data.message,'error',1000)
    //    }
    //   }catch(error){
    //     setLoading(false)
    //     if (error) {
    //      let errors = error.errors;
    //      setErrors(errors)
    //      errors.forEach((item)=>{Toast(item,'error',1000)})
    //     } else {
    //      setErrors([])
    //     }
    //    }
  };

  return (
    <>
      <form onSubmit={HandleBillingAddress} className="flex w-full flex-col gap-6 lg:max-w-[432px]">
        <TextInput title="Email" width="full" value={email} onChange={(e) => setEmail(e.target.value)} error={errors && errors.includes('Email is Required!') ? true : false} errormessage="Email is Required!" placeholder="Email" />
        <TextInput title="First Name" width="full" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors && errors.includes('First Name is Required!') ? true : false} errormessage="First Name is Required!" placeholder="First Name" />
        <TextInput title="Last Name" width="full" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors && errors.includes('Last Name is Required!') ? true : false} errormessage="Last Name is Required!" placeholder="Last Name" />
        <TextInput title="Address" width="full" value={address} onChange={(e) => setAddress(e.target.value)} error={errors && errors.includes('Address is Required!') ? true : false} errormessage="Address is Required!" placeholder="Address" />
        <SelectInput title="Country" widthFull="true" options={[{ title: 'United States', slug: 'usa' }]} onChange={(e) => setCountry(e.target.value)} />
        <SelectInput title="State" widthFull="true" options={['Alabama']} onChange={(e) => setState(e.target.value)} />
        <TextInput title="City" width="full" value={city} onChange={(e) => setCity(e.target.value)} error={errors && errors.includes('City is Required!') ? true : false} errormessage="City is Required!" placeholder="City" />
        <TextInput title="Post Code" width="full" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} error={errors && errors.includes('Postal Code is Required!') ? true : false} errormessage="Postal Code is Required!" placeholder="Postal Code" />
        <TextInput title="Phone" width="full" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors && errors.includes('Phone is Required!') ? true : false} errormessage="Phone is Required!" placeholder="Phone" />
        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-b3 py-3 text-xs font-medium text-white">
          {loading ? <BtnLoader style="w-4" /> : 'Save Changes'}
        </button>
      </form>
    </>
  );
};

export { BillingInformationData };
