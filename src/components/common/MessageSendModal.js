import { styled } from "styled-components";
import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import MyButton from "../common/MyButton";
import axios from "axios";
import { getCookie } from "../../utils/CookieUtil";
import { useEffect } from "react";
import API from "../../utils/BaseApi";

import 'big-integer'; 

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
    z-index:555;

    .sendTop {
        width:100%;
        height:18%;

        display:flex;
        align-items:center;
        font-size:1.65rem;
    }
    .sendTitle {
        width:180px;
        height:50%;

        display:flex;
        align-items:center;
        gap:20px;
        margin-left:8px;
        color:#6CABA7;
        font-weight:bold;
    }

    .sendMiddle {
        width:100%;
        height:70%;

        display:flex;
        flex-direction:column;
        gap:5px;
        align-items:center;
        justify-content:center;
    }
    .receiverNick {
      width:93%;
      height:10%;
      font-size:1.25rem;
    }
    .sendContents {
        width:93%;
        height:80%;
        border:none;
        resize:none;
        font-size:1.125rem;
    }
    .sendContents:focus {
        outline:none;
    }


    .sendBottom {
        width:100%;
        height:13%;
        margin-top:auto;

        display:flex;
        align-items:center;
        justify-content:center;
        gap:6px;
    }
`;



export default function MessageSendModal({ onCloseModal, receiverNick, receiverId }) {
    
    const accessToken = getCookie('access-token'); // 토큰 가져오기
    const curId = getCookie("userId"); // 현재 로그인한 유저 id 프론트단에 저장
    console.log("쿠키의 유저 아이디~"+curId);
    const [content, setContent] = useState(''); // 쪽지 내용 상태 저장
    const rcvId = receiverId.toString();

    const headers = {
        'Authorization': 'Bearer ' + accessToken, // Bearer Scheme으로 토큰을 포함하여 헤더 설정
        'Content-Type': 'application/json',
    };

    const getContent = () => {
        setContent(document.getElementById("sendContents").value); // 쪽지 내용 프론트단에 저장
    }

    // const params = new URLSearchParams(); // URLSearchParams 객체를 생성
    // // 요청 파라미터를 URLSearchParams에 추가
    // params.append("curId", curId);
    // params.append("content", content);
    // params.append("contactId", receiverId);

    const data = {
        curId: curId,
        content: content,
        contactId: rcvId,
      };


    const sendMessage = () => {

        axios.post('http://localhost:8080/messagerooms', data, {
            headers: headers, // 설정한 헤더를 옵션으로 전달
        })
            .then((response) => {
                console.log(response.data);
                console.log('쪽지 보내기 완료 ^-^');
            })
            .catch((error) => {
            console.log('쪽지 안갔음 T-T', error);
        });
    }



    return (
      <>
        <ModalView>
            <div className="sendTop">
                <div className="sendTitle">
                    <FaRegPaperPlane size={'2rem'}/>
                    쪽지 보내기
                </div>
            </div>

            <div className="sendMiddle">
                <div className="receiverNick">받는 사람: {receiverNick}</div>
                <textarea name="sendContents" id="sendContents" className="sendContents" placeholder="쪽지 내용을 입력하세요..." onChange={getContent}/>
            </div>

            <div className="sendBottom">
                <MyButton text={'보내기'} type={'mintWide3'} onClick={sendMessage}/>
                <MyButton text={'취소'} type={'whiteGrayWide3'} onClick={onCloseModal}/>
            </div>
        </ModalView>
      </>
    );
  }
