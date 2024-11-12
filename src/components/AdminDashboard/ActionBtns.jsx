'use client';

import Link from 'next/link';
import React from 'react';

const ActionBtns = ({ buttons }) => {
  return (
    <div className="mt-10 flex gap-2 whitespace-nowrap border-b-4 border-gray-100">
      {buttons && buttons.length > 0
        ? buttons.map((btn, i) => {
            if (btn.type === 'trigger') {
              return (
                <button key={i} onClick={() => btn.trigger(true)} className="-px-1 inline-flex h-14 items-center whitespace-nowrap rounded-t-md border border-b-0 border-gray-300 px-2 py-2 text-center text-gray-700 focus:outline-none dark:border-gray-500 dark:text-white sm:px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-1 h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <span className="mx-1 text-sm sm:text-base">{btn.text}</span>
                </button>
              );
            }
            if (btn.type === 'link') {
              return (
                <Link key={i} href={btn.link} className="-px-1 inline-flex h-14 items-center whitespace-nowrap rounded-t-md border border-b-0 border-gray-300 px-2 py-2 text-center text-gray-700 focus:outline-none dark:border-gray-500 dark:text-white sm:px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-1 h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>

                  <span className="mx-1 text-sm sm:text-base">{btn.text}</span>
                </Link>
              );
            }
            if(btn.type === 'drop-down'){
              return (
              <div key={i} className='flex items-center gap-2' >
              <span className='text-lg' >Filter:</span>
              <select onChange={(e)=>btn.setState(e.target.value)} className='h-10 text-sm border-2 border-gray-200 rounded-md' >
               {btn.options.length > 0 ? 
                btn.options.map((option,i)=><option value={option.value} key={i} >{option.name}</option>)
                :
               <option>No Options Found!</option>}
              </select>
              </div>
              )
            }
            if(btn.type === 'search'){
              return (
             <div key={i} className='flex items-center gap-3' >
              <input value={btn.field} onChange={(e)=>btn.setField(e.target.value)} type="text" className="block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" placeholder={btn.placeholder} />
              <button onClick={()=>btn.search()} type="button" className="rounded-md bg-b4 px-4 py-1 text-white">
                Search
              </button>
             </div>  
             )
            }
          })
        : null}
    </div>
  );
};

export default ActionBtns;
