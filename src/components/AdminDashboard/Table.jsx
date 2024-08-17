'use client';

import React from 'react';

const Table = ({ children, header }) => {
  return (
    <div className="w-full overflow-x-hidden overflow-y-scroll rounded-lg border border-gray-200 shadow-md" style={{ minHeight: 'calc(100vh - 300px)' }}>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          {header?.length > 0 ? (
            <tr>
              {header.map((title, index) => (
                <th key={index} scope="col" className="px-6 py-4 font-medium text-gray-900">
                  {title}
                </th>
              ))}
            </tr>
          ) : null}
        </thead>
        <tbody className="divide-y divide-gray-200 border-t border-gray-100">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
