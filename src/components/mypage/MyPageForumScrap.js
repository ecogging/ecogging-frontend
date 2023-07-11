import '../../styles/mypage/MyPageForumScrap.css';

export default function MyPageForumScrap() {
  return(
    <div className="MyPageForumScrap">

      <div className='container_myForumScrapHeader'>

        <div className='container_myForumScrapSearch'>
          <div className='drop_myForumScrapSearch'>전체</div>
          <input type='text' name='forumscrapSearch' className='input_myForumScrapSearch' />
          <div className='btn_myForumScrapSearch'>검색</div>
        </div>

        <div className='container_myForumListkind'>
          <div className='scrapList_each'>전체</div>
          <div className='scrapList_each'>나눔</div>
          <div className='scrapList_each'>추천</div>
        </div>

      </div>
      
      <div className='container_myforumScrapArea'>
        {/* 글 종류 나눔/경로추천에 따라 리턴 다르게 */}


        {/* 경로추천 */}
        <div className="container_mypageRecomWriting">
          {/* 지도 */}
          <div className="container_myRecomLeft">
            {/* <img src={temptemp}  className='temptemp'/> */}
          </div>

          <div className="container_myRecomRight">
            <div className='container_myRecomWhole'>
              <div className='container_myRecomTop'>
                <div className='container_myRecomTitle'>
                  경로 추천글 제목
                </div>
                <div className='container_myViews'>조회수 1004</div>
              </div>
              <div className='container_myRecomBottom'>
                <div className='container_myRecomContent'>
                  본문
                </div>
                <div className='container_myDetailBtns'>
                  <div className='txt_myBtn'>수정</div>
                  <div className='txt_myBtn'>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      
        {/* 나눔 */}
        <div className="container_mypageShareWriting">
          {/* 사진 */}
          <div className="container_myShareLeft_scrap">
            {/* <img src={temptemp}  className='temptemp'/> */}
          </div>

          <div className="container_myShareRight">
            <div className='container_myShareWhole'>
              <div className='container_myShareTop'>
                <div className='container_myShareState_ongoing'>진행중</div>
                <div className='container_myShareViews'>조회수 1004</div>
              </div>
              <div className='container_myShareTitle'>
                무료 나눔글 제목
              </div>
              <div className='container_myShareBottom'>
                <div className='container_myShareContent'>
                  본문
                </div>
                <div className='container_myDetailBtns'>
                  <div className='txt_myBtn'>수정</div>
                  <div className='txt_myBtn'>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div>
  );
}