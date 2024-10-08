import React from 'react'
import { Menu,MenuButton,MenuItems } from '@headlessui/react'
import NavBarLink from './NavBarLink'

const NavDropDown = ({ title, links, icon, bold }) => {
  return (
    <Menu as="div" className="relative" >
      <MenuButton className='flex items-center text-xs text-white/80 cursor-pointer hover:text-b6 w-max' >{title}{icon}</MenuButton>
      {/* Mark this component as `static` */}
      <MenuItems as="div" className="absolute z-[100] top-10 -right-8 rounded-sm py-5 bg-white w-32 h-auto text-black font-medium shadow-[0px_4px_40px_0px_rgba(0,0,0,0.08)]">
        {links.map((link) => <NavBarLink key={link.name} name={link.name} url={link.url} bold={bold} />)}
      </MenuItems>
    </Menu>
  )
}

export default NavDropDown