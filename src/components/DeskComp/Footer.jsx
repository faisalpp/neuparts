'use client';
import React, { useState } from 'react';
import { IoLocationOutline, IoSendSharp } from 'react-icons/io5';
import { FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const SubscribeNews = async (e) => {
    e.preventDefault();
    if(email != '' ){
      setLoading(true)
      const crtToastId = toast.loading('Subscribing to newsletter...');
      fetch('/api/front/news-letter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({email:email}) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { type: 'success',render:'Newsletter subscribed successfully!', autoClose: 1000, isLoading: false });
        } else {
          toast.update(crtToastId, { type:'info',render:resp.message, autoClose: 1000, isLoading: false });
        }
        setLoading(false)
        setEmail('')
      })
      .catch((error) => {
        toast.update(crtToastId, { type: 'error',render:'Something went wrong!', autoClose: 1000, isLoading: false });
        setLoading(false)
        setEmail('')
      });
    }else{
     toast.error('Invalid email address!')
    }
  };

  return (
    <div className="mx-auto flex w-full justify-center bg-b1 px-4 sm:px-10 lg:px-16 xl:px-20 2xl:px-120px 3xl:max-w-1680px">
      <div className="grid gap-5 bg-b1 py-12 sm:grid-cols-12 sm:gap-10 md:py-20 lg:gap-2">
        {/* Logo Section Start */}
        <div className="order-4 flex flex-col space-y-10 sm:order-none sm:col-span-6 lg:col-span-3">
          {/* Nav Logos */}
          <div className="flex flex-col gap-y-10  text-white">
            <h4 className="w-max font-reg text-lg font-bold text-white">Our Companies</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <Image className="h-12 w-32" src="/neu2.webp" alt="logo2" width={1000} height={1000} quality={100} />
              </Link>
              <p className="text-xs font-normal text-white/60">Shop Discount Appliance Repair Parts</p>
            </div>
          </div>

          {/* Nav Logo 2 */}
          <div className="flex flex-col gap-y-2 text-white">
            <a href="https://neuapplianceparts.com/" target="_new">
              <Image className="h-12 w-32" src="/neu-black.webp" alt="logo2" width={1000} height={1000} quality={100} />
            </a>
            <p className="text-xs font-normal text-white/60">Shop Austin&apos;s #1 Local Discount Appliance Outlet</p>
          </div>

          {/* Nav Logo 3 */}
          <div className="flex flex-col gap-y-3 text-white">
            <a href="https://neuappliancewholesale.com/" target="_new">
              <Image className="h-12 w-32" src="/neu3.webp" alt="logo3" width={1000} height={1000} quality={100} />
            </a>
            <p className="text-xs font-normal text-white/60">Wholesale Supply Distributor of Bulk Scratch and Dent Appliances to Appliance Vendor&apos;s across the Country</p>
          </div>
        </div>
        {/* Logo Section End */}

        {/* Quick Links Section Start */}
        <div className="order-2 sm:order-none sm:col-span-6 lg:col-span-3">
          <h4 className="w-max font-reg text-lg font-bold text-white">Quick Links</h4>
          <div className="mt-5 flex flex-col gap-y-5 text-base font-normal text-white/60 sm:mt-10 hover:[&>a]:cursor-pointer hover:[&>a]:underline [&>a]:maxsm:text-sm">
            <Link href="">Shop Now</Link>
            <Link href="">Shop On Sale</Link>
            <Link href="">Live Inventory</Link>
            <Link href="">Virtual Showroom</Link>
            <Link href="/financing">Financing</Link>
            <Link href="">Discount Appliances in Stock</Link>
            <Link href="">Austin Appliance Liquidation</Link>
            <Link href="">Used Appliances</Link>
            <Link href="/appliance-repair">Appliance Repair</Link>
            <Link href="/helpful-appliances-tips">Helpful Appliance Tips</Link>
          </div>
        </div>
        {/* Quick Links Section End */}

        {/* Quick Links Section 2 Start */}
        <div className="order-3 flex flex-col gap-y-5 text-base font-normal text-white/60 sm:order-none sm:col-span-6 sm:pt-[65px] lg:col-span-3 lg:mt-0 hover:[&>a]:cursor-pointer hover:[&>a]:underline [&>a]:maxsm:text-sm">
          <Link href="">Our Brands</Link>
          <Link href="">Delivery</Link>
          <Link href="/measuring-guide">Appliance Measuring Guide</Link>
          <Link href="">Do I have Electric or Gas?</Link>
          <Link href="">Our Products</Link>
          <Link href="/faqs">FAQ</Link>
          <Link href="">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="">Refunds</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
        {/* Quick Links Section 2 End */}

        {/* Quick Links Section 2 Start */}
        <div className="order-1 flex h-full flex-col text-sm text-white sm:order-none sm:col-span-6 lg:col-span-3">
          {/* Email Address */}
          <div>
            <h4 className="text-lg font-bold">Get Latest Discount Offers</h4>
            <form onSubmit={SubscribeNews} className="col-start-4 col-end-8 mt-3 flex h-10 w-full items-center space-x-2 rounded-lg bg-b2 px-3 ">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full bg-b2 text-xs text-white/90 outline-none" />
              <button type="submit">
                <IoSendSharp className="text-white" />
              </button>
            </form>
          </div>
          {/* Follow Us */}
          <div className="mt-5 flex flex-col gap-y-3 py-4 sm:items-center lg:items-start">
            <h4 className="text-lg font-bold">Follow Us</h4>
            <div className="flex space-x-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-b2">
                <FaFacebookF />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-b2">
                <FaInstagram />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-b2">
                <FaTwitter />
              </span>
            </div>
          </div>
          {/* Contact Us */}
          <div className="mt-5 flex flex-col gap-y-3 sm:mt-10 sm:items-center lg:mt-5 lg:items-start">
            <h4 className="text-lg font-bold">Contact Us</h4>
            <div className="flex flex-col gap-y-5">
              <div className="flex items-center space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-b2">
                  <FiPhone />
                </span>
                <span className="text-sm">(512) 992-2714</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-b2">
                  <IoLocationOutline />
                </span>
                <span className="text-sm">123 N Loop Blvd E, Austin, TX 78751</span>
              </div>
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe title="map" className="w-full rounded-xl maxmd:h-[150px]" width="300" height="150" id="gmap_canvas" src="https://maps.google.com/maps?q=Austin&t=&z=10&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Links Section 2 End */}
      </div>
    </div>
  );
};

export default Footer;
