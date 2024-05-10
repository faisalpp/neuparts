import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';
import BackHome from '@/components/BackHome';
import Form from '@/components/WarantyReturn/Form';

const Page = () => {
  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        {/* Bread Crumbs Start */}
        <BackHome className="mb-10 md:hidden" />

        <div className="hidden items-center md:flex">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-b3">Help & Support Center</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Warranty & Return</h5>
        </div>
        {/* Bread Crumbs End */}

        <div className="mx-auto max-w-[960px] pt-20">
          <h1 className="text-32px font-bold text-b16 maxmd:text-center">Warranty & Return</h1>

          <p className="my-10 leading-8 -tracking-032 text-b18">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vLorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus v
            <br />
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla.
          </p>

          <Form />
        </div>
      </div>
    </>
  );
};

export default Page;
