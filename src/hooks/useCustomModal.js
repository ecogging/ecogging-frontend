// useLoginModal.js
import { useState } from 'react';

const useCustomModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return [isModalOpen, openModal, closeModal];
};

export default useCustomModal;