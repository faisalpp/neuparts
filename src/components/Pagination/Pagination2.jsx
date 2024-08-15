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
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button type="button" key={i} onClick={() => handlePageChange(i)} className={`flex w-8 cursor-pointer items-center justify-center self-center rounded-md py-1 text-sm ${page == i ? 'text-b6' : 'text-black'} `}>
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
