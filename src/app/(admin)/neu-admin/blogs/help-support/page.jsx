'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '@/components/AdminDashboard/Table';
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import TdImage from '@/components/AdminDashboard/Table/TD/TdImage';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns';
import TableNav from '@/components/AdminDashboard/TableNav';

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(3);

  //handel empty page request
  const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = blogs.filter((item) => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  };

  const DeleteBlog = async (id) => {
    if (!id) {
      toast.error('Blog id required!');
      return;
    }

    // Show pending toast
    const delToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Deleting Blog...', // Show pending message
        success: 'Blog deleted successfully!', // Show success message
        error: 'Failed to delete blog', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(delToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch('/api/admin/blog/help-support', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
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
        toast.update(delToastId, { type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
      });
  };

  const FetchBlogs = async () => {
    setRowLoader(true);

    // Show pending toast
    const getToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Getting Blogs...', // Show pending message
        success: 'Blogs retrived successfully!', // Show success message
        error: 'Failed to get Blogs', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(getToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch(`/api/admin/blog/help-support/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs.length > 0) {
          toast.update(getToastId, { render: data.message, type: toast.TYPE?.SUCCESS, autoClose: 1000, isLoading: false });
          setPageCount(data.pagination.pageCount);
          setBlogs(data.blogs);
        } else {
          toast.update(getToastId, { render: data.message, type: toast.TYPE?.ERROR, autoClose: 1000, isLoading: false });
          setBlogs([]);
        }
        setRowLoader(false);
      });
  };

  // get team members data
  useEffect(() => {
    FetchBlogs();
  }, [page]);

  useEffect(() => {
    if (reRender) {
      FetchBlogs();
      setReRender(false);
    }
  }, [reRender]);

  return (
    <>
      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns
          buttons={[
            { type: 'link', text: 'Add Blog', link: '/neu-admin/blogs/help-support/add-blog' },
            { type: 'link', text: 'Categories', link: '/neu-admin/blogs/help-support/categories' },
          ]}
        />
        <div className="mt-10 flex h-full w-full flex-col items-center">
          <Table header={['Title', 'Slug', 'Category', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : blogs?.length > 0 ? (
              blogs.map((blog, i) => (
                <Row Key={i}>
                  <Text text={blog.title} />
                  <Text text={blog.slug} />
                  <Text text={blog.joinedCategory.title} />
                  <Actions id={blog._id} handleDelete={DeleteBlog} data={blog} isEditLink={true} editLink={`/neu-admin/blogs/help-support/update-blog/${blog.slug}`} />
                </Row>
              ))
            ) : (
              <NoData colspan={4} alert="No Blogs Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
