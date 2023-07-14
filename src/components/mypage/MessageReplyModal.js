import { styled } from "styled-components";
import { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import MyButton from "../common/MyButton";


export const ModalView = styled.div`
    width: 20vw;
    height: 45vh;

    border:1px solid #8383835b;
    border-radius:10px;

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
        width:140px;
        height:50%;

        display:flex;
        align-items:center;
        justify-content:space-between;
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


export default function MessageReplyModal({ onCloseModal }) {
    return (
      <>
        <ModalView>
            <div className="replyTop">
                <div className="replyTitle">
                    <FaRegPaperPlane size={'2rem'}/>
                    답장하기
                </div>
            </div>

            <div className="replyMiddle">
                <textarea name="replyContents" className="replyContents" />
            </div>

            <div className="replyBottom">
                <MyButton text={'보내기'} type={'mintWide3'}/>
                <MyButton text={'취소'} type={'whiteGrayWide3'} onClick={onCloseModal}/>
            </div>
        </ModalView>
      </>
    );
  }
