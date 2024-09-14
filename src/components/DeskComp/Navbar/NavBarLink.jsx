import React from 'react';
import { MenuItem } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const NavBarLink = ({ name, url, bold }) => {
    const router = useRouter();

    const handleRoute = (URL) => {
      router.push(URL)
    }

  return (
    <MenuItem as="div" className="px-2">
      <span onClick={()=>handleRoute(url)} className={`text-reg mt-1 flex w-full cursor-pointer px-2 py-2 text-xs first:mt-0   hover:bg-b5 ${router.pathname === url ? 'rounded-md bg-b5/50' : null} font-normal`}>
        {name}
      </span>
    </MenuItem>
  );
};

export default NavBarLink;
