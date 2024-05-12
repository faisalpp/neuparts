'use client'
import { useState, useEffect } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { IoMenu } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import NavDropDown from '../Navbar/NavDropDown';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [megMenu, setMegMenu] = useState(false);
  const isUser = '';
  const isAdmin = '';
  const UserfirstName = '';
  const AdminfirstName = '';

  const cartCount = 0;
  const sCart = '';

  const handleAdminLogout = async (e) => {
    e.preventDefault();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
  };

  const [applianceTypes, setApplianceTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppliances = async () => {
    };
    getAppliances();
  }, []);

  const [search, setSearch] = useState('');

  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') {
    }
  };

  return (
    <>
      <div className="relative bg-b1">
        {/* Navbar Start */}
        <div className="maincontainer grid-cols-12 items-center py-5 lg:grid">
          <Link href="/">
            <Image width={200} height={200} quality={100} className="col-start-1 w-full h-auto col-end-3" src="/neu.webp" alt="logo" />
          </Link>
          {/* Search Start */}
          <div className="col-start-4 col-end-8 flex h-10 w-full items-center space-x-2 rounded-lg bg-white px-2 ">
            <AiOutlineSearch className="text-black" />
            <input type="text" value={search} onKeyDown={(e) => handleEnterKey(e)} onChange={(e) => setSearch(e.target.value)} placeholder="Search for appliances" className="w-full text-xs outline-none" />
          </div>
          {/* Search End */}

          <div className="col-start-9 col-end-13 flex w-full justify-end space-x-2">
            <div
              onClick={() => {
                sCart ? '' : '';
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
        <div className="bg-white/[0.08] py-4 text-white">
          {/* Mega Menu Start */}
          <div className={`absolute ${megMenu ? 'pb-20 pt-5' : 'max-h-0'} top-20 z-30 w-full overflow-hidden bg-b1 duration-300`}>
            <div className="mx-auto grid grid-cols-12 justify-center px-16 xl:px-20 2xl:px-120px 3xl:max-w-1680px">
              <div className="col-start-1 col-end-2 flex flex-col items-center">
                <h4 className="font-semibold xl:whitespace-nowrap">How It Works</h4>
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
                <h4 className="font-semibold">Resources</h4>
                <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                  <Link href="/appliance-repair">Appliance Repair</Link>
                  <Link href="">Product Reviews</Link>
                  <Link href="/measuring-guide">Measuring Guide</Link>
                  <Link href="/helpful-appliances-tips">Appliance Tips</Link>
                  <Link href="/blogs">Appliance Blog</Link>
                </div>
              </div>

              <div className="col-start-6 col-end-6 flex flex-col">
                <h4 className="font-semibold">About Us</h4>
                <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                  <Link href="/our-story">Our Story</Link>
                  <Link href="/our-showroom">Our Outlet</Link>
                  <Link href="/our-companies">Our&nbsp;Companies</Link>
                  <Link href="/faqs">FAQ</Link>
                </div>
              </div>

              <div className="col-start-8 col-end-11">
                <h4 className="font-semibold">Help & Support</h4>
                <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                  <Link href="/help-and-support">Help Placing an Order Us</Link>
                  <Link href="">Returns and Exchange</Link>
                  <Link href="/contact-us">Contact Us</Link>
                </div>
              </div>

              <div className="col-start-11 col-end-13">
                <h4 className="font-semibold">Delivery</h4>
                <div className="mt-4 flex flex-col space-y-4 text-xs font-medium text-white/80">
                  <Link href="">Important Information</Link>
                </div>
              </div>
            </div>
          </div>
          {/* Mega Menu End */}

          <div className="maincontainer grid grid-cols-12 items-center">
            <div className="col-start-1 col-end-5 flex items-center space-x-4 xl:space-x-8 2xl:space-x-14">
              {/* <Link to='/' ><div className='flex items-center font-reg text-xs cursor-pointer text-white/80 hover:text-b6' ><span >Home</span></div></Link>  */}
              <NavDropDown
                icon={<RiArrowDropDownLine className="text-2xl" />}
                title="Deals"
                links={[
                  { name: 'Recent Arrival', url: '/products/?sort=-1' },
                  { name: '5 Star Products', url: '/products/?rating=5' },
                  { name: '4 Star Products', url: '/products/?rating=4' },
                  { name: '3 Star Products', url: '/products/?rating=3' },
                ]}
              />
              <div className="nav____item">
                <span>Shop&nbsp;Now</span>
              </div>
              <NavDropDown icon={<RiArrowDropDownLine className="text-2xl" />} title="Products" links={applianceTypes} bold={600} />
              <NavDropDown
                icon={<RiArrowDropDownLine className="text-2xl" />}
                title="Popular Brands"
                links={[
                  { name: 'General Electronics', url: '/products/?brand=general-electronics' },
                  { name: 'Amana', url: '/products/?brand=amana' },
                  { name: 'Maytag', url: '/products/?brand=maytag' },
                  { name: 'Frigdaire', url: '/products/?brand=frigdaire' },
                  { name: 'Haier', url: '/products/?brand=haier' },
                  { name: 'Hisense', url: '/products/?brand=hisense' },
                  { name: 'Kenmore', url: '/products/?brand=Kenmore' },
                  { name: 'LG', url: '/products/?brand=lg' },
                  { name: 'KitchenAid', url: '/products/?brand=kitchen-aid' },
                  { name: 'Samsung', url: '/products/?brand=samsung' },
                  { name: 'Whirlpool', url: '/products/?brand=whirlpool' },
                  { name: 'Midea', url: '/products/?brand=midea' },
                ]}
                bold={600}
              />
              <div className="nav____item">
                <Link href="/financing">Financing</Link>
              </div>
              <div className="nav____item">
                <span>Testimonials</span>
              </div>
              <div className="nav____item">
                <span>Pricing</span>
              </div>
            </div>
            <div className="col-start-10 col-end-13 flex items-center justify-end space-x-10">
              <Link href="tel:(512) 992-2714" className="flex cursor-pointer items-center space-x-1 text-b4 hover:text-white">
                <FiPhone />
                <span className="w-max text-xs font-medium">(512) 992-2714</span>
              </Link>
              <Link href="/help-and-support" className="flex cursor-pointer items-center space-x-1 text-white">
                <TfiHeadphoneAlt />
                <span className="w-max text-xs font-medium text-white/80">Need Help?</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Sub Navbar End */}
      </div>
    </>
  );
};

export default Navbar;
