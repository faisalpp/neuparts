'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Table from '@/components/AdminDashboard/Table';
import Row from '@/components/AdminDashboard/Table/Row';
import RowLoader from '@/components/AdminDashboard/Table/Loader';
import Text from '@/components/AdminDashboard/Table/TD/Text';
import NoData from '@/components/AdminDashboard/Table/NoData';
import Tablet from '@/components/AdminDashboard/Table/TD/Tablet';
import TdImage from '@/components/AdminDashboard/Table/TD/TdImage';
import DND from '@/components/AdminDashboard/Table/TD/Dnd';
import Actions from '@/components/AdminDashboard/Table/TD/Actions';
import ActionBtns from '@/components/AdminDashboard/ActionBtns';
import TableNav from '@/components/AdminDashboard/TableNav';
import Popup from '@/components/AdminDashboard/Popup';
import MediaPopup from '@/components/AdminDashboard/MediaPopup';
import * as Yup from 'yup';
import { limitString } from '@/utils/index';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const Page = () => {
  const [createPopup, setCreatePopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [mediaPopup, setMediaPopup] = useState(false);

  const [teamMembers, setTeamMembers] = useState([]);
  const [rowLoader, setRowLoader] = useState(true);
  const [reRender, setReRender] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const [formData, setFormData] = useState({ id: '', name: '', bio: '', role: '', avatar: '' });
  const [files, setFiles] = useState([]);

  const ResetFormData = () => {
    setFormData({ id: '', name: '', bio: '', role: '', avatar: '' });
  };

  useEffect(() => {
    if (files.length > 0) {
      setFormData({ ...formData, avatar: files[0].url });
    }
  }, [files]);

  const HandleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ValMember = Yup.object({
    name: Yup.string().required('Name is required!'),
    bio: Yup.string().required('Bio is required!'),
    role: Yup.string().required('Role is required!'),
    avatar: Yup.string().required('Avatar is required!'),
  });

  const CreateTeamMember = async (e) => {
    e.preventDefault();

    try {
      await ValMember.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    const crtToastId = toast.loading('Creating Team Member...')

    fetch('/api/admin/team-member', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
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
        toast.update(crtToastId, { type:'error', autoClose: 1000, isLoading: false });
      });
  };

  const upValMember = Yup.object({
    id: Yup.string().required('Id is required!'),
    name: Yup.string().required('Name is required!'),
    bio: Yup.string().required('Bio is required!'),
    role: Yup.string().required('Role is required!'),
    avatar: Yup.string().required('Avatar is required!'),
  });

  const handleUpdatePopup = (data) => {
    const { _id, name, bio, avatar, role } = data;
    setFormData({ id: _id, name: name, bio: bio, avatar: avatar, role: role });
    setUpdatePopup(true);
  };

  const UpdateTeamMember = async (e) => {
    e.preventDefault();

    try {
      await upValMember.validate(formData, { abortEarly: false });
    } catch (error) {
      error?.inner?.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    // Show pending toast
    const updToastId = toast.loading('Updating Team Member...')

    fetch('/api/admin/team-member', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          setReRender(true);
          ResetFormData();
          setUpdatePopup(false);
          toast.update(updToastId, { render: resp.message, type:'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(updToastId, { type:'error', autoClose: 1000, isLoading: false });
        }
      });
  };

  //handel empty page request
  const ManagePageCount = (id) => {
    // Filter out the deleted item from the data
    const newData = teamMembers.filter((item) => item.id !== id);
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
      toast.error('Team Member id required!');
      return;
    }

    // Show pending toast
    const delToastId = toast.loading('Deleting Team Member...')

    fetch('/api/admin/team-member', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          ManagePageCount(id);
          setReRender(true);
          toast.update(delToastId, { render: resp.message, type: 'success', autoClose: 1000, isLoading: false });
        } else {
          toast.update(delToastId, { type: 'error', autoClose: 1000, isLoading: false });
        }
      })
      .catch((error) => {
        toast.update(delToastId, { type: 'error', autoClose: 1000, isLoading: false });
      });
  };

  const FetchTeamMembers = async () => {
    setRowLoader(true);

    // Show pending toast
    const getToastId = toast.loading('Getting Team Member...')

    fetch(`/api/admin/team-member/?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.members.length > 0) {
          toast.update(getToastId, { render: data.message, type:'success', autoClose: 1000, isLoading: false });
          setPageCount(data.pagination.pageCount);
          setTeamMembers(data.members);
        } else {
          toast.update(getToastId, { render: data.message, type: 'error', autoClose: 1000, isLoading: false });
          setTeamMembers([]);
        }
        setRowLoader(false);
      });
  };

  // get team members data
  useEffect(() => {
    FetchTeamMembers();
  }, [page]);

  useEffect(() => {
    if (reRender) {
      FetchTeamMembers();
      setReRender(false);
    }
  }, [reRender]);

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
    const updatedTeamMembers = Array.from(teamMembers);

    // Optimistically update the state
    const [removed] = updatedTeamMembers.splice(sourceIndex, 1);
    updatedTeamMembers.splice(destinationIndex, 0, removed);

    updatedTeamMembers.forEach((member, index) => {
      member.index = index;
    });

    setTeamMembers(updatedTeamMembers);
  };

  return (
    <>
      <MediaPopup state={mediaPopup} setState={setMediaPopup} setFiles={setFiles} isMultiple={false} />
      <Popup state={createPopup} setState={setCreatePopup}>
        <form onSubmit={CreateTeamMember} className="mx-10 flex w-full flex-col">
          <h1 className="text-center text-xl font-semibold">Create Team Member </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Name
              </label>
              <input name="name" value={formData.name} onChange={HandleChange} type="text" placeholder="John Doe" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Bio
              </label>
              <textarea name="bio" value={formData.bio} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <div>
              <label htmlFor="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Role
              </label>
              <input name="role" value={formData.role} onChange={HandleChange} type="text" placeholder="CEO" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Avatar
              </label>
              <div className="flex rounded-md border border-gray-500 px-3 py-2">
                <input readOnly name="avatar" value={formData.avatar} type="text" placeholder="Select Single File" className="block w-6/12 w-full rounded-lg bg-gray-500 bg-white px-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-500" />
                <button type="button" onClick={() => setMediaPopup(true)} className="rounded-md bg-b4 px-4 py-1 text-white">
                  Select
                </button>
              </div>
            </div>
            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <Popup state={updatePopup} setState={setUpdatePopup}>
        <form onSubmit={UpdateTeamMember} className="mx-10 flex w-full flex-col">
          <h1 className="text-center text-xl font-semibold">Update Team Member </h1>

          <div className="flex flex-col gap-3 py-10">
            <div>
              <label htmlFor="username" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Name
              </label>
              <input name="name" value={formData.name} onChange={HandleChange} type="text" placeholder="John Doe" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Bio
              </label>
              <textarea name="bio" value={formData.bio} onChange={HandleChange} className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"></textarea>
            </div>
            <div>
              <label htmlFor="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Role
              </label>
              <input name="role" value={formData.role} onChange={HandleChange} type="text" placeholder="CEO" className="mt-2  block w-full rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300" />
            </div>
            <div>
              <label htmlFor="role" className="block text-base font-semibold text-gray-800 dark:text-gray-300">
                Avatar
              </label>
              <div className="flex rounded-md border border-gray-500 px-3 py-2">
                <input readOnly name="avatar" value={formData.avatar} type="text" placeholder="Select Single File" className="block w-6/12 w-full rounded-lg bg-gray-500 bg-white px-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:placeholder-gray-500" />
                <button type="button" onClick={() => setMediaPopup(true)} className="rounded-md bg-b4 px-4 py-1 text-white">
                  Select
                </button>
              </div>
            </div>

            <button className="text-md mt-3 w-fit transform self-center rounded-lg bg-blue-600 px-6 py-3 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">Submit</button>
          </div>
        </form>
      </Popup>

      <div className="mx-10 flex flex-col" style={{ height: 'calc(100vh - 100px)' }}>
        <ActionBtns buttons={[{ type: 'trigger', trigger: setCreatePopup, text: 'Add Member' }]} />
        <DragDropContext onDragEnd={HandleDragEvent} className="mt-10 flex h-full w-full flex-col items-center">
          <Droppable droppableId="teams">
            {(droppableProvided) => (
              <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="w-full">
                <Table header={['Avatar', 'Name', 'Bio', 'Role', 'Actions', '']}>
                  {rowLoader ? (
                    <RowLoader count={5} rows={10} />
                  ) : teamMembers?.length > 0 ? (
                    teamMembers.map((member, i) => (
                      <Draggable key={member._id} draggableId={member._id} index={i}>
                        {(provided) => (
                          <Row key={i} isDragable={true} Ref={provided.innerRef} draggableProps={provided.draggableProps}>
                            <TdImage src={member.avatar} css="w-20 h-16 object-fit rounded-full" />
                            <Text text={member.name} />
                            <Text text={limitString(member.bio, 200)} />
                            <Tablet text={member.role} />
                            <Actions id={member._id} handleDelete={DeleteTeamMember} data={member} handleEdit={handleUpdatePopup} />
                            <DND provider={provided} />
                          </Row>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <NoData colspan={4} alert="No Team Members Found!" />
                  )}
                  {droppableProvided.placeholder}
                </Table>
              </div>
            )}
          </Droppable>
          {pageCount > 1 ? <TableNav page={page} setPage={setPage} pageCount={pageCount} /> : null}
        </DragDropContext>
      </div>
    </>
  );
};

export default Page;
