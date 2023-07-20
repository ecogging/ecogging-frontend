import { styled } from "styled-components";
import { useState } from "react";
import MyButton from "../common/MyButton";
import { RiDeleteBin5Line } from "react-icons/ri";


export const DeleteModalBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4);
`;

export const DeleteModalView = styled.div`
  width:40vw;
  height:200px;

  border:1px solid #8383835b;
  border-radius:15px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  position:fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color:white;

  .sendTop {
    width:100%;
    height:60px;
    border-radius:15px 15px 0 0;
    background-color:#B7ECD8;

    display:flex;
    align-items:center;
  }
  .sendTitle {
    width:70px;
    height:100%;

    display:flex;
    align-items:center;
    justify-content:center;

    color:#5d5d5d;
  }

  .sendMiddle {
    width:100%;
    height:90px;

    color:#838383;
    font-size:1.75rem;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .sendBottom {
    width:100%;
    height:50px;

    display:flex;
    justify-content:center;
    gap:20px;
  }
`;

export default function MessageDeleteModal( {onCloseDeleteModal}) {

  return (
    <>
      <DeleteModalBack onClick={onCloseDeleteModal} />
      <DeleteModalView>
        <div className="sendTop">
          <div className="sendTitle">
            <RiDeleteBin5Line size={'2.5rem'} />
          </div>
        </div>

        <div className="sendMiddle">
          상대와의 모든 쪽지 내용을 삭제하시겠습니까?
        </div>

        <div className="sendBottom">
          <MyButton text={'삭제'} type={'whiteMintWide3'} />
          <MyButton text={'취소'} type={'whiteGrayWide3'} onClick={onCloseDeleteModal} />
        </div>
      </DeleteModalView>
    </>
  )
}