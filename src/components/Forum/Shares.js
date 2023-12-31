import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import axios from 'axios';
import { Pagination } from 'antd';
import '../../styles/Forum/ForumList.css';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/CookieUtil';
import MyButton from "../../components/common/MyButton.js";
import { BiSearch } from "react-icons/bi"; <BiSearch size={30}/>

export default function ShareList(){
    const [shares,setShares]=useState([]);
    const navigate = useNavigate();
    const userId = getCookie("userId");

    // 페이징 ---------------------------------------------------------------
    const [totPages, setTotPages] = useState(0); // 전체 페이지
    const [nowPage, setNowPage] = useState(1); // 현재 페이지
    const changePage = (no) => { // 페이지 클릭할 때마다 현재 페이지 변경
        setNowPage(no);
    };
    
    useEffect(() => {
        axios
        .get(`http://localhost:8080/shares/${nowPage}`)
        .then((res)=>{
            console.log(res.data);
            setShares(res.data.res.content);
            setTotPages(res.data.all);
        })
        .catch ((err)=> {
            console.log(err);
        });
    },[nowPage]);

    const handleSearch=()=>{};

    const handleSort=(e, type)=>{
        console.log("리뷰 정렬");
        if(type === '조회순'){
            console.log("조회순");
            const sortByView = [...shares].sort((a, b) => b.views - a.views);
            setShares(sortByView);
        }else if(type === '최신순'){
            console.log("최신순");
            navigate('/shares');
        }else{
            return ;
        }
    };

    const handleClickShares=()=>{
        console.log("shares");
    };

    const handelClickRoutes=()=>{
        console.log("routes");
        navigate('/routeList');
    };
   
    console.log(shares);
    return (
        <div className="forumList_mainLayout">
            <div className="forumList_wrap">
                <div className="forumList_top">
                    <div className="forumList_top_title">
                        <div className='forumList_top_tap'>
                            <div className='share_tap' onClick={handleClickShares}>Shares</div>
                            <div className='route_tap' onClick={handelClickRoutes}>Routes</div>
                        </div>
                    </div>
                    <div className='sortAndSearch'>
                        <div className='sortAndSearchIn'>
                            <div className="forumList_sort">
                                <ul className="forumList_sort_ul">
                                    <li onClick={(e)=>handleSort(e,"최신순")}>
                                        최신순
                                    </li>
                                    <li onClick={(e)=>handleSort(e, "조회순")}>
                                        조회순
                                    </li>
                                </ul>
                            </div>
                            <div className="forumList_search">
                                <input className="search_input" type="text" placeholder="    search" />
                                <BiSearch className="search_icon" onClick={()=>handleSearch()}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listLayout">
                    {
                        shares.length !== 0 && shares.map(shares => {
                            const createdAt=moment(shares.createdAt);
                            const formattedDate=createdAt.format('YYYY-MM-DD');
                            return (
                                <div className="listItem"  key={shares.id}>
                                    <div className='listItem_detail'>
                                        <div className="forumList_nickname">{shares.writerNickname}</div>
                                        <div className='forumList_detail'>
                                            <Link to={`/shareInfo/${shares.forumId}`}>
                                                <div className='forumList_detail_in'>
                                                    <div className="shares_status">[{shares.status}]</div>
                                                    <div className="shares_title">{shares.title}</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="forumList_footer">
                                        <div className='dateAndView'>
                                            <div className="viewLayout">
                                                <div className='forumList_span'>조회수</div>
                                                <div className="forumList_views">{shares.views}</div>
                                            </div>
                                            <div className="forumList_created_at">{formattedDate}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container_myBottom'>
                    <Pagination current={nowPage} onChange={changePage} pageSize={5} total={totPages} />
                </div>
                <div className='writeBtn'>
                    {
                    userId!==null && userId !== undefined? 
                    <Link to={`/shareWrite`}>
                        <MyButton text={"글 작성"}/>
                    </Link> 
                    : null
                    }
                </div>
            </div>
        </div>
    );
}