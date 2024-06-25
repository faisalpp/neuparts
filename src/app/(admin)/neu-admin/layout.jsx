"use client"

import React from 'react'
import '../globals.css'
import Sidebar from '@/components/AdminDashboard/Sidebar';
import Navbar from '@/components/AdminDashboard/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        animation= "bounce"
        /> 
    {/* Wrapper Start */}
    <div className="flex w-full" >
    
     {/* Sidebar Start */}
     <Sidebar/>
     {/* Sidebar End */}
     <div className='flex flex-col w-full' >
      {/* Navbar Start */}
      <Navbar/>
      {/* Navbar End */}
      
      {/* Main Content Start */}
       <main className='relative' >
         {children}
       </main>
      {/* Main Content Start */}
     </div>
    </div> 
    {/* Wrapper End */}
   
   </body>
  </html>
  )
}

export default layout