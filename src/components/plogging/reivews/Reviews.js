import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';


export default function ForumList(){
    const [reviews,setReviews]=useState([]);
    const {page}=useParams();
    // const [curPage,setCurPage]=useState(1);
    const [pageBtn, setPageBtn]=useState([]);

    

    const fetchReviews=async (p_page)=>{
        axios.get(`http://localhost:8080/reviews/${p_page}`)
        .then(res=> {
            console.log(res);
            let pageInfo=res.data.pageInfo;
            let list=res.data.list;
            setReviews([...list]);
            let btn=[];
            for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++){
                btn.push(i);
            }
            setPageBtn(btn);
        })
        .catch (err=> {
            console.log(err);
        })
    };

    useEffect(() => {
        fetchReviews(page);
    },[]);

    const handleSearch=()=>{

    }
    const handleSort=()=>{

    }

    return (
        <div className="reviews_mainLayout">
            <h1>동구리언니 바보~!~!~</h1>
            <div className="review_wrap">
                <div className="reviews_top">
                    <div className="reivew_search">
                        <input type="text" placeholder="search" />
                        <div onClick={()=>handleSearch()}>
                            
                        </div>
                    </div>
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
                </div>
                <div className="listLayout">
                    {
                        reviews.length !== 0 && reviews.map(review => {
                            return (
                                <div className="listItem" key={review.forumid}>
                                    <div>
                                        <a href="./reviews/{forumId}">
                                            <div className="review_title">{review.title}</div>
                                            <div className="review_content">{review.content}</div>
                                        </a>
                                    </div>
                                    <div className="review_footer">
                                        <div className="review_nickname">{review.nickname}</div>
                                        <div className="review_views">{review.views}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
}