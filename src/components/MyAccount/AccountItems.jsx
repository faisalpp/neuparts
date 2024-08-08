import React from 'react';
import { FiChevronRight, FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AccountItems = ({ onClose, isItems }) => {
  const router = useRouter();

  const myaccountItems = [
    {
      title: 'Profile',
      link: '/my-account/profile',
    },
    {
      title: 'Order History',
      link: '/my-account/order-history',
    },
    {
      title: 'My Favourites',
      link: '/my-account/my-favourites',
    },
    {
      title: 'Saved Addresses ',
      link: '/my-account/saved-addresses',
    },
    {
      title: 'Billing Information ',
      link: '/my-account/billing-information',
    },
    {
      title: 'Change Password ',
      link: '/my-account/change-password',
    },
    {
      title: 'Email Preferences ',
      link: '/my-account/email-preferences',
    },
  ];

  const handleFilterClick = (event) => {
    event.stopPropagation();
  };

  const modalClass = isItems ? 'top-0 bottom-0' : '-bottom-[420px] maxlg:opacity-0 maxlg:pointer-events-none';

  return (
    <>
      <div className={`left-0 right-0 z-50 duration-300 lg:min-w-[240px] maxlg:fixed maxlg:flex maxlg:items-end maxlg:bg-black/20 ${modalClass}`} onClick={onClose}>
        <div className="w-full lg:h-auto maxlg:max-h-[398px] maxlg:overflow-y-auto maxlg:rounded-tl-2xl maxlg:rounded-tr-2xl maxlg:bg-white maxlg:pb-10 [&>div]:maxlg:px-10" onClick={handleFilterClick}>
          <div className="top-0 z-50 flex items-center justify-between border-b lg:hidden lg:pb-4 maxlg:sticky maxlg:bg-white maxlg:py-4 maxlg:shadow-md">
            <button type="button" className="flex items-center gap-4 rounded border border-[rgba(0,0,0,0.15)] px-2 py-1 font-semibold text-[#B20B0B] duration-300 hover:bg-black/5 lg:hidden">
              <span>Logout</span>
              <FiLogOut strokeWidth="3" />
            </button>
            <button type="button" onClick={onClose} className="rounded px-2 py-1 text-sm font-semibold duration-300 hover:bg-black/5 lg:hidden">
              Close
            </button>
          </div>
          <div className="flex flex-col gap-1 maxlg:!px-3 maxlg:py-3">
            {myaccountItems.map((item) => (
              <Link href={item.link} key={item.id} className={`flex w-full items-center justify-between rounded-lg border px-6 py-4 text-left font-semibold duration-300 ${router.pathname === item.link ? 'active border-b3 bg-b3 text-white' : 'border-b14 text-[rgba(17,16,16,0.64)]'}`}>
                <span>{item.title}</span>
                {router.pathname === item.link ? <FiChevronRight /> : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountItems;
