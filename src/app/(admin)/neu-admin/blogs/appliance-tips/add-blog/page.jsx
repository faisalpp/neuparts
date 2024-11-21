'use client';
import React, { useEffect, useRef, useState } from 'react';
import MediaPopup from '@/components/AdminDashboard/MediaPopup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Page = () => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, Editor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
      Editor: require('ckeditor5-custom-build/build/ckeditor'),
    };
    setEditorLoaded(true);
  }, []);

  const [mediaPopup, setMediaPopup] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', thumbnail: '' });
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (files.length > 0) {
      setFormData({ ...formData, thumbnail: files[0].url });
    }
  }, [files]);

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const GetCategories = async () => {
    fetch(`/api/admin/blog/appliance-tips/category`)
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success && resp.cats.length > 0) {
          setCategories(resp.cats);
          setFormData({ ...formData, category: resp.cats[0] });
        } else {
          setCategories([]);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong!');
      });
  };

  useEffect(() => {
    GetCategories();
  }, []);

  const ValBlog = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    thumbnail: Yup.string().required('Thumbnail is required!'),
    category: Yup.object().required('Category is required!'),
  });

  const CreateBlog = async (e) => {
    e.preventDefault();

    try {
      await ValBlog.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const crtToastId = toast.loading('Creating Blogs...')

    fetch('/api/admin/blog/appliance-tips', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { type: 'success', autoClose: 1000, isLoading: false });
          router.push('/neu-admin/blogs/appliance-tips');
        } else {
          toast.update(crtToastId, { type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { type: 'error', autoClose: 1000, isLoading: false });
      });
  };

  return (
    <div className="flex justify-center" style={{ minHeight: 'calc(100vh - 25px)' }}>
      <MediaPopup state={mediaPopup} setState={setMediaPopup} setFiles={setFiles} />
      <div className="mx-24 flex flex-col gap-y-5">
        <div className="flex w-full justify-center py-5">
          <span className="text-3xl font-semibold">Create Blog</span>
        </div>
        <form onSubmit={CreateBlog} className="flex flex-col gap-y-5 pb-5">
          <div>
            <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              Title
            </label>
            <input name="title" value={formData.title} onChange={HandleChange} type="text" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
          </div>
          {editorLoaded ? (
            <CKEditor
              editor={Editor}
              onChange={(e, editor) => setFormData({ ...formData, content: editor.getData() })}
              config={{
                height: '250px', // Set the initial height
                toolbar: ['alignment', 'autoImage', 'autoLink', 'autoformat', 'blockQuote', 'bold', 'essentials', 'fontSize', 'heading', 'image', 'imageCaption', 'imageUpload', 'imageToolbar', 'italic', 'link', 'list', 'mediaEmbed', 'paragraph', 'undo', 'redo', 'bulletedList', 'numberedList','insertTable'],
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
          ) : null}
          <div>
            <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              Category
            </label>
            <select name="category" onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))
              ) : (
                <option>No Categories Found!</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
              Thumbnail
            </label>
            <div className="flex rounded-md border border-gray-500 px-3 py-2">
              <input readOnly name="avatar" value={formData.thumbnail} type="text" placeholder="Select Single File" className="block w-6/12 w-full rounded-lg bg-gray-500 bg-white px-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-500" />
              <button type="button" onClick={() => setMediaPopup(true)} className="rounded-md bg-b4 px-4 py-1 text-white">
                Select
              </button>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <button className="rounded bg-b3 px-4 py-1 text-white">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
