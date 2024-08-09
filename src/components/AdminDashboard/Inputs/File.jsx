'use client';

import React from 'react';

const File = ({ title, inputName, change }) => {
  return (
    <div>
      <label htmlFor="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </label>
      <input name={inputName} onChange={change} type="file" class="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 placeholder-gray-400/70 file:rounded-full file:border-none file:bg-gray-200 file:px-4 file:py-1 file:text-sm file:text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:file:bg-gray-800 dark:file:text-gray-200 dark:focus:border-blue-300" />
    </div>
  );
};

export default File;
