import React from 'react';
import NeuShieldPopup from '../NeuShieldPopup';
import FreeCurbsideReturn from '../FreeCurbsideReturn';
import CompleteLaundary from '../CompleteLaundary';
import CosmaticPopup from '../CosmaticPopup';

const CustomModal = ({ openModal, closeModal, data }) => {
  return <>{openModal ? <CosmaticPopup data={data} closeModal={closeModal} /> : null}</>;
};

export default CustomModal;
