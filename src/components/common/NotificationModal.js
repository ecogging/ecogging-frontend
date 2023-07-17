import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import NotificationItem from './NotificationItem';

import '../../styles/common/NotificationModal.css';

import axios from 'axios';
import MyButton from '../common/MyButton';

export default function NotificationModal({ isOpen, closeModal }) {
  const notificaionBaseEndPoint = 'http://localhost:8080/notifications';
  const modalRef = useRef(null);

  const [notifcations, setNotifications] = useState([]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const notificationExample = {
    "type": "COMMENT",
    "senderNickname": "kim",
    "createdAt": "1분 전",
    "detail": "제목은 요렇게"
  };

  const notifcationList = [
    notificationExample,
    notificationExample,
    notificationExample,
    notificationExample,
    notificationExample,
    notificationExample,
    notificationExample,
    notificationExample,
    notificationExample,
    notificationExample
  ]

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 모달 끄기 
  // modal on/off
  if (!isOpen) return null;

  return (
    <div className='notification-modal' ref={modalRef}>
        <div className="modal-header">
            <h3>알림</h3>
        </div>

        <div className="modal-body">

            <div className="notification-type-select">
              <MyButton text={'전체'} type={'mintXSmall'}></MyButton>
              <MyButton text={'동행'} type={'whiteGrayXSmall'}></MyButton>
              <MyButton text={'댓글'} type={'whiteGrayXSmall'}></MyButton>
              <MyButton text={'쪽지'} type={'whiteGrayXSmall'}></MyButton>
            </div>
            <div className="notifcation-list">
              {
                notifcationList.map(noti => 
                  <NotificationItem item={noti} />
                )
              }
            </div>

        </div>
    </div>
  );
}