import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import NotificationItem from './NotificationItem';

import '../../styles/common/NotificationModal.css';

import { getCookie } from '../../utils/CookieUtil';
import axios from 'axios';
import MyButton from '../common/MyButton';

import { IoNotificationsOffOutline } from 'react-icons/io5'

import { isValidAxiosResponse, getMaxValueOfKeyInArrayObect } from '../../utils/CustomUtil';

export default function NotificationModal({ isOpen, closeModal, setHasUnReadNotifications }) {
  const notificationBaseEndPoint = 'http://localhost:8080/notifications';
  const modalRef = useRef(null);

  const [notifications, setNotifications] = useState([]);

  const [selectedType, setSelectedType] = useState("ALL");

  const handleNotificationTypeFilter = (type) => {
    setSelectedType(type);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      const targetClassName = event.target.className;
      const {baseVal} = targetClassName;
      if (baseVal === 'headerNotify' || targetClassName === 'headerNotify')
        return;
      
      closeModal();
    }
  };

  const deleteNotificationById = (id) => {
    setNotifications(notifications.filter(noti => noti.id !== id));
  }

  const handleNotificationDelete = (id) => {
    // Update the state locally by removing the item
    deleteNotificationById(id);
    
    // Make the API call to request deletion from the backend
    axios.delete(`${notificationBaseEndPoint}/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + getCookie('access-token')
      },
    }).then(response => {
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
  }, []);


  const setNotificationReadById = (id) => {
    setNotifications(notifications &&
      notifications.map(noti => (noti.id === id )
        ? { ...noti, read: true } 
        : noti));
  }

  const handleNotificationItemClick = (id) => {
    closeModal();
                                    
    setNotificationReadById(id);

    axios
      .post(`${notificationBaseEndPoint}/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + getCookie('access-token'),
        },
      })
      .then()
      .catch(error => {
        console.error(error);
      });
      
  }

  const setNotificationsAfterSort= (inputArray) => {
    setNotifications(inputArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  }

  const fetchData = () => {
    axios
      .get(notificationBaseEndPoint, {
        headers: {
          'Authorization': 'Bearer ' + getCookie('access-token'),
          'Content-Type': 'application/json',
          'Last-Received-Noti-Id': getMaxValueOfKeyInArrayObect(notifications, 'id')
        },
      })
      .then(response => {
        // console.log("resp");
        console.log(response.data);
        // Process the received data and save it in the state
        if (!isValidAxiosResponse(response))
          return;

        setNotificationsAfterSort([...notifications, ...response.data]);
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

  const filteredNotifications = 
    selectedType === "ALL" 
      ? notifications 
      : notifications.filter(item => {
          if (item.type === 'REPLYCOMMENT') {
            return 'COMMENT' === selectedType;
          }
          return item.type === selectedType;
      })

  let buttonTextObject = [
    {
      type: 'ALL',
      name: '전체'
    },
    {
      type: 'ACCOMPANY',
      name: '동행'
    },
    {
      type: 'COMMENT',
      name: '댓글'
    },
    {
      type: 'MESSAGE',
      name: '쪽지'
    }
  ];

  const checkUnReadExist = () => {
    setHasUnReadNotifications(!!notifications.find(n => n.read == false));
  }

  useEffect(()=> {
    checkUnReadExist();
  },[notifications])

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
              {
                buttonTextObject.map((bt) => 
                  <MyButton 
                    key={bt.type} 
                    text={bt.name} 
                    type={selectedType === bt.type ? 'mintXSmall' : 'whiteGrayXSmall'}
                    onClick={() => {
                      handleNotificationTypeFilter(bt.type)
                    }}
                  />
                )
              }
            </div>
            <div className="notifcation-list">
              {
                filteredNotifications &&
                  (filteredNotifications.length > 0 ? filteredNotifications.map(noti => 
                      <NotificationItem
                        item={noti}
                        key={noti.id}
                        deleteHandler={handleNotificationDelete}
                        clickHandler={handleNotificationItemClick}/>
                    )
                    :
                    <div id="no-noti-message">
                      <IoNotificationsOffOutline id="no-noti-icon" size="40"></IoNotificationsOffOutline>
                      <p id="no-noti-text">새로운 알림이 없습니다.</p>
                    </div>
                  )
              }
            </div>

        </div>
    </div>
  );
}