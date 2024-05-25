'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { BiCamera } from 'react-icons/bi';

const Form = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    } else {
      // setFile(null);
    }
  };
  return (
    <div className="rounded-2xl bg-b3/10 p-10">
      <h3 className="mb-8 text-xl font-semibold text-b18">Order Details</h3>
      <div className="mb-5">
        <label htmlFor="order_id" className="mb-2 block text-xs font-bold text-b18/50">
          Order ID
        </label>
        <input type="text" name="order_id" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="Full name" />
      </div>
      <div className="mb-5">
        <label htmlFor="name" className="mb-2 block text-xs font-bold text-b18/50">
          Name
        </label>
        <input type="text" name="name" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="Full name" />
      </div>
      <div className="mb-5">
        <label htmlFor="email_adress" className="mb-2 block text-xs font-bold text-b18/50">
          Email Address
        </label>
        <input type="email" name="email_adress" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="yourusername@email.com" />
      </div>
      <div className="mb-5">
        <label htmlFor="phone_no" className="mb-2 block text-xs font-bold text-b18/50">
          Phone Number
        </label>
        <input type="text" name="phone_no" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="yourusername@email.com" />
      </div>
      <div className="mb-5">
        <label htmlFor="reason_return" className="mb-2 block text-xs font-bold text-b18/50">
          Reason for Return
        </label>
        <input type="text" name="reason_return" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="yourusername@email.com" />
      </div>
      <div className="mb-5">
        <label htmlFor="refundmethod" className="mb-2 block text-xs font-bold text-b18/50">
          Select a Return Method
        </label>
        <select name="refundmethod" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" id="refundmethod">
          <option value="">Select</option>
          <option value="Lorem ipsum dolor sit amet consectetur.">Lorem ipsum dolor sit amet consectetur.</option>
          <option value="Lorem ipsum dolor sit amet consectetur.">Lorem ipsum dolor sit amet consectetur.</option>
          <option value="Lorem ipsum dolor sit amet consectetur.">Lorem ipsum dolor sit amet consectetur.</option>
          <option value="Lorem ipsum dolor sit amet consectetur.">Lorem ipsum dolor sit amet consectetur.</option>
          <option value="Lorem ipsum dolor sit amet consectetur.">Lorem ipsum dolor sit amet consectetur.</option>
          <option value="Lorem ipsum dolor sit amet consectetur.">Lorem ipsum dolor sit amet consectetur.</option>
        </select>
      </div>
      <div className="mb-10">
        <div className="mb-2 block text-xs font-bold text-b18/50">Upload a Photo or Video (optional)</div>
        {file ? (
          <div className="w-full">
            <div className="h-[208px] w-full">
              {file.type.startsWith('image/') ? (
                <Image width={400} height={400} quality={100} src={URL.createObjectURL(file)} alt="Preview" className="h-full w-full rounded-lg object-cover" />
              ) : (
                <video className="h-full w-full" key={file.name} loop muted>
                  <source src={URL.createObjectURL(file)} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <label htmlFor="fileInput" className="mt-5 block w-full rounded-lg bg-b3 px-3 py-2 text-center text-white">
              Change
            </label>
          </div>
        ) : (
          <label htmlFor="fileInput" className="image_video_section xy-center h-[208px] w-full cursor-pointer flex-col gap-3 rounded-lg bg-white">
            <div className="xy-center h-16 w-16 rounded-full bg-b3/10">
              <BiCamera className="h-8 w-8 text-b3 " />
            </div>
            <span className="text-xs text-b18">Select a picture or video to upload</span>
          </label>
        )}
        <input id="fileInput" hidden type="file" accept="image/*, video/*" onChange={handleFileChange} className="mb-2" />
      </div>
      <button className="w-full rounded-lg bg-b3 px-4 py-3 text-xs font-medium text-white">Submit</button>
    </div>
  );
};

export default Form;
