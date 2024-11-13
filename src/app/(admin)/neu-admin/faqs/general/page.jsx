'use client';

import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '@/components/AdminDashboard/Table';
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import Tablet from '@/components/AdminDashboard/Table/TD/Tablet';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns';
import TableNav from '@/components/AdminDashboard/TableNav';
import Popup from '@/components/AdminDashboard/Popup';
import * as Yup from 'yup';
import { limitString } from '@/utils/index';

const Page = () => {
  const [createPopup, setCreatePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const updateFormRef = useRef(null);

  const [faqs, setFaqs] = useState([]);
  const [faqCats, setFaqCats] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [by, setBy] = useState('all');


  const [formData, setFormData] = useState({ id: '', title: '', content: '', category: '' });

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValFaq = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    category: Yup.string().required('Category is required!'),
  });

  const CreateFaq = async (e) => {
    e.preventDefault();

    try {
      await ValFaq.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const crtToastId = toast.loading('Creating Faq...')

    fetch('/api/admin/faqs/general', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setFormData({ id: '', title: '', content: '', category: '' });
          toast.update(crtToastId, { type: 'success', autoClose: 1000, isLoading: false });
          setReRender(true);
          setCreatePopup(false);
        } else {
          toast.update(crtToastId, { type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { type: 'error', autoClose: 1000, isLoading: false });
      });
  };

  const handleUpdatePopup = (data) => {
    const { _id, title, content, joinedCategory } = data;
    setFormData({ id: _id, title: title, content: content, category: { title: joinedCategory.title, id: joinedCategory._id } });
    setUpdatePopup(true);
  };

  const UpValReview = Yup.object({
    title: Yup.string().required('Title is required!'),
    content: Yup.string().required('Content is required!'),
    category: Yup.object().required('Category is required!'),
  });

  const UpdateFaq = async (e) => {
    e.preventDefault();

    try {
      await UpValReview.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }
    // Show pending toast
    const updToastId = toast.loading('Updating faq...')

    fetch('/api/admin/faqs/general', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setReRender(true);
          setFormData({ id: '', title: '', content: '', category: '' });
          setUpdatePopup(false);
          toast.update(updToastId, { render: resp.message, type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(updToastId, { render: resp.message, type: 'error', autoClose: 1000, isLoading: false });
        }
      });
  };

  //handel empty page request
  const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = faqs.filter((item) => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  };

  const DeleteFaq = async (id) => {
    if (!id) {
      toast.error('Faq id required!');
      return;
    }

    // Show pending toast
    const delToastId = toast.loading('Deleting faq...')

    fetch('/api/admin/faqs/general', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          ManagePageCount(id);
          setReRender(true);
          toast.update(delToastId, { type:'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, { type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(delToastId, { type: 'error', autoClose: 3000, isLoading: false });
      });
  };

  const FetchFaqs = async () => {
    setRowLoader(true);

    // Show pending toast
    const getToastId = toast.loading('Getting faqs...')

    try {
      fetch(`/api/admin/faqs/general/?page=${page}&limit=${limit}&search=${search}&by=${by}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.cats?.length > 0) {
              setFaqCats(data.cats);
              setFormData({ ...formData, category: data.cats[0]._id });
            }
            if (data.faqs.length > 0) {
              toast.update(getToastId, { type: 'success', autoClose: 1000, isLoading: false });
              setPageCount(data.pagination.pageCount);
              setFaqs(data.faqs);
            } else {
              setFaqs(data.faqs);
              toast.update(getToastId, { type: 'error', autoClose: 1000, isLoading: false });
            }
          }
          setRowLoader(false);
        });
    } catch (error) {
      toast.update(getToastId, { type: 'error', autoClose: 1000, isLoading: false });
    }
  };

  // get team members data
  useEffect(() => {
    FetchFaqs();
  }, [page]);

  useEffect(() => {
    if (reRender) {
      FetchFaqs();
      setReRender(false);
    }
  }, [reRender]);

  return (
    <>
      <Popup state={createPopup} setState={setCreatePopup}>
        <form onSubmit={CreateFaq} className="mx-10 flex w-full flex-col py-5">
          <h1 className="text-center text-xl font-semibold">Create Faq (General) </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Title
              </label>
              <input name="title" value={formData.title} onChange={HandleChange} type="text" placeholder="Lorem ipsum?" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="review" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Review
              </label>
              <textarea name="content" value={formData.content} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <div>
              <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Category
              </label>
              <select name="category" onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300">
                {faqCats.length > 0 ? (
                  faqCats.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))
                ) : (
                  <option>No Categories Found!</option>
                )}
              </select>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <Popup state={updatePopup} setState={setUpdatePopup}>
        <form ref={updateFormRef} onSubmit={UpdateFaq} className="mx-10 flex w-full flex-col">
          <h1 className="text-center text-xl font-semibold">Update Review </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Name
              </label>
              <input name="title" value={formData.title} onChange={HandleChange} type="text" placeholder="Lorem ipsum?" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="review" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Review
              </label>
              <textarea name="review" value={formData.content} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <div>
              <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Category
              </label>
              <select name="category" onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300">
                <option value={formData.category.id}>{formData.category.title}</option>
                {faqCats
                  .filter((cat) => cat.title !== formData.category.title)
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
              </select>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns
          buttons={[
            { type: 'trigger', text: 'Add Faq', trigger: setCreatePopup },
            { type: 'link', text: 'Categories', link: '/neu-admin/faqs/general/categories' },
            ,{type:'search',placeholder:'Type here to search by title',options:[{title:'By Title',value:'title'}],field:search,setField:setSearch,search:FetchFaqs}
          ]}
        />
        <div className="mt-10 flex h-full w-full flex-col items-center">
          <Table header={['Title', 'Content', 'Category', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={4} />
            ) : faqs?.length > 0 ? (
              faqs.map((faq, i) => (
                <Row Key={i}>
                  <Text text={faq.title} />
                  <Text text={limitString(faq.content, 200)} />
                  <Tablet text={faq.joinedCategory.title} />
                  <Actions id={faq._id} handleDelete={DeleteFaq} data={faq} handleEdit={handleUpdatePopup} />
                </Row>
              ))
            ) : (
              <NoData colspan={4} alert="No Faqs Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
