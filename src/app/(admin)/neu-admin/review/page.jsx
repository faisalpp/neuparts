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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const updateFormRef = useRef(null);

  const [reviews, setReviews] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(2);

  const [formData, setFormData] = useState({ id: '', name: '', review: '', rating: '1', pages: [] });

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValReview = Yup.object({
    name: Yup.string().required('Name is required!'),
    review: Yup.string().required('Review is required!'),
    rating: Yup.string().required('Rating is required!'),
    pages: Yup.array().of(Yup.string().required('Page is required!')).min(1, 'At least one page is required!'),
  });

  const CreateReview = async (e) => {
    e.preventDefault();

    try {
      await ValReview.validate(formData, { abortEarly: false });
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
        pending: 'Create Review...', // Show pending message
        success: 'Review created successfully!', // Show success message
        error: 'Failed to create review', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(crtToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch('/api/admin/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setFormData({ id: '', name: '', review: '', rating: '', pages: [] });
          toast.update(crtToastId, { type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
          setReRender(true);
          setCreatePopup(false);
        } else {
          toast.update(crtToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
        console.error('Error creating review:', error);
      });
  };

  const handleUpdatePopup = (data) => {
    const { _id, name, review, rating, pages } = data;
    setFormData({ id: _id, name: name, review: review, rating: rating, pages: pages });
    setUpdatePopup(true);
    setIsInitialLoad(true);
  };

  useEffect(() => {
    if (updatePopup && isInitialLoad) {
      formData.pages.forEach((page) => {
        const checkbox = updateFormRef.current.querySelector(`input[name='${page}']`);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
      setIsInitialLoad(false);
    } else if (!updatePopup) {
      const checkboxes = updateFormRef.current.querySelectorAll("input[type='checkbox']");
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  }, [updatePopup, formData, isInitialLoad]);

  const UpValReview = Yup.object({
    id: Yup.string().required('id is required!'),
    name: Yup.string().required('Name is required!'),
    review: Yup.string().required('Review is required!'),
    rating: Yup.string().required('Rating is required!'),
    pages: Yup.array().of(Yup.string().required('Page is required!')).min(1, 'At least one page is required!'),
  });

  const UpdateTeamMember = async (e) => {
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
    const updToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Updating review...', // Show pending message
        success: 'Review update successfully!', // Show success message
        error: 'Failed to update review', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(updToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch('/api/admin/review', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setReRender(true);
          setFormData({ id: '', name: '', review: '', rating: '', pages: [] });
          setUpdatePopup(false);
          toast.update(updToastId, { render: resp.message, type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
        } else {
          toast.update(updToastId, { render: resp.message, type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
        }
      });
  };

  //handel empty page request
  const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = reviews.filter((item) => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  };

  const DeleteTeamMember = async (id) => {
    if (!id) {
      toast.error('Review id required!');
      return;
    }

    // Show pending toast
    const delToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Deleting review...', // Show pending message
        success: 'Review deleted successfully!', // Show success message
        error: 'Failed to delete review', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(delToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch('/api/admin/review', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          ManagePageCount(id);
          setReRender(true);
          toast.update(delToastId, { render: resp.message, type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(delToastId, { type: toast.TYPE?.ERROR, autoClose: 3000, isLoading: false });
        console.error('Error deleting review:', error);
      });
  };

  const FetchReviews = async () => {
    setRowLoader(true);

    // Show pending toast
    const getToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Getting reviews...', // Show pending message
        success: 'Reviews retrived successfully!',
        error: 'Failed to get reviews', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(getToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch(`/api/admin/review/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews.length > 0) {
          toast.update(getToastId, { render: data.message, type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
          setPageCount(data.pagination.pageCount);
          setReviews(data.reviews);
        } else {
          toast.update(getToastId, { render: data.message, type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
          setReviews([]);
        }
        setRowLoader(false);
      });
  };

  // get team members data
  useEffect(() => {
    FetchReviews();
  }, [page]);

  useEffect(() => {
    if (reRender) {
      FetchReviews();
      setReRender(false);
    }
  }, [reRender]);

  const handlePages = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return { ...prevFormData, pages: [...prevFormData.pages, name] };
      } else {
        return {
          ...prevFormData,
          pages: prevFormData.pages.filter((page) => page !== name),
        };
      }
    });
  };

  return (
    <>
      <Popup state={createPopup} setState={setCreatePopup}>
        <form onSubmit={CreateReview} className="mx-10 flex w-full flex-col py-5">
          <h1 className="text-center text-xl font-semibold">Create Review </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Name
              </label>
              <input name="name" value={formData.name} onChange={HandleChange} type="text" placeholder="John Doe" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="review" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Review
              </label>
              <textarea name="review" value={formData.review} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <div>
              <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Rating
              </label>
              <input name="rating" value={formData.rating} onChange={HandleChange} type="number" min="1" max="4" placeholder="1,2,3,4" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pages" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Pages
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="home-page" />
                  <span className="text-sm">Home Page</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="our-story" />
                  <span className="text-sm">Our Story</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="our-companies" />
                  <span className="text-sm">Our Companies</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="our-showroom" />
                  <span className="text-sm">Our Showroom</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="financing" />
                  <span className="text-sm">Financing</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="appliance-repair" />
                  <span className="text-sm">Appliance Repair</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="faqs" />
                  <span className="text-sm">Faq&quot;s</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="help-appliance-tips" />
                  <span className="text-sm">Helpful Appliance Tips</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="all" />
                  <span className="text-sm">All</span>
                </div>
              </div>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <Popup state={updatePopup} setState={setUpdatePopup}>
        <form ref={updateFormRef} onSubmit={UpdateTeamMember} className="mx-10 flex w-full flex-col">
          <h1 className="text-center text-xl font-semibold">Update Review </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Name
              </label>
              <input name="name" value={formData.name} onChange={HandleChange} type="text" placeholder="John Doe" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="review" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Review
              </label>
              <textarea name="review" value={formData.review} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <div>
              <label htmlFor="rating" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Rating
              </label>
              <input name="rating" value={formData.rating} onChange={HandleChange} type="number" min="1" max="4" placeholder="1,2,3,4" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pages" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Pages
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="home-page" />
                  <span className="text-sm">Home Page</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="our-story" />
                  <span className="text-sm">Our Story</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="our-companies" />
                  <span className="text-sm">Our Companies</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="our-showroom" />
                  <span className="text-sm">Our Showroom</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="financing" />
                  <span className="text-sm">Financing</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="appliance-repair" />
                  <span className="text-sm">Appliance Repair</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="faqs" />
                  <span className="text-sm">Faq&quot;s</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="help-appliance-tips" />
                  <span className="text-sm">Helpful Appliance Tips</span>
                </div>
                <div className="flex gap-2">
                  <input onChange={(e) => handlePages(e)} type="checkbox" name="all" />
                  <span className="text-sm">All</span>
                </div>
              </div>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns buttons={[{ type: 'trigger', trigger: setCreatePopup, text: 'Add Review' }]} />
        <div className="mt-10 flex h-full w-full flex-col items-center">
          <Table header={['Name', 'Review', 'Rating', 'Pages', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : reviews?.length > 0 ? (
              reviews.map((review, i) => (
                <Row Key={i}>
                  <Text text={review.name} />
                  <Text text={limitString(review.review, 200)} />
                  <Tablet text={review.rating} />
                  <Text text={review.pages} isArray={true} />
                  <Actions id={review._id} handleDelete={DeleteTeamMember} data={review} handleEdit={handleUpdatePopup} />
                </Row>
              ))
            ) : (
              <NoData colspan={4} alert="No Reviews Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
