
import React from 'react'
import '../globals.css'
import Sidebar from '@/components/Admin/Sidebar'
import Navbar from '@/components/Admin/Navbar'

export const metadata = {
  title: 'Neu-Admin',
  description: 'Neuparts Admin Dashboard!',
};

const layout = ({children}) => {
  return (
  <html lang="en">
   <body>
    
    {/* Wrapper Start */}
    <div className="flex" >
    
     {/* Sidebar Start */}
     <Sidebar/>
     <Navbar/>
     {/* Sidebar End */}
     
     {/* Main Content Start */}
      {/* <main>
        {children}
      </main> */}
     {/* Main Content Start */}

    </div> 
    {/* Wrapper End */}
   
   </body>
  </html>
  )
}

export default layout