'use client';
import React, { useEffect, useState } from 'react';
import MediaPopup from '@/components/AdminDashboard/MediaPopup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [mediaPopup, setMediaPopup] = useState(false);
  const [formData, setFormData] = useState({ title: '', thumbnail: '',model_no:'' });
  const [files, setFiles] = useState([]);

  const router = useRouter()

  useEffect(() => {
    if (files.length > 0) {
      setFormData({ ...formData, thumbnail: files[0].url });
    }
  }, [files]);

  const ValProduct = Yup.object({
    title: Yup.string().required('Title is required!'),
    model_no: Yup.string().required('Model # is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
  });

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const CreateCategory = async (e) => {
    try {
      await ValProduct.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }
    const crtToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Creating Model #...', // Show pending message
        success: 'Model # created successfully!', // Show success message
        error: 'Failed to create model #', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(crtToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });
    fetch('/api/admin/product/modelno', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
          router.push('/neu-admin/product/modelno');
        } else {
          toast.update(crtToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
      });
  };

  return (
    <div className="p-5">
      <MediaPopup state={mediaPopup} setState={setMediaPopup} files={files} setFiles={setFiles} />
      <h2 className="text-3xl font-semibold">Create Model #</h2>
      <form action={CreateCategory} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Title
          </label>
          <input name="title" value={formData.title} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="title" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Model #
          </label>
          <input name="model_no" value={formData.model_no} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="thumbnail" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Thumbnail
          </label>
          <div className="flex rounded-md border border-gray-500 px-3 py-2">
            <input readOnly name="thumbnail" value={formData.thumbnail} type="text" placeholder="Select Single File" className="block w-6/12 w-full rounded-lg bg-gray-500 bg-white px-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-500" />
            <button type="button" onClick={() => setMediaPopup(true)} className="rounded-md bg-b4 px-4 py-1 text-white">
              Select
            </button>
          </div>
        </div>
        <div className="col-span-2 flex w-full justify-center">
          <button className="rounded bg-b3 px-6 py-3 text-white">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
