'use client';

import React from 'react';

const Text = ({ text }) => {
  return <td className="px-6 py-5"><span className='line-clamp-1 '>{text}</span></td>;
};

export default Text;
