'use client';
import React, { useEffect, useState } from 'react';
import MyAccount from '@/components/MyAccount/MyAccountLayout';
import EmailPreferenceData from '@/components/MyAccount/EmailPreferenceData';

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
  const [isNews, setIsNews] = useState(true);
  const [isOffers, setIsOffers] = useState(true);

  const userId = '';

  const GetPrefernces = async () => {
    // const res = await getPrefrences({ userId: userId });
    // if (res.status === 200) {
    //   setIsNews(res.data.user.isNews);
    //   setIsOffers(res.data.user.isOffers);
    // } else {
    //   Toast(res.data.message, 'error', 1000);
    // }
  };

  useEffect(() => {
    GetPrefernces();
  });

  const HandleIsNews = async () => {
    // const res = await changePrefrences({ userId, name: 'news', value: e.target.checked });
    // if (res.status === 200) {
    //   setIsOffers(res.data.data.isNews);
    //   Toast(res.data.msg, 'success', 1000);
    // } else {
    //   Toast(res.data.message, 'error', 1000);
    // }
  };

  const HandleIsOffers = async (e) => {
    // const res = await changePrefrences({ userId, name: 'offers', value: e.target.checked });
    // if (res.status === 200) {
    //   setIsOffers(res.data.data.isOffers);
    //   Toast(res.data.msg, 'success', 1000);
    // } else {
    //   Toast(res.data.message, 'error', 1000);
    // }
  };

  return (
    <>
      <div className="flex flex-col gap-10 [&>hr:last-child]:hidden">
        <EmailPreferenceData checked={isOffers} setState={HandleIsOffers} title="Deals & Offers" />
        <EmailPreferenceData checked={isNews} setState={HandleIsNews} title="Newsletter" />
      </div>
    </>
  );
};

export { EmailPreferencesData };
