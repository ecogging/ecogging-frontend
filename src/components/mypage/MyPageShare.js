import '../../styles/mypage/MyPageShare.css';
import temptemp from '../../assets/temp.png';
import { Pagination } from 'antd';

export default function MyPageShare() {
  return (
    <div className="MyPageShare">

      {/* 글 목록 업데이트 영역 -- 5개 */}
      <div className="container_myShareArea"> 

        <div className="container_mypageShareWriting">
          {/* 사진 */}
          {/* <div className="container_myShareLeft"> */}
            {/* <img src={temptemp}  className='temptemp'/> */}
          {/* </div> */}

          <div className="container_myShareRight">
            <div className='container_myShareWhole'>
              <div className='container_myShareTop'>
                <div className='container_myShareState_ongoing'>진행중</div>
                <div className='container_myShareViews'>조회수 1004</div>
                <div className='container_myWriteDate_share'>2023. 07. 16 03:46</div>
              </div>
              <div className='container_myShareTitle'>
                무료 나눔글 제목
              </div>
              <div className='container_myShareBottom'>
                <div className='container_myShareContent'>
                  본문
                </div>
                <div className='container_myDetailBtns_Share'>
                  <div className='txt_myBtn_Share'>수정</div>
                  <div className='txt_myBtn_Share'>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container_mypageShareWriting">
          {/* 사진 */}
          <div className="container_myShareLeft">
            {/* <img src={temptemp}  className='temptemp'/> */}
          </div>

          <div className="container_myShareRight">
            <div className='container_myShareWhole'>
              <div className='container_myShareTop'>
                <div className='container_myShareState_ongoing'>진행중</div>
                <div className='container_myShareViews'>조회수 1004</div>
                <div className='container_myWriteDate_share'>2023. 07. 16 03:46</div>
              </div>
              <div className='container_myShareTitle'>
                무료 나눔글 제목
              </div>
              <div className='container_myShareBottom'>
                <div className='container_myShareContent'>
                  본문
                </div>
                <div className='container_myDetailBtns_Share'>
                  <div className='txt_myBtn_Share'>수정</div>
                  <div className='txt_myBtn_Share'>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container_mypageShareWriting">
          {/* 사진 */}
          {/* <div className="container_myShareLeft"> */}
            {/* <img src={temptemp}  className='temptemp'/> */}
          {/* </div> */}

          <div className="container_myShareRight">
            <div className='container_myShareWhole'>
              <div className='container_myShareTop'>
                <div className='container_myShareState_ongoing'>진행중</div>
                <div className='container_myShareViews'>조회수 1004</div>
                <div className='container_myWriteDate_share'>2023. 07. 16 03:46</div>
              </div>
              <div className='container_myShareTitle'>
                무료 나눔글 제목
              </div>
              <div className='container_myShareBottom'>
                <div className='container_myShareContent'>
                  본문
                </div>
                <div className='container_myDetailBtns_Share'>
                  <div className='txt_myBtn_Share'>수정</div>
                  <div className='txt_myBtn_Share'>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container_mypageShareWriting">
          {/* 사진 */}
          {/* <div className="container_myShareLeft"> */}
            {/* <img src={temptemp}  className='temptemp'/> */}
          {/* </div> */}

          <div className="container_myShareRight">
            <div className='container_myShareWhole'>
              <div className='container_myShareTop'>
                <div className='container_myShareState_ongoing'>진행중</div>
                <div className='container_myShareViews'>조회수 1004</div>
                <div className='container_myWriteDate_share'>2023. 07. 16 03:46</div>
              </div>
              <div className='container_myShareTitle'>
                무료 나눔글 제목
              </div>
              <div className='container_myShareBottom'>
                <div className='container_myShareContent'>
                  본문
                </div>
                <div className='container_myDetailBtns_Share'>
                  <div className='txt_myBtn_Share'>수정</div>
                  <div className='txt_myBtn_Share'>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container_mypageShareWriting">
          {/* 사진 */}
          {/* <div className="container_myShareLeft"> */}
            {/* <img src={temptemp}  className='temptemp'/> */}
          {/* </div> */}

          <div className="container_myShareRight">
            <div className='container_myShareWhole'>
              <div className='container_myShareTop'>
                <div className='container_myShareState_ongoing'>진행중</div>
                <div className='container_myShareViews'>조회수 1004</div>
                <div className='container_myWriteDate_share'>2023. 07. 16 03:46</div>
              </div>
              <div className='container_myShareTitle'>
                무료 나눔글 제목
              </div>
              <div className='container_myShareBottom'>
                <div className='container_myShareContent'>
                  본문
                </div>
                <div className='container_myDetailBtns_Share'>
                  <div className='txt_myBtn_Share'>수정</div>
                  <div className='txt_myBtn_Share'>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
    

      </div>

      <div className='container_myBottom'>
        <div className='box_contensPlus'>
            더보기  
        </div>
      </div>

    </div>
  );
}