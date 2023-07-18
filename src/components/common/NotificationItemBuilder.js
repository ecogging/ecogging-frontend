import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { GoPeople } from 'react-icons/go';

function getCommentNotificationItem(item) {

  const icon = <BiCommentDetail />;
  const typeName = '댓글';
  const content = 
    item.type === "COMMENT" ?
      (<p>
        <b>[{item.detail}]</b> 글에 <b>댓글</b>이 달렸습니다.
      </p>)
      :
      (<p>
        댓글에 <b>대댓글</b>이 달렸습니다.
      </p>);

  return {icon, typeName, content};
}

function getMessageNotificationItem(item) {

  const icon = <AiOutlineMail />;
  const typeName = '쪽지';
  const content = 
  <p>
    <b>{item.senderNickname}</b> 님이 쪽지를 보냈습니다.
  </p>
  return {icon, typeName, content} 
}

function getAccompanyNotificationItem(item) {

  const icon = <GoPeople />;
  const typeName = '동행';
  const content = 
  <p>
    <b>{item.senderNickname}</b> 님이 <b>[{item.detail}]</b> 동행에 참여했습니다.
  </p>

  return {icon, typeName, content};
}


export {getCommentNotificationItem, 
  getMessageNotificationItem, 
  getAccompanyNotificationItem}