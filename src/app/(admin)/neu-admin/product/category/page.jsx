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
  const [categories, setCategories] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(2);

  const DeleteCategory = async (id) => {
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
        pending: 'Deleting Category...', // Show pending message
        success: 'Category deleted successfully!', // Show success message
        error: 'Failed to delete category', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(delToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    fetch('/api/admin/product/category', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
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

    fetch(`/api/admin/product/category?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.categories.length > 0) {
          setPageCount(data.pagination.pageCount);
          setCategories(data.categories);
        } else {
          setCategories([]);
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
        <ActionBtns buttons={[{ type: 'link', text: 'Add Category', link: '/neu-admin/product/category/create' }]} />
        <div className="flex h-full w-full flex-col items-center">
          <Table header={['Product Title', 'Slug', 'Category', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : categories?.length > 0 ? (
              categories.map((category, i) => (
                <Row Key={i}>
                  <Text text={category.title} />
                  <Text text={category.slug} />
                  <Text text={category.isvisible ? 'Yes' : 'No'} />
                  <Actions id={category._id} handleDelete={DeleteCategory} data={category} isEditLink={true} editLink={`/neu-admin/product/category/edit/${category._id}`} />
                </Row>
              ))
            ) : (
              <NoData colspan={5} alert="No Product Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;