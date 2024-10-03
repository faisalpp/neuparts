'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
  const { id } = params;
  const [formData, setFormData] = useState({ title: '', thumbnail: '' });

  const router = useRouter()

  const ValProduct = Yup.object({
    title: Yup.string().required('Title is required!'),
  });

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const GetCategory = async () => {
    const res = await fetch('/api/admin/product/sub-category/edit?id=' + id);
    const data = await res.json();
    setFormData(data);
  };

  useEffect(() => {
    GetCategory();
  }, []);

  const UpdateCategory = async (e) => {
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
        pending: 'Update Sub Category...', // Show pending message
        success: 'Sub Category update successfully!', // Show success message
        error: 'Failed to update sub category', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(crtToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });
    fetch('/api/admin/product/sub-category', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          router.push('/neu-admin/product/sub-category');
          toast.update(crtToastId, { type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
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
      <h2 className="text-3xl font-semibold">Update Sub Category</h2>
      <form action={UpdateCategory} className="mt-4 space-y-4">
        <div>
          <label htmlFor="title" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Title
          </label>
          <input name="title" value={formData.title} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div className="col-span-2 flex w-full justify-center">
          <button className="rounded bg-b3 px-6 py-3 text-white">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
