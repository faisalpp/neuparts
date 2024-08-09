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
  const [limit, setLimit] = useState(2);

  const FetchBlogs = async () => {
    setRowLoader(true);

    fetch(`/api/admin/blog/appliance-tips/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs.length > 0) {
          setBlogs([]);
          // setPageCount(data.pagination.pageCount)
          // setBlogs(data.blogs)
        } else {
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
        {/* <ActionBtns buttons={[{type:'link',text:'Add Blog',link:'/neu-admin/blogs/appliance-tips/add-blog'},{type:'link',text:'Categories',link:'/neu-admin/blogs/appliance-tips/categories'}]}  /> */}
        <div className="mt-10 flex h-full w-full flex-col items-center">
          <Table header={['Thumbnail', 'Product Title', 'Slug', 'Category', 'Actions']}>
            {/* hello pengea/dnd */}
            {rowLoader ? (
              <RowLoader count={5} />
            ) : blogs?.length > 0 ? (
              blogs.map((blog, i) => (
                <Row Key={i}>
                  <TdImage src={blog.thumbnail} css="w-20 h-14 object-fit rounded" />
                  <Text text={blog.title} />
                  <Text text={blog.slug} />
                  <Text text={blog.joinedCategory.title} />
                  <Actions id={blog._id} handleDelete={DeleteBlog} data={blog} isEditLink={true} editLink={`/neu-admin/blogs/appliance-tips/update-blog/${blog.slug}`} />
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
