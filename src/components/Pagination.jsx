'use client';

import React from 'react';

const Pagination = ({ page, setPage, pageCount }) => {
  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  function pageIndex(index) {
    setPage(index);
  }

  return (
    <div className="mt-7 flex">
      <button disabled={page === 1} onClick={handlePrevious} class={`mx-1 flex items-center justify-center rounded-md border bg-white px-4 py-2 capitalize text-gray-500 shadow-sm ${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-600 rtl:-scale-x-100`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>

      {Array(pageCount)
        .fill(null)
        .map((_, index) => {
          return (
            <span onClick={() => pageIndex(index + 1)} key={index} class={`mx-1 hidden transform cursor-pointer border px-4 py-2 text-gray-700 shadow-sm transition-colors duration-300 ${page === index + 1 ? 'bg-blue-200' : 'bg-white'} rounded-md hover:bg-blue-200 sm:inline`}>
              {index + 1}
            </span>
          );
        })}

      <button
        disabled={page === pageCount}
        onClick={handleNext}
        className={`mx-1 flex transform items-center justify-center rounded-md border bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors duration-300 hover:bg-blue-200 hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-gray-200 rtl:-scale-x-100 
    ${page === pageCount ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
