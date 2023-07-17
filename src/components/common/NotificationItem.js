import { BiCommentDetail } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import '../../styles/common/NotificationItem.css';
/*
  {
      "type": "COMMENT",
      "senderNickname": "kim",
      "createdAt": "1분 전",
      "detail": "제목은 요렇게"
  };
*/

export default function NotificationItem({item}) {
  console.log(item)
  return (
    <div className='notification-item'>
      <div className="item-header">
        <span className='header-left'>
          <BiCommentDetail />
          <span className='noti-type-text'>{convertNotificationTypeToMessageType(item.type)}</span>
          <span className='noti-date-gray'>{item.createdAt}</span>
        </span>
       
        <span className='header-right'>
          <FiTrash2 />
        </span>
      </div>
      <div className="item-body">
        {item.senderNickname + ", "+ convertNotificationTypeToMessageType(item.type) }
      </div>
    </div>
  )
}

function convertNotificationTypeToMessageType(notifcationType) {
  if (notifcationType === 'COMMENT' || notifcationType === 'REPLYCOMMENT')
    return '댓글';
  else if (notifcationType === 'MESSAGE')
    return '쪽지';
  else if (notifcationType === 'ACCOMPANY')
    return '동행';
  else 
    return '알림';
}