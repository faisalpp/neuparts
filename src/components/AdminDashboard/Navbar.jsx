'use client';

import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="h-10 w-full border-b border-b1 bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            {/* <!-- Mobile menu button --> */}
            <div className="flex lg:hidden">
              <button onClick={() => setOpen(isOpen ? false : true)} type="button" className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400" aria-label="toggle menu">
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={`${isOpen ? 'translate-x-0 opacity-100 ' : '-translate-x-full opacity-0'}  absolute inset-x-0 z-20 w-full flex-1 bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-800 lg:relative lg:top-0 lg:mt-0 lg:flex lg:w-auto lg:translate-x-0 lg:items-center lg:justify-between lg:bg-transparent lg:p-0 lg:opacity-100`}>
            <div className="flex flex-col capitalize text-gray-600 dark:text-gray-300 lg:-mx-4 lg:hidden lg:flex-row lg:items-center lg:px-16">
              <a href="#" className="mt-2 transform transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-200 lg:mx-4 lg:mt-0">
                features
              </a>
              <a href="#" className="mt-2 transform transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-200 lg:mx-4 lg:mt-0">
                downloads
              </a>
              <a href="#" className="mt-2 transform transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-200 lg:mx-4 lg:mt-0">
                docs
              </a>
              <a href="#" className="mt-2 transform transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-200 lg:mx-4 lg:mt-0">
                support
              </a>
              <a href="#" className="mt-2 transform transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-200 lg:mx-4 lg:mt-0">
                blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
