import React from 'react';
import CosmaticPopup from '../CosmaticPopup';

const CustomModal = ({ openModal, closeModal, data }) => {
  return <>{openModal ? <CosmaticPopup data={data} closeModal={closeModal} /> : null}</>;
};

export default CustomModal;
