'use client';
import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineArrowRight, AiOutlineClose, AiOutlineShop, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineTruck } from 'react-icons/hi';
import { FaDotCircle } from 'react-icons/fa';
import { BiLoaderAlt, BiError } from 'react-icons/bi';
import SideCartCard from './Cart/SideCartCard';
import { GoDotFill } from 'react-icons/go';
import { TiTick } from 'react-icons/ti';
import { BiSearchAlt2 } from 'react-icons/bi';
import SelectTimeSlot from './Cart/SelectTimeSlot';
import { BsCart3 } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SideCart = ({ sCart, setsCart }) => {
  const route = useRouter();

  // Cart Time Slot Functions
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Select Time Slot Data
  const [selectedDate, setSelectedDate] = useState(new Date('2023/05/10'));
  const [dates, setDates] = useState([]);
  const [timeSlot, setTimeSlot] = useState('');

  const cartId = '';
  const subTotal = 12;
  const cartCount = 0;
  const products = [];
  const orderInfo = '';

  // Zip Code Location
  const [zip, setZip] = useState('');

  const GetCartData = async () => {
    if (!cartId) {
      return;
    }
  };

  useEffect(() => {
    if (sCart) {
      GetCartData();
    }
  }, [sCart]);

  const [delLoading, setDelLoading] = useState('');

  const RemoveCartItemData = async (e, indx, pId, price) => {
    e.preventDefault();
    setDelLoading(indx);
  };

  const [zipChange, setZipChange] = useState(false);
  const [zipError, setError] = useState(false);
  const [zipSuccess, setZipSuccess] = useState(true);

  const [frames, setFrames] = useState([]);

  const Submit = async () => {
    setZipChange(true);
  };

  useEffect(() => {
    if (sCart && zip && zip?.length === 5) {
      Submit();
    }
  }, [zip]);

  const [locLoading, setLocLoading] = useState(false);

  const UpdatePickupLocation = async (e, loc) => {
    e.preventDefault();
    setLocLoading(true);
  };

  return (
    <div className={` ${sCart ? 'top-0 lg:right-0' : 'lg:-right-[200%] maxlg:-top-[200vh]'} fixed z-[999] h-screen  w-full bg-black/60 duration-500 maxlg:pt-28`}>
      <div ref={dropdownRef} className={` ${sCart ? '' : 'hidden'} relative mx-auto h-full w-[90%] bg-white sm:w-[80%] lg:float-right lg:w-full lg:max-w-[420px] maxlg:rounded-t-2xl`}>
        {isOpen && <SelectTimeSlot frames={frames} timeSlot={timeSlot} setTimeSlot={setTimeSlot} selectDate={selectedDate} setSelectDate={setSelectedDate} dates={dates} />}

        <button
          onClick={() => {
            setsCart(!sCart);
          }}
          className="xy-center absolute -top-14 right-0 z-40 bg-white duration-200 lg:right-6 lg:top-5 maxlg:h-10 maxlg:w-10 maxlg:rounded-full maxlg:hover:bg-b3  maxlg:hover:text-white"
        >
          <AiOutlineClose className="text-xl" />
        </button>
        <div className="flex h-full w-full flex-col overflow-y-auto">
          <div className="sticky top-0 flex items-center justify-between bg-white px-6 py-5 maxlg:rounded-t-2xl">
            <div className="flex items-center gap-x-3">
              <h4>My Cart</h4>
              <span className="xy-center h-5 w-5 rounded-full bg-b3 text-xs text-white">{cartCount}</span>
            </div>
          </div>
          {loading ? (
            <div className="xy-center h-full w-full">
              <Image width={200} height={200} quality={100} alt="Loading" src="/loader-bg.gif" className="ml-2 h-10 w-10" />
            </div>
          ) : products?.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-5 px-2">
              <Image width={200} height={200} quality={100} alt="Cart" className="h-20 w-20" src="/bag.webp" />
              <h1 className="font-extrabold">Your Cart is Empty</h1>
              <h2 className="text-center">Lorem Ipsum Doller Sit Amet, Consecture Audipicsing Elit</h2>
              <button type="button" className="xy-center w-1/2 rounded-lg bg-b3 py-3 text-sm font-medium text-white">
                <BsCart3 className="mr-2" /> Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div style={{ height: 'calc(100vh - 200px)' }} className="flex flex-col overflow-y-auto">
                {orderInfo?.type === 'delivery' && products?.length > 0 ? (
                  <div className="mx-5 mb-5 flex flex-col rounded-lg border border-gray-200 px-6 py-5 ">
                    <h4 className="font-semibold">Delivery Orders</h4>
                    {/* Cart Product */}
                    <div className="mb-3 flex w-full flex-col gap-6 space-y-2">{products?.map((item, pindex) => Array.from({ length: item.count }).map((_, index) => <SideCartCard indx={`${pindex}-${index}-delivery`} key={`${pindex}-${index}-delivery`} cartId={cartId} item={item} RemoveFromCart={RemoveCartItemData} delState={delLoading} setDelState={setDelLoading} type="delivery" />))}</div>
                    {/* Cart Product End */}

                    <div className="relative mt-3 flex flex-col gap-4 rounded-md border border-gray-200 px-3 py-3 lg:mt-0">
                      {/* Loader */}
                      {zipChange ? (
                        <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center rounded-sm bg-gray-500/50">
                          <BiLoaderAlt className="animate-spin text-4xl" />
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <FaDotCircle className="text-b3" />
                          <HiOutlineTruck className="text-2xl" />
                          <h4 className="text-sm font-medium">Delivering To</h4>
                        </div>
                        <h4 className="font-semibold text-b3">${orderInfo?.shipping}</h4>
                      </div>
                      <div className="flex items-center rounded-md border-[1px] p-[8px]">
                        <BiSearchAlt2 className="mr-1 text-b6" />
                        <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} className=" w-full rounded-lg text-xs font-semibold outline-none" />
                        <span>
                          {zipError ? <BiError className="text-xl text-red-600" /> : null}
                          {zipSuccess ? <TiTick className="text-xl text-green-600" /> : null}
                        </span>
                      </div>
                      <div className="relative">
                        <button onClick={toggleDropdown} className="flex w-full items-center justify-between rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="h-[18px] w-[18px]">
                              <Image width={200} height={200} quality={100} className="h-auto w-full" src="/svgs/calendar_month.webp" alt="calendar_month" />
                            </span>
                            <span className="text-xs font-medium text-b3">Select Time-slot</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {orderInfo.type === 'pickup' && products?.length > 0 ? (
                  <div className="mx-5 mb-5 flex flex-col rounded-lg border border-gray-200 px-6 py-5 ">
                    <h4 className="font-semibold">Pickup Orders</h4>
                    {/* Cart Product */}
                    <div className="mb-3 flex flex-col gap-6 space-y-2">{products.map((item, pindex) => Array.from({ length: item.count }).map((_, index) => <SideCartCard indx={`${pindex}-${index}-pickup`} key={`${pindex}-${index}-pickup`} type="pickup" item={item} cartId={cartId} RemoveFromCart={RemoveCartItemData} delState={delLoading} setDelState={setDelLoading} />))}</div>
                    {/* Cart Product End */}

                    <div className="mt-3 flex flex-col rounded-md border border-gray-200 px-1 py-3 lg:mt-0">
                      <div className="relative flex flex-col space-y-2">
                        {locLoading ? (
                          <div className="absolute flex h-full w-full items-center justify-center bg-gray-500/50">
                            <BiLoaderAlt className="animate-spin text-4xl" />
                          </div>
                        ) : null}
                        <div className="flex items-center space-x-2 px-2">
                          <div className="flex">
                            <button type="button" onClick={(e) => UpdatePickupLocation(e, 'Georgetown, Tx')} className={`cursor-pointer rounded-full px-[2px] py-[2px] ${orderInfo?.location === 'Georgetown, Tx' || '' ? 'bg-b6/20' : 'bg-gray-100'} `}>
                              <GoDotFill className={` ${orderInfo?.location === 'Georgetown, Tx' ? 'text-b6' : 'text-gray-200'} `} />
                            </button>
                          </div>
                          <AiOutlineShop className="text-3xl text-gray-400" />
                          <h4 className="w-full text-sm font-normal text-gray-400">Pickup in the Warehouse Georgetown,Tx</h4>
                          <h4 className="text-sm font-normal text-gray-400">Free</h4>
                        </div>
                        <div className="flex items-center space-x-2 border-t-[1px] border-gray-200 px-2 pt-2">
                          <div className="flex">
                            <button type="button" onClick={(e) => UpdatePickupLocation(e, 'Austin, Tx')} className={`cursor-pointer rounded-full px-[2px] py-[2px] ${orderInfo?.location === 'Austin, Tx' ? 'bg-b6/20' : 'bg-gray-100'} `}>
                              <GoDotFill className={` ${orderInfo?.location === 'Austin, Tx' ? 'text-b6' : 'text-gray-200'} `} />
                            </button>
                          </div>
                          <AiOutlineShop className="text-3xl text-gray-400" />
                          <h4 className="w-full text-sm font-normal text-gray-400">Pickup in the store Austin, Tx</h4>
                          <h4 className="text-sm font-normal text-gray-400">Free</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="relative flex flex-col justify-end gap-6 border-t border-gray-300 p-6">
                <div className="flex justify-between">
                  <span className="text-sm">Order Total</span>
                  <span className="font-bold">${subTotal}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    route('/mycart');
                  }}
                  disabled={zipError ? true : false}
                  type="button"
                  className={`rounded-lg text-xs text-white ${zipError ? 'cursor-not-allowed bg-b7/80' : 'bg-b7'} flex justify-center gap-2 px-4 py-3`}
                >
                  View Cart
                  <AiOutlineShoppingCart className="text-base" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    route('/mycart/information');
                  }}
                  disabled={zipError ? true : false}
                  type="button"
                  className={`rounded-lg text-xs text-white ${zipError ? 'cursor-not-allowed bg-b3/75' : 'bg-b3'} flex justify-center gap-2 px-4 py-3`}
                >
                  Proceed to Checkout
                  <AiOutlineArrowRight className="text-base" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideCart;
