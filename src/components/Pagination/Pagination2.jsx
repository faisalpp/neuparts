import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

const Pagination2 = ({ page, setPage, totalPages }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button type="button" key={i} onClick={() => setPage(i)} className={`flex w-8 cursor-pointer items-center justify-center self-center rounded-md py-1 text-sm ${page === i ? 'text-b6' : 'text-black'} `}>
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
            page > 1 ? setPage(page - 1) : setPage(1);
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
            page < totalPages && setPage(page + 1);
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
