'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiTeamFill } from 'react-icons/ri';
import { MdPermMedia, MdDashboard, MdRateReview,MdTipsAndUpdates, MdLiveHelp,MdCategory,MdFactory,MdDiscount } from 'react-icons/md';
import { FaBlogger,FaImages,FaQuoteRight } from 'react-icons/fa';
import { GiAutoRepair, GiWashingMachine } from 'react-icons/gi';
import { BiSolidVideos,BiSolidCategoryAlt,BiSolidCategory } from "react-icons/bi";
import { PiWashingMachineFill } from "react-icons/pi";
import { LuBoxes } from 'react-icons/lu';
import Logout from '@/components/AdminDashboard/Logout';

const Sidebar = () => {
  // State to manage collapsibility of each section
  const [collapsedSections, setCollapsedSections] = useState({
    analytics: true,
    products: false,
    faq: false,
    blogs: false,
  });

  const toggleCollapse = (section) => {
    setCollapsedSections((prevState) => ({
      ...Object.fromEntries(Object.keys(prevState).map((key) => [key, key === section ? !prevState[key] : false])),
    }));
  };

  return (
    <aside className="hidden h-screen w-2/12 flex-col overflow-y-auto border-r bg-b1 py-8 pl-1 pr-5 dark:border-gray-700 dark:bg-gray-900 lg:flex rtl:border-l rtl:border-r-0">
      <Link href="/" className='flex justify-center'>
        <Image width={70} height={70} quality={100} className="col-start-1 col-end-3 h-auto w-10/12" src="/neu.webp" alt="logo" />
      </Link>

      <div className="mt-16 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3">
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin">
              <MdDashboard />
              <span className="mx-2 text-sm font-semibold">Dashboard</span>
            </Link>
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/team">
              <RiTeamFill />
              <span className="mx-2 text-sm font-semibold">Team Members</span>
            </Link>
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/media">
              <MdPermMedia />
              <span className="mx-2 text-sm font-semibold">Media</span>
            </Link>
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/home-gallery">
              <FaImages />
              <span className="mx-2 text-sm font-semibold">Home Gallery</span>
            </Link>
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/static-videos">
              <BiSolidVideos />
              <span className="mx-2 text-sm font-semibold">Static Videos</span>
            </Link>
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/review">
              <MdRateReview />
              <span className="mx-2 text-sm font-semibold">Reviews</span>
            </Link>
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/orders">
              <LuBoxes />
              <span className="mx-2 text-sm font-semibold">Orders</span>
            </Link>
            <Link className="flex items-center rounded-lg px-5 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/coupons">
              <MdDiscount />
              <span className="mx-2 text-sm font-semibold">Coupons</span>
            </Link>
          </div>

          <div className="space-y-3">
            {/* Example section */}
            <div className="flex cursor-pointer items-center justify-between px-3 text-sm font-bold uppercase text-gray-500 transition-colors duration-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => toggleCollapse('products')}>
              <span>Products</span>
              {/* Arrow icon for indicating open/close state */}
              <svg className={`h-4 w-4 transform ${collapsedSections.products ? '-rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Conditional rendering based on section's collapse state with transition */}
            <div className={`transition-all duration-300 ${collapsedSections.products ? 'h-auto opacity-100' : 'h-0 overflow-hidden opacity-0'}`}>
              <div className={`space-y-2 pl-3 ${collapsedSections.products ? 'visible' : 'invisible'}`}>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/product">
                  <GiWashingMachine />
                  <span className="mx-2 text-sm font-semibold">Manage Products</span>
                </Link>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/product/category">
                  <BiSolidCategory />
                  <span className="mx-2 text-sm font-semibold">Manage Categories</span>
                </Link>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/product/sub-category">
                  <BiSolidCategoryAlt className='text-xl' />
                  <span className="mx-2 text-sm font-semibold">Manage Sub Categories</span>
                </Link>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/product/parttype">
                  <MdCategory />
                  <span className="mx-2 text-sm font-semibold">Manage Part Type</span>
                </Link>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/product/modelno">
                  <PiWashingMachineFill className='text-xl' />
                  <span className="mx-2 text-sm font-semibold">Manage Model Nos</span>
                </Link>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/product/menufacturer">
                  <MdFactory className='text-xl' />
                  <span className="mx-2 text-sm font-semibold">Manage Manufacturers</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Example section */}
            <div className="flex cursor-pointer items-center justify-between px-3 text-sm font-bold uppercase text-gray-500 transition-colors duration-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => toggleCollapse('faq')}>
              <span>faqs</span>
              {/* Arrow icon for indicating open/close state */}
              <svg className={`h-4 w-4 transform ${collapsedSections.faq ? '-rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Conditional rendering based on section's collapse state with transition */}
            <div className={`transition-all duration-300 ${collapsedSections.faq ? 'h-auto opacity-100' : 'h-0 overflow-hidden opacity-0'}`}>
              <div className={`space-y-2 pl-3 ${collapsedSections.faq ? 'visible' : 'invisible'}`}>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/faqs/general">
                  <FaQuoteRight />
                  <span className="mx-2 text-sm font-semibold">General</span>
                </Link>

                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/faqs/appliance-repair">
                  <GiAutoRepair />
                  <span className="mx-2 text-sm font-semibold">Appliance Repair</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Example section */}
            <div className="flex cursor-pointer items-center justify-between px-3 text-sm font-bold uppercase text-gray-500 transition-colors duration-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => toggleCollapse('blogs')}>
              <span>blogs</span>
              {/* Arrow icon for indicating open/close state */}
              <svg className={`h-4 w-4 transform ${collapsedSections.blogs ? '-rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Conditional rendering based on section's collapse state with transition */}
            <div className={`transition-all duration-300 ${collapsedSections.blogs ? 'h-auto opacity-100' : 'h-0 overflow-hidden opacity-0'}`}>
              <div className={`space-y-2 pl-3 ${collapsedSections.blogs ? 'visible' : 'invisible'}`}>
                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/blogs/general">
                  <FaBlogger />
                  <span className="mx-2 text-sm font-semibold">Blog</span>
                </Link>

                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/blogs/appliance-tips">
                  <MdTipsAndUpdates />
                  <span className="mx-2 text-sm font-semibold">Appliance Tips</span>
                </Link>

                <Link className="flex items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200" href="/neu-admin/blogs/help-support">
                  <MdLiveHelp />
                  <span className="mx-2 text-sm font-semibold">Help & Support</span>
                </Link>
              </div>
            </div>
          </div>

          <hr />

          <Logout />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
