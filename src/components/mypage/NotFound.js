
import { MdSearchOff } from "react-icons/md";
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


export default function NotFound() {
  return (
    <>
      <ErrorBox>
        <MdSearchOff id='box_iconForNotFound'/>
        <div className='txt_notFound'> 검색 결과가 없습니다 </div>
      </ErrorBox>
    </>
 
  );
}