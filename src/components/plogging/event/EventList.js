import { Dropdown, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaAngleDown } from 'react-icons/fa';
import '../../../styles/EventList.css';

const EventList = () => {
  const { page } = useParams();
  const navigate = useNavigate(); // 페이지번호를 주소 할당 추가
  const [curPage, setCurPage] = useState(1);
  const [event, setEvent] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);
  const userid = useSelector((state) => state.UserId);
  const [isLastPage, setIsLastPage] = useState(false); // isLastPage 상태 추가
  const [type, setType] = useState('latest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setCurPage(parseInt(curPage)); // 페이지 주소에서 현재 페이지 설정
    getAllEventPage(parseInt(curPage));
  }, []); // 페이지 주소 변경 시에만 실행

  const getAllEventPage = (p_page, p_type) => {
    axios
      .get(`http://localhost:8080/eventList/${p_page}?sorttype=${p_type}`)
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
        // navigate(`/eventList/${p_page}`); // 페이지번호 주소에 설정
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changePage = (e) => {
    setCurPage(e.target.id);
    getAllEventPage(e.target.id, type);
  };

  const goToPreviousPage = () => {
    if (curPage === 1) return; // 첫 페이지일 경우 이전 페이지로 이동하지 않음
    setCurPage(curPage - 1);
    getAllEventPage(curPage - 1, type);
  };

  const goToNextPage = () => {
    if (curPage === isLastPage) return; // 마지막 페이지일 경우 다음 페이지로 이동하지 않음
    setCurPage(curPage + 1);
    getAllEventPage(curPage + 1, type);
  };

  const handleSortClick = (p_type) => {
    getAllEventPage(1, p_type);
    toggleDropdown();
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
              <li onClick={() => handleSortClick('latest')}>최신순</li>
              <li onClick={() => handleSortClick('oldest')}>오래된순</li>
              <li onClick={() => handleSortClick('popular')}>조회순</li>
              <li onClick={() => handleSortClick('upcoming')}>진행예정순</li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        {event.length !== 0 &&
          event.map((event) => {
            const createdAtDate = new Date(event.createdAt);
            const formattedDate = createdAtDate.toLocaleDateString();
            const cardHeaderStyle = {
              backgroundImage: `url(http://localhost:8080/eventImg/${event.fileId})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            };
            const eventEndDate = new Date(event.endDate);
            const currentDate = new Date();

            let cardHeaderText = '진행예정';
            let cardHeaderIsClosedStyle = {
              backgroundColor: '5bce0e',
            };
            if (currentDate > eventEndDate) {
              cardHeaderText = '마감됨';
              cardHeaderIsClosedStyle = {
                backgroundColor: '#6163685e',
              };
            }

            return (
              <a href={'/eventDetial/' + event.eventId} key={event.eventId}>
                <div className="card">
                  {/* 카드 헤더 */}
                  <div className="card-header" style={cardHeaderStyle}>
                    <div className="card-header-is_closed" style={cardHeaderIsClosedStyle}>
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
        <Pagination
          aria-label="Page navigation example"
          style={{ margin: '0 auto', width: '900px', justifyContent: 'center', marginTop: '30px' }}
        >
          <PaginationItem disabled={curPage === 1}>
            <PaginationLink onClick={goToPreviousPage} aria-label="Previous">
              <span aria-hidden="true">‹</span>
            </PaginationLink>
          </PaginationItem>
          {pageBtn.map((item) => {
            return (
              <PaginationItem className={item == curPage ? 'active' : ''} key={item}>
                <PaginationLink onClick={changePage} id={item}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem disabled={isLastPage}>
            <PaginationLink onClick={goToNextPage} aria-label="Next">
              <span aria-hidden="true">›</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </>
  );
};

export default EventList;
