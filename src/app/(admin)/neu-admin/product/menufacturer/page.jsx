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
  const [data, setData] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(5);

  const DeleteModel = async (id) => {
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
        pending: 'Deleting ModelNo...', // Show pending message
        success: 'ModelNo deleted successfully!', // Show success message
        error: 'Failed to delete modelno', // Show error message
        closeOnClick: false,
        closeOnEscape: false,
      }
    );

    toast.update(delToastId, { type: toast.TYPE?.PENDING, autoClose: 1000, isLoading: true });

    await fetch('/api/admin/product/modelno', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
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

  const FetchData = async () => {
    setRowLoader(true);

    await fetch(`/api/admin/product/modelno?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPageCount(data.pagination.pageCount);
          setData(data.producttypes);
        } else {
          setData([]);
        }
        setRowLoader(false);
      });
  };

  // get team members data
  useEffect(() => {
    FetchData();
  }, [page]);

  // useEffect(() => {
  //   if (reRender) {
  //     FetchData();
  //     setReRender(false);
  //   }
  // }, [reRender]);

  return (
    <>
      <div className="mx-10 flex flex-col">
        <ActionBtns buttons={[{ type: 'link', text: 'Add Manufacturer', link: '/neu-admin/product/modelno/create' }]} />
        <div className="flex h-full w-full flex-col items-center">
          <Table header={['Thumbnail', 'Title', 'Model #', 'Actions']}>
            {rowLoader ? (
              <RowLoader count={5} />
            ) : data?.length > 0 ? (
              data.map((model, i) => (
                <Row Key={i}>
                  <TdImage src={model.thumbnail} css="w-20 h-14 object-fit rounded" />
                  <Text text={model.title} />
                  <Text text={model.model_no} />
                  <Actions id={model._id} handleDelete={DeleteModel} data={model} isEditLink={true} editLink={`/neu-admin/product/modelno/edit/${model._id}`} />
                </Row>
              ))
            ) : (
              <NoData colspan={5} alert="No Model # Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
