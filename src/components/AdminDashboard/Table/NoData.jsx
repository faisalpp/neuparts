'use client';

import React from 'react';

const NoData = ({ colspan, alert }) => {
  return (
    <tr className="">
      <td colSpan={colspan} className="text-md py-5 text-center text-red-500">
        {alert}
      </td>
    </tr>
  );
};

export default NoData;
