'use client';
import { useEffect, useState } from 'react';
import DeskNavbar from './DeskComp/Navbar/Navbar';
import MobNavbar from './MobComp/Navbar';
// import SideCart from './SideCart'

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isDesktop? <DeskNavbar /> : <MobNavbar />}
      {/* <SideCart /> */}
    </>
  );
};

export default Navbar;