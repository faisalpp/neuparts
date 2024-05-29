'use client';
import React, { useState, useEffect } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import CustomInput from '@/components/Reusable/CustomInput';
import CustomButton from '@/components/Reusable/CustomButton';
import countries from '@/services/countries';
import { FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const _id = '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('yourusername@email.com');
  const [phone, setPhone] = useState('+1 000-000-0000');
  const [country, setCountry] = useState('');

  const [countryList, setCountryList] = useState(countries);

  const GetProfile = async () => {
    // const res = await GetUserProfile({ _id });
    // if (res.status === 200) {
    //   setFirstName(res.data.user.firstName);
    //   setLastName(res.data.user.lastName);
    //   setEmail(res.data.user.email);
    //   setPhone(res.data.user.phone);
    //   setCountry(res.data.user.country);
    // } else {
    //   dispatch(resetUser());
    //   router.push('/');
    // }
  };

  const UpdateProfile = async (e) => {
    // e.preventDefault();
    // const data = { _id, firstName, lastName, email, country, phone };
    // const response = await fetch('http://localhost:5000/api/user/update-profile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    //   credentials: 'include',
    // });
    // const res = await response.json();
    // if (res.status === 200) {
    //   Toast('Profile Updated!', 'success', 1000);
    // } else {
    //   Toast(res.data.message, 'success', 1000);
    // }
  };

  useEffect(() => {
    GetProfile();
  }, [setFirstName, setLastName, setEmail, setPhone, setCountry]);
  return (
    <>
      <form onSubmit={UpdateProfile} className="flex w-full flex-col gap-6 lg:max-w-[432px]">
        <CustomInput label="First name" state={firstName} setState={setFirstName} />
        <CustomInput label="Last name" state={lastName} setState={setLastName} />
        <CustomInput label="Email Address" type="email" state={email} setState={setEmail} />
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
