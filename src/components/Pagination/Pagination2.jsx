'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Pagination2 = ({ totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  let queryParams;

  const handlePageChange = (currentPage) => {
    if (typeof window !== 'undefined') {
      queryParams = new URLSearchParams(window.location.search);

      setPage(currentPage);
      if (queryParams.has('page')) {
        queryParams.set('page', currentPage);
      } else {
        queryParams.append('page', currentPage);
      }

      const path = window.location.pathname + '?' + queryParams.toString();
      router.push(path);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show the first 3 pages
    for (let i = 1; i <= 3 && i <= totalPages; i++) {
      pageNumbers.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)} 
          className={`flex w-8 cursor-pointer items-center justify-center self-center rounded-md py-1 text-sm ${page == i ? 'text-b6' : 'text-black'}`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if needed after first 3 pages and before last 3 pages
    if (page > 4 && page < totalPages - 3) {
      pageNumbers.push(<span key="ellipsis1" className="flex items-center justify-center py-1 text-sm">...</span>);
    }

    // Show current page and its neighbors (e.g., 2, 3, 4 if you're on page 3)
    if (page > 3 && page < totalPages - 3) {
      pageNumbers.push(
        <button 
          key={page - 1} 
          onClick={() => handlePageChange(page - 1)} 
          className={`flex w-8 cursor-pointer items-center justify-center self-center rounded-md py-1 text-sm ${page == page - 1 ? 'text-b6' : 'text-black'}`}
        >
          {page - 1}
        </button>
      );
      pageNumbers.push(
        <button 
          key={page} 
          onClick={() => handlePageChange(page)} 
          className={`flex w-8 cursor-pointer items-center justify-center self-center rounded-md py-1 text-sm ${page == page ? 'text-b6' : 'text-black'}`}
        >
          {page}
        </button>
      );
      pageNumbers.push(
        <button 
          key={page + 1} 
          onClick={() => handlePageChange(page + 1)} 
          className={`flex w-8 cursor-pointer items-center justify-center self-center rounded-md py-1 text-sm ${page == page + 1 ? 'text-b6' : 'text-black'}`}
        >
          {page + 1}
        </button>
      );
    }

    // Show ellipsis if needed before last 3 pages
    if (page < totalPages - 3) {
      pageNumbers.push(<span key="ellipsis2" className="flex items-center justify-center py-1 text-sm">...</span>);
    }

    // Always show the last 3 pages
    for (let i = totalPages - 2; i <= totalPages && i > 3; i++) {
      pageNumbers.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)} 
          className={`flex w-8 cursor-pointer items-center justify-center self-center rounded-md py-1 text-sm ${page == i ? 'text-b6' : 'text-black'}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="mt-6 flex w-full flex-col items-center justify-center">
      <div className="flex space-x-1">
        <button
          type="button"
          onClick={() => {
            page > 1 ? handlePageChange(page - 1) : handlePageChange(1);
          }}
          disabled={page === 1}
          className="flex w-fit cursor-pointer items-center justify-center self-center rounded-md py-1"
        >
          <AiOutlineArrowLeft className="text-base text-black" />
        </button>
        {renderPageNumbers()}
        <button
          type="button"
          onClick={() => {
            page < totalPages && handlePageChange(page + 1);
          }}
          disabled={page === totalPages}
          className="flex w-fit cursor-pointer items-center justify-center self-center rounded-md py-1"
        >
          <AiOutlineArrowRight className="text-base text-black" />
        </button>
      </div>
    </div>
  );
};

export default Pagination2;
