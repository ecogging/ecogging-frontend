import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import axios from 'axios';
import { Viewer } from '@toast-ui/react-editor';
import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';
import '../../styles/Forum/Shares.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import MyButton from "../../components/common/MyButton.js";
// import { BsEye } from "react-icons/bs";
import { BiSearch } from "react-icons/bi"; <BiSearch size={30}/>

export default function ShareList(){
    const [routes,setroutes]=useState([]);
    const [curPage,setCurPage]=useState(1);
    const [allPage, setAllPage]=useState(false);
    const [pageBtn, setPageBtn]=useState([]);
    const [bsearch, setBsearch]=useState(false);
    const userId = getCookie("userId");
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const [initialRoutes, setInitialRoutes]=useState([]);
    //d
    useEffect(() => {
        fetchRoute();
        // setCurPage(parseInt(curPage));
        // fetchShares(parseInt(curPage));
    },[]);
        
    const fetchRoute=async (p_page)=>{
        axios
            .get(`http://localhost:8080/routes/${p_page}/${userId}`)
            .then((res)=>{
                let pageInfo=res.data.routes.pageInfo;
                let list=res.data.routes.content;
                setroutes(list);
                setInitialRoutes(list);
                console.log(list);
                setView(true);
                let btn=[];
                for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++){
                    btn.push(i);
            }
            setCurPage(pageInfo.curPage);
            setPageBtn(btn);
            //setLastPage(res.data.pageInfo.allPage);
            console.log("fetchReviews curPage : "+curPage);
            console.log("fetchReviews pageBtn : "+pageBtn);
            return list;
        })
            .catch ((err)=> {
                console.log(err);
            });
    }; 


    

    const handleSearch=()=>{

    };

    const handleSort=(e, type)=>{
        console.log("리뷰 정렬");
        
        if(type === '조회순'){
            console.log("조회순");
            // const sortByViews=[...shares].sort((a,b)=>a.views-b.views);
            // setShares(sortByViews);
            const sortByView = [...routes].sort((a, b) => b.views - a.views);
            setroutes(sortByView);

        }else if(type === '최신순'){
            console.log("최신순");
            // const sortByDate=[...shares].sort((a,b)=>b.createdAt-a.createdAt);
            // setShares(sortByDate);
            // console.log(shares);
            // navigate('/shares');
            setroutes([...initialRoutes]);
        }else{
            return ;
        }
    };

    const handlePageChange=(e)=>{
        setCurPage(e.target.id);
        fetchRoute(e.target.id);
    };


    const goToPreviousPage = () => {
        
        if (curPage === 1) 
        return; // 첫 페이지일 경우 이전 페이지로 이동하지 않음
        setCurPage(curPage - 1);
        console.log("curPage : "+curPage);
        fetchRoute(curPage - 1);
    }

    
    const goToNextPage = () => {
        if (curPage === allPage) 
        return ;
        setCurPage(curPage + 1);
        console.log("goToNextPage curPage : "+curPage);
        fetchRoute(curPage + 1);
    }

    const handleClickShares=()=>{
        console.log("shares");
        navigate('/shares');
    }
    
    const handelClickRoutes=()=>{
        console.log("routes");
        setroutes([...initialRoutes]);
    }
   
    console.log(routes);
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
                                        <div className="review_nickname">{routes.userId}</div>
                                        <div className='review_detail'>
                                            <Link to={`/routeInfo/${routes.forumId}`}>
                                                <div className="review_title">{routes.title}</div>
                                                {/* <div className="review_content">{routes.content}</div> */}
                                                {view && <Viewer initialValue={routes.content} style={{width:"300px", height:"300px"}}/> }
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
                {/* <div>
                <Link to="{/reviewInfo}">
                    상세
                    </Link>
                </div> */}
                <Pagination className='pagination'>
                        <PaginationItem disabled={curPage===1}>
                            <PaginationLink onClick={goToPreviousPage} aria-label='Previous'>
                            <span aria-hidden="true">‹</span>
                            </PaginationLink>
                        </PaginationItem>
                        {
                            pageBtn.map(item=>{
                                return(
                                    <PaginationItem className={item===curPage?'active':''} key={item}>
                                        <PaginationLink onClick={handlePageChange} id={item}>
                                            {item}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem disabled={allPage}>
                            <PaginationLink onClick={goToNextPage} aria-label='Next'>
                                <span aria-hidden>›</span>
                            </PaginationLink>
                        </PaginationItem>
                </Pagination>
                
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