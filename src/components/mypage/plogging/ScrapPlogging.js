import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import '../../../styles/mypage/MyPagePlogging.css';


export default function ScrapPlogging() {
  const {page=1,ptype="latest"} = useParams();
  const [curPage, setCurPage] = useState(page);
  const [accompany, setAccompany] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false); 
  const [type, setType] = useState(ptype);
  // const [hasNext, setHasNext] = useState(true);
  // const [orderby, setOrderby] = useState("createdAt");
  const userId = getCookie("userId");

  useEffect(() => {
    ParticiPationPloggingPage(curPage,type);
  }, []);

  const ParticiPationPloggingPage = (p_page, p_type) => {
    axios
      .get(`http://localhost:8080/List/${p_page}/${p_type}`)
      .then((res) => {
        let pageInfo = res.data.pageInfo;
        console.log(pageInfo);
        let list = res.data.list;
        setAccompany([...list]);
        let btn = [];
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
          btn.push(i);
        }
        setPageBtn(btn);
        setIsLastPage(res.data.isLastPage);
        setCurPage(pageInfo.curPage);
        setType(p_type);
      })
      .catch((err) => {
        console.log(err);
      });
  };


    return (
      <div style={{margin: ' 0 100px'}}>
    {/* {accompany.length !== 0 && accompany.map((accompany) => {  */}
        
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
                <div className='container_myShareState_ongoing'>
                  {accompany.active && <div>모집 중</div>}
                  {!accompany.active && <div>모집 완료</div>}
                </div>
                <div className='container_myShareViews'>조회수 1004{accompany.views}</div>
                <div className='container_myWriteDate_share'>2023. 07. 16 03:46{accompany.createdAt}</div>
              </div>
              <div className='container_myShareTitle'>
                무료 나눔글 제목
                {accompany.title}
              </div>
              <div className='container_myShareBottom'>
                <div className='container_myShareContent'>
                  일자{accompany.meetingDate}
                </div>
                <div className='container_myShareContent'>
                  시간{accompany.meetingTime}
                </div>
                <div className='container_myShareContent'>
                  장소{accompany.location} 
                </div>
                <div className='container_myShareContent'>
                  인원{accompany.numOfPeople}
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
    </div>
    {/* })} */}

      <Pagination aria-label="Page navigation example" style={{ margin: '0 auto', width: '900px', justifyContent: 'center', marginTop: '30px' }}>
        <PaginationItem disabled={curPage === 1}>
          <PaginationLink aria-label="Previous" href={`/eventList/${curPage - 1}/${ptype}`}>
            <span aria-hidden="true">‹</span>
          </PaginationLink>
        </PaginationItem>
        {pageBtn.map((item) => {
          return (
            <PaginationItem className={item == curPage ? 'active1' : ''} key={item}>
              <PaginationLink id={item} href={`/eventList/${item}/${ptype}`}>
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem disabled={isLastPage}>
          <PaginationLink  aria-label="Next" href={`/eventList/${curPage + 1}/${ptype}`}>
            <span aria-hidden="true">›</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>    

    </div>
    );
  }