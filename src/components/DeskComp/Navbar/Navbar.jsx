'use client';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiSearch, BiUserCircle } from 'react-icons/bi';
import { IoMenu } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useClickOutside from '@/hooks/useClickOutside';
import NavDropDown from '../Navbar/NavDropDown';
import NavSearchMenu from '@/components/NavSearchMenu';
import { FiPhone } from 'react-icons/fi';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { toggleCart } from '@/app/GlobalRedux/slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import {setEmail,setLogin,setId} from '@/app/GlobalRedux/slices/AuthSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const [megMenu, setMegMenu] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [types, setTypes] = useState([]);

  const searchButtonRef = useRef(null);
  const searchRef = useRef(null);

  const MenuButonRef = useRef(null);
  const MegaMenuRef = useRef(null);

  useClickOutside([searchButtonRef, searchRef], () => setSearchMenu(false));
  useClickOutside([MenuButonRef, MegaMenuRef], () => setMegMenu(false));

  const cartCount = useSelector((state) => state.cart.cartCount);
  const User = useSelector((state)=>state.auth.user)

  const handleAdminLogout = async () => {
    const logoutToast = toast.loading('Signing you out...')
    fetch('/api/admin/auth/logout',{method:'GET',headers:{'Content-Type':'application/json'}})
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success){
       toast.update(logoutToast,{render:'Signout successfull!',type:'success',autoClose:1000,isLoading: false})
       dispatch(setEmail(''))
       dispatch(setLogin(''))
       dispatch(setId(null))
       router.push('/')
      }
    })
    .catch((error)=>{
      toast.update(logoutToast,{render:'Something went wrong!',type:'error',autoClose:1000,isLoading: false})
    })
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const crtToastId = toast.loading('Signing you out...');

    fetch('/api/user/auth/logout', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { render: 'Signout Successfull!', type: 'success', autoClose: 1000, isLoading: false });
          dispatch(setEmail(''))
          dispatch(setLogin(''))
          dispatch(setId(null))
          router.push('/');
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
      });
  };

