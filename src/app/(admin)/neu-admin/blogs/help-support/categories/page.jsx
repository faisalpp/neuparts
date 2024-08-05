'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '@/components/AdminDashboard/Table';
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns';
import TableNav from '@/components/AdminDashboard/TableNav';
import Popup from '@/components/AdminDashboard/Popup';
import DND from '@/components/AdminDashboard/Table/TD/Dnd';
import * as Yup from 'yup';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const Page = () => {
  const [createPopup, setCreatePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);

  const [cats, setCats] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(2);

  const [formData, setFormData] = useState({ id: '', title: '' });

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValCat = Yup.object({
    title: Yup.string().required('Title is required!'),
  });

  const CreateCategory = async (e) => {
    e.preventDefault();

    try {
      await ValCat.validate(formData, { abortEarly: false });
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
        pending: 'Creating Blog Category...', // Show pending message
        success: 'Blog category created successfully!', // Show success message
        error: 'Failed to create blog category', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(crtToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch('/api/admin/blog/help-support/category', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp.success) {
          ResetFormData();
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
    const { _id, title } = data;
    setFormData({ id: _id, title: title });
    setUpdatePopup(true);
  };

  const UpValCat = Yup.object({
    id: Yup.string().required('Id is required!'),
    title: Yup.string().required('Title is required!'),
  });

  const UpdateFaqCat = async (e) => {
    e.preventDefault();

    try {
      await UpValCat.validate(formData, { abortEarly: false });
    } catch (error) {
      console.log(error);
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
    }

    // Show pending toast
    const updToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Updating blog category...', // Show pending message
        success: 'Blog category update successfully!', // Show success message
        error: 'Failed to update blog category', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );
    toast.update(updToastId, { type: 'info', autoClose: 1000, isLoading: true });

    fetch('/api/admin/blog/help-support/category', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setReRender(true);
          ResetFormData();
          setUpdatePopup(false);
          toast.update(updToastId, { render: resp.message, type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(updToastId, { render: resp.message, type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(updToastId, { render: resp.message, type: 'error', autoClose: 1000, isLoading: false });
      });
  };

  //handel empty page request
  const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = cats.filter((item) => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  };

  const DeleteCat = async (id) => {
    if (!id) {
      toast.error('Category id required!');
      return;
    }

    // Show pending toast
    const delToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        info: 'Deleting blog category...', // Show pending message
        success: 'Blog category deleted successfully!', // Show success message
        error: 'Failed to delete blog category', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(delToastId, { type: 'info', autoClose: 1000, isLoading: true });

    fetch('/api/admin/blog/help-support/category', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          ManagePageCount(id);
          setReRender(true);
          toast.update(delToastId, { type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, { type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(delToastId, { type: 'error', autoClose: 3000, isLoading: false });
      });
  };

  const FetchCats = async () => {
    setRowLoader(true);

    // Show pending toast
    const getToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        info: 'Getting blog categories...', // Show pending message
        success: 'Blog categories retrived successfully!', // Show success message
        error: 'Failed to get blog categories', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(getToastId, { type: 'info', autoClose: 1000, isLoading: true });
    try {
      fetch(`/api/admin/blog/help-support/category/?page=${page}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.cats?.length > 0) {
            toast.update(getToastId, { type: 'success', autoClose: 1000, isLoading: false });
            setPageCount(data.pagination.pageCount);
            setCats(data.cats);
          } else {
            toast.update(getToastId, { type: 'error', autoClose: 1000, isLoading: false });
            setCats([]);
          }
          setRowLoader(false);
        });
    } catch (error) {
      toast.update(getToastId, { type: 'error', autoClose: 1000, isLoading: false });
    }
  };

  // get team members data
  useEffect(() => {
    FetchCats();
  }, [page]);

  useEffect(() => {
    if (reRender) {
      FetchCats();
      setReRender(false);
    }
  }, [reRender]);

  const ResetFormData = () => {
    setFormData({ id: '', title: '' });
  };

  useEffect(() => {
    if (!createPopup) {
      ResetFormData();
    }
  }, [createPopup]);

  useEffect(() => {
    if (!updatePopup) {
      ResetFormData();
    }
  }, [updatePopup]);

  const HandleDragEvent = async (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Create a copy of the team members array
    const updatedcats = Array.from(cats);

    // Optimistically update the state
    const [removed] = updatedcats.splice(sourceIndex, 1);
    updatedcats.splice(destinationIndex, 0, removed);

    updatedcats.forEach((member, index) => {
      member.index = index;
    });

    setCats(updatedcats);
  };

  return (
    <>
      <Popup state={createPopup} setState={setCreatePopup}>
        <form onSubmit={CreateCategory} className="mx-10 flex w-full flex-col py-5">
          <h1 className="text-center text-xl font-semibold">Create Category </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label for="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Title
              </label>
              <input name="title" value={formData.title} onChange={HandleChange} type="text" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>

            <button class="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <Popup state={updatePopup} setState={setUpdatePopup}>
        <form onSubmit={UpdateFaqCat} className="mx-10 flex w-full flex-col">
          <h1 className="text-center text-xl font-semibold">Update Category </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label for="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Name
              </label>
              <input name="title" value={formData.title} onChange={HandleChange} type="text" placeholder="Lorem ipsum?" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>

            <button class="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns buttons={[{ type: 'trigger', trigger: setCreatePopup, text: 'Add Blog Category' }]} />
        <DragDropContext onDragEnd={HandleDragEvent} className="mt-10 flex h-full w-full flex-col items-center">
          <Droppable droppableId="cats">
            {(droppableProvided) => (
              <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="w-full">
                <Table header={['Title', 'slug', 'Actions']}>
                  {/* hello pengea/dnd */}
                  {rowLoader ? (
                    <RowLoader />
                  ) : cats?.length > 0 ? (
                    cats.map((cat, i) => (
                      <Draggable key={cat._id} draggableId={cat._id} index={i}>
                        {(provided) => (
                          <Row isDragable={true} Ref={provided.innerRef} draggableProps={provided.draggableProps}>
                            <Text text={cat.title} />
                            <Text text={cat.slug} />
                            <Actions id={cat._id} handleDelete={DeleteCat} data={cat} handleEdit={handleUpdatePopup} />
                            <DND provider={provided} />
                          </Row>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <NoData colspan={4} alert="No Categories Found!" />
                  )}
                </Table>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
      </div>
    </>
  );
};

export default Page;
