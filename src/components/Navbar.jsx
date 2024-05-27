'use client';
import { useRef, useState } from 'react';
import DeskNavbar from './DeskComp/Navbar/Navbar';
import MobNavbar from './MobComp/Navbar';
import SideCart from './SideCart';
import useClickOutside from '@/hooks/useClickOutside';

const Navbar = () => {
  const [sCart, setsCart] = useState(false);

  const cartButtonRef = useRef(null);
  const cartMenuRef = useRef(null);

  useClickOutside([cartButtonRef, cartMenuRef], () => setsCart(false));

  return (
    <>
      <DeskNavbar sCart={sCart} cartButtonRef={cartButtonRef} setsCart={setsCart} />
      <MobNavbar sCart={sCart} cartButtonRef={cartButtonRef} setsCart={setsCart} />

      <SideCart sCart={sCart} cartMenuRef={cartMenuRef} setsCart={setsCart} />
    </>
  );
};

export default Navbar;
