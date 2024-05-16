import React from 'react'
import '../globals.css';

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
      <div className="bg-red-500" >
       Layout
      </div>
     {/* Sidebar End */}
     
     {/* Main Content Start */}
      <main>
        {children}
      </main>
     {/* Main Content Start */}

    </div> 
    {/* Wrapper End */}
   
   </body>
  </html>
  )
}

export default layout