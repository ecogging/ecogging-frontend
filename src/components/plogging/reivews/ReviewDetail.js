import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import '../../../styles/plogging/review/ReviewDetail.css';
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";

 

export default function ReviewDetail(){
    const [reviewInfo, setReviewInfo]=useState([]);
    const {id} = useParams();
    const createdAt=moment(reviewInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/reviewInfo`,{id:id})
        .then(res=>{
            setReviewInfo(res.data.reviewInfo);
            console.log(res.data.reviewInfo);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const handleChat=()=>{
        console.log("쪽지모달");
    }

    const handleScrap=()=>{
        console.log("스크랩");
    }
    return(
        <div className="reviewInfo_mainLayout">
            <div className="reviewInfo_wrap">
                <div className="reviewInfo_top">
                    <div className="reviewInfo_title">{reviewInfo.title}</div>
                    <div className="reviewInfo_top_in">
                        <div className="reviewInfo_imageAndnickname">
                            <div className="reviewInfo_profil">프사</div>
                            <div className="reviewInfo_nickname"  onClick={handleChat}>{reviewInfo.userId}</div>
                        </div>
                        <div className="reviewInfo_dateAndviewsAndscrap">
                            <div className="reviewInfo_date">{formattedDate}</div>
                            <div className="reviewInfo_views"><HiOutlineEye className="view_icon"/> {reviewInfo.views}</div>
                            <div className="reviewInfo_scrap" onClick={handleScrap}><BsFillBookmarkFill className="BsFillBookmarkFill"/></div>
                        </div>
                    </div>
                </div>
                <div className="reviewInfo_layout">
                    <div className="reviewInfo_content">
                        <div className="reviewInfo_content_in">
                            {reviewInfo.content}
                        </div>
                    </div>
                    <div className="reviewInfo_img">
                        <div className="reviewInfo_img_in">
                            이미지
                        </div>
                    </div>
                </div>
                <div className="reviewInfoBtn_layout">
                    <div className="reviewsBtn_layout">
                        <Link to={'/reviews'} className="reviewsBtn">
                                목록
                        </Link>
                    </div>
                    <div className="modifyAndDeleteBtn_layout_in">
                        <Link to={`/reviewInfoModify/${reviewInfo.id}`} className="modifyBtn">
                                수정
                        </Link>
                        <Link to={`/reviewInfoDel/${reviewInfo.id}`} className="delBtn">
                                삭제
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}