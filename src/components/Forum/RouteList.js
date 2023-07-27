import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import axios from 'axios';
import { Pagination } from 'antd';
import { Viewer } from '@toast-ui/react-editor';
import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';
import '../../styles/Forum/Shares.css';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import MyButton from "../../components/common/MyButton.js";
// import { BsEye } from "react-icons/bs";
import { BiSearch } from "react-icons/bi"; <BiSearch size={30}/>

export default function ShareList(){
    const [routes,setRoutes]=useState([]);
    const userId = getCookie("userId");
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const [initialRoutes, setInitialRoutes]=useState([]);

     // 페이징 ---------------------------------------------------------------
    const [totPages, setTotPages] = useState(0); // 전체 페이지
    const [nowPage, setNowPage] = useState(1); // 현재 페이지
    const changePage = (no) => { // 페이지 클릭할 때마다 현재 페이지 변경
        setNowPage(no);
    }

    useEffect(() => {
       
            axios
                .get(`http://localhost:8080/routes/${nowPage}`)
                .then((res)=>{
                    console.log(res.data);
                    setRoutes(res.data.res.content);
                    // setInitialRoutes(res.data.routes);
                    setView(true);
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
            // const sortByViews=[...shares].sort((a,b)=>a.views-b.views);
            // setShares(sortByViews);
            const sortByView = [...routes].sort((a, b) => b.views - a.views);
            setRoutes(sortByView);

        }else if(type === '최신순'){
            console.log("최신순");
            // const sortByDate=[...shares].sort((a,b)=>b.createdAt-a.createdAt);
            // setShares(sortByDate);
            // console.log(shares);
            // navigate('/shares');
            // setRoutes([...initialRoutes]);
        }else{
            return ;
        }
    };

    const handleClickShares=()=>{
        console.log("shares");
        navigate('/shares');
    }
    
    const handelClickRoutes=()=>{
        console.log("routes");
        setRoutes([...initialRoutes]);
    }
   
    
    return (
        <div className="reviews_mainLayout">
            <div className="review_wrap">
                <div className="reviews_top">
                    <div className="review_top_title">
                        <div className='review_top_tap'>
                            <div className='share_tap' onClick={handleClickShares}>Shares</div>
                            <div className='route_tap' onClick={handelClickRoutes}>Routes</div>
                        </div>
                    </div>
                    <div className='sortAndSearch'>
                        <div className='sortAndSearchIn'>
                            <div className="review_sort">
                                <ul className="review_sort_ul">
                                    <li onClick={(e)=>handleSort(e,"최신순")}>
                                        최신순
                                    </li>
                                    <li onClick={(e)=>handleSort(e, "조회순")}>
                                        조회순
                                    </li>
                                </ul>
                            </div>
                            <div className="reivew_search">
                                <input className="search_input" type="text" placeholder="    search" />
                                <BiSearch className="search_icon" onClick={()=>handleSearch()}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listLayout">
                    {
                        routes.length !== 0 && routes.map(routes => {
                            const createdAt=moment(routes.createdAt);
                            const formattedDate=createdAt.format('YYYY-MM-DD');
                            return (
                                <div className="listItem"  key={routes.id}>
                                    <div className='listItem_detail'>
                                        <div className="review_nickname">{routes.writerNickname}</div>
                                        <div className='review_detail'>
                                            <Link to={`/routeInfo/${routes.forumId}`}>
                                                <div className="review_title">{routes.title}</div>
                                                {/* <div className="review_content">{routes.content}</div> */}
                                                {/* {view && <Viewer initialValue={routes.content} style={{width:"300px", height:"300px"}}/> } */}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="review_footer">
                                        <div className='dateAndView'>
                                            <div className="viewLayout">
                                                {/* <div><BsEye className="view_icon"/></div> */}
                                                <div className='review_span'>조회수</div>
                                                <div className="review_views">{routes.views}</div>
                                            </div>
                                            <div className="review_created_at">{formattedDate}</div>
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
                    userId!==null ? 
                    <Link to={`/routeWrite`}>
                        <MyButton text={"글 작성"}/>
                    </Link> : null
                    }
                </div>
            </div>
        </div>
    );
}