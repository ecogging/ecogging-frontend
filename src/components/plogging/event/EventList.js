import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import '../../../styles/EventList.css';

const EvnetList = () => {
    const { page } = useParams();
    const [curPage, setCurPage] = useState(1);
    const [pageBtn, setPageBtn] = useState([]);
    const [event, setEvent] = useState([]);
    const [type, setType] = useState('');
    const [word, setWord] = useState('');
    const userid = useSelector(state=>state.UserId);

    useEffect(() => {
        getAllEventPage(page);
    }, [])

    const getAllEventPage = (p_page) => {
        axios.get(`http://localhost:8080/eventList/${p_page}`)
            .then(res => {
                console.log(res);
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

    const searchSubmit = () => {
        setCurPage(1);
    }

    const changePage = (e) => {
        setCurPage(e.target.value);
    }

    return (
        <> 
        <div style={{margin:'0 auto', textAlign:'center', width:'1280px' }}>
        {/* {event.length !==0 && event.map(event => {
                
        })} */}
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
                            <p className='card-body-hashtag' style={{marginBottom:'5px'}}>행사일 : {event.meetingDate}0000-00-00</p>
                            <span className="card-body-hashtag">주최 : {event.corpName} </span>&nbsp;&nbsp;&nbsp;
                            <span className="card-body-hashtag">지역 : {event.location}</span>&nbsp;&nbsp;&nbsp;
                        </div>
                        {/* 카드 바디 본문 */}
                        <p className="card-body-description">
                            {event.explantion}한 줄 소개ddddddddddddddddddddddddd12345678999999999999999999999ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                        </p>
                        {/* 카드 바디 푸터 */}
                        <div className="card-body-footer">
                            <hr style={{ marginBottom: '8px', opacity: '0.5', borderColor: '#EF5A31' }} />
                            <MdOutlineRemoveRedEye /> {event.view}ㅇㅇㅇㅇ
                            <i className="icon icon-comments_count"></i>
                            <i className="reg_date"> {event.meetingDate} </i>
                        </div>
                    </div>
                </div>
            </a>

            <Pagination aria-label="Page navigation example" style={{ margin: "0 auto", width: "900px" }}>
                <PaginationItem disabled>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                {                   
                    pageBtn.map(item=>{
                        return(
                            <PaginationItem  className={item==curPage? 'active':''} key={item}>
                                {/* <PaginationLink href={"/list/"+item}> */}
                                <PaginationLink onClick={changePage} id={item}>
                                    {item}
                                </PaginationLink>
                            </PaginationItem>                            
                        )
                    })
                }
                <PaginationItem>
                    <PaginationLink next href="#" />
                </PaginationItem>
            </Pagination>
            </div>
        </>
    )
}

export default EvnetList;