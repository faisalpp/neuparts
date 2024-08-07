'use client';
import React, { useEffect, useState } from 'react';
import MediaPopup from '@/components/AdminDashboard/MediaPopup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const Page = () => {
  const [mediaPopup, setMediaPopup] = useState(false);
  const [formData, setFormData] = useState({ title: '', regular_price: 0, sale_price: 0, part_number: '', model_no: '', condition: '', type: '', category: '', stock: 0, images: [], threesixty: '', description: '', specification: '', delivery: '' });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      setFormData({ ...formData, images: files });
    }
  }, [files]);

  const ValProduct = Yup.object({
    title: Yup.string().required('Title is required!'),
    regular_price: Yup.number().required('Regular Price is required!'),
    sale_price: Yup.number().required('Sale Price is required!'),
    part_number: Yup.string().required('Part Number is required!'),
    model_no: Yup.string().required('Model Number is required!'),
    condition: Yup.string().required('Condition is required!'),
    type: Yup.string().required('Type is required!'),
    category: Yup.string().required('Category is required!'),
    stock: Yup.number().required('Stock is required!'),
    images: Yup.array().required('Images is required!'),
    threesixty: Yup.string().required('3D Model is required!'),
    description: Yup.string().required('Description is required!'),
    specification: Yup.string().required('Specification is required!'),
    delivery: Yup.string().required('Delivery is required!'),
  });

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: name === 'images' ? [...files] : value });
  };

  const CreateProduct = async (e) => {
    try {
      await ValProduct.validate(formData, { abortEarly: false });
    } catch (error) {
      console.log(error);
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
        pending: 'Create Product...', // Show pending message
        success: 'Product created successfully!', // Show success message
        error: 'Failed to create product', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(crtToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });
    fetch('/api/admin/product', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.success) {
          toast.update(crtToastId, { type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
          router.push('/neu-admin/blogs/general');
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
      <MediaPopup state={mediaPopup} setState={setMediaPopup} setFiles={setFiles} />
      <h2 className="text-3xl font-semibold">Create Product</h2>
      <form action={CreateProduct} className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Title
          </label>
          <input name="title" value={formData.title} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="regular_price" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              Regular Price
            </label>
            <input name="regular_price" value={formData.regular_price} onChange={HandleChange} type="number" className="custom-input" />
          </div>
          <div>
            <label htmlFor="sale_price" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              Sale Price
            </label>
            <input name="sale_price" value={formData.sale_price} onChange={HandleChange} type="number" className="custom-input" />
          </div>
        </div>
        <div>
          <label htmlFor="part_number" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Part Number
          </label>
          <input name="part_number" value={formData.part_number} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="model_no" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Model No
          </label>
          <input name="model_no" value={formData.model_no} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="condition" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Condition
          </label>
          <input name="condition" value={formData.condition} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="type" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Type
          </label>
          <input name="type" value={formData.type} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="category" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Category
          </label>
          <input name="category" value={formData.category} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="stock" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Stock
          </label>
          <input name="stock" value={formData.stock} onChange={HandleChange} type="number" className="custom-input" />
        </div>
        <div>
          <label htmlFor="images" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Images
          </label>
          <div className="flex items-center gap-2 rounded-md border border-gray-500 px-3 py-2">
            <input readOnly name="images" value={formData.images} type="text" placeholder="Select Files" className="custom-input !mt-0" />
            <button type="button" onClick={() => setMediaPopup(true)} className="rounded-md bg-b4 px-4 py-3 text-white">
              Select
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="threesixty" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            360 deg
          </label>
          <input name="threesixty" value={formData.threesixty} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="description" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Description
          </label>
          <input name="description" value={formData.description} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div>
          <label htmlFor="specification" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Specification
          </label>
          <input name="specification" value={formData.specification} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div className="col-span-2">
          <label htmlFor="delivery" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
            Delivery
          </label>
          <input name="delivery" value={formData.delivery} onChange={HandleChange} type="text" className="custom-input" />
        </div>
        <div className="col-span-2 flex w-full justify-center">
          <button className="rounded bg-b3 px-6 py-3 text-white">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Page;
