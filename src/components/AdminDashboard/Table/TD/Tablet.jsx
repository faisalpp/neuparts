'use client';

import React from 'react';

const Tablet = ({ text }) => {
  return (
    <td className="px-6 py-5">
      <span className="text-md inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">{text}</span>
    </td>
  );
};

export default Tablet;
