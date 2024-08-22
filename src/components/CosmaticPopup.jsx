import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegCircle } from 'react-icons/fa';
import FourStar from './svgs/FourStar';

const CosmaticPopup = ({ closeModal, data }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] !m-0 h-screen w-full overflow-y-auto bg-black/40 p-10">
      <div className="relative m-auto my-10 flex w-full max-w-[580px] flex-col items-start gap-2 rounded-3xl bg-white p-10">
        <button type="button" onClick={closeModal} className="absolute -right-10 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-b3 p-1 text-white">
          <IoCloseOutline className="text-3xl" />
        </button>
        <h2 className="text-lg font-semibold">{data.title}</h2>
        <div className={`inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase text-white ` + data.class}>
          {data.slug === 'new' && <FourStar />}
          {data.title}
        </div>
        <h3 className="mt-4 font-semibold">What To Expect</h3>
        <ul className="space-y-4">
          {data.lists.map((list, index) => (
            <li className="flex items-start gap-2" key={index}>
              <FaRegCircle strokeWidth={4} className="mt-1.5 h-3 w-3 text-b3" />
              <span className="block">{list}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CosmaticPopup;
