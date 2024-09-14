'use client'
import React from 'react';
import { Switch } from '@material-tailwind/react';
import { BiLoaderCircle,BiLoaderAlt } from "react-icons/bi";

const EmailPreferenceData = ({ id,title, checked, setState,loading,updating }) => {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-4">
          <h3 className=" font-semibold">{title}</h3>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor.</p>
        </div>
        <div className="flex items-center gap-10">
          <div className="inline-flex items-center">
            <div className="relative flex items-center gap-2 h-4 w-16 cursor-pointer rounded-full">
             {loading ? 
              <BiLoaderAlt className='animate-spin' />
              :
              <>
              <Switch className="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full  bg-gray-300 transition-colors duration-300 checked:bg-b3 peer-checked:border-b3 peer-checked:before:bg-b3" checked={checked} onChange={(e)=> setState(e)} />
              {updating === id ? <BiLoaderCircle className='text-red-500 text-xl animate-spin' /> : null}
              </>
              }
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-[rgba(0,0,0,0.08)]" />
    </>
  );
};

export default EmailPreferenceData;
