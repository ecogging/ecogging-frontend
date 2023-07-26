import { Pagination } from 'antd';
import MyButton from '../common/MyButton';
import '../../styles/mypage/MyPageMessages.css';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import detailDate from '../../utils/GetDayMinuteCounter ';
import { getCookie } from '../../utils/CookieUtil';
import picTemp from '../../assets/defaultProfile.PNG';

export default function MyPageMessages() {

  const { userId } = useParams();
console.log(typeof(userId));

  const [msgRooms, setMegRooms] = useState([]);

  const accessToken = getCookie('access-token'); 
  const headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  };


  // 쪽지함 데이터 불러오기
  useEffect(() => {
    const url = `/mypage/${userId}/messagerooms`;
    axios.get(url, {
      headers:headers,
    })
      .then((response) => {
        setMegRooms(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log('쪽지함 목록 불러오기 실패',err);
      })
    }, [userId]); 

  // 체크박스 체크 -> 선택값 변화
  const [checkedList, setCheckedList] = useState([]); // 선택한 값 담기는 배열
  const [countChecked, setCountChecekd] = useState(0); // 선택한 값 갯수
  const onCheckedItem = (checked, value) => { // 체크한 박스에 해당하는 value값, checked 상태 가져옴
    if (checked) { // 체크 true 
      setCheckedList((prev) => [...prev, value]); // 선택한 값 배열에 추가
    } else {
      setCheckedList(checkedList.filter((item) => item !== value)); // 배열에서 해당 value와 일치하지 않는 항목으로 만든 새로운 배열 반환
    }
  };

  // 체크/체크해제할 때마다 카운트
  useEffect(() => {
    setCountChecekd(checkedList.length);
  }, [checkedList]);

  // 전체 선택
  let allCheckedAr = [];
  const setAllChecked = () => {
    allCheckedAr = msgRooms.map((msgR) => msgR.messageRoomId+''); // 현재 모든 쪽지함id 가지는 배열 완성
    if(countChecked === allCheckedAr.length) { // 전체 선택된 상태면 0으로 리셋
      setCheckedList([]);
    } else { // 전체 선택한 상태가 아니면 전체 선택
      setCheckedList(allCheckedAr);
    }
  }

  // 쪽지함 삭제 ----------------------------------------------------------------------------------------

    const deleteMsgRooms = (() => {
      const url = `/mypage/${userId}/messagerooms`;

      axios.delete(url, {
        data: checkedList
      },
      {
        headers:headers,
      })
      .then((res) => {
        const updatedMsgRooms = msgRooms.filter((item) => !checkedList.includes(item.messageRoomId+''));
        setMegRooms(updatedMsgRooms);
      })
      .catch((err) => {
        console.log('삭제 실패');
      });
  });


  // 쪽지함 읽기 처리 ------------------------------------------------------------------------------------
  
  const [readId, setReadId] = useState(null);

  const updateMsgRoomRead = (id) => {
    setReadId(id);
    
    const url = `/mypage/${userId}/messagerooms/read`;
    axios.put(url, id, { // 요청 바디에 직접 messageRoomId 값을 전달
      headers: headers,
    })
    .then((res) => {
      console.log('쪽지함 읽음 처리 완료');
    })
    .catch((err) => {
      console.log('쪽지함 읽음 처리 실패');
      console.log(err);
    });
  };


  
  return (
    <div className="MyPageMessages">

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

      
          <div className=
          {           
            (item.initialSend+"" === userId && item.readBy === 'ONLY_INITIAL_SENDER') ||
            (item.initialRcv+"" === userId && item.readBy === 'ONLY_INITIAL_RECEIVER') ||
            (item.readBy === 'BOTH')
              ? 'container_MessageOne_read'
              : 'container_MessageOne_unRead'
          }

          
          key={item.messageRoomId}>
            <div className='con_MessageLeft'>
              <div className='box_checkMsg'>
                <input type="checkbox" id={`check_eachMsg_${item.messageRoomId}`} name='check_eachMsg' value={item.messageRoomId} 
                  onChange={(e) => {onCheckedItem(e.target.checked, e.target.value)}} 
                  checked={ checkedList.includes(item.messageRoomId+'') ? true:false} />
              </div>
              <div className='con_MessageSender'>
                <div className='box_senderPic'>
                  { (item.contactPicUrl) ?
                  <img src={item.contactPicUrl}  className='image_senderPic_source'/> : <img src={picTemp}  className='image_senderPic_source'/>
                  }
                </div>
                <div className='txt_senderNick'>{item.contactNickname}</div>
              </div>
            </div>

            <Link to={`/${userId}/messageroom/${item.messageRoomId}`} className='link_messageDetail' onClick={() => updateMsgRoomRead(item.messageRoomId)}>
              <div className='con_MessageMiddle'>
                { item.lastMessageContent.length > 50 ? 
                <div className='txt_MessageContent'>{item.lastMessageContent.substring(0,50)}...</div>
                  :  <div className='txt_MessageContent'>{item.lastMessageContent}</div> }
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

          <MyButton text={'모두 선택'} type={'whiteGray'} onClick={setAllChecked} />
          <MyButton text={'삭제'} type={'gray'} onClick={deleteMsgRooms} />
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