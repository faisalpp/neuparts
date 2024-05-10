'use client';
import React, { useRef, useState } from 'react';
import { BiCamera } from 'react-icons/bi';
import * as Yup from 'yup';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import BtnLoader from '@/components/Loader/BtnLoader';
import { IoIosCloseCircle } from 'react-icons/io';
import Image from 'next/image';

const Form = () => {
  const refundValidationSchema = Yup.object().shape({
    orderNo: Yup.string().required('Order No Email is Required!'),
    name: Yup.string().required('Name is Required!'),
    email: Yup.string().required('Email is Required!'),
    phone: Yup.string().required('Phone No is Required!'),
    amount: Yup.string().required('Refund Amount is Required!'),
    medias: Yup.array().nullable(),
  });

  const mediaRef = useRef(null);
  const [orderNo, setOrderNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [medias, setMedias] = useState([]);

  const [mediaLoader, setMediaLoader] = useState(false);
  const [delLoader, setDelLoader] = useState('');
  const [loader,setLoader] = useState(false)

  const DeleteMedia = async (e, id, url) => {
    e.preventDefault();
    console.log(url);
    let delUrl = url;
    setDelLoader(id);
    const res = await deleteUserMedia({ url: delUrl });
    console.log(res);
    if (res.status === 200) {
      const filt = medias.filter((item) => item.data !== delUrl);
      setMedias(filt);
      setDelLoader('');
      Toast('Media Removed!', 'success', 1000);
    } else {
      setDelLoader('');
      Toast(res.data.message, 'error', 1000);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    let type;
    if (selectedFile.type.includes('image')) {
      type = 'images';
    } else if (selectedFile.type.includes('video')) {
      type = 'videos';
    } else {
      Toast('Invalid Media Format (Image Or Video)', 'error', 1000);
    }

    if (type?.length > 0) {
      setMediaLoader(true);
      const formData = new FormData();
      formData.append('media', selectedFile);
      formData.append('location', `refunds/${type}/`);
      const res = await uploadUserMedia(formData);
      if (res.status === 200) {
        setMediaLoader(false);
        setMedias([...medias, { type: type, data: res.data.url }]);
        mediaRef.current.value = '';
      } else {
        mediaRef.current.value = '';
        Toast(res.data.message, 'error', 1000);
        setMediaLoader(false);
      }
    }
  };

  const HandleRefund = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="rounded-2xl bg-b8 p-10">
      <h3 className="mb-8 text-xl font-semibold text-b18">Order Details</h3>
      <div className="mb-5">
        <label htmlFor="order_id" className="mb-2 block text-xs font-bold text-b18/50">
          Order ID
        </label>
        <input type="text" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} name="order_id" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="fq34-D10M02Y2023" />
      </div>
      <div className="mb-5">
        <label htmlFor="name" className="mb-2 block text-xs font-bold text-b18/50">
          Name
        </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="Full name" />
      </div>
      <div className="mb-5">
        <label htmlFor="email_adress" className="mb-2 block text-xs font-bold text-b18/50">
          Email Address
        </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email_adress" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="yourusername@email.com" />
      </div>
      <div className="mb-5">
        <label htmlFor="phone_no" className="mb-2 block text-xs font-bold text-b18/50">
          Phone Number
        </label>
        <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone_no" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="yourusername@email.com" />
      </div>
      <div className="mb-5">
        <label htmlFor="refund_amount" className="mb-2 block text-xs font-bold text-b18/50">
          Enter Refund Amount
        </label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} name="refund_amount" className="h-10 w-full rounded-lg bg-white px-4 text-xs text-black outline-none" placeholder="$35" />
      </div>
      <div className="mb-5">
        <div className="mb-2 block text-xs font-bold text-b18/50">Upload a Photo or Video (optional)</div>
        <div className="relative flex h-80 w-full rounded-xl bg-white">
          {medias.length > 0 || mediaLoader ? (
            <div className="mr-1 flex h-80 w-full flex-wrap gap-x-10 gap-y-5 overflow-x-hidden overflow-y-scroll px-5 py-5">
              {medias.map((media, index) => (
                <div className="relative" key={index}>
                  <span onClick={(e) => DeleteMedia(e, media._id, media.data)} className="absolute -top-1 right-0 cursor-pointer">
                    <IoIosCloseCircle className="text-red-500" />
                  </span>
                  {delLoader === media.data ? (
                    <div className="absolute flex h-24 w-24 items-center justify-center py-2">
                      <Image width={499} height={400} quality={100} alt="del loader" src="/del-loader.gif" className="h-24 w-32 rounded-md" />
                    </div>
                  ) : null}
                  {media.type === 'images' ? (
                    <div className="h-fit w-fit rounded-xl border-[1px] border-b31 px-2 py-2">
                      <Image width={499} height={400} quality={100} alt="Media" src={media.data} className="h-20 w-20" />
                    </div>
                  ) : (
                    <video src={media.data} className="h-[90px] w-40 rounded-xl" controls></video>
                  )}
                </div>
              ))}
              {/* Media Loader */}

              {mediaLoader ? (
                <div className="flex h-24 w-24 items-center justify-center rounded-md border-[1px] border-blue-500 px-2 py-2">
                  <Image width={499} height={400} quality={100} alt="file loader" src="/file-loader.gif" className="h-12 w-12" />
                </div>
              ) : null}
              <div onClick={() => mediaRef.current.click()} className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border-[1px] border-b6 px-2 py-2">
                <AiOutlinePlusSquare className="text-5xl text-b6" />
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <label htmlFor="fileInput" className="image_video_section xy-center h-[208px] w-full flex-col gap-3 rounded-lg bg-white">
                <span onClick={() => mediaRef.current.click()} className="xy-center h-16 w-16 cursor-pointer rounded-full bg-b3/10 shadow-md">
                  <BiCamera className="h-8 w-8 text-b3 " />
                </span>
                <span className="text-xs text-b18">Select a picture or video to upload</span>
              </label>
            </div>
          )}
        </div>
        <input ref={mediaRef} hidden type="file" accept="image/*, video/*" onChange={handleFileChange} className="mb-2" />
      </div>
      <button type="button" onClick={(e) => HandleRefund(e)} className="w-full rounded-lg bg-b3 px-4 py-3 text-xs font-medium text-white">
        {loader ? <BtnLoader style="w-5 h-auto" /> : 'Submit'}
      </button>
    </div>
  );
};

export default Form;
