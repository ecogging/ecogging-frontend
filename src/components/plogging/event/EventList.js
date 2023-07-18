import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa';
import '../../../styles/EventList.css';

const EventList = () => {
  const {page=1,ptype="latest"} = useParams();
  const navigate = useNavigate(); 
  const [curPage, setCurPage] = useState(page);
  const [event, setEvent] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);
  const userid = useSelector((state) => state.UserId);
  const [isLastPage, setIsLastPage] = useState(false); // isLastPage 상태 추가
  const [type, setType] = useState(ptype);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getAllEventPage(curPage,type);
  }, []);

  const getAllEventPage = (p_page, p_type) => {
    axios
      .get(`http://localhost:8080/eventList/${p_page}/${p_type}`)
      .then((res) => {
        let pageInfo = res.data.pageInfo;
        console.log(pageInfo);
        let list = res.data.list;
        setEvent([...list]);
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


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div style={{ margin: '0 auto', textAlign: 'center', width: '1280px' }}>
        <div className="container">
          <input id="dropdown" type="checkbox" checked={isDropdownOpen} />
          <label className="dropdownLabel" htmlFor="dropdown" onClick={toggleDropdown}>
            <div style={{cursor:'pointer'}}>정렬하기</div>
            <FaAngleDown className="caretIcon" />
          </label>
          <div className="content">
            <ul className={isDropdownOpen ? 'active' : ''} style={{cursor:'pointer'}}>
              <li><a style={{color:'black', textDecoration:'none'}} href={`/eventList/${curPage}/latest`}>최신순</a></li>
              <li><a style={{color:'black', textDecoration:'none'}} href={`/eventList/${curPage}/oldest`}>오래된순</a></li>
              <li><a style={{color:'black', textDecoration:'none'}} href={`/eventList/${curPage}/popular`}>조회순</a></li>
              <li><a style={{color:'black', textDecoration:'none'}} href={`/eventList/${curPage}/upcoming`}>진행예정순</a></li>
            </ul>
          </div>
        </div>
        <br/><br/><br/>
        {event.length !== 0 &&
          event.map((event) => {
            const createdAtDate = new Date(event.createdAt);
            const formattedDate = createdAtDate.toLocaleDateString();
            const cardHeaderStyle = {
              //backgroundImage: `url(http://localhost:8080/eventImg/${event.fileId})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            };
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

            return (
              <a href={'/eventDetail/' + event.eventId+"/"+curPage+"/"+type} key={event.eventId}>
                <div className="card">
                  {/* 카드 헤더 */}
                  <div className="card-header" style={cardHeaderStyle}>
                    <div className="card-header-img" style={{ position: 'relative' }}>
                    <img src={`http://localhost:8080/eventImg/${event.fileId}`} style={{width:'290px', height:'210px'}}/>
                    </div>
                    <div className="card-header-is_closed" style={{ position: 'absolute', top: -5, right: -7, ...cardHeaderIsClosedStyle }}>
                      <div className="card-header-text">{cardHeaderText}</div>
                    </div>
                  </div>
                  {/* 카드 바디 */}
                  <div className="card-body">
                    {/* 카드 바디 헤더 */}
                    <div className="card-body-header">
                      <h1>{event.title}</h1>
                      <p className="card-body-hashtag" style={{ marginBottom: '5px', color: 'black' }}>
                        {event.meetingDate} ~ {event.endDate}
                      </p>
                      <div>
                        <span className="card-body-hashtag" style={{ color: 'black' }}>
                          주최 : {event.corpName}{' '}
                        </span>
                        <p className="card-body-hashtag" style={{ color: 'black' }}>
                          지역 : {event.location}
                        </p>
                      </div>
                    </div>
                    {/* 카드 바디 본문 */}
                    <p className="card-body-description">{event.explanation}</p>
                    {/* 카드 바디 푸터 */}
                    <div className="card-body-footer">
                      <hr
                        style={{
                          marginBottom: '8px',
                          opacity: '0.5',
                          borderColor: '#EF5A31',
                          width: '260px',
                        }}
                      />
                      <span style={{ float: 'left', marginLeft: '15px' }}>조회수 : {event.views}</span>
                      {/* <MdOutlineRemoveRedEye /> */}
                      <span className="reg_date"> {formattedDate} </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        <Pagination aria-label="Page navigation example" style={{ margin: '0 auto', width: '900px', justifyContent: 'center', marginTop: '30px' }}>
          <PaginationItem disabled={curPage === 1}>
            <PaginationLink aria-label="Previous" href={`/eventList/${curPage - 1}/${ptype}`}>
              <span aria-hidden="true">‹</span>
            </PaginationLink>
          </PaginationItem>
          {pageBtn.map((item) => {
            return (
              <PaginationItem className={item == curPage ? 'active' : ''} key={item}>
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
    </>
  );
};

export default EventList;
