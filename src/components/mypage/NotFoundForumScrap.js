
import { PiFileDashedFill } from "react-icons/pi";
import { styled } from "styled-components";

export const ErrorBox = styled.div`
  width:30vw;
  height:50vh;
  margin:0 auto;

  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:10px;

  #box_iconForNotFound {
    width:200px;
    height:200px;
    color:#838383;
  }

  .txt_notFound {
    font-size:2rem;
    color:#838383;
  }

`


export default function NotFoundForumScrap() {
  return (
    <>
      <ErrorBox>
        <PiFileDashedFill id='box_iconForNotFound'/>
        <div className='txt_notFound'> 스크랩한 글이 없습니다 </div>
      </ErrorBox>
    </>
 
  );
}