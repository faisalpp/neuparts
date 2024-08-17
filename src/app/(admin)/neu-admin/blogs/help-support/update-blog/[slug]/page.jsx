'use client';
import React, { useEffect, useState, useRef } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Page = ({ params }) => {
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

  const [formData, setFormData] = useState({ title: '', content: '', category: '', meta: { title: '', description: '' } });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const GetBlogs = () => {
    if (params.slug) {
      fetch(`/api/front/blog/help-support/single?slug=${params.slug}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const { _id, title, slug, content, joinedCategory, meta } = data.blog[0];
            setFormData({ id: _id, title: title, slug: slug, content: content, category: joinedCategory._id, cat: joinedCategory, meta: { title: meta.title, description: meta.description } });
            setLoading(false);
          } else {
            return <notFound />;
          }
        })
        .catch((error) => {
          toast.error('Something went wrong!');
        });
    }
  };

  useEffect(() => {
    GetBlogs();
  }, []);

  const GetCategories = async () => {
    fetch('/api/admin/blog/help-support/category', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success && resp.cats.length > 0) {
          setCategories(resp.cats);
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

  const HandleChange = (e) => {
    const { value, name } = e.target;
    if (name === 'description') {
      setFormData({ ...formData, meta: { ...formData.meta, [name]: value } });
    } else if (name === 'title') {
      setFormData({ ...formData, [name]: value, meta: { ...formData.meta, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const ValBlog = Yup.object({
    id: Yup.string().required('Id is required!'),
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    category: Yup.string().required('Content is required!'),
  });

  const UpdateBlog = async (e) => {
    e.preventDefault();
    try {
      await ValBlog.validate(formData, { abortEarly: false });
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
        pending: 'Updating Blog...', // Show pending message
        success: 'Blog updated successfully!', // Show success message
        error: 'Failed to update blog', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(crtToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch('/api/admin/blog/help-support', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          toast.update(crtToastId, { type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
          router.push('/neu-admin/blogs/help-support');
        } else {
          toast.update(crtToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
      });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 25px)' }}>
          <Image width={50} height={10} src="/loader2.gif" className="h-24 w-20" />
        </div>
      ) : (
        <div className="flex justify-center" style={{ minHeight: 'calc(100vh - 25px)' }}>
          <div className="mx-24 flex flex-col gap-y-5">
            <div className="flex w-full justify-center py-5">
              <span className="text-3xl font-semibold">Update Blog</span>
            </div>
            <form onSubmit={UpdateBlog} className="flex flex-col gap-y-5 pb-5">
              <div className="flex justify-end">
                <Link href={`/blogs/${formData.slug}`} className="rounded bg-c-orange px-2 text-white">
                  View Article
                </Link>
              </div>
              <div>
                <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                  Title
                </label>
                <input name="title" value={formData.title} onChange={HandleChange} type="text" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
              </div>
              <div>
                <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                  Meta Description
                </label>
                <textarea required name="description" onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300">
                  {formData.meta.description}
                </textarea>
              </div>
              {editorLoaded ? (
                <CKEditor
                  editor={Editor}
                  data={formData.content || ''}
                  onChange={(e, editor) => setFormData({ ...formData, content: editor.getData() })}
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
              ) : null}
              <div>
                <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                  Category
                </label>
                <select name="category" onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300">
                  <option value={formData.cat._id}>{formData.cat.title}</option>
                  {categories
                    .filter((cat) => cat._id !== formData.cat._id)
                    .map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex w-full justify-center">
                <button className="rounded bg-b3 px-4 py-1 text-white">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
