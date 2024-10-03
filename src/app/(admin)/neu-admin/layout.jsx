'use client';
import React from 'react';
import '../globals.css';
import Sidebar from '@/components/AdminDashboard/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from '@/app/GlobalRedux/StoreProvider';

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
       <StoreProvider>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" animation="bounce" />
        {/* Wrapper Start */}
        <div className="flex h-screen w-full">
          {/* Sidebar Start */}
          <Sidebar />
          {/* Sidebar End */}
          <div className="flex w-full flex-col">
            {/* Navbar Start */}
            {/* <Navbar /> */}
            {/* Navbar End */}

            {/* Main Content Start */}
            <main className="relative overflow-y-auto pb-10">{children}</main>
            {/* Main Content Start */}
          </div>
        </div>
        </StoreProvider>
        {/* Wrapper End */}
      </body>
    </html>
  );
};

export default layout;
