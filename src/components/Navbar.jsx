'use client';
import {jwtVerify} from 'jose'
import { useEffect, useRef} from 'react';
import DeskNavbar from './DeskComp/Navbar/Navbar';
import MobNavbar from './MobComp/Navbar';
import SideCart from './SideCart';
import useClickOutside from '@/hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { hideCart } from '@/app/GlobalRedux/slices/CartSlice';
import {setLogin,setEmail,setId} from '@/app/GlobalRedux/slices/AuthSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const sCart = useSelector((state)=>state.cart.sCart)

  const cartButtonRef = useRef(null);
  const cartMenuRef = useRef(null);

  useClickOutside([cartButtonRef, cartMenuRef], () => dispatch(hideCart()));

  const getCookie = async () => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPT_SALT;
    const key = new TextEncoder().encode(secretKey);

    const cookieStr = document.cookie;
    const cookies = cookieStr.split('; ');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === 'neu-admin') {
        const {payload} = await jwtVerify(cookieValue,key,{algorithms:['HS256']});
        dispatch(setLogin('admin'))
        dispatch(setEmail(payload.email))
        dispatch(setId(payload.id))
      }else if(cookieName === 'neu-user'){
        const {payload} = await jwtVerify(cookieValue,key,{algorithms:['HS256']});
        dispatch(setLogin('user'))
        dispatch(setId(payload.id))
        dispatch(setEmail(payload.email))
      }
    }
  }

  useEffect(()=>{
    getCookie()
  },[])

  return (
    <>
      <DeskNavbar sCart={sCart} cartButtonRef={cartButtonRef} />
      <MobNavbar sCart={sCart} cartButtonRef={cartButtonRef} />

      <SideCart cartMenuRef={cartMenuRef} />
    </>
  );
};

export default Navbar;
