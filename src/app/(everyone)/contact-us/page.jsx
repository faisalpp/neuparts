import React from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import { RiArrowDropRightLine } from 'react-icons/ri';
import Location from '@/components/svgs/Location';
import Clock from '@/components/svgs/Clock';
import Contact from '@/components/svgs/Contact';
import BackHome from '@/components/BackHome';
import Image from 'next/image';

const Page = () => {
  const Contactinformations = [
    { icon: Location, title: 'Address', description: '123 N Loop Blvd E, Austin, TX 78751' },
    { icon: Clock, title: 'Office hours', description: 'Monday - Friday <br/> 8:00am to 5:00pm' },
    { icon: Contact, title: 'Contact Info', description: 'youremail@gmail.com <br/> + 234 888 8888 88' },
  ];

  return (
    <>
      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        <BackHome className="mb-10 md:hidden" />

        <div className="hidden items-center md:flex">
          <h5 className="text-xs text-b3">Home</h5>
          <RiArrowDropRightLine className="text-xl text-b19" />
          <h5 className="text-xs text-black">Contact Us</h5>
        </div>
        {/* Bread Crumbs End */}
        <ApplianceDetail title="Contact Us" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt fringilla.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vestibulum metus vel urna tempor auctor. Pellentesque varius lacus at nisl tincidunt " />
      </div>

      <div className="maincontainer">
        <Image src="/contactus/map.png" alt="map" className="h-[250px] w-full rounded-3xl object-cover shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] md:h-[686px]" width={1000} height={1000} quality={100} />
      </div>

      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        <h2 className="text-center text-xl font-bold lg:text-2xl xl:text-32px">Get in touch with our team and let’s talk</h2>

        <div className="mt-20 grid gap-10 lg:grid-cols-2 xl:gap-20">
          <div className="rounded-2xl bg-b3/10 p-10">
            <h3 className="mb-8 text-xl font-semibold text-b3">Leave a Message</h3>
            <div className="mb-5">
              <label htmlFor="name" className="mb-2 block text-xs font-bold text-b18/50">
                Name
              </label>
              <input type="text" name="name" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="Full name" />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block text-xs font-bold text-b18/50">
                Email Address
              </label>
              <input type="email" name="email" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="yourusername@email.com" />
            </div>
            <div className="mb-12">
              <label htmlFor="message" className="mb-2 block text-xs font-bold text-b18/50">
                Your Message
              </label>
              <textarea name="message" rows="8" className="w-full rounded-lg bg-white px-4 py-3 text-xs text-black outline-none" placeholder="Write something..."></textarea>
            </div>
            <button className="w-full rounded-lg bg-b3 px-4 py-3 text-xs font-medium text-white">Send Message</button>
          </div>
          <div>
            <div className="grid gap-x-3 gap-y-10 xl:grid-cols-2 xl:gap-y-20">
              {Contactinformations.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="xy-center h-14 min-w-[56px] rounded-full bg-b3/10 md:h-16 md:min-w-[64px]">
                    <item.icon />
                  </div>
                  <div>
                    <h3 className="mb-3 text-xl font-bold text-b18 md:mb-4 md:text-2xl">{item.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: item.description }} className="leading-6 text-black"></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
