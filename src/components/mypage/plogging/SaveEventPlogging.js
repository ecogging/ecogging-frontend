import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import '../../../styles/mypage/MyPagePlogging.css';
import React from 'react';

export default function SaveEventPlogging() {
  const { page=1} = useParams();
  const [curPage, setCurPage] = useState(page);
  const [event, setEvent] = useState([]);
  const [pageBtn, setPageBtn] = useState([]); 
  const userId = getCookie("userId");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    saveEventPloggingPage();
  }, []);

  const saveEventPloggingPage = () => {
    axios.post(`http://localhost:8080/myeventtemp`,{userId:userId, page:page})
      .then((res) => {
          let pageInfo = res.data.pageInfo;
          let list = res.data.list;
          setEvent([...list]);
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

  const formatDate = (date) => {
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  return (
    <>
    <div style={{margin: ' 0 100px'}}>
      <Link style={{margin:'20px', fontSize:'20px', fontWeight:'bold', color:'lightgray'}} to={`/mypage/${userId}/plogging/savePlogging/1`} className="link_myPageTabMenu">모임</Link>  
      <Link style={{margin:'30px', fontSize:'20px', fontWeight:'bold', color:'black'}} to={`/mypage/${userId}/plogging/saveEventPlogging/1`} className="link_myPageTabMenu">행사</Link>
      <hr style={{ height: '10px', border: '0', boxShadow: '0 10px 10px -10px #bbb inset' }} />
      {event.length !== 0 && event.map((event) => {
        const createdAtDate = new Date(event.createdAt);
        const formattedDate = createdAtDate.toLocaleDateString();

        const eventEndDate = new Date(event.endDate);
        const eventMeetingDate = new Date(event.meetingDate);
        const currentDate = new Date();

        let cardHeaderText = '진행예정';
            let cardHeaderIsClosedStyle = {
              backgroundColor: '5bce0e',
            };
            if(currentDate >= eventMeetingDate) {
              cardHeaderText = '진행중';
              if (currentDate > eventEndDate) {
                cardHeaderText = '마감됨';
                cardHeaderIsClosedStyle = {
                  backgroundColor: '#6163685e',
                };
              }
            } 
            return( 
            <a href={'/eventDetail/' + event.eventId} key={event.eventId} style={{color:'black'}}>            
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
                          <div className='container_myShareState_ongoing'  style={cardHeaderIsClosedStyle}>
                            {cardHeaderText}
                          </div>
                          <div className='container_myShareViews'>조회수 {event.views}</div>
                          <div className='container_myWriteDate_share'>{formattedDate}</div>
                        </div>
                        <div className='container_myShareTitle'>
                          {event.title}
                        </div>
                        <div className='container_myShareBottom'>
                          <div className='container_myShareBottom2'> 
                            <div className='container_myShareContent'>
                              주최 : {event.corpName}
                            </div>
                            <div className='container_myShareContent'>
                              주최 : {event.management}
                            </div>
                            <div className='container_myShareContent'>
                              기간 :   {formatDate(eventMeetingDate)} ~ {formatDate(eventEndDate)}
                            </div>
                            <div className='container_myShareContent'>
                              지역 : {event.location}
                            </div>
                           </div> 
                          <div className='container_myDetailBtns_Share' style={{float:'right', width:'10%'}}>
                            <div className='txt_myBtn_Share'><a href={'/eventModify/'+ event.eventId } style={{color:'black'}}>수정</a></div>
                            <div className='txt_myBtn_Share'><a href={'/eventDetail/'+ event.eventId } style={{color:'black'}}>삭제</a></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>    
              </div> 
            </a>); 
        })} 
      <br/><br/>
    <Pagination aria-label="Page navigation example" style={{ margin: '0 auto', width: '900px', justifyContent: 'center', marginTop: '30px' }}>
        <PaginationItem disabled={curPage === 1}>
          <PaginationLink aria-label="Previous" href={`/mypage/${userId}/plogging/saveEventPlogging/${curPage-1}`}>
            <span aria-hidden="true">‹</span>
          </PaginationLink>
        </PaginationItem>
        {pageBtn && pageBtn.map(item => {
          return (
            <PaginationItem className={item == curPage ? 'active1' : ''} key={item}>
              <PaginationLink id={item} href={`/mypage/${userId}/plogging/saveEventPlogging/${item}`} >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })
        }
        <PaginationItem disabled={curPage === totalPages}>
          <PaginationLink  aria-label="Next" href={`/mypage/${userId}/plogging/saveEventPlogging/${curPage+1}`}>
            <span aria-hidden="true">›</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>   

    </div>
    </>
  );
}