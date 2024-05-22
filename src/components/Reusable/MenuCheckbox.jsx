import { Menu, MenuHandler, Button, MenuList, MenuItem, Checkbox } from '@material-tailwind/react';
import Image from 'next/image';
import { IoChevronDownOutline } from 'react-icons/io5';

const MenuCheckbox = ({ data }) => {
  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button className="flex items-center justify-center gap-1 border border-black/15 bg-white px-3 py-2 font-medium text-b22 !shadow-none">
          <Image width={20} height={20} src={'/svgs/' + data.icon} className="h-14px w-14px" alt={data.title} /> {data.title} <IoChevronDownOutline size={14} />
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem className="p-0">
          <label htmlFor="item-1" className="flex cursor-pointer items-center gap-2 p-2">
            <Checkbox ripple={false} id="item-1" containerProps={{ className: 'p-0' }} className="hover:before:content-none" />
            Item 1
          </label>
        </MenuItem>
        <MenuItem className="p-0">
          <label htmlFor="item-2" className="flex cursor-pointer items-center gap-2 p-2">
            <Checkbox ripple={false} id="item-2" containerProps={{ className: 'p-0' }} className="hover:before:content-none" />
            Item 2
          </label>
        </MenuItem>
        <MenuItem className="p-0">
          <label htmlFor="item-3" className="flex cursor-pointer items-center gap-2 p-2">
            <Checkbox ripple={false} id="item-3" containerProps={{ className: 'p-0' }} className="hover:before:content-none" />
            Item 3
          </label>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuCheckbox;
