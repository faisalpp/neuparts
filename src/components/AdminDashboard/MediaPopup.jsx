'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { MdDelete, MdContentCopy } from 'react-icons/md';
import { RiFolderVideoFill } from 'react-icons/ri';
import { limitString, copyLinkToClipboard } from '@/utils/index';
import Popup from '@/components/AdminDashboard/Popup';
import * as Yup from 'yup';
import { AiOutlineClose } from 'react-icons/ai';

const MediaPopup = ({ state, setState, files,setFiles, isMultiple }) => {
  const [media, setMedia] = useState([]);
  const [mediaPopup, setMediaPopup] = useState(false);
  const [tmpFiles, setTmpFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delId, setDelId] = useState(null);
  const fileInputRef = useRef(null);

  const HandleMediaDone = () => {
    setFiles([...files,tmpFiles]);
    setMediaPopup(false);
    setState(false);
  };

  useEffect(() => {
    if (!state) {
      setTmpFiles([]);
      setMedia([]);
    }
  }, [state]);

  const HandleMediaSelect = (id) => {
    let updatedMedia;

    if (!isMultiple) {
      // Deselect all other media objects
      updatedMedia = media.map((el) => ({
        ...el,
        selected: el._id === id,
      }));

      // Clear tmpFiles and add only the selected one
      const findEl = updatedMedia.find((el) => el._id === id);

      setMedia(updatedMedia);
      setTmpFiles([findEl]);
    } else {
      // Keep the current logic for multiple selection
      updatedMedia = media.map((el) => (el._id === id ? { ...el, selected: true } : el));

      // Find the updated element
      const findEl = updatedMedia.find((el) => el._id === id);

      // Update the state with the modified media array
      setMedia(updatedMedia);
      setTmpFiles((prev) => [...prev, findEl]);
    }
  };

  const HandleMediaDeselect = (id) => {
    // Create a new array with the updated `selected` property
    const updatedMedia = media.map((el) => (el._id === id ? { ...el, selected: false } : el));

    // Find the updated element
    updatedMedia.find((el) => el._id === id);

    // Update the state with the modified `media` array
    setMedia(updatedMedia);

    // Remove the element from `files` state
    setTmpFiles((prev) => prev.filter((file) => file._id !== id));
  };

  const GetMedia = async () => {
    setLoading(true);
    const res = await fetch('/api/media', { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      setMedia(data.media);
    } else {
      toast.error('Something Went Wrong!');
    }
    setLoading(false);
  };

  useEffect(() => {
    GetMedia();
  }, [state]);

  const DeleteMedia = async (id) => {
    setDelId(id);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    };
    try {
      const res = await fetch('/api/aws', requestOptions);
      const data = await res.json();
      if (!res.ok) {
        toast.error('Something went wrong!');
        setDelId(null);
        return;
      }
      if (!data.success) {
        console.log(data);
        toast.error('Something went wrong!');
        setDelId(null);
        return;
      }
      toast.success('Media Deleted Successfully!');
      GetMedia();
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Something went wrong!');
      setDelId(null);
    }
  };

  const UploadSelectedMedia = async (e) => {
    const updToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 2000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Uploading Media...', // Show pending message
        success: 'Media upload successfully!', // Show success message
        error: 'Media upload failed', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    const file = e.target.files[0];
    if (!file) {
      toast.error('No Media Selected!');
      return;
    }
    toast.update(updToastId, { type: toast.TYPE?.PENDING, autoClose: 2000, isLoading: true });
    const formData = new FormData();
    formData.append('file', file);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    try {
      const res = await fetch('/api/aws', requestOptions);
      const data = await res.json();
      if (!res.ok) {
        toast.error('Something went wrong!');
        toast.update(updToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
        fileInputRef.current.value = '';
        return;
      }
      if (!data.success) {
        console.log(data);
        toast.error('Something went wrong!');
        toast.update(updToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
        fileInputRef.current.value = '';
        return;
      }
      toast.update(updToastId, { type: toast.TYPE?.SUCCESS, autoClose: 2000, isLoading: false });
      fileInputRef.current.value = '';
      GetMedia();
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Something went wrong!');
      toast.update(updToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
      fileInputRef.current.value = '';
    }
  };

  const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
  const [mediaData, setMediaData] = useState({ id: '', name: '', alt: '', type: '', url: '', atch: [] });
  const urlRef = useRef(null);

  const HandleMediaPopup = (med) => {
    setMediaData({ id: med._id, name: med.name, alt: med.alt, type: med.type, url: med.url, atch: med.attachments });
    setMediaPopup(true);
  };

  const UpdateMedia = async (e) => {
    e.preventDefault();

    const MediaVal = Yup.object({
      id: Yup.string().required('Id is required!'),
      name: Yup.string().required('Name is required!'),
      alt: Yup.string().required('Alt is required!'),
    });

    const { id, name, alt } = mediaData;

    try {
      await MediaVal.validate({ id, name, alt }, { abortEarly: false });
    } catch (error) {
      console.log(error);
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const delToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 2000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Updating Media...', // Show pending message
        success: 'Media update successfully!', // Show success message
        error: 'Media update failed', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(delToastId, { type: toast.TYPE?.PENDING, autoClose: 2000, isLoading: true });

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, name: name, alt: alt }),
    };
    try {
      const res = await fetch('/api/media', requestOptions);
      const data = await res.json();
      if (!res.ok) {
        toast.update(delToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
        return;
      }
      if (!data.success) {
        toast.update(delToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
        return;
      }
      toast.update(delToastId, { type: toast.TYPE?.SUCCESS, autoClose: 2000, isLoading: false });
      GetMedia();
      setMediaData({ id: '', name: '', alt: '', type: '', url: '', atch: [] });
      setMediaPopup(false);
    } catch (error) {
      toast.update(delToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
    }
  };

  const [urlEmbed, setUrlEmbed] = useState('');

  const SaveUrl = async () => {
    if (urlEmbed === '') {
      toast.error('Invalid youtube url!');
    }

    const embedToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 2000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Saving youtube url...', // Show pending message
        success: 'Youtube url saved!', // Show success message
        error: 'Saving url failed!', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(embedToastId, { type: toast.TYPE?.PENDING, autoClose: 2000, isLoading: true });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: urlEmbed }),
    };
    try {
      const res = await fetch('/api/media/links', requestOptions);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        toast.update(embedToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
        return;
      }
      if (!data.success) {
        toast.update(embedToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
        return;
      }
      toast.update(embedToastId, { type: toast.TYPE?.SUCCESS, autoClose: 2000, isLoading: false });
      GetMedia();
      setUrlEmbed('');
    } catch (error) {
      console.log(error);
      toast.update(embedToastId, { type: toast.TYPE?.ERROR, autoClose: 2000, isLoading: false });
    }
  };

  return (
    <div className={`fixed ${state ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} top-0 z-20 flex h-screen w-full items-center bg-black bg-opacity-50 transition-opacity duration-300`}>
      <Popup state={mediaPopup} setState={setMediaPopup} width="w-8/12" style="right-0">
        <div className="flex w-full items-center px-5 py-5">
          <div className="w-6/12">
            {imageFormats.includes(mediaData.type) ? <Image width={200} height={200} alt={mediaData.alt} className="h-56 w-72 rounded-md" src={mediaData.url} /> : null}
            {videoFormats.includes(mediaData.type) ? <video controls className="h-60 w-72 rounded-md" src={mediaData.url} /> : null}
            {mediaData.type === 'embed' ? <iframe className="h-60 w-72 rounded-md" src={mediaData.url}></iframe> : null}
          </div>
          <div className="flex w-6/12 flex-col">
            <span className="text-center font-bold">Media Settings</span>
            <form onSubmit={UpdateMedia} className="mt-5 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="text-sm">Name:</span>
                <input type="text" className="w-full rounded-sm border px-1 py-1 text-sm" value={mediaData.name} onChange={(e) => setMediaData({ ...mediaData, name: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Alt&nbsp;Tag:</span>
                <input type="text" className="w-full rounded-sm border px-1 py-1 text-sm" value={mediaData.alt} onChange={(e) => setMediaData({ ...mediaData, alt: e.target.value })} />
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Type:</span>
                  <input type="text" readOnly className="cursor-not-allowed rounded-sm border px-1 py-1 text-sm outline-none" value={mediaData.type} onChange={(e) => setMediaData({ ...mediaData, type: e.target.value })} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Status:</span>
                  {mediaData.atch.length > 0 ? <span className="rounded-xl bg-b10 px-2 py-1 text-xs text-white">Attached</span> : <span className="rounded-xl bg-b7 px-2 py-1 text-xs text-white">Detached</span>}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Link:</span>
                <a ref={urlRef} href={mediaData.url} target="__blank" className="flex flex-wrap text-xs text-blue-500 underline">
                  {limitString(mediaData.url, 35)}
                </a>
                <MdContentCopy onClick={() => copyLinkToClipboard(urlRef, mediaData.url)} className="cursor-pointer shadow-sm" />
              </div>
              <button className="cursor-pointer rounded bg-b9 px-3 py-1 text-white">Update</button>
            </form>
          </div>
        </div>
      </Popup>

      <div className="relative mx-10 mt-5 flex w-8/12 flex-col rounded-md border border-gray-300 bg-white shadow-xl" style={{ minHeight: 'calc(100vh - 120px)', maxHeight: 'calc(100vh - 120px)' }}>
        <span onClick={() => setState(false)} className="absolute -right-10 top-0 cursor-pointer rounded-full bg-white px-1 py-1">
          <AiOutlineClose className="text-sm text-black" />
        </span>

        <div className="flex gap-10 border-b border-gray-200 px-5 py-3 text-black">
          <span onClick={() => fileInputRef.current.click()} className="cursor-pointer rounded bg-b9 px-3 py-1 text-white">
            Upload
          </span>
          <input ref={fileInputRef} onChange={(e) => UploadSelectedMedia(e)} type="file" accept="image/*,video/*" className="hidden" />
          <div className="flex items-center gap-2">
            <span className="text-sm">Youtube:</span>
            <div className="rounded border border-gray-400 pl-2">
              <input value={urlEmbed} onChange={(e) => setUrlEmbed(e.target.value)} type="text" className="text-sm outline-none" placeholder="Any youtube url" />
              <span onClick={() => SaveUrl()} className="cursor-pointer rounded-r bg-b3 px-2 py-1 text-[14px] text-white">
                Insert
              </span>
            </div>
          </div>
        </div>
        {/* media files */}
        {loading ? (
          <div className="flex w-full items-center justify-center " style={{ minHeight: 'calc(100vh - 110px)', maxHeight: 'calc(100vh - 110px)' }}>
            <Image width={70} height={70} src="/loader2.gif" />
          </div>
        ) : media.length > 0 ? (
          <div className="mx-5 flex flex-wrap gap-3 overflow-y-scroll pt-2" style={{ minHeight: 'calc(100vh - 225px)', maxHeight: 'calc(100vh - 225px)' }}>
            {media.map((med, i) =>
              imageFormats.includes(med.type) ? (
                <div key={i} className="group relative h-28 w-32 cursor-pointer shadow-md transition-shadow duration-300 hover:shadow-lg">
                  <span onClick={() => DeleteMedia(med._id)} className="absolute right-2 top-2 cursor-pointer rounded bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <MdDelete className="text-red-500" />
                  </span>
                  {med?.selected ? (
                    <span onClick={() => HandleMediaDeselect(med._id)} className="absolute bottom-2 right-2 cursor-pointer rounded bg-green-300 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      UnSelect
                    </span>
                  ) : (
                    <span onClick={() => HandleMediaSelect(med._id)} className="absolute bottom-2 right-2 cursor-pointer rounded bg-orange-300 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Select
                    </span>
                  )}
                  {delId === med._id ? <Image height={100} width={200} className="absolute h-full w-full rounded-md opacity-80" src="/del-loader.gif" /> : null}
                  <Image onClick={() => HandleMediaPopup(med)} height={100} width={100} alt={med.alt} className="h-full w-full rounded-md" src={med.url} />
                </div>
              ) : videoFormats.includes(med.type) ? (
                <div key={i} className="group relative flex h-28 w-32 cursor-pointer flex-col items-center justify-center border border-gray-300 shadow-md transition-shadow duration-300 hover:shadow-lg">
                  <span onClick={() => DeleteMedia(med._id)} className="absolute right-2 top-2 cursor-pointer rounded bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <MdDelete className="text-red-500" />
                  </span>
                  {med?.selected ? (
                    <span onClick={() => HandleMediaDeselect(med._id)} className="absolute bottom-2 right-2 cursor-pointer rounded bg-green-300 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      UnSelect
                    </span>
                  ) : (
                    <span onClick={() => HandleMediaSelect(med._id)} className="absolute bottom-2 right-2 cursor-pointer rounded bg-orange-300 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Select
                    </span>
                  )}
                  {delId === med._id ? <Image height={100} width={200} className="absolute h-full w-full rounded-md opacity-80" src="/del-loader.gif" /> : null}
                  <div className="flex flex-col items-center" onClick={() => HandleMediaPopup(med)}>
                    <RiFolderVideoFill className="text-5xl" />
                    <span>{limitString(med.name, 6) + med.type}</span>
                  </div>
                </div>
              ) : med.type === 'embed' ? (
                <div key={i} className="group relative flex h-28 w-32 cursor-pointer flex-col items-center justify-center border border-gray-300 shadow-md transition-shadow duration-300 hover:shadow-lg">
                  <span onClick={() => DeleteMedia(med._id)} className="absolute right-2 top-2 cursor-pointer rounded bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <MdDelete className="text-red-500" />
                  </span>
                  {med?.selected ? (
                    <span onClick={() => HandleMediaDeselect(med._id)} className="absolute bottom-2 right-2 cursor-pointer rounded bg-green-300 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      UnSelect
                    </span>
                  ) : (
                    <span onClick={() => HandleMediaSelect(med._id)} className="absolute bottom-2 right-2 cursor-pointer rounded bg-orange-300 px-2 py-1 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Select
                    </span>
                  )}
                  {delId === med._id ? <Image height={100} width={200} className="absolute h-full w-full rounded-md opacity-80" src="/del-loader.gif" /> : null}
                  <div className="flex flex-col items-center" onClick={() => HandleMediaPopup(med)}>
                    <RiFolderVideoFill className="text-5xl" />
                    <span>{limitString(med.name, 6) + med.type}</span>
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div className="flex h-72 w-full items-center justify-center ">
            <h2>No Media Files Found!</h2>
          </div>
        )}
        <div onClick={HandleMediaDone} className="flex h-16 items-center justify-end rounded bg-gray-300">
          <button className="mr-5 rounded bg-b4 px-5 py-1 text-white">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default MediaPopup;
