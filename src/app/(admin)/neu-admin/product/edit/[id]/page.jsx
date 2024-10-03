'use client';
import React, { useEffect, useState, useRef } from 'react';
import MediaPopup from '@/components/AdminDashboard/MediaPopup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { BiLoaderAlt } from 'react-icons/bi';
import { IoCloseCircle } from 'react-icons/io5';
import Accordion from '@/components/AdminDashboard/Accordion';
import subcategory from '@/models/subcategory';

const Page = ({ params }) => {
  const { id } = params;
  const [mediaPopup, setMediaPopup] = useState(false);
  const [mediaPopup2, setMediaPopup2] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parttypes, setPartTypes] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({ title: '', regular_price: 0, sale_price: 0, part_number: '', condition: '', type: '', category: '', parttype: '', subcategory: '', stock: 0, images: [], thumbnail: '', threesixty: '', description: '', specification: '', delivery: '' });
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([]);

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

  const RemoveImage = (indx) => {
    const newImages = formData.images.filter((_, i) => i != indx);
    setFormData({ ...formData, images: newImages });
  };

  const RemoveThumbnail = () => {
    setFormData({ ...formData, thumbnail: '/no-image.webp' });
  };

  useEffect(() => {
    if (files.length > 0) {
      let urls = [];
      files.forEach((file) => {
        urls.push(file.url);
      });
      setFormData({ ...formData, images: [...formData.images, ...urls] });
      setFiles([]);
    }
  }, [files]);

  useEffect(() => {
    if (files2.length > 0) {
      setFormData({ ...formData, thumbnail: files2[0].url });
      setFiles2([]);
    }
  }, [files2]);

  const ValProduct = Yup.object({
    title: Yup.string().required('Title is required!'),
    regular_price: Yup.number().required('Regular Price is required!'),
    sale_price: Yup.number().required('Sale Price is required!'),
    part_number: Yup.string().required('Part Number is required!'),
    condition: Yup.string().required('Condition is required!'),
    type: Yup.string().required('Type is required!'),
    category: Yup.string().required('Category is required!'),
    parttype: Yup.string().required('Part Type is required!'),
    subcategory: Yup.string().required('Sub Category is required!'),
    stock: Yup.number().required('Stock is required!'),
    images: Yup.array(),
    threesixty: Yup.string(),
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
          setSubCategories(data.subcategories);
        }
      });
  };

  useEffect(() => {
    FetchCategory();
  }, []);

  const GetProduct = async () => {
    const res = await fetch('/api/admin/product/edit?id=' + id);
    const data = await res.json();
    setFormData(data);
  };

  useEffect(() => {
    GetProduct();
  }, []);

  const UpdateProduct = async (e) => {
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
        pending: 'Update Product...', // Show pending message
        success: 'Product update successfully!', // Show success message
        error: 'Failed to update product', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(crtToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });
    fetch('/api/admin/product', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
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
      <MediaPopup state={mediaPopup} setState={setMediaPopup} files={files} setFiles={setFiles} isMultiple={true} />
      <MediaPopup state={mediaPopup2} setState={setMediaPopup2} files={files2} setFiles={setFiles2} isMultiple={false} />
      <h2 className="text-center text-3xl font-semibold">Create Product</h2>
      <form action={UpdateProduct} className="mt-4 grid grid-cols-2 rounded-xl border-2 shadow-lg">
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
              <label htmlFor="condition" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Condition
              </label>
              <select name="condition" value={formData.condition} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Condition</option>
                <option value="new">New</option>
                <option value="new-open-box">New / Open Box</option>
                <option value="certified">Certified Refurbished</option>
                <option value="used-grade-a">Used ● Grade A</option>
                <option value="used-grade-b">Used ● Grade B</option>
                <option value="used-grade-c">Used ● Grade C</option>
                <option value="used-grade-d">Used ● Grade D</option>
              </select>
            </div>
          </div>
          {/* part # & model no end */}

          {/* Conditions Start */}
          <div className="flex gap-5">
            <div className="w-6/12">
              <label htmlFor="type" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Type
              </label>
              <select name="type" value={formData.type} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Type</option>
                <option value="Genuine OEM Part">Genuine OEM Part</option>
                <option value="Genuine OEM Part">Aftermarket Replacement Part</option>
              </select>
            </div>
            <div className="w-6/12">
              <label htmlFor="type" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Part Type
              </label>
              <select name="parttype" value={formData.parttype} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Part Type</option>
                {parttypes.length > 0 &&
                  parttypes.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* Conditions End */}

          {/* Category & Parttype Start */}
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
              <label htmlFor="subcategory" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Sub Category
              </label>
              <select name="subcategory" value={formData.subcategory} onChange={HandleChange} className="custom-input !py-3">
                <option value="">Select Sub Category</option>
                {subcategories.length > 0 &&
                  subcategories.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* Category & Parttype End */}

          <div>
            <label htmlFor="threesixty" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              360° Iframe Url
            </label>
            <input name="threesixty" value={formData.threesixty} onChange={HandleChange} type="text" placeholder="Just Iframe Url" className="custom-input" />
          </div>
        </div>
        {/* Left Section End */}

        {/* Right Section Start */}
        <div className="flex flex-col gap-5 border-l-2 px-5 py-5">
          {/* Gallery Section Start */}
          <div className="flex gap-5">
            <div className="w-4/12">
              <label htmlFor="images" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Thumbnail
              </label>
              <div className="relative flex flex-col items-center rounded-md border border-gray-500 px-3">
                <div className="w-100 mx-2 my-3 flex gap-5">
                  {formData.thumbnail != '' ? (
                    <div className="relative">
                      {formData.thumbnail != '/no-image.webp' ? <IoCloseCircle onClick={() => RemoveThumbnail()} className="absolute right-1 top-1 rounded-full bg-white text-lg text-red-400" /> : null}
                      <Image height={150} width={150} src={formData.thumbnail} className="h-28 w-32 rounded-md border-2 px-2" />
                    </div>
                  ) : (
                    <div className="relative">
                      <Image height={150} width={150} src={'/no-image.webp'} className="h-28 w-32 rounded-md border-2" />
                    </div>
                  )}
                </div>
                <button type="button" onClick={() => setMediaPopup2(true)} className="mb-1 rounded-md bg-b4 px-3 py-1 text-sm text-white">
                  Select
                </button>
              </div>
            </div>

            <div className="w-8/12">
              <label htmlFor="images" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Gallery
              </label>
              <div className="relative flex items-center gap-2 rounded-md border border-gray-500 px-3 py-2">
                <button type="button" onClick={() => setMediaPopup(true)} className="absolute right-2 top-2 rounded-md bg-b4 px-3 py-1 text-sm text-white">
                  Select
                </button>
                <div className="mx-2 mt-10 flex max-h-32 min-h-32 w-[100%] flex-wrap gap-5 overflow-y-scroll">
                  {formData.images.length > 0
                    ? formData.images.map((img, i) => (
                        <div key={i} className="relative h-fit rounded-md border-2 px-1 py-1">
                          <IoCloseCircle onClick={(e) => RemoveImage(i)} className="absolute right-1 top-1 rounded-full bg-white text-lg text-red-400" />
                          <Image height={150} width={150} src={img} className="h-20 w-24 rounded-md" />
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          {/* Gallery Section Start */}

          <Accordion
            parser="true"
            title="Appliance Description"
            parent="w-full [&>div]:py-4 [&>div]:px-3 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0"
            icon="text-xl"
            textStyle="font-bold text-sm"
            child="[&>p]:text-sm !mt-0"
            isExpand={false}
            chevrown
            content={
              editorLoader ? (
                <deliveryEditorRef.current.CKEditor
                  editor={deliveryEditorRef.current.Editor}
                  onChange={(e, editor) => setFormData({ ...formData, delivery: editor.getData() })}
                  config={{
                    height: '250px',
                    toolbar: ['alignment', 'autoImage', 'autoLink', 'autoformat', 'bold', 'essentials', 'fontSize', 'heading', 'image', 'imageCaption', 'imageUpload', 'imageToolbar', 'italic', 'link', 'list', 'mediaEmbed', 'paragraph', 'undo', 'redo', 'bulletedList', 'numberedList'],
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
              )
            }
          />

          <Accordion
            parser="true"
            title="Specification"
            parent="w-full [&>div]:py-4 [&>div]:px-3 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0"
            icon="text-xl"
            textStyle="font-bold text-sm"
            child="[&>p]:text-sm !mt-0"
            chevrown
            content={
              editorLoader ? (
                <specificationEditorRef.current.CKEditor
                  editor={specificationEditorRef.current.Editor}
                  onChange={(e, editor) => setFormData({ ...formData, specification: editor.getData() })}
                  config={{
                    height: '250px', // Set the initial height
                    toolbar: ['alignment', 'autoImage', 'autoLink', 'autoformat', 'bold', 'essentials', 'fontSize', 'heading', 'image', 'imageCaption', 'imageUpload', 'imageToolbar', 'italic', 'link', 'list', 'mediaEmbed', 'paragraph', 'undo', 'redo', 'bulletedList', 'numberedList'],
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
              )
            }
          />

          <Accordion
            parser="true"
            title="Description"
            parent="w-full [&>div]:py-4 [&>div]:px-3 [&>div]:border [&>div]:border-b33 [&>div]:rounded-xl h-auto border-0"
            icon="text-xl"
            textStyle="font-bold text-sm"
            child="[&>p]:text-sm !mt-0"
            chevrown
            content={
              editorLoader ? (
                <descriptionEditorRef.current.CKEditor
                  editor={descriptionEditorRef.current.Editor}
                  onChange={(e, editor) => setFormData({ ...formData, description: editor.getData() })}
                  config={{
                    height: '250px', // Set the initial height
                    toolbar: ['alignment', 'autoImage', 'autoLink', 'autoformat', 'bold', 'essentials', 'fontSize', 'heading', 'image', 'imageCaption', 'imageUpload', 'imageToolbar', 'italic', 'link', 'list', 'mediaEmbed', 'paragraph', 'undo', 'redo', 'bulletedList', 'numberedList'],
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
              )
            }
          />

          <div className="col-span-2 flex w-full justify-center">
            <button className="rounded bg-b3 px-6 py-3 text-white">Submit</button>
          </div>
        </div>
        {/* Right Section End */}
      </form>
    </div>
  );
};

export default Page;
