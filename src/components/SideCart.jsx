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
  const products = [
    { image: '', title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text', quantity: 1, regPrice: '379.00', count: 1, salePrice: '279.00', condition: 'new' },
    { image: '', title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text', quantity: 1, regPrice: '379.00', count: 1, salePrice: '279.00', condition: 'certified' },
    { image: '', title: 'Upper Rack for Dish Washers ft. Over the 3 racks with Convenience washing Controls and manual for long text', quantity: 1, regPrice: '379.00', count: 1, salePrice: '279.00', condition: 'used' },
  ];
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
      <div ref={dropdownRef} className={` ${sCart ? '' : 'hidden'} relative mx-auto h-full w-[90%] bg-white sm:w-[80%] lg:float-right lg:w-full lg:max-w-[480px] maxlg:rounded-t-2xl`}>
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
              <h4 className="font-bold">My Cart</h4>
              <span className="xy-center h-5 w-5 rounded-full bg-b3 text-xs text-white">{cartCount}</span>
            </div>
          </div>
          {loading ? (
            <div className="xy-center h-full w-full">
              <Image width={200} height={200} quality={100} alt="Loading" src="/loader-bg.gif" className="ml-2 h-10 w-10" />
            </div>
          ) : (
            // ) : products?.length === 0 ? (
            //   <div className="flex h-full w-full flex-col items-center justify-center space-y-5 px-2">
            //     <Image width={200} height={200} quality={100} alt="Cart" className="h-20 w-20" src="/bag.webp" />
            //     <h1 className="font-extrabold">Your Cart is Empty</h1>
            //     <h2 className="text-center">Lorem Ipsum Doller Sit Amet, Consecture Audipicsing Elit</h2>
            //     <button type="button" className="xy-center w-1/2 rounded-lg bg-b3 py-3 text-sm font-medium text-white">
            //       <BsCart3 className="mr-2" /> Start Shopping
            //     </button>
            //   </div>
            <>
              <div style={{ height: 'calc(100vh - 200px)' }} className="flex flex-col overflow-y-auto px-5">
                <div className="flex items-center gap-2 rounded-t-md border border-b8 bg-b8 p-4">
                  <div className="w-[84px] rounded bg-white px-1 py-2">
                    <Image width={200} height={200} quality={100} className="h-auto w-20" src="/oven.webp" alt="calendar_month" />
                  </div>
                  <h3 className="text-sm font-semibold">GE 1.7 cu. ft. Over the Range Microwave with Convenience Cooking Controls</h3>
                </div>
                <div className="mb-3 flex w-full flex-col gap-6 space-y-2 border border-[#F2F2F2] px-5">{products?.map((item, pindex) => Array.from({ length: item.count }).map((_, index) => <SideCartCard indx={`${pindex}-${index}-delivery`} key={`${pindex}-${index}-delivery`} cartId={cartId} item={item} RemoveFromCart={RemoveCartItemData} delState={delLoading} setDelState={setDelLoading} type="delivery" />))}</div>
              </div>
              <div className="relative flex flex-col justify-end gap-6 border-t border-gray-300 p-6">
                <div className="flex justify-between">
                  <span className="text-sm">Order Total</span>
                  <span className="font-bold">${subTotal}</span>
                </div>

                {/* <button
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
                </button> */}
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
