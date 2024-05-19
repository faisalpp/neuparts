'use client';
import { useState } from 'react';
import DeskNavbar from './DeskComp/Navbar/Navbar';
import MobNavbar from './MobComp/Navbar';
import SideCart from './SideCart';

const Navbar = () => {
  const [sCart, setsCart] = useState(false);
  return (
    <>
      <DeskNavbar sCart={sCart} setsCart={setsCart} />
      <MobNavbar />

      <SideCart sCart={sCart} setsCart={setsCart} />
    </>
  );
};

export default Navbar;
