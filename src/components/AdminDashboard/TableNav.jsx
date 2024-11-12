'use client';

import React from 'react';

const TableNav = ({ page, setPage, pageCount }) => {
  function handlePrevious() {
    setPage((p) => (p === 1 ? p : p - 1));
  }

  function handleNext() {
    setPage((p) => (p === pageCount ? p : p + 1));
  }

  function pageIndex(index) {
    setPage(index);
  }

  // Helper to get the displayed page numbers based on the current page
  function getPageNumbers() {
    const pages = [];
    if (pageCount <= 7) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      // Always show first 3 pages
      pages.push(1, 2, 3);

      // Show current page and its neighbors if it's beyond page 3 but not in the last 3 pages
      if (page > 3 && page < pageCount - 2) {
        if (page > 4) pages.push('...'); // Ellipsis for omitted pages
        pages.push(page - 1, page, page + 1);
        if (page < pageCount - 3) pages.push('...');
      }

      // Always show last 3 pages
      pages.push(pageCount - 2, pageCount - 1, pageCount);
    }
    return pages;
  }

  return (
    <div className="mt-7 flex">
      <button
        disabled={page === 1}
        onClick={handlePrevious}
        className={`mx-1 flex items-center justify-center rounded-md border bg-white px-4 py-2 capitalize text-gray-500 shadow-sm ${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-blue-200 dark:bg-gray-800 dark:text-gray-600 rtl:-scale-x-100`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {getPageNumbers().map((pageNum, index) => (
        <span
          key={index}
          onClick={() => typeof pageNum === 'number' && pageIndex(pageNum)}
          className={`mx-1 transform cursor-pointer border px-4 py-2 text-gray-700 shadow-sm transition-colors duration-300 ${
            page === pageNum ? 'bg-blue-200' : 'bg-white'
          } rounded-md hover:bg-blue-200 ${pageNum === '...' ? 'pointer-events-none' : ''}`}
        >
          {pageNum}
        </span>
      ))}

      <button
        disabled={page === pageCount}
        onClick={handleNext}
        className={`mx-1 flex transform items-center justify-center rounded-md border bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors duration-300 hover:bg-blue-200 hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-blue-500 dark:hover:text-gray-200 rtl:-scale-x-100 ${
          page === pageCount ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default TableNav;
