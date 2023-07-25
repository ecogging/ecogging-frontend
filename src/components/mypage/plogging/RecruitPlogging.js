import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import '../../../styles/mypage/MyPagePlogging.css';
import React from 'react';

export default function RecruitPlogging() {
  const { page=1} = useParams();
  const [curPage, setCurPage] = useState(page);
  const [accompany, setAccompany] = useState([]);
  const [pageBtn, setPageBtn] = useState([]); 
  const userId = getCookie("userId");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    RecruitPloggingPage();
  }, []);

  const RecruitPloggingPage = () => {
    axios.post(`http://localhost:8080/myaccompanies`,{userId:userId, page:page})
      .then((res) => {
          let pageInfo = res.data.pageInfo;
          let list = res.data.list;
          setAccompany([...list]);
          let btn = [];
          for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            btn.push(i);
          }
          setPageBtn(btn);
          setCurPage(pageInfo.curPage);
          setTotalPages(pageInfo.allPage);
        })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <div style={{margin: '0 100px'}}>
      <Link style={{margin:'20px', fontSize:'20px', fontWeight:'bold', color:'black'}} to={`/mypage/${userId}/plogging/recruitPlogging/1`} className="link_myPageTabMenu">모임</Link>  
      <Link style={{margin:'30px', fontSize:'20px', fontWeight:'bold', color:'lightgray'}} to={`/mypage/${userId}/plogging/recruitEventPlogging/1`} className="link_myPageTabMenu">행사</Link>
      <hr style={{ height: '10px', border: '0', boxShadow: '0 10px 10px -10px #bbb inset' }} />
    {accompany.length !== 0 && accompany.map((accompany) => { 
      const createdAtDate = new Date(accompany.createdAt);
      const formattedDate = createdAtDate.toLocaleDateString();

    return(
      <a href={'/accompaniesdetail/' + accompany.id} key={accompany.id} style={{color:'black'}}>         
      <div className="MyPageShare1">  
        {/* 글 목록 업데이트 영역 -- 5개 */}
        <div className="container_myShareArea1"> 
          <div className="container_mypageShareWriting1">
            {/* 사진 */}
            {/* <div className="container_myShareLeft"> */}
              {/* <img src={temptemp}  className='temptemp'/> */}
            {/* </div> */}

            <div className="container_myShareRight1">
              <div className='container_myShareWhole1'>
                <div className='container_myShareTop'>
                  <div className='container_myShareState_ongoing'>
                    {accompany.active && <div>모집 중</div>}
                    {!accompany.active && <div>모집 완료</div>}
                  </div>
                  <div className='container_myShareViews'>{accompany.views}</div>
                  <div className='container_myWriteDate_share'>{formattedDate}</div>
                </div>
                <div className='container_myShareTitle'>
                  {accompany.title}
                </div>
                <div className='container_myShareBottom'>
                  <div className='container_myShareBottom2'>
                    <div className='container_myShareContent'>
                      일자 : {accompany.meetingDate}
                    </div>
                    <div className='container_myShareContent'>
                      시간 : {accompany.meetingTime}
                    </div>
                    <div className='container_myShareContent'>
                      장소 : {accompany.location}
                    </div>
                    <div className='container_myShareContent'>
                      인원 : {accompany.numOfPeople} 
                    </div>
                  </div>
                  <div className='container_myDetailBtns_Share' style={{float:'right', width:'10%'}}>
                    <div className='txt_myBtn_Share'><a href={'/accompaniesmodify/'+ accompany.id } style={{color:'black'}}>수정</a></div>
                    <div className='txt_myBtn_Share'><a href={'/accompaniesdetail/'+ accompany.id } style={{color:'black'}}>삭제</a></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </a>  ); 
     })} 
    <br/><br/>
    <Pagination aria-label="Page navigation example" style={{ margin: '0 auto', width: '900px', justifyContent: 'center', marginTop: '30px' }}>
        <PaginationItem disabled={curPage === 1}>
          <PaginationLink aria-label="Previous" href={`/mypage/${userId}/plogging/recruitPlogging/${curPage-1}`}>
            <span aria-hidden="true">‹</span>
          </PaginationLink>
        </PaginationItem>
        {pageBtn.map(item => {
          return (
            <PaginationItem className={item == curPage ? 'active1' : ''} key={item}>
              <PaginationLink id={item} href={`/mypage/${userId}/plogging/recruitPlogging/${item}`} >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })
        }
        <PaginationItem disabled={curPage === totalPages}>
          <PaginationLink  aria-label="Next" href={`/mypage/${userId}/plogging/recruitPlogging/${curPage+1}`}>
            <span aria-hidden="true">›</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>   

    </div>
    </>
  );
}