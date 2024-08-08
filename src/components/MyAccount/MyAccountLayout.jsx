'use client';
import React, { useState } from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { BsChevronDown } from 'react-icons/bs';
import AccountItems from '@/components/MyAccount/AccountItems';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const MyAccountLayout = ({ children }) => {
  const [isItems, setIsItems] = useState(false);

  const handleCloseItems = () => {
    setIsItems(false);
  };

  const router = useRouter();

  const handleUserLogout = async (e) => {
    e.preventDefault();

    const crtToastId = toast.loading('Signing you out...');

    fetch('/api/user/auth/logout', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { render: 'Logout Successfull!', type: 'success', autoClose: 1000, isLoading: false });
          router.push('/');
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
      });
  };

  return (
    <>
      <div className="mx-auto flex w-full items-center px-4 pt-10 md:px-10 lg:px-16 xl:px-20 2xl:px-120px 3xl:max-w-1680px">
        <div className="flex items-center">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-[#5E5E5E]">My Account</h5>
        </div>
      </div>

      <div className="mx-auto flex items-center justify-between px-4 pb-11 pt-5 sm:px-10 lg:px-16 xl:px-20 2xl:px-120px 3xl:max-w-1680px">
        <h1 className="text-2xl font-bold md:text-3xl xl:text-4xl 2xl:text-[40px]">My Account</h1>

        {/* 992px Up Screen Logout */}
        <button type="button" onClick={handleUserLogout} className="hidden cursor-pointer items-center gap-4 rounded-lg border border-[rgba(0,0,0,0.15)] px-6 py-4 font-bold text-[#B20B0B] lg:flex">
          <span>Logout</span>
          <FiLogOut strokeWidth="3" />
        </button>
        {/* End Logout Button */}

        <button className="ml-auto flex items-center gap-2 rounded-lg bg-b3 px-3 py-2 text-sm font-semibold text-white shadow-md lg:hidden" onClick={() => setIsItems(true)}>
          My Account <BsChevronDown className="stroke-1 text-xs" />
        </button>
      </div>

      <div className="mx-auto flex w-full justify-center gap-6 px-4 py-10 sm:px-10 lg:px-16 xl:px-20 2xl:px-120px 3xl:max-w-1680px maxlg:flex-col">
        <AccountItems onClose={handleCloseItems} isItems={isItems} />

        <div className="w-full">
          <div className="h-full rounded-2xl border border-[rgba(0,0,0,0.15)] p-5 sm:p-7 xl:p-10">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MyAccountLayout;
