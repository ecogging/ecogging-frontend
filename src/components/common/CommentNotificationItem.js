import { BiCommentDetail } from 'react-icons/bi';

export default function commentNotificationItem(item) {
  const icon = <BiCommentDetail />;
  const typeName = '댓글';
  const content = item.senderNickname + '님의 댓글입니다';

  return {icon, typeName, content};
}