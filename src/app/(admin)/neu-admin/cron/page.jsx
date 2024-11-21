'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '@/components/AdminDashboard/Table';
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import Tablet from '@/components/AdminDashboard/Table/TD/Tablet';
import Popup from '@/components/AdminDashboard/Popup';
import TableNav from '@/components/AdminDashboard/TableNav';
import moment from 'moment'

const Page = () => {

  const [alerts, setAlerts] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [alertPopup,setAlertPopup] = useState(false)

  const FetchFaqs = async () => {
    setRowLoader(true);

    const getToastId = toast.loading('Retriving cron alerts...');
    try {
      fetch(`/api/admin/cron/?page=${page}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.crons.length > 0) {
                setPageCount(data.pagination.pageCount);
                setAlerts(data.crons);
                toast.update(getToastId, { type:'success', autoClose: 1000, isLoading: false });
            } else {
              toast.update(getToastId, { type: 'error', autoClose: 1000, isLoading: false });
            }
          }
          setRowLoader(false);
        });
    } catch (error) {
      toast.update(getToastId, { type: 'error', autoClose: 1000, isLoading: false });
    }
  };


  useEffect(() => {
    FetchFaqs();
  }, [page]);
  

  return (
    <>
      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <div className="mt-10 flex h-full w-full flex-col items-center">
        <Table header={['Alert', 'Body', 'Status', 'Created At']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : alerts?.length > 0 ? (
              alerts.map((alert, i) => (
                <Row Key={i}>
                  <Text text={alert.msg} />
                  <Text text={alert.body} />
                  <Tablet text={alert.status ? 'Success' : 'Failed'} />
                  <Text text={moment(alert.createdAt).format('YYYY-MM-DD HH:mm')} />
                </Row>
              ))
            ) : (
              <NoData colspan={4} alert="No Alerts Found!" />
            )}
          </Table>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </div>
      </div>
    </>
  );
};

export default Page;
