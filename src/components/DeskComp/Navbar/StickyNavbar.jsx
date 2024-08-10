'use client';
import React, { useEffect } from 'react';
import { TfiHeadphoneAlt } from 'react-icons/tfi';
import { FiPhone } from 'react-icons/fi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import FourStar from '@/components/svgs/FourStar';

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 992) {
        const element = document.getElementById('product-search-bar');

        if (window.scrollY > 100) {
          element.classList.add('opacity-0');
          element.classList.add('pointer-events-none');
        } else {
          element.classList.remove('opacity-0');
          element.classList.remove('pointer-events-none');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const frstImg = product.media ? product.media.find((item) => item.file === 'image') : null;

  return (
    <>
      <div className={`fixed top-0 z-[100] ${state ? 'hidden lg:flex' : 'hidden'} w-full flex-col bg-white shadow-lg`}>
        <div className="maxlg:hidden">
          <div className="maincontainer items-center justify-center py-6 lg:flex">
            <div className="max-w-6/12 flex w-6/12 items-center space-x-5">
              <div className="w-full max-w-28 rounded-lg border-[1px] border-gray-200 px-2 py-1">
                <Image width={400} height={400} quality={100} src={product ? product.images[0].url : ''} className="h-auto w-28" alt={product.title} />
              </div>
              <div>
                <div className="mb-2.5 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full bg-dark-blue px-3 py-1 text-xs font-semibold text-white">
                  <FourStar />
                  New
                </div>
                <h2 className="line-clamp-2 text-2xl font-bold leading-8">{product.title}</h2>
              </div>
            </div>

            <div className="flex w-6/12 items-center justify-end space-x-5">
              <div className="flex flex-col">
                <h4 className="text-xl font-bold text-b3 lg:text-2xl">${product.sale_price ? product.sale_price : product.regular_price}</h4>
                {product.sale_price ? (
                  <div className="flex items-center space-x-5">
                    <strike>${product.regular_price}</strike>
                    <span className="flex rounded-2xl bg-b4 px-3 py-2 text-[10px] font-semibold text-black lg:text-xs">Save ${product.regular_price - product.sale_price}</span>
                  </div>
                ) : null}
              </div>
              <div onClick={addCart} className="button-hover flex cursor-pointer items-center justify-center rounded-lg px-2 py-3 text-sm text-white  lg:px-10">
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
          <div className="bottom-0 left-0 top-12 col-span-9 flex gap-1 bg-white p-4 md:px-10 lg:items-center lg:gap-5 lg:py-0 lg:pl-0 lg:pr-5 xl:pr-10 2xl:gap-5 maxlg:fixed maxlg:hidden maxlg:w-[230px] maxlg:flex-col maxlg:gap-5">
            {NavItems.map((item, index) => (
              <button key={index} className="h-8 text-xs font-normal hover:border-b-[1.5px] hover:border-b3 2xl:h-5 lg-to-xl:text-[11px]" onClick={() => scrollToSection(item.id)}>
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
  { title: 'Appliance Information', id: 'product-information' },
  { title: '360° View', id: '360-view' },
  { title: 'More Part for your Model', id: 'testimonials-view' },
  { title: 'Listing Condition', id: 'product-features' },
  { title: 'Compare Buying Options', id: 'inspections' },
  { title: 'Warranty and Financing Options', id: 'compare' },
];
