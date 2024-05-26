import React from 'react';
import { AiOutlineSearch, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';

const MapForm = ({ zip, setZip, Submit, success, error, loading }) => {
  return (
    <div className="mapform z-30 h-fit rounded-2xl bg-white bg-opacity-30 py-10 shadow-2xl  backdrop-blur-md lg:flex lg:h-[420px] lg:w-[350px] xl:h-[543px]  xl:w-[512px] maxlg:mx-4 ">
      <div className="flex flex-col  justify-center space-y-2 px-6 lg:px-10 xl:space-y-5 xl:px-20">
        <h4 className="text-xl font-extrabold xl:text-2xl maxlg:text-center">Delivery & Installation</h4>
        <p className="font-medium lg:text-sm xl:text-[16px] maxlg:!mb-7 maxlg:text-center">We make getting your appliance delivered and installed easy! We offer delivery and installation services to the greater Austin and surrounding areas! Input your Zipcode to see if we offer delivery and installation services in your area! </p>
        <div className="flex flex-col space-y-1 rounded-xl bg-[#053C53] px-4 py-4">
          <h4 className="text-sm font-semibold text-white">Check Your Zip Code</h4>
          <div className="flex items-center space-x-2 rounded-md bg-white px-2 py-1">
            <AiOutlineSearch className="text-gray-400" />
            <input className="py-2 text-xs outline-none" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="Enter ZIP Code" />
          </div>
        </div>
        <div className="flex justify-center">
          <a onClick={Submit} className="flex w-full cursor-pointer items-center justify-center rounded-md bg-b3 px-4 py-3 font-semibold text-white">
            {loading ? (
              <span className="animate-pulse lg:text-sm xl:text-[16px] ">Finding Best Deals</span>
            ) : (
              <>
                <span className="lg:text-sm xl:text-[16px]">Find Out</span>
                <BsArrowRightShort className="text-2xl" />
              </>
            )}
          </a>
        </div>
        <div className={` ${success ? 'flex' : 'hidden'} justify-center`}>
          <a className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-2xl bg-b12 px-4 py-2 font-semibold text-white">
            <AiOutlineCheckCircle className="text-sm" />
            <span className="text-xs">Delivery Available</span>
          </a>
        </div>
        <div className={` ${error ? 'flex' : 'hidden'} justify-center`}>
          <a className="flex w-max cursor-pointer items-center justify-center space-x-2 rounded-2xl bg-red-500 px-4 py-2 font-semibold text-white">
            <AiOutlineCheckCircle className="text-sm" />
            <span className="text-xs">Delivery Not Available - Pickup Only</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MapForm;
