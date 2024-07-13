"use client"

import React from 'react'

const TableNav = ({page,setPage,pageCount}) => {

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

  function pageIndex(index){
    setPage(index)
  }


  return (
    <div class="flex mt-7">
    <button disabled={page === 1} onClick={handlePrevious} class={`shadow-sm border flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md ${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-blue-200 rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-600`}>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
    </button>
    
    {Array(pageCount)
     .fill(null)
     .map((_, index) => {
       return <span onClick={()=>pageIndex(index+1)} key={index} class={`cursor-pointer shadow-sm hidden px-4 py-2 mx-1 border text-gray-700 transition-colors duration-300 transform ${ page === index+1 ? 'bg-blue-200' :'bg-white'} rounded-md sm:inline hover:bg-blue-200`}>{index + 1}</span>
    })}

<button
  disabled={page === pageCount}
  onClick={handleNext}
  className={`shadow-sm flex items-center justify-center border px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-200 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 
    ${page === pageCount ? 'cursor-not-allowed opacity-50' : ''}`}>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
</button>

</div>
  )
}

export default TableNav