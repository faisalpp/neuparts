import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';

const NavBarLink = ({ name, url, bold }) => {
  const location = useLocation();

  return (
    <Menu.Item as="div" className="px-2">
      <Link href={url} className={`text-reg mt-1 flex w-full cursor-pointer px-2 py-2 text-xs first:mt-0   hover:bg-b5 ${location.pathname.includes(url) ? 'rounded-md bg-b5/50' : null} font-normal`}>
        {name}
      </Link>
    </Menu.Item>
  );
};

export default NavBarLink;
