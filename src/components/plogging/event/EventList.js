import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
//import { MdOutlineRemoveRedEye } from 'react-icons/md';
//import 'bootstrap/dist/css/bootstrap.css';
import '../../../styles/EventList.css';

const EventList = () => {
    const { page } = useParams();
    const [curPage, setCurPage] = useState(1);
    const [event, setEvent] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const userid = useSelector(state=>state.UserId);

    useEffect(() => {
        getAllEventPage(page);
    }, [])

    const getAllEventPage = (p_page) => {
        axios.get(`http://localhost:8080/eventList/${p_page}`)
            .then(res => {
                let pageInfo = res.data.pageInfo;
                let list = res.data.list;
                setEvent([...list]);
                let btn = [];
                for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++){
                    btn.push(i);
                }
                setPageBtn(btn);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changePage = (e) => {
        const selectedPage = parseInt(e.target.id);
        setCurPage(selectedPage);
        setPageBtn((prevBtn) => {
            return prevBtn.map((item) => (item === selectedPage ? 'active' : ''));
        });
        getAllEventPage(selectedPage);
    }
    

    const goToPreviousPage = () => {
        if (curPage === 1) return; // 첫 페이지일 경우 이전 페이지로 이동하지 않음
        setCurPage(curPage - 1);
        getAllEventPage(curPage - 1);
    }

    const goToNextPage = () => {
        if (curPage === pageBtn.length) return; // 마지막 페이지일 경우 다음 페이지로 이동하지 않음
        setCurPage(curPage + 1);
        getAllEventPage(curPage + 1);
    }

    return (
        <> 
        <div style={{margin:'0 auto', textAlign:'center', width:'1280px' }}>
        {event.length !==0 && event.map(event => {
            const createdAtDate = new Date(event.createdAt);
            const formattedDate = createdAtDate.toLocaleDateString(); 
            return (
                <a href={"/eventDetial/"+event.eventId}>
                <div className="card">
                    {/* 카드 헤더 */}
                    <div className="card-header">
                        <div className="card-header-is_closed">
                            <div className="card-header-text">{event.active}진행예정</div>
                            <div className="card-header-number"></div>
                        </div>
                    </div>

                    {/* 카드 바디 */}
                    <div className="card-body">
                        {/* 카드 바디 헤더 */}
                        <div className="card-body-header"> 
                            <h1>{event.title}</h1>
                            <p className='card-body-hashtag' style={{marginBottom:'5px', color:'black'}}>
                                {event.meetingDate} ~ {event.endDate}
                            </p>
                            <div>
                            <span className="card-body-hashtag" style={{color:'black'}}>주최 : {event.corpName} </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="card-body-hashtag" style={{color:'black'}}>지역 : {event.location}</span>
                            </div>
                        </div>
                        {/* 카드 바디 본문 */}
                        <p className="card-body-description">
                            {event.explanation}
                        </p>
                        {/* 카드 바디 푸터 */}
                        <div className="card-body-footer">
                            <hr style={{ marginBottom:'8px', opacity: '0.5', borderColor: '#EF5A31', width:'260px'  }} />
                            조회수 : {event.views}
                            {/* <MdOutlineRemoveRedEye /> */}
                            <span className="reg_date"> {formattedDate} </span>
                        </div>
                    </div>
                </div>
            </a>
            )
        })}

{/* <nav class="" aria-label="Page navigation example"><ul class="pagination" style="margin: 0px auto; width: 900px;"><li class="page-item disabled"><a href="#" aria-label="Previous" class="page-link"><span aria-hidden="true">‹</span><span class="visually-hidden">Previous</span></a></li><li class="active page-item"><button id="1" class="page-link">1</button></li><li class="page-item"><a href="#" aria-label="Next" class="page-link"><span aria-hidden="true">›</span><span class="visually-hidden">Next</span></a></li></ul></nav> */}
          
        <Pagination aria-label="Page navigation example" style={{ margin: "0 auto", width: "900px" }}>
            <PaginationItem disabled={curPage === 1}>
                <PaginationLink onClick={goToPreviousPage} aria-label="Previous">
                    <span aria-hidden="true">‹</span>
                </PaginationLink>
            </PaginationItem>
            {                   
                pageBtn.map(item => {
                    return(
                        <PaginationItem className={item == curPage ? 'active' : ''} key={item}>
                            <PaginationLink onClick={changePage} id={item}>
                                {item}
                            </PaginationLink>
                        </PaginationItem>                            
                    )
                })
            }
            <PaginationItem disabled={curPage === pageBtn.length}>
                <PaginationLink onClick={goToNextPage} aria-label="Next">
                    <span aria-hidden="true">›</span>
                </PaginationLink>
            </PaginationItem>
        </Pagination>
        </div>
        </>
    )
}

export default EventList;