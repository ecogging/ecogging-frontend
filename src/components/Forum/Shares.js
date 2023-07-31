import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import axios from 'axios';
import { Pagination } from 'antd';
import '../../styles/Forum/Shares.css';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';
import MyButton from "../../components/common/MyButton.js";
import { Viewer } from '@toast-ui/react-editor';
// import { BsEye } from "react-icons/bs";
import { BiSearch } from "react-icons/bi"; <BiSearch size={30}/>


export default function ShareList(){
    const [shares,setShares]=useState([]);
    // const [curPage,setCurPage]=useState(1);
    // const [allPage, setAllPage]=useState(false);
    // const [pageBtn, setPageBtn]=useState([]);
    // const [bsearch, setBsearch]=useState(false);
    const navigate = useNavigate();
    const [initialShares, setInitialShares]=useState([]);
    const userId = getCookie("userId");
    const [view, setView] = useState(false);

       // 페이징 ---------------------------------------------------------------
       const [totPages, setTotPages] = useState(0); // 전체 페이지
       const [nowPage, setNowPage] = useState(1); // 현재 페이지
       const changePage = (no) => { // 페이지 클릭할 때마다 현재 페이지 변경
           setNowPage(no);
       }
    
    useEffect(() => {
           


                axios
                .get(`http://localhost:8080/shares/${nowPage}`)
                .then((res)=>{
                    console.log(res.data);
                    setShares(res.data.res.content);
                    // setInitialRoutes(res.data.routes);
                    setView(true);
                    setTotPages(res.data.all);
                })
                .catch ((err)=> {
                    console.log(err);
                });

},[nowPage]);

    

    const handleSearch=()=>{

    };

    const handleSort=(e, type)=>{
        console.log("리뷰 정렬");
        
        if(type === '조회순'){
            console.log("조회순");
            // const sortByViews=[...shares].sort((a,b)=>a.views-b.views);
            // setShares(sortByViews);
            const sortByView = [...shares].sort((a, b) => b.views - a.views);
            setShares(sortByView);

        }else if(type === '최신순'){
            console.log("최신순");
            // const sortByDate=[...shares].sort((a,b)=>b.createdAt-a.createdAt);
            // setShares(sortByDate);
            // console.log(shares);
            // navigate('/shares');
            // setShares([...initialShares]);
            navigate('/shares');
        }else{
            return ;
        }
    };

    // const handlePageChange=(e)=>{
    //     setCurPage(e.target.id);
    //     fetchShares(e.target.id);
    // };


    // const goToPreviousPage = () => {
        
    //     if (curPage === 1) 
    //     return; // 첫 페이지일 경우 이전 페이지로 이동하지 않음
    //     setCurPage(curPage - 1);
    //     console.log("curPage : "+curPage);
    //     fetchShares(curPage - 1);
    // }

    
    // const goToNextPage = () => {
    //     if (curPage === allPage) 
    //     return ;
    //     setCurPage(curPage + 1);
    //     console.log("goToNextPage curPage : "+curPage);
    //     fetchShares(curPage + 1);
    // }

    const handleClickShares=()=>{
        console.log("shares");
        setShares([...initialShares]);
    }

    const handelClickRoutes=()=>{
        console.log("routes");
        navigate('/routeList');
    }
   
    console.log(shares);
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
                        shares.length !== 0 && shares.map(shares => {
                            const createdAt=moment(shares.createdAt);
                            const formattedDate=createdAt.format('YYYY-MM-DD');
                            return (
                                <div className="listItem"  key={shares.id}>
                                    <div className='listItem_detail'>
                                    <div className='nickAndPic'>
                                            {/* <div className="review_pic">{shares.writerPic}</div> */}
                                            <div className="review_nickname">{shares.writerNickname}</div>
                                        </div>
                                        <div className='review_detail'>
                                            <Link to={`/shareInfo/${shares.forumId}`}>
                                                <div className="review_title">{shares.title}</div>
                                                {/* <div className="review_content">{shares.content}</div> */}
                                                {/* {view && <Viewer initialValue={shares.content} style={{width:"300px", height:"300px"}}/> } */}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="review_footer">
                                        <div className='dateAndView'>
                                            <div className="viewLayout">
                                                {/* <div><BsEye className="view_icon"/></div> */}
                                                <div className='review_span'>조회수</div>
                                                <div className="review_views">{shares.views}</div>
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
                    <Link to={`/shareWrite`}>
                        <MyButton text={"글 작성"}/>
                    </Link> : null
                    }
                </div>
            </div>
        </div>
    );
}