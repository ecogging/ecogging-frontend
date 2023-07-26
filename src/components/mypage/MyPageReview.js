// import { Pagination } from 'antd';
import Pagination from "../common/Pagination";
import '../../styles/mypage/MyPageReview.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';

export default function MyPageReview () {

    const {page} = useParams();
    const userId = getCookie("userId");
    const [curPage, setCurPage] = useState(page);
    const [totCnt, setTotCnt] = useState(0);
    const [forumList, setForumList] = useState([]);
    const [order, setOrder] = useState("new");

    const navigate = useNavigate();

    useEffect(()=> {
        console.log("MyPageReview");
        axios.post(`http://localhost:8080/myforum`, {userId:userId, page:page, order:order})
        .then(res=> {
            console.log(res.data);
            setForumList([...res.data.list]);
            setTotCnt(res.data.allCount);        
        })
        .catch(err=> {
            console.log(err);
        })
    }, [page])

    const reviewsDelete = (id) => {
        axios.get(`http://localhost:8080/reviewsdelete/${id}`)
        .then(res=> {
            window.location.href = '/mypagereview';            
        })
        .catch(err=> {
            console.log(err);
        })
    }

    const pagination = (pageNum) => {
        setCurPage(pageNum);
        navigate(`/mypage/${userId}/reviews/${pageNum}`);
    }

    return (
        <div className='container_mypageReview'>
            <div className='container_mypageRevHeader'>
                {/* <div className='container_mypageRevTitleArea'>
                    <div className='box_mypageRevTitle'>플로깅 후기</div>
                </div> */}
            </div>
            
            <div className='container_wholeMyReviews'>

                {forumList && forumList.map((forum) => (
                    <div className='container_wholeMyReview' key={forum.createdAt}>
                        <div className='container_myReview'>
                            <div className='container_revDateandViews'>
                                <div className='box_revDate'>
                                    <div className='txt_revDate'>{forum.createdAt.substring(0,10)}</div>
                                </div>
                            </div>
                            <div className='container_mypageBody'>
                                <div className='container_myrevTitle'>
                                    <Link to={`/reviewDetail/${forum.forumId}`}><div className='box_revTitle'>{forum.title}</div></Link>
                                </div>
                                <div className='box_revViews'>
                                    <div className='txt_revViews'>조회수&nbsp;{forum.views}</div>
                                </div>
                            </div>

                            <div className='container_mypageRevContents'>
                                <div className='box_revContents'>{forum.content}</div>
                                <div className='box_detailBtns'>
                                    <Link to={`/reviewModify/${forum.forumId}`}><div className='box_revBtn'>수정</div></Link>
                                    <div className='box_revBtn' onClick={()=>reviewsDelete(forum.forumId)}>삭제</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='container_mypageRevBottom'>
                <div className='box_revPagination'>
                    <Pagination postsPerPage={5} totalPosts={totCnt} paginate={pagination}/>

                </div>
            </div>
        </div>
    );
}