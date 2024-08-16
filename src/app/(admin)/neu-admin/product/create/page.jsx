'use client';
import React, { useEffect, useState, useRef } from 'react';
import MediaPopup from '@/components/AdminDashboard/MediaPopup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { BiLoaderAlt } from 'react-icons/bi';
import Image from 'next/image';

const Page = () => {
  const [mediaPopup, setMediaPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parttypes, setPartTypes] = useState([]);
  const [formData, setFormData] = useState({ title: '', regular_price: 0, sale_price: 0, part_number: '', model_no: '', condition: '', type: '', category: '', parttype: '', stock: 0, images: [], thumbnail: '', threesixty: '', description: '', specification: '', delivery: '' });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (files.length > 0) {
      setFormData({ ...formData, images: files, thumbnail: files[0].url });
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
    parttype: Yup.string().required('Part Type is required!'),
    stock: Yup.number().required('Stock is required!'),
    images: Yup.array().required('Images is required!'),
    threesixty: Yup.string().required('3D Model is required!'),
    description: Yup.string().required('Description is required!'),
    specification: Yup.string().required('Specification is required!'),
    delivery: Yup.string().required('Delivery is required!'),
  });

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Get Category
  const FetchCategory = async () => {
    await fetch(`/api/admin/product/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
          setPartTypes(data.parttyoes);
        } else {
          setCategories([]);
          setPartTypes([]);
        }
      });
  };

  useEffect(() => {
    FetchCategory();
  }, []);

  // Create Product

  const CreateProduct = async (e) => {
    try {
      await ValProduct.validate(formData, { abortEarly: false });
    } catch (error) {
      error;
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
        resp;
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

  // Generate CkEditor Instances dynamically
  const deliveryEditorRef = useRef();
  const descriptionEditorRef = useRef(); // Another editor ref
  const specificationEditorRef = useRef(); // Another editor ref

  const [editorLoader, setEditorLoader] = useState(false);

  useEffect(() => {
    const loadEditors = () => {
      const CKEditor = require('@ckeditor/ckeditor5-react').CKEditor;
      const Editor = require('ckeditor5-custom-build/build/ckeditor');

      deliveryEditorRef.current = { CKEditor, Editor };
      specificationEditorRef.current = { CKEditor, Editor };
      descriptionEditorRef.current = { CKEditor, Editor };
    };

    loadEditors();
    setEditorLoader(true);
  }, []);

  return (
    <div className="p-5">
      <MediaPopup state={mediaPopup} setState={setMediaPopup} files={files} setFiles={setFiles} isMultiple={true} />
      <h2 className="text-center text-3xl font-semibold">Create Product</h2>
      <form action={CreateProduct} className="mt-4 grid grid-cols-2 rounded-xl border-2 shadow-lg">
        {/* Left Section Start */}
        <div className="flex flex-col gap-5 border-l-2 px-5 py-5">
          <div>
            <label htmlFor="title" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              Title
            </label>
            <input name="title" value={formData.title} onChange={HandleChange} type="text" className="custom-input" />
          </div>
          {/* regular and sale price start */}
          <div className="flex gap-5">
            <div className="w-6/12">
              <label htmlFor="regular_price" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Regular Price
              </label>
              <input min={0} name="regular_price" value={formData.regular_price} onChange={HandleChange} type="number" className="custom-input" />
            </div>
            <div className="w-6/12">
              <label htmlFor="sale_price" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Sale Price
              </label>
              <input min={0} name="sale_price" value={formData.sale_price} onChange={HandleChange} type="number" className="custom-input" />
            </div>
            <div>
              <label htmlFor="stock" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Stock
              </label>
              <input name="stock" value={formData.stock} onChange={HandleChange} type="number" className="custom-input" />
            </div>
          </div>
          {/* regular and sale price end */}

          {/* part # & model no start */}
          <div className="flex gap-5">
            <div className="w-6/12">
              <label htmlFor="part_number" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Part Number
              </label>
              <input name="part_number" value={formData.part_number} onChange={HandleChange} type="text" className="custom-input" />
            </div>
            <div className="w-6/12">
              <label htmlFor="model_no" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Model No
              </label>
              <input name="model_no" value={formData.model_no} onChange={HandleChange} type="text" className="custom-input" />
            </div>
          </div>
          {/* part # & model no end */}

          {/* Conditions Start */}
          <div className="flex gap-5">
            <div className="w-6/12">
              <label htmlFor="condition" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Condition
              </label>
              <select name="condition" value={formData.condition} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Condition</option>
                <option value="Like New / Open Box">Like New / Open Box</option>
                <option value="Like New / Open Box">Certified Refurbished</option>
                <option value="Used ● Grade A">Used ● Grade A</option>
                <option value="Used ● Grade B">Used ● Grade B</option>
                <option value="Used ● Grade C">Used ● Grade C</option>
                <option value="Used ● Grade D">Used ● Grade D</option>
              </select>
            </div>

            <div className="w-6/12">
              <label htmlFor="type" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Part
              </label>
              <select name="type" value={formData.type} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Type</option>
                <option value="Genuine OEM Part">Genuine OEM Part</option>
                <option value="Genuine OEM Part">Aftermarket Replacement Part</option>
              </select>
            </div>
          </div>
          {/* Conditions End */}

          {/* Category & 360 Url Start */}
          <div className="flex gap-5">
            <div className="w-6/12">
              <label htmlFor="category" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Category
              </label>
              <select name="category" value={formData.category} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Category</option>
                {categories.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-6/12">
              <label htmlFor="type" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Part Type
              </label>
              <select name="parttype" value={formData.parttype} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Part Type</option>
                {parttypes.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category & 360 End */}

          <div>
            <label htmlFor="threesixty" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              360° Iframe Url
            </label>
            <input name="threesixty" value={formData.threesixty} onChange={HandleChange} type="text" placeholder="Just Iframe Url" className="custom-input" />
          </div>
          <div>
            <label htmlFor="images" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              Images
            </label>
            <div className="flex items-center gap-2 rounded-md border border-gray-500 px-3 py-2">
              <div className="w-100 flex h-20 bg-red-500">{formData?.images?.length > 0 ? formData.images.map((img, i) => <Image key={i} height={100} width={100} src={img.url} />) : null}</div>

              <button type="button" onClick={() => setMediaPopup(true)} className="rounded-md bg-b4 px-4 py-3 text-white">
                Select
              </button>
            </div>
          </div>

          <div className="col-span-2 flex w-full justify-center">
            <button className="rounded bg-b3 px-6 py-3 text-white">Submit</button>
          </div>
        </div>
        {/* Left Section End */}

        {/* Right Section Start */}
        <div className="flex flex-col gap-10 px-5 py-5">
          <div className="col-span-2">
            <label htmlFor="delivery" className="block text-lg font-semibold text-gray-800 dark:text-gray-300">
              Delivery
            </label>
            {editorLoader ? (
              <deliveryEditorRef.current.CKEditor
                editor={deliveryEditorRef.current.Editor}
                onChange={(e, editor) => setFormData({ ...formData, delivery: editor.getData() })}
                config={{
                  height: '250px', // Set the initial height
                  toolbar: ['alignment', 'autoImage', 'autoLink', 'autoformat', 'blockQuote', 'bold', 'essentials', 'fontSize', 'heading', 'image', 'imageCaption', 'imageUpload', 'imageToolbar', 'italic', 'link', 'list', 'mediaEmbed', 'paragraph', 'undo', 'redo', 'bulletedList', 'numberedList'],
                }}
                onReady={(editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
                onBlur={(event, editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
                onFocus={(event, editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
              />
            ) : (
              <div className="flex h-[250px] animate-spin items-center justify-center text-2xl">
                <BiLoaderAlt />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="specification" className="block text-lg font-semibold text-gray-800 dark:text-gray-300">
              Specification
            </label>
            {editorLoader ? (
              <specificationEditorRef.current.CKEditor
                editor={specificationEditorRef.current.Editor}
                onChange={(e, editor) => setFormData({ ...formData, specification: editor.getData() })}
                config={{
                  height: '250px', // Set the initial height
                  toolbar: ['alignment', 'autoImage', 'autoLink', 'autoformat', 'blockQuote', 'bold', 'essentials', 'fontSize', 'heading', 'image', 'imageCaption', 'imageUpload', 'imageToolbar', 'italic', 'link', 'list', 'mediaEmbed', 'paragraph', 'undo', 'redo', 'bulletedList', 'numberedList'],
                }}
                onReady={(editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
                onBlur={(event, editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
                onFocus={(event, editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
              />
            ) : (
              <div className="flex h-[250px] animate-spin items-center justify-center text-2xl">
                <BiLoaderAlt />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-semibold text-gray-800 dark:text-gray-300">
              Description
            </label>
            {editorLoader ? (
              <descriptionEditorRef.current.CKEditor
                editor={descriptionEditorRef.current.Editor}
                onChange={(e, editor) => setFormData({ ...formData, description: editor.getData() })}
                config={{
                  height: '250px', // Set the initial height
                  toolbar: ['alignment', 'autoImage', 'autoLink', 'autoformat', 'blockQuote', 'bold', 'essentials', 'fontSize', 'heading', 'image', 'imageCaption', 'imageUpload', 'imageToolbar', 'italic', 'link', 'list', 'mediaEmbed', 'paragraph', 'undo', 'redo', 'bulletedList', 'numberedList'],
                }}
                onReady={(editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
                onBlur={(event, editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
                onFocus={(event, editor) => {
                  editor.ui.view.editable.element.style.minHeight = '250px';
                }}
              />
            ) : (
              <div className="flex h-[250px] animate-spin items-center justify-center text-2xl">
                <BiLoaderAlt />
              </div>
            )}
          </div>
        </div>
        {/* Right Section End */}
      </form>
    </div>
  );
};

export default Page;
