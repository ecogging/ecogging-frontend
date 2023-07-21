import { Pagination } from 'antd';
import MyButton from '../common/MyButton';
import '../../styles/mypage/MyPageMessages.css';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import detailDate from '../../utils/GetDayMinuteCounter ';

export default function MyPageMessages() {
  const { userId } = useParams();
  const [msgRooms, setMegRooms] = useState([]);

  useEffect(() => {
    const url = `/mypage/${userId}/messagerooms`;

    axios.get(url)
      .then((response) => {
        setMegRooms(response.data.data);
      })
      .catch((err) => {
        console.log('쪽지함 불러오기 실패 - _ -',err);
      })
    }, [userId]); // userId가 변경될 때마다 데이터를 가져오도록 useEffect의 의존성 배열에 추가합니다.

    // msgRooms 상태를 사용하여 원하는 방식으로 데이터를 렌더링하고 처리합니다.


  return (
    <div className="MyPageMessages">

      <div>
        <h1>userID: {userId} </h1>
      </div>

      <div className='container_myMessagesHeader'>
        <div className='containver_myMessagesUnread'>
          읽지 않은 쪽지 <span id='msg_unReadCount'>1232</span> 개
        </div>
        <div className='container_myMessagesReadAll'>
          모두 읽음 표시
        </div>
      </div>

      <div className='container_myMessagesArea'>

      {msgRooms.map((item, idx) => (

          <div className='container_MessageOne' key={item.messageRoomId}>
            <div className='con_MessageLeft'>
              <div className='con_MessageSender'>
                <div className='box_senderPic'></div>
                <div className='txt_senderNick'>{item.contactNickname}</div>
              </div>
            </div>

            <Link to={`/${userId}/messageroom/${item.messageRoomId}`} className='link_messageDetail'>
              <div className='con_MessageMiddle'>
                <div className='txt_MessageContent'>{item.lastMessageContent}</div>
              </div>
            </Link>

            <div className='con_MessageRight'>
              <div className='txt_MessageDate'>{detailDate(item.lastMessageSentTime)}</div>
            </div>
          </div>

        ))}


       
      </div>

      <div className='container_MessageBottom'>
        <div className='container_MessageBtns'>
          <MyButton text={'모두 선택'} type={'whiteGray'}/>
          <MyButton text={'삭제'} type={'gray'} />
        </div>
      </div>
      <div className='container_mypageRevBottom'>
        <div className='box_revPagination'>
            <Pagination />    
        </div>
    </div>

    </div>
  );
}