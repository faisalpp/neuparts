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
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState('');
  const [by, setBy] = useState('all');

  const DeleteCategory = async (id) => {
    if (!id) {
      toast.error('Sub Category id required!');
      return;
    }

    // Show pending toast
    const delToastId = toast.promise(
      new Promise((resolve) => {
        // Placeholder promise that resolves when request completes
        setTimeout(resolve, 1000); // Show for 3 seconds or until resolved
      }),
      {
        pending: 'Deleting Part Type...', // Show pending message
        success: 'Part type deleted successfully!', // Show success message
        error: 'Failed to delete part type', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(delToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    await fetch('/api/admin/product/parttype', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
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

  const FetchCategory = async () => {
    setRowLoader(true);
    await fetch(`/api/admin/product/parttype?page=${page}&limit=${limit}&search=${search}&by=${by}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPageCount(data.pagination.pageCount);
          setCategories(data.producttypes);
        } else {
          setCategories([]);
        }
        setRowLoader(false);
      });
  };

  // get team members data
  useEffect(() => {
    FetchCategory();
  }, [page]);

  // useEffect(() => {
  //   if (reRender) {
  //     FetchCategory();
  //     setReRender(false);
  //   }
  // }, [reRender]);

  return (
    <>
      <div className="mx-10 flex flex-col">
        <ActionBtns buttons={[{ type: 'link', text: 'Add Part Type', link: '/neu-admin/product/parttype/create' },{type:'search',placeholder:'Type here to search by title',field:search,setField:setSearch,search:FetchCategory}]} />
        <div className="flex h-full w-full flex-col items-center">
          <Table header={['Thumbnail', 'Product Title', 'Slug', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : categories?.length > 0 ? (
              categories.map((category, i) => (
                <Row Key={i}>
                  <TdImage src={category.thumbnail} css="w-20 h-14 object-fit rounded" />
                  <Text text={category.title} />
                  <Text text={category.slug} />
                  <Actions id={category._id} handleDelete={DeleteCategory} data={category} isEditLink={true} editLink={`/neu-admin/product/parttype/edit/${category._id}`} />
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
