import React from 'react';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { FiPhone } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const StickyNavbar = ({ state, product, addCart }) => {
  // Scroll Sticky Navbar Item to Sections
  const scrollToSection = (sectionId) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      const offset = -150;
      const topPosition = targetSection.getBoundingClientRect().top + window.scrollY + offset;

      window.scrollTo({
        top: topPosition,
        behavior: 'smooth',
      });
    }
  };

  const frstImg = product.media ? product.media.find((item) => item.file === 'image') : null;

  return (
    <>
      <div className={`fixed top-0 z-50 ${state ? 'lg:flex' : 'hidden'} w-full flex-col bg-white shadow-lg`}>
        <div className="bg-gray-100 maxlg:hidden">
          <div className="maincontainer items-center justify-center py-5 lg:flex">
            <div className="max-w-6/12 flex w-6/12 items-center space-x-5">
              <div className="w-fit rounded-lg border-[1px] border-gray-200 px-2 py-1">
                <Image width={400} height={400} quality={100} src={frstImg ? frstImg.data : ''} className="h-auto w-12" alt="" />
              </div>
              <p className="text-clip text-2xl font-bold leading-8 md:text-3xl xl:text-[2rem]">{product.title}</p>
            </div>

            <div className="flex w-6/12 items-center justify-end space-x-5">
              <div className="flex flex-col">
                <h4 className="text-xl font-bold text-b3 lg:text-2xl">${product.salePrice ? product.salePrice : product.regPrice}</h4>
                {product.salePrice ? (
                  <div className="flex items-center space-x-5">
                    <strike>${product.regPrice}</strike>
                    <span className="flex rounded-2xl bg-b4 px-3 py-2 text-[10px] font-semibold text-black lg:text-xs">Save ${product.regPrice - product.salePrice}</span>
                  </div>
                ) : null}
              </div>
              <div onClick={addCart} className="flex cursor-pointer items-center justify-center rounded-lg bg-b7 px-2 py-3 text-sm text-white  lg:px-10">
                <AiOutlineShoppingCart className="text-lg" />
                <h6 className="ml-2 font-bold">Add To Cart</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="maincontainer grid grid-cols-12 items-center justify-between bg-white py-2">
          <div className="col-span-9 flex items-center lg:hidden">
            <button type="button">
              <FaBars />
            </button>
          </div>
          <div className="bottom-0 left-0 top-12 col-span-9 flex gap-1 bg-white p-4 md:px-10 lg:items-center lg:gap-5 lg:py-0 lg:pl-0 lg:pr-5 xl:pr-10 2xl:gap-5 maxlg:fixed maxlg:hidden maxlg:w-[230px] maxlg:flex-col maxlg:gap-5 [&>button:hover]:border-b-[1px] [&>button:hover]:border-b4 [&>button]:h-5 [&>button]:cursor-pointer [&>button]:text-xs [&>button]:font-normal [&>button]:lg-to-xl:text-[11px]">
            {NavItems.map((item, index) => (
              <button key={index} onClick={() => scrollToSection(item.id)}>
                {item.title}
              </button>
            ))}
          </div>
          <div className="col-span-3 flex items-center justify-end gap-4 lg:gap-3 xl:gap-x-10">
            <Link href="tel:(512) 992-2714" className="flex cursor-pointer items-center gap-1 text-b4 hover:text-black">
              <FiPhone />
              <span className="w-max text-xs">(512) 992-2714</span>
            </Link>
            <Link href="/help-and-support" className="flex cursor-pointer items-center gap-1 text-black hover:text-b4">
              <TfiHeadphoneAlt />
              <span className="w-max text-xs">Need Help?</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyNavbar;

const NavItems = [
  { title: 'Product Information', id: 'product-information' },
  { title: '360° View', id: '360-view' },
  { title: 'Testimonials View', id: 'testimonials-view' },
  { title: 'Product Features', id: 'product-features' },
  { title: 'Inspections', id: 'inspections' },
  { title: 'Compare', id: 'compare' },
  { title: 'FAQ', id: 'faq' },
];
