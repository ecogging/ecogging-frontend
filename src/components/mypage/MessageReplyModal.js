import { styled } from "styled-components";
import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import MyButton from "../common/MyButton";
import { getCookie } from "../../utils/CookieUtil";
import { useParams } from "react-router";
import axios from "axios";

export const ModalBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  
//   backdrop-filter: blur(10px);
//   background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalView = styled.div`
    width: 400px;
    height: 45vh;

    border:1px solid #8383835b;
    border-radius:10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    position:fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;

    background-color:white;

    .replyTop {
        width:100%;
        height:18%;

        display:flex;
        align-items:center;
        font-size:1.65rem;
    }
    .replyTitle {
        width:180px;
        height:50%;

        display:flex;
        align-items:center;
        gap:20px;
        margin-left:8px;
        color:#6CABA7;
        font-weight:bold;
    }

    .replyMiddle {
        width:100%;
        height:70%;

        display:flex;
        align-items:center;
        justify-content:center;
    }
    .replyContents {
        width:93%;
        height:95%;
        border:none;
        resize:none;
        font-size:1.125rem;
    }
    .replyContents:focus {
        outline:none;
    }


    .replyBottom {
        width:100%;
        height:13%;
        margin-top:auto;

        display:flex;
        align-items:center;
        justify-content:center;
        gap:6px;
    }
`;


export default function MessageReplyModal({ onCloseModal, conId }) {

    const {userId} = useParams();
    const {messageRoomId} = useParams();

    // 답장 보낼 내용 확보: 상대 id, 답장 내용
    const [content, setContent] = useState('');
    const getContent = () => {
        setContent(document.getElementById('replyContents').value);
    }
    const accessToken = getCookie('access-token'); // 토큰 가져오기
    const rcvId = conId.toString();
    const data = {
        content: content,
        contactId: rcvId
    };
    const headers = {
        'Authorization': 'Bearer ' + accessToken, // Bearer Scheme으로 토큰을 포함하여 헤더 설정
        'Content-Type': 'application/json',
    };
    // 답장 보내기
    const sendMessage = () => {

        axios.post(`/${userId}/messageroom/${messageRoomId}/messages`, data, {
            headers: headers, // 설정한 헤더를 옵션으로 전달
        })
            .then((response) => {
                console.log(response.data);
                console.log('쪽지 보내기 완료 ^-^');
                console.log('쪽지목록 다시 불러오기 완료~');
                onCloseModal();
            })
            .catch((error) => {
            console.log('쪽지 안갔음 T-T', error);
        });
    }
    
    return (
      <>
        <ModalBack onClick={onCloseModal} />
        <ModalView>
            <div className="replyTop">
                <div className="replyTitle">
                    <FaRegPaperPlane size={'2rem'}/>
                    답장하기
                </div>
            </div>

            <div className="replyMiddle">
                <textarea name="replyContents" className="replyContents" id='replyContents' placeholder="쪽지 내용을 입력하세요..." onChange={getContent} />
            </div>

            <div className="replyBottom">
                <MyButton text={'보내기'} type={'mintWide3'} onClick={sendMessage} />
                <MyButton text={'취소'} type={'whiteGrayWide3'} onClick={onCloseModal} />
            </div>
        </ModalView>
      </>
    );
  }
