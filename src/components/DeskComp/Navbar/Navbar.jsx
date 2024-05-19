'use client';
import { useState, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { IoMenu } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({ sCart, setsCart }) => {
  const [megMenu, setMegMenu] = useState(false);
  const isUser = '';
  const isAdmin = '';
  const UserfirstName = '';
  const AdminfirstName = '';

  const cartCount = 0;

  const handleAdminLogout = async (e) => {
    e.preventDefault();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
  };

  const [applianceTypes, setApplianceTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppliances = async () => {};
    getAppliances();
  }, []);

  const [search, setSearch] = useState('');

  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') {
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 hidden bg-b1 lg:block">
        {/* Navbar Start */}
        <div className="maincontainer grid-cols-12 items-center py-5 lg:grid">
          <Link href="/">
            <Image width={200} height={30} quality={100} className="col-start-1 col-end-3 h-auto w-full" src="/neu.webp" alt="logo" />
          </Link>

          <div className="col-start-9 col-end-13 flex w-full justify-end space-x-2">
            <div
              onClick={() => {
                setsCart(!sCart);
              }}
              className="flex h-10 w-max cursor-pointer items-center rounded-md bg-b2 px-4 text-white"
            >
              <AiOutlineShoppingCart />
              <span className="ml-2 text-xs font-medium">Cart</span>
              <span className="ml-2 h-4 w-4 rounded-full bg-b3 text-center text-xs">{cartCount}</span>
            </div>

            {isAdmin ? (
              <Menu as="div" className="relative">
                <Menu.Button className="top__menu_button">
                  <BiUserCircle className="text-lg" />
                  <span className="ml-1 text-xs font-medium capitalize">Hello {AdminfirstName}</span>
                  <RiArrowDropDownLine className="text-xl" />
                </Menu.Button>
                {/* Mark this component as `static` */}
                <Menu.Items as="div" className="absolute -right-24 top-12 z-[100] h-auto w-56 rounded-sm bg-white py-5 text-black shadow-lg">
                  <Menu.Item as="div" className="px-4">
                    <Link href="/admin/dashboard" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
                      Dashboard
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div" className="px-4">
                    <Link href="" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
                      Orders
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div" className="px-4">
                    <Link href="" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
                      Change Password
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div" className="px-4">
                    <div onClick={handleAdminLogout} className="top__menu_item">
                      Logout
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : null}
            {isUser ? (
              <Menu as="div" className="relative">
                <Menu.Button className="top__menu_button">
                  <BiUserCircle className="text-lg" />
                  <span className="ml-1 text-xs font-medium capitalize">Hello {UserfirstName}</span>
                  <RiArrowDropDownLine className="text-xl" />
                </Menu.Button>
                {/* Mark this component as `static` */}
                <Menu.Items as="div" className="absolute -right-24 top-12 z-[100] h-auto w-56 rounded-sm bg-white py-5 text-black shadow-lg">
                  <Menu.Item as="div" className="px-4">
                    <Link href="/my-account/profile" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
                      My Account
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div" className="px-4">
                    <Link href="/my-account/order-history" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
                      Order History
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div" className="px-4">
                    <Link href="/my-account/my-favourites" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
                      Favorites
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div" className="px-4">
                    <div onClick={handleLogout} className="top__menu_item">
                      Logout
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : null}
            {isAdmin || isUser ? null : (
              <Link href="/login">
                <div className="flex h-10 w-32 cursor-pointer items-center rounded-md bg-b2 px-2 text-white">
                  <BiUserCircle />
                  <span className="ml-1 text-xs font-medium">My Account</span>
                </div>
              </Link>
            )}

            {/* {isAuth ? <Link href="/my-account/profile" ><div className='flex items-center px-2 bg-b2 h-10 w-32 cursor-pointer rounded-md text-white' ><BiUserCircle /><span className='ml-2 font-reg font-normal text-sm' >My Account</span></div></Link> : <Link href="/login" ><div className='flex items-center px-2 bg-b2 h-10 w-32 cursor-pointer rounded-md text-white' ><BiUserCircle /><span className='ml-2 font-reg font-normal text-sm' >My Account</span></div></Link>} */}
            <div
              onClick={() => {
                megMenu ? setMegMenu(false) : setMegMenu(true);
              }}
              className="flex h-10 w-max cursor-pointer items-center rounded-md bg-b2 px-4 text-white"
            >
              <IoMenu />
              <span className="ml-2 text-xs font-medium">Menu</span>
            </div>
            {/* <div onClick={handleLogout} className='flex items-center cursor-pointer text-center px-2 bg-b2 h-10 w-24 rounded-md text-white' ><span className='text-center font-medium text-xs px-5' >Logout</span></div>   */}
          </div>
        </div>
        {/* Navbar End */}
        {/* Sub Navbar Start */}
        {/* Mega Menu Start */}
        <div className={`absolute ${megMenu ? 'pb-20 pt-5' : 'max-h-0'} top-20 z-50 w-full overflow-hidden bg-b1 duration-300`}>
          <div className="mx-auto grid grid-cols-12 justify-center px-16 xl:px-20 2xl:px-120px 3xl:max-w-1680px">
            <div className="col-start-1 col-end-2 flex flex-col items-center">
              <h4 className="font-semibold text-white xl:whitespace-nowrap">How It Works</h4>
              <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                <Link href="/how-it-works/what-we-sell">What We Sell</Link>
                <Link href="/how-it-works/rating-system">Rating System</Link>
                <Link href="/how-it-works/testing-process">Testing&nbsp;Process</Link>
                <Link href="/how-it-works/product-photos">Product&nbsp;Photos</Link>
                <Link href="/how-it-works/delivery">Delivery</Link>
                <Link href="/how-it-works/hassle-free">Warranty&nbsp;&&nbsp;Return</Link>
              </div>
            </div>

            <div className="col-start-3 col-end-5 ml-8">
              <h4 className="font-semibold text-white">Resources</h4>
              <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                <Link href="/appliance-repair">Appliance Repair</Link>
                <Link href="">Product Reviews</Link>
                <Link href="/measuring-guide">Measuring Guide</Link>
                <Link href="/helpful-appliances-tips">Appliance Tips</Link>
                <Link href="/blogs">Appliance Blog</Link>
              </div>
            </div>

            <div className="col-start-6 col-end-6 flex flex-col">
              <h4 className="font-semibold text-white">About Us</h4>
              <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                <Link href="/our-story">Our Story</Link>
                <Link href="/our-showroom">Our Outlet</Link>
                <Link href="/our-companies">Our&nbsp;Companies</Link>
                <Link href="/faqs">FAQ</Link>
              </div>
            </div>

            <div className="col-start-8 col-end-11">
              <h4 className="font-semibold text-white">Help & Support</h4>
              <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                <Link href="/help-and-support">Help Placing an Order Us</Link>
                <Link href="">Returns and Exchange</Link>
                <Link href="/contact-us">Contact Us</Link>
              </div>
            </div>

            <div className="col-start-11 col-end-13">
              <h4 className="font-semibold text-white">Delivery</h4>
              <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                <Link href="">Important Information</Link>
              </div>
            </div>
          </div>
          {/* Mega Menu End */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
