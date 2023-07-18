import { FiTrash2 } from 'react-icons/fi';
import {
  getCommentNotificationItem, getMessageNotificationItem, getAccompanyNotificationItem} from './NotificationItemBuilder';
import '../../styles/common/NotificationItem.css';
/*
  {
      "type": "COMMENT",
      "senderNickname": "kim",
      "createdAt": "1분 전",
      "detail": "제목은 요렇게"
  };
*/

export default function NotificationItem({item, deleteHandler}) {
  if (item == null || !item) return;
  const {icon, typeName, content} = 
  getNotiItem(item) ||  { icon: "-", typeName: "-", content: "-" };


  return (
    <div className='notification-item'>
      <div className="item-header">
        <span className='header-left'>
          {icon}
          <span className='noti-type-text'>{typeName}</span>
          <span className='noti-date-gray'>{item.createdAt}</span>
        </span>
       
        <span className='header-right'>
          {<FiTrash2 onClick={() => deleteHandler(item.id)}/>}
        </span>
      </div>
      <div className="item-body">
        {content}
      </div>
    </div>
  )
}

function getNotiItem(item) {
  const type = item.type;
  if (type === 'COMMENT' || type === 'REPLYCOMMENT')
    return getCommentNotificationItem(item);
  if (type === 'MESSAGE')
    return getMessageNotificationItem(item);
  if (type === 'ACCOMPANY')
    return getAccompanyNotificationItem(item);
}