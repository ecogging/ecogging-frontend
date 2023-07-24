import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import '../../../styles/mypage/MyPagePlogging.css';
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';


export default function RecruitEventPlogging() {
  const { page} = useParams();
  const [curPage, setCurPage] = useState(1);
  const [event, setEvent] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false); 
  // const [hasNext, setHasNext] = useState(true);
  // const [orderby, setOrderby] = useState("createdAt");
  const userId = getCookie("userId");

  useEffect(() => {
    RecruitPloggingPage();
  }, []);

  const RecruitPloggingPage = () => {
    axios
        .post(`http://localhost:8080/myevent`,{userId:userId, page:page})
        .then((res) => {
        let pageInfo = res.data.pageInfo;
        let list = res.data.list;
        setEvent([...list]);
        let btn = [];
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
          btn.push(i);
        }
        setPageBtn(btn);
        //setIsLastPage(res.data.isLastPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePage = (e) => {
      setCurPage(e.target.value);
      RecruitPloggingPage(e.target.id);
    }

  return (
    <>
    <div style={{margin: ' 0 100px'}}>
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
            <a href={'/eventDetail/' + event.eventId} key={event.eventId}>            
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
                            {cardHeaderText}
                          </div>
                          <div className='container_myShareViews'>조회수 {event.views}</div>
                          <div className='container_myWriteDate_share'>{formattedDate}</div>
                        </div>
                        <div className='container_myShareTitle'>
                          {event.title}
                        </div>
                        <div className='container_myShareBottom'>
                          <div className='container_myShareContent'>
                            주최 : {event.corpName}
                          </div>
                          <div className='container_myShareContent'>
                            주최 : {event.management}
                          </div>
                          <div className='container_myShareContent'>
                            지역 : {event.location} 
                          </div>
                          <div className='container_myShareContent'>
                            기간 : {event.meetingDate} ~ {event.endDate}
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
            </a>  ); 
        })}

      <Pagination aria-label="Page navigation example" style={{ margin: '0 auto', width: '900px', justifyContent: 'center', marginTop: '30px' }}>
        <PaginationItem disabled={curPage === 1}>
          <PaginationLink aria-label="Previous" href={'#'}>
            <span aria-hidden="true">‹</span>
          </PaginationLink>
        </PaginationItem>
        {pageBtn.map(item => {
          return (
            <PaginationItem className={item == curPage ? 'active1' : ''} key={item}>
              <PaginationLink onClick={changePage} id={item} >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })
        }
        <PaginationItem disabled={isLastPage}>
          <PaginationLink  aria-label="Next" href={`#`}>
            <span aria-hidden="true">›</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>    

    </div>
    </>
  );

}
