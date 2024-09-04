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
import moment from 'moment'

const Page = () => {
  const [createPopup, setCreatePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const updateFormRef = useRef(null);

  const [coupons, setCoupons] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(2);

  const [formData, setFormData] = useState({ id: '',code:'',description:'' ,type:'Percentage',value:''});
  const [types,setTypes] = useState(['Percentage','Flat'])

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValCoupon = Yup.object({
    code: Yup.string().required('Code is required!'),
    description: Yup.string().required('Description is required!'),
    type: Yup.string().required('Type is required!'),
    value: Yup.string().required('Value is required!'),
  });

  const CreateCoupon = async (e) => {
    e.preventDefault();

    try {
      await ValCoupon.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const crtToastId = toast.loading('Creating coupon...');

    fetch('/api/admin/coupon', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setFormData({ id: '',code:'',description:'' ,type:'',value:''});
          toast.update(crtToastId, {render:'Coupon created successfully!', type: 'success', autoClose: 1000, isLoading: false });
          setReRender(true);
          setCreatePopup(false);
        } else {
          toast.update(crtToastId, {render:resp.message ,type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(crtToastId, {render:'Something went wrong!' ,type:'error', autoClose: 1000, isLoading: false });
      });
  };

  const handleUpdatePopup = (data) => {
    const { _id, code,description,type,value } = data;
    setFormData({ id: _id, code:code,description:description,type:type,value:value });
    setUpdatePopup(true);
    setIsInitialLoad(true);
  };

  const UpValCoupon = Yup.object({
    id: Yup.string().required('id is required!'),
    code: Yup.string().required('Code is required!'),
    description: Yup.string().required('Description is required!'),
    type: Yup.string().required('Type is required!'),
    value: Yup.string().required('Value is required!'),
  });

  const UpdateCoupon = async (e) => {
    e.preventDefault();

    try {
      await UpValCoupon.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }
    // Show pending toast
    const updToastId = toast.loading('Updating coupon...');

    fetch('/api/admin/coupon', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setReRender(true);
          setFormData({ id: '', code:'', description:'' ,type:'',value:'' });
          setUpdatePopup(false);
          toast.update(updToastId, { render: resp.message, type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(updToastId, { render: resp.message, type: 'error', autoClose: 1000, isLoading: false });
        }
      }).catch((error)=>{
        toast.update(updToastId, { render: 'Something went wrong!', type: 'error', autoClose: 1000, isLoading: false });
      });
  };

  //handel empty page request
  const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = coupons.filter((item) => item.id !== id);
    // Calculate the total number of pages after deletion
    const newPageCount = Math.ceil(newData.length / limit);
    // If the current page is greater than the new page count, decrement the page
    if (page > newPageCount && page > 1) {
      setPage(page - 1);
    }
    setPageCount(newPageCount);
  };

  const DeleteCoupon = async (id) => {
    if (!id) {
      toast.error('Coupon id required!');
      return;
    }

    // Show pending toast
    const delToastId = toast.loading('Deleting coupon...');

    fetch('/api/admin/coupon', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          ManagePageCount(id);
          setReRender(true);
          toast.update(delToastId, { render: resp.message, type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, {render:resp.message, type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(delToastId, {render:'Something went wrong!' ,type: 'error', autoClose: 3000, isLoading: false });
      });
  };

  const FetchCoupons = async () => {
    setRowLoader(true);

    // Show pending toast
    const getToastId = toast.loading('Getting coupons...');

    fetch(`/api/admin/coupon/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.coupons.length > 0) {
          toast.update(getToastId, { render: data.message, type:'success', autoClose: 1000, isLoading: false });
          setPageCount(data.pagination.pageCount);
          setCoupons(data.coupons);
        } else {
          toast.update(getToastId, { render: data.message, type:'error', autoClose: 1000, isLoading: false });
          setCoupons([]);
        }
        setRowLoader(false);
      }).catch((error)=>{
        toast.update(getToastId, { render: 'Something went wrong!', type:'error', autoClose: 1000, isLoading: false });
      });
  };

  // get team members data
  useEffect(() => {
    FetchCoupons();
  }, [page]);

  useEffect(() => {
    if (reRender) {
      FetchCoupons();
      setReRender(false);
    }
  }, [reRender]);

  return (
    <>
      <Popup state={createPopup} setState={setCreatePopup}>
        <form onSubmit={CreateCoupon} className="mx-10 flex w-full flex-col py-5">
          <h1 className="text-center text-xl font-semibold">Create Coupon</h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Code
              </label>
              <input name="code" value={formData.code} onChange={HandleChange} type="text" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Type
              </label>
              <select onChange={(e)=>btn.setState(e.target.value)} className='h-10 text-sm border-2 border-gray-200 rounded-md w-full' >
               {types.map((type,i)=> (
                <option key={i} value={type} >{type}</option>
               ))}
              </select>
            </div>
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Value
              </label>
              <input name="value" value={formData.value} onChange={HandleChange} type="text" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="review" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Description
              </label>
              <textarea name="description" value={formData.description} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <Popup state={updatePopup} setState={setUpdatePopup}>
        <form ref={updateFormRef} onSubmit={UpdateCoupon} className="mx-10 flex w-full flex-col">
          <h1 className="text-center text-xl font-semibold">Update Coupon </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Code
              </label>
              <input name="code" value={formData.code} onChange={HandleChange} type="text" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Type
              </label>
              <select onChange={(e)=>btn.setState(e.target.value)} className='h-10 text-sm border-2 border-gray-200 rounded-md w-full' >
               <option value={formData.type} >{formData.type}</option>
               {types.filter((type)=>type != formData.type).map((type,i)=> (
                <option key={i} value={type} >{type}</option>
               ))}
              </select>
            </div>
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Value
              </label>
              <input name="value" value={formData.value} onChange={HandleChange} type="text" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="review" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Description
              </label>
              <textarea name="description" value={formData.description} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns buttons={[{ type: 'trigger', trigger: setCreatePopup, text: 'Add Coupon' }]} />
        <div className="mt-10 flex h-full w-full flex-col items-center">
          <Table header={['Code', 'Description', 'Type', 'Value','Created At', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : coupons?.length > 0 ? (
              coupons.map((coupon, i) => (
                <Row Key={i}>
                  <Text text={coupon.code} />
                  <Text text={coupon.description} />
                  <Text text={coupon.type} />
                  <Tablet text={coupon.value} />
                  <Text text={moment(coupon.createdAt).format('YYYY-MM-DD HH:mm')} />
                  <Actions id={coupon._id} handleDelete={DeleteCoupon} data={coupon} handleEdit={handleUpdatePopup} />
                </Row>
              ))
            ) : (
              <NoData colspan={4} alert="No Coupons Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
