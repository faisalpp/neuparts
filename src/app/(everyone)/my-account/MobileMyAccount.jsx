'use client';
import React, { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { ProfileData } from '@/components/MyAccount/Profile';
import { OrderHistoryData } from '@/components/MyAccount/OrderHistory';
import { MyFavouriteData } from '@/components/MyAccount/MyFavourite';
import { SavedAddressData } from '@/components/MyAccount/SavedAddress';
import { BillingInformationData } from '@/components/MyAccount/BillingInformation';
import { ChangePasswordData } from '@/components/MyAccount/ChangePassword';
import { EmailPreferencesData } from '@/components/MyAccount/EmailPreferences';

const MobileMyAccount = () => {
  const [isMobile, setIsDesktop] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const myaccounts = [
    { title: 'Profile', content: ProfileData },
    { title: 'Order History', content: OrderHistoryData },
    { title: 'My Favourites', content: MyFavouriteData },
    { title: 'Saved Addresses ', content: SavedAddressData },
    { title: 'Billing Information', content: BillingInformationData },
    { title: 'Change Password', content: ChangePasswordData },
    { title: 'Email Preferences', content: EmailPreferencesData },
  ];
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  // Mobile Version Only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth <= 992);

      const handleResize = () => {
        setIsDesktop(window.innerWidth <= 992);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);
  const redirectPage = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };
  return (
    <>
      {isMobile ? (
        <div className="px-4 py-10 md:px-10">
          <h1 className="text-32px font-bold text-b18">My Account</h1>
          <div className="mt-10 flex w-full flex-col gap-6">
            {myaccounts.map((item, index) => (
              <MobileTabs
                key={index}
                title={item.title}
                activeClass={index === activeTab ? true : false}
                isOpen={index === activeTab}
                onClick={() => {
                  handleTabClick(index);
                }}
              >
                <item.content />
              </MobileTabs>
            ))}
          </div>
        </div>
      ) : (
        redirectPage()
      )}
    </>
  );
};

export default MobileMyAccount;

const MobileTabs = ({ title, isOpen, onClick, children, activeClass }) => {
  return (
    <div className={`flex flex-col duration-200`}>
      <button onClick={onClick} className={`flex items-center justify-between border p-5 text-left font-semibold xl:p-6 xl:text-lg ${activeClass ? 'rounded-t-2xl border-b3 bg-b3 text-white' : 'rounded-2xl border-b14 bg-white text-b1'}`}>
        <span>{title}</span>
        <FiChevronDown className={`duration-200 ${activeClass ? 'rotate-180' : ''}`} />
      </button>
      <div className={`${isOpen ? 'max-h-full gap-6 rounded-b-2xl border border-b14 p-5' : 'pointer-events-none max-h-0 select-none opacity-0'} duration-200`}>{children}</div>
    </div>
  );
};
