'use client';
import { useEffect, useState } from 'react'
import DeskNavbar from './DeskComp/Navbar/Navbar'
import MobNavbar from './MobComp/Navbar'
// import SideCart from './SideCart'

const Navbar = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  // Mobile and Desktop Design
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      {isDesktop ? <DeskNavbar /> : <MobNavbar />}
      {/* <SideCart /> */}
    </>
  )
}

export default Navbar