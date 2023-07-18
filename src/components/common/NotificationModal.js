import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import NotificationItem from './NotificationItem';

import '../../styles/common/NotificationModal.css';

import { getCookie } from '../../utils/CookieUtil';
import axios from 'axios';
import MyButton from '../common/MyButton';

import { isValidAxiosResponse, getMaxValueOfKeyInArrayObect } from '../../utils/CustomUtil';

export default function NotificationModal({ isOpen, closeModal }) {
  const notificaionBaseEndPoint = 'http://localhost:8080/notifications';
  const modalRef = useRef(null);

  const [notifications, setNotifications] = useState([]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('request noti')
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = () => {
    axios
      .get(notificaionBaseEndPoint, {
        headers: {
          'Authorization': 'Bearer ' + getCookie('access-token'),
          'Content-Type': 'application/json',
          'Last-Received-Noti-Id': getMaxValueOfKeyInArrayObect(notifications, 'id')
        },
      })
      .then(response => {
        // Process the received data and save it in the state
        if (!isValidAxiosResponse(response))
          return;

        setNotifications([...notifications, ...response.data]);
      })
      .catch(error => {
        console.error(error);
      });
  };


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
                notifications.map(noti => 
                  <NotificationItem item={noti} key={noti.id}/>
                )
              }
            </div>

        </div>
    </div>
  );
}