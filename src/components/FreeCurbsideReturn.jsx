import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Link from 'next/link';

const FreeCurbsideReturn = ({ closeModal }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 !m-0 h-screen w-full overflow-y-auto bg-black/40 p-10">
      <div className="relative m-auto my-10 flex w-full max-w-[440px] flex-col gap-4 rounded-24px bg-white p-10">
        <button type="button" onClick={closeModal} className="absolute -right-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-b3 p-1 text-white">
          <IoCloseOutline className="text-3xl" />
        </button>
        <div>
          <img src="/curbside.webp" className="mx-auto h-16 w-16" alt="neushield" />
        </div>
        <h2 className="text-center text-2xl font-bold">Free Curbside Returns</h2>
        <p className="text-center">Shop with confidence. Upon delivery, if you decide the appliance isn't for you, we will return it free of charge!</p>
        <div className="mt-2 flex justify-center">
          <button type="button" onClick={closeModal} className="rounded-md bg-b3 px-10 py-3 text-center font-semibold uppercase text-white">
            OK
          </button>
        </div>
        <div className="mt-2 flex justify-center">
          <Link href="" className="font-semibold text-b3">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FreeCurbsideReturn;
