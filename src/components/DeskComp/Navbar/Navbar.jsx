import { useState, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { IoMenu } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import NavDropDown from '../Navbar/NavDropDown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { resetUser } from '../../../store/userSlice'
import { resetAdmin } from '../../../store/adminSlice'
import { Menu } from '@headlessui/react'
import { AdminSignout } from '../../../api/admin/auth';
import { Signout } from '../../../api/user/auth';
import { showSCart, hideSCart } from '../../../store/cartSlice'
import { getNabarAppliances, searchAppliance } from '../../../api/frontEnd'
import Toast from '../../../utils/Toast'

const Navbar = () => {
  const [megMenu, setMegMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isUser = useSelector((state) => state.user.auth);
  const isAdmin = useSelector((state) => state.admin.auth);
  const UserfirstName = useSelector((state) => state.user.firstName);
  const AdminfirstName = useSelector((state) => state.admin.firstName);

  const cartCount = useSelector((state) => state?.cart?.cart?.cartCount) || 0;
  const sCart = useSelector((state) => state.cart.sCart);


  const handleAdminLogout = async (e) => {
    e.preventDefault();

    const res = await AdminSignout();
    if (res.status === 200) {
      Toast(res.data.msg,'success',1000)
      dispatch(resetAdmin());
      navigate('/');
    } else if (res.code === 'ERR_BAD_REQUEST') {
      dispatch(resetAdmin());
      Toast('Session Expired!','error',1000)
      navigate('/');
    } else {
      Toast(res.data.message,'error',1000)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    const res = await Signout();
    if (res.status === 200) {
      Toast(res.data.msg,'success',1000)
      dispatch(resetUser());
      navigate('/login');
    } else if (res.code === 'ERR_BAD_REQUEST') {
      dispatch(resetUser());
      Toast('Session Expired!','error',1000)
      navigate('/login');
    } else {
      Toast(res.data.message,'error',1000)
    }
  }

  const [applianceTypes, setApplianceTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppliances = async () => {
      const res = await getNabarAppliances();
      if (res.status === 200) {
        let data = [];
        if (res.data.categories.length > 0) {
          const filt = await res.data.categories.map((item) => data.push({ name: item.title, url: '/appliances/' + item.slug }))
          setApplianceTypes([...data, { name: 'View All Categories', url: '/applianceTypes' }]);
        }
        setLoading(false)
      } else {
        setApplianceTypes([])
      }
    }
    getAppliances();
  }, [])

  const [search, setSearch] = useState('')

  const handleEnterKey = async (e) => {
    if (e.key === 'Enter') {
      navigate(`/appliances/?query=${search}`)
    }
  }


  return (
    <>
      <div className='relative bg-b1' >
        {/* Navbar Start */}
        <div className='lg:grid grid-cols-12 py-5 items-center maincontainer'>
          <NavLink to="/">
            <img className='col-start-1 col-end-3' src="/neu.webp" alt="logo" />
          </NavLink>
          {/* Search Start */}
          <div className='col-start-4 col-end-8 flex items-center bg-white h-10 px-2 rounded-lg space-x-2 w-full ' >
            <AiOutlineSearch className='text-black' />
            <input type="text" value={search} onKeyDown={e => handleEnterKey(e)} onChange={e => setSearch(e.target.value)} placeholder='Search for appliances' className="w-full text-xs outline-none" />
          </div>
          {/* Search End */}

          <div className='col-start-9 col-end-13 flex justify-end space-x-2 w-full' >
            <div onClick={() => { sCart ? dispatch(hideSCart()) : dispatch(showSCart()) }} className='flex items-center cursor-pointer px-4 bg-b2 h-10 w-max rounded-md text-white' ><AiOutlineShoppingCart /><span className='ml-2 font-medium text-xs' >Cart</span><span className='ml-2 bg-b3 rounded-full text-xs h-4 w-4 text-center' >{cartCount}</span></div>
            
            {isAdmin ? <Menu as="div" className="relative" >
              <Menu.Button className='top__menu_button'><BiUserCircle className='text-lg' /><span className='ml-1 font-medium text-xs capitalize' >Hello {AdminfirstName}</span><RiArrowDropDownLine className='text-xl' /></Menu.Button>
              {/* Mark this component as `static` */}
              <Menu.Items as="div" className="absolute z-[100] top-12 -right-24 shadow-lg rounded-sm py-5 bg-white w-56 h-auto text-black">
                <Menu.Item as="div" className="px-4" ><NavLink to="/admin/dashboard" className={`${({ isActive }) => isActive ? 'bg-b5' : ''} top__menu_item`} >Dashboard</NavLink></Menu.Item>
                <Menu.Item as="div" className="px-4" ><NavLink to="" className={`${({ isActive }) => isActive ? 'bg-b5' : ''} top__menu_item`} >Orders</NavLink></Menu.Item>
                <Menu.Item as="div" className="px-4" ><NavLink to="" className={`${({ isActive }) => isActive ? 'bg-b5' : ''} top__menu_item`} >Change Password</NavLink></Menu.Item>
                <Menu.Item as="div" className="px-4" ><div onClick={handleAdminLogout} className='top__menu_item' >Logout</div></Menu.Item>
              </Menu.Items>
            </Menu>:null}
              {isUser ?  <Menu as="div" className="relative" >
                <Menu.Button className='top__menu_button'><BiUserCircle className='text-lg' /><span className='ml-1 font-medium text-xs capitalize' >Hello {UserfirstName}</span><RiArrowDropDownLine className='text-xl' /></Menu.Button>
                {/* Mark this component as `static` */}
                <Menu.Items as="div" className="absolute z-[100] top-12 -right-24 shadow-lg rounded-sm py-5 bg-white w-56 h-auto text-black">
                  <Menu.Item as="div" className="px-4" ><NavLink to="/my-account/profile" className={`${({ isActive }) => isActive ? 'bg-b5' : ''} top__menu_item`} >My Account</NavLink></Menu.Item>
                  <Menu.Item as="div" className="px-4" ><NavLink to="/my-account/order-history" className={`${({ isActive }) => isActive ? 'bg-b5' : ''} top__menu_item`} >Order History</NavLink></Menu.Item>
                  <Menu.Item as="div" className="px-4" ><NavLink to="/my-account/my-favourites" className={`${({ isActive }) => isActive ? 'bg-b5' : ''} top__menu_item`} >Favorites</NavLink></Menu.Item>
                  <Menu.Item as="div" className="px-4" ><div onClick={handleLogout} className='top__menu_item' >Logout</div></Menu.Item>
                </Menu.Items>
              </Menu> : null}
              {isAdmin || isUser ? null : <NavLink to="/login" ><div className='flex items-center px-2 bg-b2 h-10 w-32 cursor-pointer rounded-md text-white' ><BiUserCircle /><span className='ml-1 font-medium text-xs' >My Account</span></div></NavLink>}

            {/* {isAuth ? <NavLink to="/my-account/profile" ><div className='flex items-center px-2 bg-b2 h-10 w-32 cursor-pointer rounded-md text-white' ><BiUserCircle /><span className='ml-2 font-reg font-normal text-sm' >My Account</span></div></NavLink> : <NavLink to="/login" ><div className='flex items-center px-2 bg-b2 h-10 w-32 cursor-pointer rounded-md text-white' ><BiUserCircle /><span className='ml-2 font-reg font-normal text-sm' >My Account</span></div></NavLink>} */}
            <div onClick={() => { megMenu ? setMegMenu(false) : setMegMenu(true) }} className='flex items-center cursor-pointer px-4 bg-b2 h-10 w-max rounded-md text-white' ><IoMenu /><span className='ml-2 font-medium text-xs' >Menu</span></div>
            {/* <div onClick={handleLogout} className='flex items-center cursor-pointer text-center px-2 bg-b2 h-10 w-24 rounded-md text-white' ><span className='text-center font-medium text-xs px-5' >Logout</span></div>   */}
          </div>
        </div>
        {/* Navbar End */}
        {/* Sub Navbar Start */}
        <div className="text-white bg-white/[0.08] py-4" >

          {/* Mega Menu Start */}
          <div className={`absolute ${megMenu ? 'pt-5 pb-20' : 'max-h-0'} duration-300 overflow-hidden top-20 bg-b1 w-full z-30`} >

            <div className='grid grid-cols-12 justify-center 3xl:max-w-1680px px-16 xl:px-20 2xl:px-120px mx-auto'>
              <div className='col-start-1 col-end-2 flex flex-col items-center' >
                <h4 className='font-semibold xl:whitespace-nowrap' >How It Works</h4>
                <div className='flex flex-col space-y-4 text-xs font-medium mt-4 text-white/80' >
                  <Link to="/how-it-works/what-we-sell">What We Sell</Link>
                  <Link to="/how-it-works/rating-system">Rating System</Link>
                  <Link to="/how-it-works/testing-process">Testing&nbsp;Process</Link>
                  <Link to="/how-it-works/product-photos">Product&nbsp;Photos</Link>
                  <Link to="/how-it-works/delivery">Delivery</Link>
                  <Link to="/how-it-works/hassle-free">Warranty&nbsp;&&nbsp;Return</Link>
                </div>
              </div>

              <div className='col-start-3 col-end-5 ml-8' >
                <h4 className='font-semibold' >Resources</h4>
                <div className='flex flex-col space-y-4 text-xs font-medium mt-4 text-white/80' >
                  <Link to="/appliance-repair">Appliance Repair</Link>
                  <Link to="">Product Reviews</Link>
                  <Link to="/measuring-guide">Measuring Guide</Link>
                  <Link to="/helpful-appliances-tips">Appliance Tips</Link>
                  <Link to="/blogs">Appliance Blog</Link>
                </div>
              </div>

              <div className='col-start-6 col-end-6 flex flex-col' >
                <h4 className='font-semibold' >About Us</h4>
                <div className='flex flex-col space-y-4 text-xs mt-4 font-medium text-white/80' >
                  <Link to="/our-story">Our Story</Link>
                  <Link to="/our-showroom">Our Outlet</Link>
                  <Link to="/our-companies">Our&nbsp;Companies</Link>
                  <Link to="/faqs">FAQ</Link>
                </div>
              </div>

              <div className='col-start-8 col-end-11' >
                <h4 className='font-semibold' >Help & Support</h4>
                <div className='flex flex-col space-y-4 text-xs mt-4 font-medium text-white/80' >
                  <Link to="/help-and-support">Help Placing an Order Us</Link>
                  <Link to="">Returns and Exchange</Link>
                  <Link to="/contact-us">Contact Us</Link>
                </div>
              </div>

              <div className='col-start-11 col-end-13' >
                <h4 className='font-semibold' >Delivery</h4>
                <div className='flex flex-col space-y-4 text-xs mt-4 font-medium text-white/80' >
                  <Link to="">Important Information</Link>
                </div>
              </div>
            </div>

          </div>
          {/* Mega Menu End */}

          <div className='grid grid-cols-12 items-center maincontainer'>
            <div className='col-start-1 col-end-5 flex items-center space-x-4 xl:space-x-8 2xl:space-x-14' >
              {/* <NavLink to='/' ><div className='flex items-center font-reg text-xs cursor-pointer text-white/80 hover:text-b6' ><span >Home</span></div></NavLink>  */}
              <NavDropDown icon={<RiArrowDropDownLine className='text-2xl' />} title="Deals" links={[{ 'name': 'Recent Arrival', 'url': '/products/?sort=-1' }, { 'name': '5 Star Products', 'url': '/products/?rating=5' }, { 'name': '4 Star Products', 'url': '/products/?rating=4' }, { 'name': '3 Star Products', 'url': '/products/?rating=3' }]} />
              <div className='nav____item' ><span >Shop&nbsp;Now</span></div>
              <NavDropDown icon={<RiArrowDropDownLine className='text-2xl' />} title="Products" links={applianceTypes} bold={600} />
              <NavDropDown icon={<RiArrowDropDownLine className='text-2xl' />} title="Popular Brands" links={[{ 'name': 'General Electronics', 'url': '/products/?brand=general-electronics' },{ 'name': 'Amana', 'url': '/products/?brand=amana' }, { 'name': 'Maytag', 'url': '/products/?brand=maytag' }, { 'name': 'Frigdaire', 'url': '/products/?brand=frigdaire' }, { 'name': 'Haier', 'url': '/products/?brand=haier' }, { 'name': 'Hisense', 'url': '/products/?brand=hisense' }, { 'name': 'Kenmore', 'url': '/products/?brand=Kenmore' }, { 'name': 'LG', 'url': '/products/?brand=lg' }, { 'name': 'KitchenAid', 'url': '/products/?brand=kitchen-aid' }, { 'name': 'Samsung', 'url': '/products/?brand=samsung' }, { 'name': 'Whirlpool', 'url': '/products/?brand=whirlpool' }, { 'name': 'Midea', 'url': '/products/?brand=midea' }]} bold={600} />
              <div className='nav____item' ><Link to="/financing" >Financing</Link></div>
              <div className='nav____item' ><span >Testimonials</span></div>
              <div className='nav____item' ><span >Pricing</span></div>
            </div>
            <div className='col-start-10 col-end-13 flex items-center justify-end space-x-10' >
              <Link to="tel:(512) 992-2714" className='flex items-center space-x-1 text-b4 cursor-pointer hover:text-white' ><FiPhone /><span className='text-xs font-medium w-max' >(512) 992-2714</span></Link>
              <Link to="/help-and-support" className='flex items-center space-x-1 text-white cursor-pointer' ><TfiHeadphoneAlt /><span className='text-xs font-medium w-max text-white/80' >Need Help?</span></Link>
            </div>
          </div>

        </div>
        {/* Sub Navbar End */}

      </div>
    </>
  )
}

export default Navbar