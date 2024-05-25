import React from 'react';
import { Checkbox } from '@material-tailwind/react';

const FaqForm = () => {
  return (
    <div className="bg-b3/10 py-10  lg:py-14 xl:py-100px">
      <div className="maincontainer">
        <span className="mb-10 block text-center font-bold text-b1">LOREM IPSUM</span>
        <h2 className="mb-10 text-center text-2xl font-bold lg:text-32px 2xl:text-40px">Lorem Ipsum</h2>
        <div className="mx-auto grid w-full max-w-[820px] grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label className="mb-2.5 block font-semibold text-b18">Full Name</label>
            <input type="text" className="mb-5 w-full rounded-lg border border-[#E2E2E2] p-2.5 text-base outline-none placeholder:italic placeholder:text-gray-400 focus:border-b3" placeholder="Type Here" />
            <label className="mb-2.5 block font-semibold text-b18">Email</label>
            <input type="text" className="mb-5 w-full rounded-lg border border-[#E2E2E2] p-2.5 text-base outline-none placeholder:italic placeholder:text-gray-400 focus:border-b3" placeholder="Type Here" />
            <label className="mb-2.5 block font-semibold text-b18">Phone</label>
            <input type="text" className="mb-5 w-full rounded-lg border border-[#E2E2E2] p-2.5 text-base outline-none placeholder:italic placeholder:text-gray-400 focus:border-b3" placeholder="Type Here" />
            <div className="label-p-0 flex items-start gap-4">
              <Checkbox ripple={false} checked={true} className="border-none bg-b1/10 checked:bg-b3 checked:text-white" />
              <label className="text-sm text-b18">Yes, please opt me in to receive marketing communications on products. I can unsubscribe at a later time.</label>
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-semibold text-b18">Full Name</label>
            <textarea className="mb-5 h-full w-full rounded-lg border border-[#E2E2E2] p-2.5 text-base outline-none placeholder:italic placeholder:text-gray-400 focus:border-b3" placeholder="Type Here"></textarea>
          </div>
          <div className="mt-10 text-center md:col-span-2">
            <button type="button" className="button-hover h-full w-4/5 items-center justify-center rounded-lg py-3 font-medium text-white">
              Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqForm;
