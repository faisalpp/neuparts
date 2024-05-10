import React, { useState } from 'react';
import { FiChevronRight, FiLogOut, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const AdminItems = ({ onClose, isItems }) => {
  const location = useLocation();

  const myaccountItems = [
    {
      title: 'Dashboard',
      link: '/admin/dashboard',
    },
    {
      title: 'Orders',
      link: '/admin/manage-orders',
    },
    {
      title: 'Customers',
      link: '/admin/manage-customers',
    },
    {
      title: 'Refunds',
      link: '/admin/manage-refunds',
    },
    // {
    //     title: "Manage Tax",
    //     link: '/admin/manage-taxes',
    // },
    {
      title: 'Coupons',
      link: '/admin/manage-copons',
    },
    {
      title: 'Products',
      link: '/admin/manage-products',
    },
    {
      title: 'Category Pages',
      link: '/admin/categories',
    },
    {
      title: 'Blog',
      link: '/admin/manage-blogs',
    },
    {
      title: 'Help & Support',
      link: '/admin/manage-help-support',
    },
    {
      title: 'Helpful Appliance Tips',
      link: '/admin/manage-appliance-tips',
    },
    {
      title: 'Meet The Team',
      link: '/admin/manage-team',
    },
    {
      title: "FAQ's",
      link: '/admin/faq',
    },
    {
      title: 'Videos Manager',
      link: '/admin/manage-videos',
    },
    {
      title: 'Reviews Manager',
      link: '/admin/manage-reviews',
    },
    {
      title: 'Gallery Manager',
      link: '/admin/manage-gallery',
    },
    {
      title: 'Change Password ',
      link: '/admin/change-password',
    },
    {
      title: 'Map Zip Codes',
      link: '/admin/manage-zip-cordinates',
    },
  ];

  const handleFilterClick = (event) => {
    event.stopPropagation();
  };

  const modalClass = isItems ? 'top-0 bottom-0' : '-bottom-[420px] maxlg:opacity-0 maxlg:pointer-events-none';
  const [viewMore, setViewMore] = useState(10);
  return (
    <>
      <div className={`left-0 right-0 z-50 duration-300 lg:min-w-[240px] maxlg:fixed maxlg:flex maxlg:items-end maxlg:bg-black/20 ${modalClass}`} onClick={onClose}>
        <div className="w-full lg:h-auto maxlg:max-h-[398px] maxlg:overflow-y-auto maxlg:rounded-tl-2xl maxlg:rounded-tr-2xl maxlg:bg-white maxlg:pb-10 [&>div]:maxlg:px-10" onClick={handleFilterClick}>
          <div className="top-0 z-50 flex items-center justify-between border-b lg:hidden lg:pb-4 maxlg:sticky maxlg:bg-white maxlg:py-4 maxlg:shadow-md">
            <button type="button" className="flex items-center gap-4 rounded border border-[rgba(0,0,0,0.15)] px-2 py-1 font-semibold text-[#B20B0B] duration-300 hover:bg-black/5 lg:hidden">
              <span>Logout</span>
              <FiLogOut stroke-width="3" />
            </button>
            <button type="button" onClick={onClose} className="rounded px-2 py-1 text-sm font-semibold duration-300 hover:bg-black/5 lg:hidden">
              Close
            </button>
          </div>
          <div className={`flex flex-col gap-1 maxlg:!px-3 maxlg:py-3`}>
            {myaccountItems.slice(0, viewMore).map((item, index) => (
              <Link href={item.link} key={index} className={`flex w-full items-center justify-between rounded-lg border px-6 py-4 text-left font-semibold duration-300 ${location.pathname === item.link ? 'active border-b3 bg-b3 text-white' : 'border-b14 text-[rgba(17,16,16,0.64)]'}`}>
                <span>{item.title}</span>
                {location.pathname === item.link ? <FiChevronRight /> : null}
              </Link>
            ))}
            <button
              onClick={() => {
                viewMore !== -1 ? setViewMore(-1) : setViewMore(10);
              }}
              className="active flex w-full items-center justify-center rounded-lg border border-b7 bg-b7 px-6 py-2 text-left font-semibold text-white duration-300"
            >
              <span>
                {viewMore === -1 ? (
                  <span className="flex items-center">
                    View Less <FiChevronUp className="ml-2 text-xl" />
                  </span>
                ) : (
                  <span className="flex items-center space-x-5">
                    View More <FiChevronDown className="ml-2 text-xl" />
                  </span>
                )}{' '}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminItems;
