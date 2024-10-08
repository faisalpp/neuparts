"use client"

import React from 'react'
import './globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreProvider } from '@/app/GlobalRedux/StoreProvider';

const layout = ({children}) => {
  return (
  <html lang="en">
   <body>
    <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        animation= "bounce"
        /> 
      {/* Wrapper Start */}
      <div className="flex w-full h-screen overflow-y-scroll" >
      <StoreProvider>
        {children}
      </StoreProvider>
      </div> 
    {/* Wrapper End */}
   </body>
  </html>
  )
}

export default layout