//
  const getCategories = async () => {
    const res = await fetch('/api/front/navbar');
    const data = await res.json();
    
    const transformedCategories = data.categories.map((category) => ({
      name: category.title,
      url: `/products?sale=true&category=${category.slug}`,
    }));
    const transformedManufacturers = data.manufacturers.map((manufacturer) => ({
      name: manufacturer.title,
      url: `/products?sale=true&manufacturer=${manufacturer.slug}&tab=browse-by`,
    }));
    const transformedTypes = data.types.map((type) => ({
      name: type.title,
      url: `/products?sale=true&type=${type.slug}`,
    }));
    setCategories(transformedCategories);
    setManufacturers(transformedManufacturers);
    setTypes(transformedTypes);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="sticky top-0 z-[60] hidden bg-b1 lg:block">
        {/* Navbar Start */}
        <div className="maincontainer items-center justify-between py-5 lg:flex">
          <Link href="/" className="h-auto w-32">
            <Image width={200} height={30} quality={100} className="h-auto w-32" src="/neu.webp" priority={true} alt="logo" />
          </Link>

          <div className="flex w-full justify-end space-x-2">
            <div className="relative" ref={searchRef}>
              <button type="button" onClick={() => setSearchMenu(!searchMenu)} className="flex h-10 items-center justify-center gap-1 rounded-md bg-b2 px-4 text-white">
                <BiSearch className="w-full max-w-3.5" />
                <span className="text-xs font-medium">Search</span>
                <ChevronDownIcon className="w-full max-w-3" />
              </button>
              {/* Search Dropdown */}
              <NavSearchMenu searchMenu={searchMenu} setSearchMenu={setSearchMenu} />
            </div>
            <div onClick={() => dispatch(toggleCart())} className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-b2 px-4 text-white">
              <AiOutlineShoppingCart />
              <span className="ml-2 text-xs font-medium">Cart</span>
              <span className="ml-2 h-4 w-4 rounded-full bg-b3 text-center text-xs">{cartCount}</span>
            </div>

            {User === 'admin' ? (
              <Menu as="div" className="relative">
                <Menu.Button className="top__menu_button">
                  <BiUserCircle className="text-lg" />
                  <span className="ml-1 text-xs font-medium capitalize">My Account</span>
                  <RiArrowDropDownLine className="text-xl" />
                </Menu.Button>
                {/* Mark this component as `static` */}
                <Menu.Items as="div" className="absolute -right-24 top-12 z-[100] h-auto w-56 rounded-sm bg-white py-5 text-black shadow-lg">
                  <Menu.Item as="div" className="px-4">
                    <Link href="/neu-admin" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
                      Dashboard
                    </Link>
                  </Menu.Item>
                  <Menu.Item as="div" className="px-4">
                    <Link href="#" className={`${({ isActive }) => (isActive ? 'bg-b5' : '')} top__menu_item`}>
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
            {User === 'user' ? (
              <Menu as="div" className="relative">
                <Menu.Button className="top__menu_button">
                  <BiUserCircle className="text-lg" />
                  <span className="ml-1 text-xs font-medium capitalize">My Account</span>
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
            {User === '' ? (
              <Link href="/login" className="flex h-10 cursor-pointer items-center justify-center rounded-md bg-b2 px-4 text-white">
                <BiUserCircle />
                <span className="ml-1 text-xs font-medium">My Account</span>
              </Link>
            ):null}

            {/* {isAuth ? <Link href="/my-account/profile" ><div className='flex items-center justify-center bg-b2 h-10 px-4 cursor-pointer rounded-md text-white' ><BiUserCircle /><span className='ml-2 font-reg font-normal text-sm' >My Account</span></div></Link> : <Link href="/login" ><div className='flex items-center px-2 bg-b2 h-10 px-4 cursor-pointer rounded-md text-white' ><BiUserCircle /><span className='ml-2 font-reg font-normal text-sm' >My Account</span></div></Link>} */}
            <button ref={MenuButonRef} type="button" onClick={() => setMegMenu(!megMenu)} className="flex h-10 w-max cursor-pointer items-center rounded-md bg-b2 px-4 text-white">
              <IoMenu />
              <span className="ml-2 text-xs font-medium">Menu</span>
            </button>
            {/* <div onClick={handleLogout} className='flex items-center cursor-pointer text-center px-2 bg-b2 h-10 w-24 rounded-md text-white' ><span className='text-center font-medium text-xs px-5' >Logout</span></div>   */}
          </div>
        </div>
        {/* Navbar End */}
        {/* Sub Navbar Start */}
        {/* Mega Menu Start */}
        <div ref={MegaMenuRef} className={`absolute ${megMenu ? 'pb-20 pt-5' : 'max-h-0'} top-20 z-[60] w-full overflow-hidden bg-b1 duration-300`}>
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
                <Link href="/our-showroom">Our Showroom</Link>
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
        </div>
        {/* Mega Menu End */}
        {/* Mega Menu End */}
        <div className="bg-white/[0.08] py-4 text-white">
          <div className="maincontainer grid grid-cols-12 items-center">
            <div className="col-start-1 col-end-5 flex items-center space-x-4 xl:space-x-8 2xl:space-x-14">
              {/* <Link to='/' ><div className='flex items-center font-reg text-xs cursor-pointer text-white/80 hover:text-b6' ><span >Home</span></div></Link>  */}
              <NavDropDown
                icon={<RiArrowDropDownLine className="text-2xl" />}
                title="Deals"
                links={[
                  { name: 'Lorem 1', url: '/' },
                  { name: 'Lorem 2', url: '/' },
                  { name: 'Lorem 3', url: '/' },
                ]}
              />
              {/* <NavDropDown icon={<RiArrowDropDownLine className="text-2xl" />} title="Products" links={categories} bold={600} /> */}
              <div className="nav____item">
                <Link href="/products?sale=true" >Shop&nbsp;Now</Link>
              </div>
              <NavDropDown icon={<RiArrowDropDownLine className="text-2xl" />} title="Appliance Category" links={categories} bold={600} />
              <NavDropDown icon={<RiArrowDropDownLine className="text-2xl" />} title="Part Category" links={types} bold={600} />
              <NavDropDown icon={<RiArrowDropDownLine className="text-2xl" />} title="Popular Brands" links={manufacturers} bold={600} />
              <div className="nav____item">
                <Link href="/financing">Financing</Link>
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
