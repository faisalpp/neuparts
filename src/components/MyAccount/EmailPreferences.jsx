'use client';
import React, { useEffect, useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import EmailPreferenceData from '@/components/MyAccount/EmailPreferenceData';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { set } from 'mongoose';

const EmailPreferences = () => {
  return (
    <>
      <MyAccount>
        <EmailPreferencesData />
      </MyAccount>
    </>
  );
};

export default EmailPreferences;

const EmailPreferencesData = () => {

  const [loading,setLoading] = useState(false)
  const [updating,setUpdating] = useState(false)
  const [isNews, setIsNews] = useState(true);
  const [isOffers, setIsOffers] = useState(false);

  const email = useSelector((state)=>state.auth.email);

  const GetPrefernces = async () => {
    setLoading(true)
    fetch(`/api/user/profile/subscriptions/?email=${email}`)
     .then((res) => res.json())
     .then((data) => {
       setIsNews(data.newsletter.is_news)
       setIsOffers(data.newsletter.is_deals)
       setLoading(false)
    }).catch((error)=>{
      toast.error('Something went wrong!')
    })
  };

  useEffect(() => {
    GetPrefernces();
  },[]);

  const HandleIsNews = async (e) => {
    setUpdating('news')
    await fetch('/api/user/profile/subscriptions', {method: 'PUT',headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email:email,type:'is_news',value:e.target.checked}),
    }).then((res)=> res.json())
    .then((data)=>{
      toast.success('Subscription updated successfully!')
      setIsNews(data.value)
      setUpdating('')
    }).catch((error)=>{
      setUpdating('')
      toast.error('Something went wrong!')
    })
  };

  const HandleIsDeals = async (e) => {
    setUpdating('deals')
    await fetch('/api/user/profile/subscriptions', {method: 'PUT',headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email:email,type:'is_deals',value:e.target.checked}),
    }).then((res)=> res.json())
    .then((data)=>{
      toast.success('Subscription updated successfully!')
      setIsOffers(data.value)
      setUpdating('')
    }).catch((error)=>{
      setUpdating('')
      toast.error('Something went wrong!')
    })
  };

  return (
    <>
      <div className="flex flex-col gap-10 [&>hr:last-child]:hidden">
        <EmailPreferenceData id="deals" checked={isOffers} setState={HandleIsDeals} loading={loading} updating={updating} title="Deals & Offers" />
        <EmailPreferenceData id="news" checked={isNews} setState={HandleIsNews} loading={loading} updating={updating} title="Newsletter" />
      </div>
    </>
  );
};

export { EmailPreferencesData };
