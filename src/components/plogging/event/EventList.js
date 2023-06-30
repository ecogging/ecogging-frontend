import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import '../../../styles/EventList.css';

const EvnetList = () => {
    const { page } = useParams();
    const [curPage, setCurPage] = useState(1);
    const [pageBtn, setPageBtn] = useState([]);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        getAllEventPage(page);
    }, [])

    const getAllEventPage = (p_page) => {
        axios.get(`http://localhost:8080/eventList/${p_page}`)
            .then(res => {
                console.log(res);
                let pageInfo = res.data.pageInfo;
                let list = res.data.list;
                setBoard([...list]);
                let btn = [];
                for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++){
                    btn.push(i);
                }
                setPageBtn(btn);
                setBsearch(false);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <> 
        <div style={{margin:'0 auto', textAlign:'center', width:'1280px' }}>
        {event.length !==0 && event.map(event => {
            return(
                <a href={"/eventDetial/"+event.eventId}>
                <div className="card">
                    {/* 카드 헤더 */}
                    <div className="card-header">
                        <div className="card-header-is_closed">
                            <div className="card-header-text">{event.active}</div>
                            <div className="card-header-number">2 / 5</div>
                        </div>
                    </div>

                    {/* 카드 바디 */}
                    <div className="card-body">
                        {/* 카드 바디 헤더 */}
                        <div className="card-body-header">
                            <h1>{event.title}</h1>
                            <p className="card-body-hashtag">지역 : {event.location}</p>
                            <p className="card-body-nickname">주최 : {event.corpName} </p>
                        </div>
                        <p className="card-body-description">
                            {event.explantion}
                        </p>
                        {/* 카드 바디 본문 */}

                        {/* 카드 바디 푸터 */}
                        <div className="card-body-footer">
                            <hr style={{ marginBottom: '8px', opacity: '0.5', borderColor: '#EF5A31' }} />
                            <MdOutlineRemoveRedEye /> {event.view}
                            <i className="icon icon-comments_count"></i>ㅇㅇㅇㅇ
                            <i className="reg_date"> {event.meetingDate} </i>
                        </div>
                    </div>
                </div>
            </a>
            )
        })}
           

            <Pagination aria-label="Page navigation example" style={{ margin: "0 auto", width: "900px" }}>
                <PaginationItem disabled>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                {                   
                    pageBtn.map(item=>{
                        return(
                            <PaginationItem  className={item==curPage? 'active':''} key={item}>
                                {/* <PaginationLink href={"/list/"+item}> */}
                                <PaginationLink onClick={changPage} id={item}>
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