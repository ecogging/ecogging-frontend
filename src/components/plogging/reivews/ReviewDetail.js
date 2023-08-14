import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../../../utils/CookieUtil";
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";
import '../../../styles/plogging/review/ReviewDetail.css';
import '../../../styles/Forum/ForumCommon.css';
 

export default function ReviewDetail(){
    const [reviewInfo, setReviewInfo]=useState("");
    const {forumId} = useParams();
    const createdAt=moment(reviewInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    const userId=getCookie("userId");
    const [view, setView] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/reviewInfo/${forumId}`,{userId:userId})
        .then(res=>{
            setReviewInfo(res.data.reviewInfo);
            setView(true);
            console.log(res.data.reviewInfo);
            setIsScrap(res.data.isScrap);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const handleChat=()=>{
        console.log("쪽지모달");
    };

    const handleScrap=()=>{
        console.log("스크랩");
        axios.post(`http://localhost:8080/forumscrap/${forumId}/${userId}`)
        .then(res=> {
            setIsScrap(res.data);
        })
        .catch(err=> {
            console.log(err);
        })    
    };

    const handelReviewDel=()=>{
        axios
        .post(`http://localhost:8080/reviewDel/${forumId}`)
        .then(res=>{
            console.log("삭제 완료");
            navigate('/reviews');
        }).catch(err=>{
            console.log(err);
        })
    };

    return(
        <div className="reviewInfo_mainLayout">
            <div className="reviewInfo_wrap">
                <div className="reviewInfo_top">
                    <div className="reviewInfo_title">{reviewInfo.title}</div>
                    <div className="reviewInfo_top_in">
                    <div className="reviewInfo_imageAndnickname">
                            <div className="reviewInfo_profil">
                                <img src={reviewInfo.writerPic} alt="프사" className="reviewInfo_profil_img"/>    
                            </div>
                            <div className="reviewInfo_nickname" onClick={handleChat}>{reviewInfo.writerNickname}</div>
                        </div>
                        <div className="reviewInfo_dateAndviewsAndscrap">
                            <div className="reviewInfo_date">{formattedDate}</div>
                            <div className="reviewInfo_views"><HiOutlineEye className="view_icon"/> {reviewInfo.views}</div>
                            <div className="forum_scrap" onClick={handleScrap}><BsFillBookmarkFill className={isScrap? "BsFillBookmarkFill_true":"BsFillBookmarkFill_false"}/></div>
                        </div>
                    </div>
                </div>
                <div className="reviewInfo_layout">
                    <div className="reviewInfo_layout_in">
                        {view && <Viewer initialValue={reviewInfo.content}/> }
                    </div>
                </div>
                <div className="reviewInfoBtn_layout">
                    <div className="reviewInfo_list_layout">
                        <Link to={'/reviews'} className="routeBtn">
                                목록
                        </Link>
                    </div>
                        {
                        userId!=null ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/reviewInfoModify/${forumId}`} className="routeBtn">
                                        수정
                                </Link>
                                <div className="routeBtn" onClick={handelReviewDel}>
                                    삭제
                                </div>
                            </div>
                        : null
                        }
                </div>
            </div>
        </div>
    );
}