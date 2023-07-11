import { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

import MyButton from '../common/MyButton';
import '../../styles/common/UserLoginModal.css'

function UserLoginModal({setModalOpen}) {

    const modalRef = useRef(null);

    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
        <div className="modal-container" ref={modalRef}>
            <Button className="modal-close" onClick={closeModal}>
                X
            </Button>
            <div className="modal-content">
              <p>모달창입니다.</p>
            </div>
            
        </div>
    );


}

export default UserLoginModal;