import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useParams } from 'react-router';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import '../../../styles/plogging/Reviews.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import { BsEye } from "react-icons/bs";
import { BiSearch } from "react-icons/bi"; <BiSearch size={30}/>

export default function ReviewList(){
    const [reviews,setReviews]=useState([]);
    const {page}=useParams();
    const [curPage,setCurPage]=useState(page);
    const [allPage, setAllPage]=useState([]);
    const [pageBtn, setPageBtn]=useState([]);
    const [bsearch, setBsearch]=useState(false);
    // const [formattedDate,setFormattedDate]=useState('');
    
    // const navigate=useNavigate();
    // navigate("/reviews/{page}",{state:page});
    // const location=useLocation();
    // page=location.state;
    useEffect(() => {
        console.log("page : "+page);
        fetchReviews(page);
    },[page]);
        
    const fetchReviews=async (page)=>{
        try {
            const response=await axios.get(`http://localhost:8080/reviews/${page}`);
            console.log(response);
            let pageInfo=response.data.pageInfo;
            let list=response.data.reviews;
            // console.log(pageInfo);
            // console.log("pageInfo.endPage : "+pageInfo.endPage);
            console.log(list);
            setReviews([...list]);
            let btn=[];
            for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++){
                btn.push(i);
            }
            console.log("pageBtn : "+pageBtn);
            setPageBtn(btn);
            // return list;
        } catch (error) {
            console.error();
        }
    }; 


    

    const handleSearch=()=>{

    };

    const handleSort=()=>{

    };
    const handlePageChange=(e)=>{
        console.log("page2 : "+page);
        setCurPage(e.target.id);
        console.log("curPage2 : "+curPage);
        if(bsearch){
            //search(e.target.id);
        }else{
            fetchReviews(e.target.id);
        }
        
    };


    const goToPreviousPage = () => {
        console.log("curPage : "+curPage);
        
        if (curPage === 1) 
        return; // 첫 페이지일 경우 이전 페이지로 이동하지 않음
        setCurPage(curPage - 1);
        fetchReviews(curPage - 1);
    }

    
    const goToNextPage = () => {
        setCurPage(curPage + 1);
        fetchReviews(curPage + 1);
        console.log("curPage : "+curPage);
        if (curPage === allPage.length){
            return ;
        } 
        console.log("allPage : "+allPage);
        //return; // 마지막 페이지일 경우 다음 페이지로 이동하지 않음
    }
   

    return (
        <div className="reviews_mainLayout">
            <div className="review_wrap">
                <div className="reviews_top">
                    <div className="review_top_title">
                        REVIEWS
                    </div>
                    <div className="review_sort">
                        <ul className="review_sort_ul">
                            <li onClick={()=>handleSort()}>
                                조회순
                            </li>
                            <li>
                                최신순
                            </li>
                        </ul>
                    </div>
                    <div className="reivew_search">
                        <input className="search_input" type="text" placeholder="    search" />
                        <BiSearch className="search_icon" onClick={()=>handleSearch()}/>
                    </div>
                </div>
                <div className="listLayout">
                    {
                        reviews.length !== 0 && reviews.map(review => {
                            const createdAt=moment(review.createdAt);
                            const formattedDate=createdAt.format('YYYY-MM-DD');
                            return (
                                <div className="listItem" key={review.forumid} id={review.forumid}>
                                    <div className='listItem_detail'>
                                        <div className="review_nickname">{review.userId}</div>
                                        <div className='review_detail'>
                                            <a href="./${review.forumId}">
                                                <div className="review_title">{review.title}</div>
                                                <div className="review_content">{review.content}</div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="review_footer">
                                        <div className='dateAndView'>
                                            <div className="viewLayout">
                                                {/* <div><BsEye className="view_icon"/></div> */}
                                                <div className='review_span'>조회수</div>
                                                <div className="review_views">{review.views}</div>
                                            </div>
                                            <div className="review_created_at">{formattedDate}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Pagination className='pagination'>
                        <PaginationItem>
                        <PaginationLink onClick={goToPreviousPage} id={page} key={page}>previous</PaginationLink>
                        </PaginationItem>
                        {
                            pageBtn.map(page=>{
                                return(
                                    <PaginationItem className={page===curPage?'active':''} key={page}>
                                        <PaginationLink onClick={handlePageChange} id={page}>
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })
                        }
                        <PaginationItem>
                            <PaginationLink onClick={goToNextPage} id={page} key={page}>next</PaginationLink>
                        </PaginationItem>
                </Pagination>
                <div className='writeBtn'></div>
            </div>
        </div>
    );
}