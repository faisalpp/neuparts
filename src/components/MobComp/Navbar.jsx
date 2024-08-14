'use client';
import { useRef, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { IoMenu, IoCloseOutline } from 'react-icons/io5';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import DropDown from '@/components/DeskComp/Filter/DropDown';
import useClickOutside from '@/hooks/useClickOutside';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import NavSearchMenu from '../NavSearchMenu';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '@/app/GlobalRedux/slices/CartSlice';

const Navbar = () => {
  const [mobMenu, setMobMenu] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);

  const dispatch = useDispatch()

  const cartCount = '';
  const isUser = '';
  const isAdmin = '';

  const searchButtonRef = useRef(null);
  const searchRef = useRef(null);

  useClickOutside([searchButtonRef, searchRef], () => setSearchMenu(false));

  return (
    <>
      <div className="sticky top-0 z-50 flex justify-between bg-b1 px-3 py-4 text-white md:px-10 lg:hidden">
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
            <Image width={300} height={36} quality={100} src="/neu.webp" className="h-9 w-28" alt="neuappliance" />
          </Link>
        </div>
        <div className="flex items-center justify-end gap-5 coxs:gap-8">
          <div ref={searchRef}>
            <AiOutlineSearch onClick={() => setSearchMenu(!searchMenu)} className="h-6 w-6 cursor-pointer" />
            {/* Search Dropdown */}
            <NavSearchMenu searchMenu={searchMenu} setSearchMenu={setSearchMenu} />
          </div>

          <div onClick={() => dispatch(toggleCart())} className="relative h-6 w-6 items-center rounded-full text-white">
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

      <div className={`${mobMenu ? 'fixed' : 'hidden'} bottom-0 left-0 right-0 top-16 z-50 w-full overflow-y-auto bg-white py-5 lg:hidden`}>
        <div className="mt-2 flex flex-col gap-6 px-5">
          <DropDown title="Deals" titleClass="!text-base text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            test
          </DropDown>
          <Link href="/" className="block text-base font-semibold text-b1/65">
            Shop Now
          </Link>
          <DropDown title="Appliance Category" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
          <DropDown title="Part Category" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
          <DropDown title="Popular Brands" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
          <Link href="/" className="block text-base font-semibold text-b1/65">
            Financing
          </Link>
          <DropDown title="How It Works" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
          <DropDown title="Resources" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
          <DropDown title="About Us" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
          <DropDown title="Help & Support" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
          <DropDown title="Delivery" titleClass="!text-base !w-full text-b1/65 !font-semibold" iconClass="text-b1/65" noactive={true}>
            <div className="mt-2 space-y-6">
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Refrigerators
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washer & Dryer Sets
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dishwashers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Washing Machines
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Dryers
              </Link>
              <Link href="/" className="block text-sm font-medium text-b1/65">
                Others
              </Link>
            </div>
          </DropDown>
        </div>
      </div>
    </>
  );
};

export default Navbar;
