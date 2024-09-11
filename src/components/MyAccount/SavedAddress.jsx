'use client';
import React, { useEffect, useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import EditSavedAddress from '@/components/MyAccount/EditSavedAddress';
import NotFound from '@/components/Loader/NotFound';
import Popup from '@/components/AdminDashboard/Popup';
import TextInput from '@/components/TextInput/TextInput';
import CustomSelect from '@/components/Reusable/CustomSelect';
import * as Yup from 'yup';
import BtnLoader from '@/components/Loader/BtnLoader';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { BiLoaderAlt } from "react-icons/bi";


const SavedAddress = () => {

  const [shippingAddresses, setShippingAddresses] = useState([]);

  const Countrys = [{ name: 'USA', value: 'usa' }];
  const Province = [
    { name: 'Alberta', value: 'alberta' },
  ];

  // Add Shipping Address States
  const [formData,setFormData] = useState({id:'',email:'',first_name:'',last_name:'',address:'',apartment:'',city:'',country:'usa',province:'alberta',postal_code:'',phone:''})

  const updateShippingSchema = Yup.object().shape({
    id: Yup.string().required('Address Id is Required!'),
    email: Yup.string().required('Email is Required!'),
    first_name: Yup.string().nullable(),
    last_name: Yup.string().required('Last Name is Required!'),
    address: Yup.string().required('Address is Required!'),
    apartment: Yup.string().nullable(),
    city: Yup.string().required('City is Required!'),
    province: Yup.string().required('Province is Required!'),
    postal_code: Yup.string().required('Postal Code is Required!'),
    phone: Yup.string().required('Phone is Required!'),
  });

  const [uLoading, setUloading] = useState(null);
  const [uPopup, setUPopup] = useState(false);

  const [loading, setLoading] = useState(false);
  const UserId = useSelector((state)=>state.auth.id)

  const getShippingAddresses = async () => {
    setLoading(true);
    fetch(`/api/user/profile/shipping-address/?id=${UserId}`)
     .then((res) => res.json())
     .then((data) => {
     if (data.success) {
       setShippingAddresses(data.addresses)
       setLoading(false)
     } else {
      setLoading(false) 
     }
    }).catch((error)=>{
      setLoading(false)
    })
  };

  useEffect(() => {
    getShippingAddresses();
  }, []);

  const handleChange = (e) => {
   const {name,value} = e.target
   setFormData({...formData,[name]:value})
  }

  const handleAddrUpdater = async (e, id) => {
   const address = shippingAddresses.find((addr) => addr._id === id)
   if(address){
     setFormData({
      id:id,
      email:address.email,
      first_name:address.first_name,
      last_name:address.last_name,
      address:address.address,
      apartment:address.apartment,
      city:address.city,
      country:address.country,
      province:address.province,
      postal_code:address.postal_code,
      phone:address.phone
    })
    setUPopup(true)
   }else{
    toast.error('Invalid address ID!')
   }
  };

  const UpdateShippingAddress = async (e) => {
    e.preventDefault()
    try {
      await updateShippingSchema.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const getToastId = toast.loading('Updating address...')
    fetch('/api/user/profile/shipping-address', {method: 'PUT',
      headers: { 'Content-Type': 'application/json' },body: JSON.stringify(formData),
    }).then((res) => res.json())
    .then((data) => {
      getShippingAddresses();
      toast.update(getToastId, { render: 'Address updated!', type: 'success', autoClose: 1000, isLoading: false });
      setUPopup(false)
     }).catch((error) => {
      toast.update(getToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
    });
  }

  return (
    <>
      <Popup state={uPopup} setState={setUPopup} zindex="z-[99]">
        <form onSubmit={UpdateShippingAddress} className='flex justify-center w-full'>
          {/* Shipping */}
          <div className="flex flex-col w-10/12 mt-8 space-y-14px">
          <h3 className="text-center font-semibold">Update Shipping Address</h3>
            <div className="grid grid-cols-2 gap-3">
              <TextInput width="full" name="first_name" title="" iscompulsory="false" type="text" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
              <TextInput width="full" name="last_name" title="" iscompulsory="false" type="text" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
              <div className="col-span-2 space-y-3">
                <TextInput width="full" name="address" title="" iscompulsory="false" type="text" value={formData.address} onChange={handleChange} placeholder="Address" />
                <TextInput width="full" name="apartment" title="" iscompulsory="false" type="text" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, etc. (optional)" />
                <TextInput width="full" name="city" title="" iscompulsory="false" type="text" value={formData.city} onChange={handleChange} placeholder="City" />
                <div className="grid grid-cols-2 gap-14px md:grid-cols-3">
                  <CustomSelect fieldName='country' setState={handleChange} id="country_region" label="Country / region" Options={Countrys} />
                  <CustomSelect fieldName='province' setState={handleChange} id="province" label="Province" Options={Province} />
                  <div className="relative col-span-2 flex items-center md:col-span-1 [&>*]:h-full">
                    <TextInput width="full" name="postal_code" title="" iscompulsory="false" type="text" value={formData.postal_code} onChange={handleChange} placeholder="Postal Code" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <TextInput width="full" name="phone" title="" iscompulsory="false" type="text" value={formData.phone} onChange={handleChange} placeholder="Phone" />
                  <TextInput width="full" name="Email" title="" iscompulsory="false" type="text" value={formData.email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              {loading ? (
                <BtnLoader style="w-5" />
              ) : (
                <button type='submit' className="rounded bg-b3 px-4 py-1 text-white">Save Addresss</button>
              )}
            </div>
          </div>
        </form>
      </Popup>

      <MyAccount>
        {/* <div className="flex w-full justify-end">
          <button type="button" onClick={() => setPopup(true)} className="rounded-2xl bg-b6 px-2 py-1 text-sm text-white">
            Add Addresss
          </button>
        </div> */}
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <BiLoaderAlt className='text-2xl animate-spin' />
          </div>
        ) : shippingAddresses?.length > 0 ? (
          shippingAddresses.map((item, index) => <SavedAddressData key={index} upLoading={uLoading} loadUpdateFrom={handleAddrUpdater} refreshData={getShippingAddresses} data={item} />)
        ) : (
          <NotFound style="w-32" />
        )}
      </MyAccount>
    </>
  );
};

export default SavedAddress;

const SavedAddressData = ({ upLoading, loadUpdateFrom, refreshData, data }) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        <EditSavedAddress upLoad={upLoading} loadUpForm={loadUpdateFrom} refresh={refreshData} addr={data} />
      </div>
    </>
  );
};

export { SavedAddressData };
