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

  const [selectedType, setSelectedType] = useState("ALL");

  const handleNotificationTypeFilter = (type) => {
    setSelectedType(type);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleNotificationDelete = (id) => {
    // Update the state locally by removing the item
    const updatedNotifications = notifications.filter(item => item.id !== id);
    setNotifications(updatedNotifications);

    // Make the API call to request deletion from the backend
    axios.delete(`${notificaionBaseEndPoint}/${id}`)
      .then(response => {
        // do nothing after delete
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [notifications]);

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

      console.log('----')
      console.log(notifications)
      console.log(getMaxValueOfKeyInArrayObect(notifications, 'id'))
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

  const filteredNotifications = 
  selectedType === "ALL" 
  ? notifications 
  : notifications.filter(item => {
    if (item.type === 'REPLYCOMMENT') {
      return 'COMMENT' === selectedType;
    }
    return item.type === selectedType;
  }
  );

  return (
    <div className='notification-modal' ref={modalRef}>
        <div className="modal-header">
            <h3>알림</h3>
        </div>

        <div className="modal-body">

            <div className="notification-type-select">
              <MyButton text={'전체'} type={'mintXSmall'}
                onClick={() => handleNotificationTypeFilter('ALL')}>
              </MyButton>
              <MyButton text={'동행'} type={'whiteGrayXSmall'}
                onClick={() => handleNotificationTypeFilter('ACCOMPANY')}>
              </MyButton>
              <MyButton text={'댓글'} type={'whiteGrayXSmall'}
                onClick={() => handleNotificationTypeFilter('COMMENT')}>
              </MyButton>
              <MyButton text={'쪽지'} type={'whiteGrayXSmall'}
                onClick={() => handleNotificationTypeFilter('MESSAGE')}>
              </MyButton>
            </div>
            <div className="notifcation-list">
              {
                filteredNotifications.map(noti => 
                  <NotificationItem item={noti} key={noti.id} deleteHandler={handleNotificationDelete}/>
                )
              }
            </div>

        </div>
    </div>
  );
}