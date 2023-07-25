import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { GoPeople } from 'react-icons/go';

function getBoardResourceNameFromBoardType(boardType) {
  if (boardType === 'ACCOMPANY') 
    return 'accompaniesdetail';
  if (boardType === 'FORUM')
    return 'forums';
  if (boardType === 'SHARE')
    return 'shares';
  if (boardType === 'EVENT')
    return 'events'
  if (boardType === 'ROUTE')
    return 'routes';

  return 'accompaniesdetail'; // default board type
}

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

  const boardResource = getBoardResourceNameFromBoardType(item.boardType);
  const link = `/${boardResource}/${item.targetId}`;
  return {icon, typeName, content, link};
}

function getMessageNotificationItem(item) {

  const icon = <AiOutlineMail />;
  const typeName = '쪽지';
  const content = 
  <p>
    <b>{item.senderNickname}</b> 님이 쪽지를 보냈습니다.
  </p>
  const link = `/${item.receiverId}/messageroom/${item.targetId}`;
  return {icon, typeName, content, link};
}

function getAccompanyNotificationItem(item) {

  const icon = <GoPeople />;
  const typeName = '동행';
  const content = 
  <p>
    <b>{item.senderNickname}</b> 님이 <b>[{item.detail}]</b> 동행에 참여했습니다.
  </p>
  const link = `/mypage/${item.receiverId}/plogging/recruitPlogging/1`;
  return {icon, typeName, content, link};
}


export {
  getCommentNotificationItem, 
  getMessageNotificationItem, 
  getAccompanyNotificationItem}