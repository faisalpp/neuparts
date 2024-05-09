import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from '@headlessui/react'

const NavBarLink = ({ name, url, bold }) => {

  const location = useLocation()

  return (
    <Menu.Item as="div" className="px-2" ><Link to={url} className={`flex w-full px-2 first:mt-0 mt-1 cursor-pointer text-xs text-reg py-2   hover:bg-b5 ${location.pathname.includes(url)  ?'bg-b5/50 rounded-md':null} font-normal`} >{name}</Link></Menu.Item>
  )
}

export default NavBarLink