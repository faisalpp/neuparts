'use client';
import React, { useEffect, useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import EditSavedAddress from '@/components/MyAccount/EditSavedAddress';
import NotFound from '@/components/Loader/NotFound';
import Popup from '@/components/AdminDashboard/Popup';
import TextInput from '@/components/TextInput/TextInput';
import CustomSelect from '@/components/Reusable/CustomSelect';
import { RiQuestionFill } from 'react-icons/ri';
import * as Yup from 'yup';
import { FiAlertTriangle } from 'react-icons/fi';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import BtnLoader from '@/components/Loader/BtnLoader';
import Image from 'next/image';

const SavedAddress = () => {
  const userId = '';

  const [shippingAddresses, setShippingAddresses] = useState([
    {
      _id: '65496f07a40c581e891eeba6',
      type: 'shipping',
      email: 'muhammadfaisal522@gmail.com',
      firstName: 'faisal',
      lastName: 'qayyum',
      address: 'dsfdsgfdsgdagagds',
      appartment: 'optional appartment',
      country: 'usa',
      state: 'alberta',
      city: 'faisalabd',
      postalCode: '73301',
      phone: '03036542828',
    },
  ]);

  const [loading, setLoading] = useState(false);

  const getShippingAddresses = async () => {
    // setLoading(true);
    // const res = await GetShippingAddresses({ _id: userId });
    // if (res.status === 200) {
    //   setLoading(false);
    //   setShippingAddresses(res.data.shippingAddresses);
    // } else {
    //   setLoading(false);
    //   Toast(res.data.message, 'error', 1000);
    // }
  };

  useEffect(() => {
    getShippingAddresses();
  }, []);

  const Countrys = [{ name: 'USA', value: 'usa' }];
  const Province = [
    { name: 'Alberta', value: 'alberta' },
    { name: 'Alberta', value: 'alberta' },
    { name: 'Alberta', value: 'alberta' },
    { name: 'Alberta', value: 'alberta' },
  ];

  // Add Shipping Address States
  const [popup, setPopup] = useState(false);
  const [changeZip, setChangeZip] = useState(false);
  const [successZip, setSuccessZip] = useState(false);
  const [errorZip, setErrorZip] = useState(false);
  const [errors, setErrors] = useState([]);
  const [sLoading, setSloading] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [appartment, setAppartment] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('usa');
  const [province, setProvince] = useState('alberta');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const Submit = async (e) => {
    // setChangeZip(true);
    // setSuccessZip(false);
    // setErrorZip(false);
    // const res = await CheckZip({ zip: postalCode });
    // if (res.status === 200) {
    //   setChangeZip(false);
    //   setSuccessZip(true);
    // } else {
    //   setSuccessZip(false);
    //   setErrorZip(true);
    //   setChangeZip(false);
    // }
  };

  useEffect(() => {
    if (postalCode?.length === 5) {
      Submit();
    }
  }, [postalCode]);

  const createShippingSchema = Yup.object().shape({
    userId: Yup.string().required('User Id is Required!'),
    email: Yup.string().required('Email is Required!'),
    firstName: Yup.string().nullable(),
    lastName: Yup.string().required('Last Name is Required!'),
    address: Yup.string().required('Address is Required!'),
    appartment: Yup.string().nullable(),
    city: Yup.string().required('City is Required!'),
    country: Yup.string().required('Country is Required!'),
    state: Yup.string().required('Province is Required!'),
    postalCode: Yup.string().required('Postal Code is Required!'),
    phone: Yup.string().required('Phone is Required!'),
  });

  const CreateShippingAddress = async (e) => {
    // e.preventDefault();
    // if (errorZip) {
    //   Toast('Invalid Zip Code!', 'error', 1000);
    // }
    // setSloading(true);
    // try {
    //   const data = { userId, email, firstName, lastName, address, appartment, city, country, state: province, postalCode, phone };
    //   await createShippingSchema.validate(data, { abortEarly: false });
    //   const res = await createShippingAddress(data);
    //   if (res.status === 200) {
    //     getShippingAddresses();
    //     setEmail('');
    //     setFirstName('');
    //     setLastName('');
    //     setAddress('');
    //     setAppartment('');
    //     setCity('');
    //     setCountry('usa');
    //     setProvince('alberta');
    //     setPostalCode('');
    //     setPhone('');
    //     setPopup(false);
    //     setSloading(false);
    //     Toast(res.data.msg, 'success', 1000);
    //   } else {
    //     setSloading(false);
    //     Toast(res.data.message, 'error', 1000);
    //   }
    // } catch (error) {
    //   setSloading(false);
    //   if (error) {
    //     let errors = error.errors;
    //     setErrors(errors);
    //     errors.forEach((item) => {
    //       Toast(item, 'error', 1000);
    //     });
    //   } else {
    //     setErrors([]);
    //   }
    // }
  };

  const [uemail, setuEmail] = useState('');
  const [ufirstName, setuFirstName] = useState('');
  const [ulastName, setuLastName] = useState('');
  const [uaddress, setuAddress] = useState('');
  const [uappartment, setuAppartment] = useState('');
  const [ucity, setuCity] = useState('');
  const [ucountry, setuCountry] = useState('usa');
  const [uprovince, setuProvince] = useState('alberta');
  const [upostalCode, setuPostalCode] = useState('');
  const [uphone, setuPhone] = useState('');

  const [uLoading, setUloading] = useState(null);
  const [uPopup, setUPopup] = useState(false);
  const [uiD, setUid] = useState('');

  const handleAddrUpdater = async (e, id) => {
    // e.preventDefault();
    // setUid(id);
    // setUloading(id);
    // const res = await GetShippingAddrById({ id: id });
    // if (res.status === 200) {
    //   setuEmail(res.data.shippingAddress.email);
    //   setuFirstName(res.data.shippingAddress.firstName);
    //   setuLastName(res.data.shippingAddress.lastName);
    //   setuAddress(res.data.shippingAddress.address);
    //   setuAppartment(res.data.shippingAddress.appartment);
    //   setuCity(res.data.shippingAddress.city);
    //   setuCountry(res.data.shippingAddress.country);
    //   setuProvince(res.data.shippingAddress.state);
    //   setuPostalCode(res.data.shippingAddress.postalCode);
    //   setuPhone(res.data.shippingAddress.phone);
    //   setUPopup(true);
    //   setUloading(null);
    // } else {
    //   setUloading(null);
    // }
  };

  const [uchangeZip, setuChangeZip] = useState(false);
  const [usuccessZip, setuSuccessZip] = useState(false);
  const [uerrorZip, setuErrorZip] = useState(false);
  const [uerrors, setuErrors] = useState([]);
  const [usLoading, setuSloading] = useState(false);

  const uSubmit = async (e) => {
    // setuChangeZip(true);
    // setuSuccessZip(false);
    // setuErrorZip(false);
    // const res = await CheckZip({ zip: upostalCode });
    // if (res.status === 200) {
    //   setuChangeZip(false);
    //   setuSuccessZip(true);
    // } else {
    //   setuSuccessZip(false);
    //   setuErrorZip(true);
    //   setuChangeZip(false);
    // }
  };

  useEffect(() => {
    if (upostalCode?.length === 5) {
      uSubmit();
    }
  }, [upostalCode]);

  const UpdateShippingAddress = async (e) => {
    // e.preventDefault();
    // if (uerrorZip) {
    //   Toast('Invalid Zip Code!', 'error', 1000);
    // }
    // setuSloading(true);
    // try {
    //   const data = { userId: userId, email: uemail, firstName: ufirstName, lastName: ulastName, address: uaddress, appartment: uappartment, city: ucity, country: ucountry, state: uprovince, postalCode: upostalCode, phone: uphone };
    //   await createShippingSchema.validate(data, { abortEarly: false });
    //   const res = await updateShippingAddress({ ...data, id: uiD });
    //   if (res.status === 200) {
    //     getShippingAddresses();
    //     setUPopup(false);
    //     setuSloading(false);
    //     Toast(res.data.msg, 'success', 1000);
    //   } else {
    //     setuSloading(false);
    //     Toast(res.data.message, 'error', 1000);
    //   }
    // } catch (error) {
    //   setuSloading(false);
    //   if (error) {
    //     let errors = error.errors;
    //     setuErrors(errors);
    //     errors.forEach((item) => {
    //       Toast(item, 'error', 1000);
    //     });
    //   } else {
    //     setuErrors([]);
    //   }
    // }
  };

  return (
    <>
      <Popup state={popup} setState={setPopup} zindex="z-[99]">
        <form onSubmit={CreateShippingAddress}>
          <h3 className="text-center font-semibold">Create Shipping Address</h3>
          {/* Conatct Information */}
          <div className="space-y-14px [&>*]:text-sm [&>*]:text-b16">
            <h3 className="text-sm font-medium text-b16">Contact information</h3>
            <TextInput width="full" name="Email" title="Email" iscompulsory="false" type="text" value={email} onChange={(e) => setEmail(e.target.value)} error={errors && errors.includes('Email is Required!') ? true : false} errormessage="Email is Required!" placeholder="abc@gmail.com" />
          </div>
          {/* Shipping */}
          <div className="mt-8 space-y-14px">
            <h3 className="text-lg font-medium text-b16">Shipping address</h3>
            <div className="grid grid-cols-2 gap-3">
              <TextInput width="full" name="firstName" title="" iscompulsory="false" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} error={errors && errors.includes('First Name is Required!') ? true : false} errormessage="First Name is Required!" placeholder="First Name (optional)" />
              <TextInput width="full" name="lastName" title="" iscompulsory="false" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} error={errors && errors.includes('Last Name is Required!') ? true : false} errormessage="Last Name is Required!" placeholder="Last Name" />
              <div className="col-span-2 space-y-3">
                <TextInput width="full" name="address" title="" iscompulsory="false" type="text" value={address} onChange={(e) => setAddress(e.target.value)} error={errors && errors.includes('Address is Required!') ? true : false} errormessage="Address is Required!" placeholder="Address" />
                <TextInput width="full" name="appartment" title="" iscompulsory="false" type="text" value={appartment} onChange={(e) => setAppartment(e.target.value)} error={errors && errors.includes('Apartment, suite is Required!') ? true : false} errormessage="Apartment, suite is Required!" placeholder="Apartment, suite, etc. (optional)" />
                <TextInput width="full" name="city" title="" iscompulsory="false" type="text" value={city} onChange={(e) => setCity(e.target.value)} error={errors && errors.includes('City is Required!') ? true : false} errormessage="City is Required!" placeholder="City" />
                <div className="grid grid-cols-2 gap-14px md:grid-cols-3">
                  <CustomSelect setState={setCountry} id="country_region" label="Country / region" Options={Countrys} />
                  <CustomSelect setState={setProvince} id="province" label="Province" Options={Province} />
                  <div className="relative col-span-2 flex items-center md:col-span-1 [&>*]:h-full">
                    {changeZip ? (
                      <div className="absolute z-40 flex w-full items-center justify-end rounded-lg px-2">
                        <Image width={200} height={200} quality={100} alt="Loader" src="/loader-bg.gif" className="h-4 w-4" />
                      </div>
                    ) : null}
                    {errorZip ? (
                      <div className="absolute right-1 z-40 flex w-fit items-center justify-end rounded-lg px-2">
                        <FiAlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                    ) : null}
                    {successZip ? (
                      <div className="absolute right-0 z-40 flex w-fit items-center justify-end rounded-lg px-2">
                        <IoIosCheckmarkCircleOutline className="h-5 w-5 text-b10" />
                      </div>
                    ) : null}
                    <TextInput width="full" name="postalCode" title="" iscompulsory="false" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} error={errors && errors.includes('Postal Code is Required!') ? true : false} errormessage="Postal Code is Required!" placeholder="Postal Code" />
                  </div>
                </div>
                <div className="relative">
                  <TextInput width="full" name="phone" title="" iscompulsory="false" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors && errors.includes('Phone is Required!') ? true : false} errormessage="Phone is Required!" placeholder="Phone" />
                  <div className="absolute right-3 top-3">
                    <RiQuestionFill className="text-2xl text-b3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              {sLoading ? (
                <BtnLoader style="w-5" />
              ) : (
                <button type="submit" className="rounded-2xl bg-b6 px-3 py-2 text-sm text-white">
                  Save Addresss
                </button>
              )}
            </div>
          </div>
        </form>
      </Popup>

      <Popup state={uPopup} setState={setUPopup} zindex="z-[99]">
        <form onSubmit={UpdateShippingAddress}>
          <h3 className="text-center font-semibold">Update Shipping Address</h3>
          {/* Conatct Information */}
          <div className="space-y-14px [&>*]:text-sm [&>*]:text-b16">
            <h3 className="text-sm font-medium text-b16">Contact information</h3>
            <TextInput width="full" name="Email" title="Email" iscompulsory="false" type="text" value={uemail} onChange={(e) => setuEmail(e.target.value)} error={uerrors && uerrors.includes('Email is Required!') ? true : false} errormessage="Email is Required!" placeholder="abc@gmail.com" />
          </div>
          {/* Shipping */}
          <div className="mt-8 space-y-14px">
            <h3 className="text-lg font-medium text-b16">Shipping address</h3>
            <div className="grid grid-cols-2 gap-3">
              <TextInput width="full" name="firstName" title="" iscompulsory="false" type="text" value={ufirstName} onChange={(e) => setuFirstName(e.target.value)} error={uerrors && uerrors.includes('First Name is Required!') ? true : false} errormessage="First Name is Required!" placeholder="First Name (optional)" />
              <TextInput width="full" name="lastName" title="" iscompulsory="false" type="text" value={ulastName} onChange={(e) => setuLastName(e.target.value)} error={uerrors && uerrors.includes('Last Name is Required!') ? true : false} errormessage="Last Name is Required!" placeholder="Last Name" />
              <div className="col-span-2 space-y-3">
                <TextInput width="full" name="address" title="" iscompulsory="false" type="text" value={uaddress} onChange={(e) => setuAddress(e.target.value)} error={uerrors && uerrors.includes('Address is Required!') ? true : false} errormessage="Address is Required!" placeholder="Address" />
                <TextInput width="full" name="appartment" title="" iscompulsory="false" type="text" value={uappartment} onChange={(e) => setuAppartment(e.target.value)} error={uerrors && uerrors.includes('Apartment, suite is Required!') ? true : false} errormessage="Apartment, suite is Required!" placeholder="Apartment, suite, etc. (optional)" />
                <TextInput width="full" name="city" title="" iscompulsory="false" type="text" value={ucity} onChange={(e) => setuCity(e.target.value)} error={uerrors && uerrors.includes('City is Required!') ? true : false} errormessage="City is Required!" placeholder="City" />
                <div className="grid grid-cols-2 gap-14px md:grid-cols-3">
                  <CustomSelect setState={setuCountry} id="country_region" label="Country / region" Options={Countrys} />
                  <CustomSelect setState={setuProvince} id="province" label="Province" Options={Province} />
                  <div className="relative col-span-2 flex items-center md:col-span-1 [&>*]:h-full">
                    {uchangeZip ? (
                      <div className="absolute z-40 flex w-full items-center justify-end rounded-lg px-2">
                        <Image width={200} height={200} quality={100} alt="Loader" src="/loader-bg.gif" className="h-4 w-4" />
                      </div>
                    ) : null}
                    {uerrorZip ? (
                      <div className="absolute right-1 z-40 flex w-fit items-center justify-end rounded-lg px-2">
                        <FiAlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                    ) : null}
                    {usuccessZip ? (
                      <div className="absolute right-0 z-40 flex w-fit items-center justify-end rounded-lg px-2">
                        <IoIosCheckmarkCircleOutline className="h-5 w-5 text-b10" />
                      </div>
                    ) : null}
                    <TextInput width="full" name="postalCode" title="" iscompulsory="false" type="text" value={upostalCode} onChange={(e) => setuPostalCode(e.target.value)} error={uerrors && uerrors.includes('Postal Code is Required!') ? true : false} errormessage="Postal Code is Required!" placeholder="Postal Code" />
                  </div>
                </div>
                <div className="relative">
                  <TextInput width="full" name="phone" title="" iscompulsory="false" type="text" value={uphone} onChange={(e) => setuPhone(e.target.value)} error={uerrors && uerrors.includes('Phone is Required!') ? true : false} errormessage="Phone is Required!" placeholder="Phone" />
                  <div className="absolute right-3 top-3">
                    <RiQuestionFill className="text-2xl text-b3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              {usLoading ? (
                <BtnLoader style="w-5" />
              ) : (
                <button type="submit" className="rounded-2xl bg-b6 px-3 py-2 text-sm text-white">
                  Save Addresss
                </button>
              )}
            </div>
          </div>
        </form>
      </Popup>

      <MyAccount>
        <div className="flex w-full justify-end">
          <button type="button" onClick={() => setPopup(true)} className="rounded-2xl bg-b6 px-2 py-1 text-sm text-white">
            Add Addresss
          </button>
        </div>
        {loading ? (
          <div className="flex h-20 w-full items-center justify-center">
            <BtnLoader style="w-10" />
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
      <div className="flex flex-col gap-10 [&>hr:last-child]:hidden">
        <EditSavedAddress upLoad={upLoading} loadUpForm={loadUpdateFrom} refresh={refreshData} addr={data} />
      </div>
    </>
  );
};

export { SavedAddressData };
