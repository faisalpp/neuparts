'use client'
import React, { useState } from 'react';
import ApplianceDetail from '@/components/Appliances/ApplianceDetail';
import { RiArrowDropRightLine } from 'react-icons/ri';
import Location from '@/components/svgs/Location';
import Clock from '@/components/svgs/Clock';
import Contact from '@/components/svgs/Contact';
import BackHome from '@/components/BackHome';
import { toast } from 'react-toastify';
import { RiLoader4Line } from "react-icons/ri";

const Page = () => {
  const Contactinformations = [
    { icon: Location, title: 'Address', description: '123 N Loop Blvd E, Austin, TX 78751' },
    { icon: Clock, title: 'Office hours', description: 'Monday - Friday <br/> 8:00am to 5:00pm' },
    { icon: Contact, title: 'Contact Info', description: 'youremail@gmail.com <br/> + 234 888 8888 88' },
  ];

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const [loading,setLoading] = useState(false)

  const SendMessage = (e) => {
    e.preventDefault()
    setLoading(true)
    fetch(`/api/front/contact-us?name=${name}&email=${email}&message=${message}`)
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success){
       toast.success('Your message sent successfully!')
       setName('')
       setEmail('')
       setMessage('')
      }else{
        toast.error('Something went wrong!')
      }
      setLoading(false)
    }).catch((error)=>{
      setLoading(false)
      toast.error('Something went wrong!')
    })
  }

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
      <div class="mapouter">
    <div class="gmap_canvas">
      <iframe
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=Neu+Appliance+-+Outlet&t=&z=13&ie=UTF8&iwloc=&output=embed"
        class="w-full h-[250px] rounded-3xl md:h-[686px]"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
      ></iframe>
    </div>
  </div>
      </div>

      <div className="maincontainer py-10 lg:py-16 xl:py-20">
        <h2 className="text-center text-xl font-bold lg:text-2xl xl:text-32px">Get in touch with our team and let’s talk</h2>

        <div className="mt-20 grid gap-10 lg:grid-cols-2 xl:gap-20">
          <form onSubmit={SendMessage} className="rounded-2xl bg-b3/10 p-10">
            <h3 className="mb-8 text-xl font-semibold text-b3">Leave a Message</h3>
            <div className="mb-5">
              <label htmlFor="name" className="mb-2 block text-xs font-bold text-b18/50">
                Name
              </label>
              <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="Full name" required/>
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block text-xs font-bold text-b18/50">
                Email Address
              </label>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" name="email" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="yourusername@email.com" required/>
            </div>
            <div className="mb-12">
              <label htmlFor="message" className="mb-2 block text-xs font-bold text-b18/50">
                Your Message
              </label>
              <textarea onChange={(e)=>setMessage(e.target.value)} value={message} name="message" rows="8" className="w-full rounded-lg bg-white px-4 py-3 text-xs text-black outline-none" placeholder="Write something..." required></textarea>
            </div>
            <button className="flex justify-center w-full rounded-lg bg-b3 px-4 py-3 text-xs font-medium text-white">{loading ? <RiLoader4Line className='animate-spin text-xl' /> : 'Send Message'}</button>
          </form>
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
