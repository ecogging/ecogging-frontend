// useLoginModal.js
import { useState } from 'react';

const useLoginModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return { isLoginModalOpen, openLoginModal, closeLoginModal };
};

export default useLoginModal;