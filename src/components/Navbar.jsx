'use client';
import { useRef} from 'react';
import DeskNavbar from './DeskComp/Navbar/Navbar';
import MobNavbar from './MobComp/Navbar';
import SideCart from './SideCart';
import useClickOutside from '@/hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { hideCart } from '@/app/GlobalRedux/slices/CartSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  const sCart = useSelector((state)=>state.cart.sCart)

  const cartButtonRef = useRef(null);
  const cartMenuRef = useRef(null);

  useClickOutside([cartButtonRef, cartMenuRef], () => dispatch(hideCart()));

  return (
    <>
      <DeskNavbar sCart={sCart} cartButtonRef={cartButtonRef} />
      <MobNavbar sCart={sCart} cartButtonRef={cartButtonRef} />

      <SideCart cartMenuRef={cartMenuRef} />
    </>
  );
};

export default Navbar;
