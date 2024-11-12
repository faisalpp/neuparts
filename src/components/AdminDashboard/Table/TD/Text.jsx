'use client';

import React from 'react';

const Text = ({ text,isArray=false }) => {
  return (
  <>
  {isArray ? 
   <td className="px-6 py-5">
    {text.map((ar,i)=>(
      <span key={i} className='line-clamp-1 '>{ar}, </span>
    ))}
   </td>:
   <td className="px-6 py-5"><span className='line-clamp-1'>{text}</span></td>
  }
  </>
 )};

export default Text;
