'use client';
import { useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineLogin, AiOutlineLogout, AiFillHome, AiFillGift, AiOutlineSearch } from 'react-icons/ai';
import { IoMenu, IoCloseOutline } from 'react-icons/io5';
import { CgSmartHomeWashMachine } from 'react-icons/cg';
import { FaBandcamp } from 'react-icons/fa';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { GiReceiveMoney } from 'react-icons/gi';
import { BsFillChatSquareHeartFill } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ sCart, setsCart }) => {
  const [mobMenu, setMobMenu] = useState(false);
  const [dealMenu, setDealMenu] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const [brandMenu, setBrandMenu] = useState(false);
  const cartCount = '';
  const isUser = '';
  const isAdmin = '';

  return (
    <>
      <div className="sticky top-0 z-50 flex justify-between bg-b1 px-4 py-4 text-white md:px-10 lg:hidden">
        <div className="flex items-center gap-4">
          {mobMenu ? (
            <div onClick={() => setMobMenu(false)} className="flex h-6 w-6 cursor-pointer items-center text-white">
              <IoCloseOutline className="h-6 w-6 text-white" />
            </div>
          ) : (
            <div onClick={() => setMobMenu(true)} className="flex h-6 w-6 cursor-pointer items-center text-white">
              <IoMenu className="h-6 w-6" />
            </div>
          )}
          <Link href="/" className="w-28">
            <Image width={300} height={300} quality={100} src="/neu.webp" className="h-auto w-28" alt="neuappliance" />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-5 coxs:gap-8">
          <AiOutlineSearch className="h-6 w-6" />
          <div onClick={() => setsCart(!sCart)} className="relative h-6 w-6 items-center rounded-full text-white">
            <AiOutlineShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 ml-3 rounded-full bg-b3 px-[6px] py-[2px] text-center text-[10px]">{cartCount ? cartCount : 0}</span>
          </div>
          {isUser ? (
            <Link href="/my-account" className="flex h-6 w-6 items-center rounded-full bg-b2 text-white">
              <BiUserCircle className="h-6 w-6" />
            </Link>
          ) : (
            <Link href="/login" className="flex h-6 w-6 items-center rounded-full bg-b2 text-white">
              <BiUserCircle className="h-6 w-6" />
            </Link>
          )}
          {/* {isAdmin ?<Link href='/my-account' className='flex items-center bg-b2 h-6 w-6 rounded-full text-white' ><BiUserCircle className='w-6 h-6' /></Link>:null} */}
        </div>
      </div>

      <div style={{ height: `calc(100vh - 80px)` }} className={`${mobMenu ? 'fixed' : 'hidden'} left-0 top-16 z-50 w-2/3 overflow-y-scroll bg-b1 py-5 lg:hidden`}>
        <div className="mt-2 flex flex-col space-y-5 px-5">
          <Link href="/">
            <div className="small___nav__item space-x-5 text-white">
              <BiUserCircle className="text-2xl" />
              <h4>My Account</h4>
            </div>
          </Link>
          <Link href="/">
            <div className="small___nav__item space-x-5 text-white">
              <AiFillHome className="text-2xl" />
              <h4>Home</h4>
            </div>
          </Link>
          {/* Home Menu */}
          <div className="mt-2 flex flex-col lg:hidden">
            {/* Deals Menu Btn */}
            {dealMenu ? (
              <div onClick={() => setDealMenu(false)} className="small___nav__item space-x-16 ">
                <div className="flex items-center space-x-5">
                  <AiFillGift className="text-2xl" />
                  <h4>Deals</h4>
                </div>
                <RiArrowDropUpLine className="text-2xl" />
              </div>
            ) : (
              <div onClick={() => setDealMenu(true)} className="small___nav__item space-x-16">
                <div className="flex items-center space-x-5">
                  <AiFillGift className="text-2xl" />
                  <h4>Deals</h4>
                </div>
                <RiArrowDropDownLine className="text-2xl" />
              </div>
            )}
            {/* Deals Menu Drop Down */}
            <div className={`${dealMenu ? 'flex' : 'hidden'} mt-5 flex-col space-y-2`}>
              <div className="small___nav__subitem">
                <h3>Recent Arrivals</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>4 Stars Products</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>3 Stars Products</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>5 Stars Products</h3>
              </div>
            </div>
          </div>
          {/* Product Menu */}
          <div className="mt-2 flex flex-col lg:hidden">
            {/* Deals Menu Btn */}
            {productMenu ? (
              <div onClick={() => setProductMenu(false)} className="small___nav__item space-x-10 ">
                <div className="flex items-center space-x-5">
                  <CgSmartHomeWashMachine className="text-2xl" />
                  <h4>Products</h4>
                </div>
                <RiArrowDropUpLine className="text-2xl" />
              </div>
            ) : (
              <div onClick={() => setProductMenu(true)} className="small___nav__item space-x-10 ">
                <div className="flex items-center space-x-5">
                  <CgSmartHomeWashMachine className="text-2xl" />
                  <h4>Products</h4>
                </div>
                <RiArrowDropDownLine className="text-2xl" />
              </div>
            )}
            {/* Deals Menu Drop Down */}
            <div className={`${productMenu ? 'flex' : 'hidden'} mt-5 flex-col space-y-2`}>
              <Link href="/products">
                <div className="small___nav__subitem">
                  <h3>Refrigerators</h3>
                </div>
              </Link>
              <Link href="/products">
                <div className="small___nav__subitem">
                  <h3>Washer & Dryers</h3>
                </div>
              </Link>
              <Link href="/products">
                <div className="small___nav__subitem">
                  <h3>Ranges</h3>
                </div>
              </Link>
              <Link href="/products">
                <div className="small___nav__subitem">
                  <h3>Dishwasher</h3>
                </div>
              </Link>
              <Link href="/products">
                <div className="small___nav__subitem">
                  <h3>Microwaves</h3>
                </div>
              </Link>
              <Link href="/products">
                <div className="small___nav__subitem">
                  <h3>All Categories</h3>
                </div>
              </Link>
            </div>
          </div>
          {/* Brands Menu */}
          <div className="mt-2 flex flex-col lg:hidden">
            {/* Brands Menu Btn */}
            {brandMenu ? (
              <div onClick={() => setBrandMenu(false)} className="small___nav__item space-x-14 ">
                <div className="flex items-center space-x-5">
                  <FaBandcamp className="text-2xl" />
                  <h4>Brands</h4>
                </div>
                <RiArrowDropUpLine className="text-2xl" />
              </div>
            ) : (
              <div onClick={() => setBrandMenu(true)} className="flex items-center space-x-14 rounded-md bg-b2 px-3 py-2 text-white">
                <div className="flex items-center space-x-5">
                  <FaBandcamp className="text-2xl" />
                  <h4>Brands</h4>
                </div>
                <RiArrowDropDownLine className="text-2xl" />
              </div>
            )}
            {/* Brands Menu Drop Down */}
            <div className={`${brandMenu ? 'flex' : 'hidden'} mt-5 flex-col space-y-2`}>
              <div className="small___nav__subitem">
                <h3>Refrigerators</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>Washer & Dryers</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>Ranges</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>Dishwasher</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>Microwaves</h3>
              </div>
              <div className="small___nav__subitem">
                <h3>All Categories</h3>
              </div>
            </div>
          </div>

          <Link href="/">
            <div className="small___nav__item space-x-5">
              <GiReceiveMoney className="text-2xl" />
              <h4>Financing</h4>
            </div>
          </Link>
          <Link href="/">
            <div className="small___nav__item space-x-5">
              <BsFillChatSquareHeartFill className="text-2xl" />
              <h4>Testimonaials</h4>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
