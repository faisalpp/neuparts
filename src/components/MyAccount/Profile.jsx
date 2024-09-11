'use client';
import React, { useState, useEffect } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import CustomInput from '@/components/Reusable/CustomInput';
import CustomButton from '@/components/Reusable/CustomButton';
import { FiChevronDown } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { BiLoaderAlt } from "react-icons/bi";

const Profile = () => {
  return (
    <>
      <MyAccount>
        <ProfileData />
      </MyAccount>
    </>
  );
};
export default Profile;

const ProfileData = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');

  const [countryList, setCountryList] = useState(['US']);
  const [loading,setLoading] = useState(false)

  const Email = useSelector((state)=>state.auth.email)

  const GetProfile = async () => {
    setLoading(true)
    fetch(`/api/user/profile/?email=${Email}`)
     .then((res) => res.json())
     .then((data) => {
     if (data.success) {
       setFirstName(data.profile.firstName);
       setLastName(data.profile.lastName);
       setEmail(data.profile.email);
       setPhone(data.profile.phone);
       setCountry(data.profile.country);
       setLoading(false)
     } else {
      setLoading(false) 
     }
    }).catch((error)=>{
      toast.error('Something went wrong!')
    })
  };

  useEffect(() => {
   if(!loading){
     GetProfile();
    }
  }, []);

  const UpdateProfile = async (e) => {
    e.preventDefault();
    const getToastId = toast.loading('Updating profile...')
    const data = { firstName:firstName, lastName:lastName, email:email, country:country, phone:phone };
    await fetch('/api/user/profile', {method: 'PUT',headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }).then((res)=> res.json())
    .then((data)=>{
      GetProfile();
      toast.update(getToastId, { render: 'Profile updated!', type: 'success', autoClose: 1000, isLoading: false });
    }).catch((error)=>{
      toast.update(getToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
    })
  };


  return (
    <>
      <form onSubmit={UpdateProfile} className="relative flex w-full flex-col gap-6 lg:max-w-[432px]">
        {loading ? <div className='absolute z-10 rounded-md flex justify-center items-center w-full h-full bg-white/50' ><BiLoaderAlt className='text-2xl animate-spin' /></div>:null}
        <CustomInput label="First name" state={firstName} setState={setFirstName} />
        <CustomInput label="Last name" state={lastName} setState={setLastName} />
        <CustomInput readOnly={true} label="Email Address" type="email" state={email} setState={setEmail} />
        <div>
          <label className="mb-2 block text-xs font-semibold text-b16">Country</label>
          <div className="relative">
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="h-10 w-full appearance-none rounded-lg border border-[rgba(0,0,0,0.16)] px-4 text-sm outline-none">
              <option value={country} default>
                {country}
              </option>
              {countryList.map((country, index) => (
                <option key={index}>{country}</option>
              ))}
            </select>
            <FiChevronDown className="absolute right-4 top-3" />
          </div>
        </div>
        <CustomInput label="Phone" state={phone} setState={setPhone} />
        {/*Submit Button */}
        <CustomButton ButtonName="Save Changes" />
      </form>
    </>
  );
};

export { ProfileData };
