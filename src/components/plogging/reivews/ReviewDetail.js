import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import '../../../styles/plogging/review/ReviewDetail.css';
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
import { getCookie } from "../../../utils/CookieUtil";

 

export default function ReviewDetail(){
    const [reviewInfo, setReviewInfo]=useState([]);
    const [content, setContent]=useState([]);
    const {forumId} = useParams();
    const createdAt=moment(reviewInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    const userId=getCookie("userId");
    const [isScrapped, setIsScrapped] = useState(false);
    const [view, setView] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/reviewInfo/${forumId}/${userId}`)
        .then(res=>{
            setReviewInfo(res.data.reviewInfo);
            setView(true);
            console.log(res.data.reviewInfo);
            // setContent(reviewInfo.content);
            setIsScrap(res.data.isScrap);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    
    const result=reviewInfo.content;
    console.log("result:"+result);
    // const html=reviewInfo;
    // console.log(html);



    const handleChat=()=>{
        console.log("쪽지모달");
    }

    const handleScrap=()=>{
        console.log("스크랩");
        axios.post(`http://localhost:8080/forumscrap/${forumId}/${userId}`)
        .then(res=> {
            setIsScrap(res.data);
            // setIsScrapped(res.data);
        })
        .catch(err=> {
            console.log(err);
        })    
    };

    console.log("isScrap : "+isScrap);


    const handelReviewDel=()=>{
        axios
        .post(`http://localhost:8080/reviewDel/${forumId}`)
        .then(res=>{
            console.log("삭제 완료");
            navigate('/reviews');
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="reviewInfo_mainLayout">
            <div className="reviewInfo_wrap">
                <div className="reviewInfo_top">
                    <div className="reviewInfo_title">{reviewInfo.title}</div>
                    <div className="reviewInfo_top_in">
                        <div className="reviewInfo_imageAndnickname">
                            {/* <div className="reviewInfo_profil">{reviewInfo.writerNickname}</div> */}
                            {/* <div className="reviewInfo_nickname"  onClick={handleChat}>{reviewInfo.writerNicknames}</div> */}
                        </div>
                        <div className="reviewInfo_dateAndviewsAndscrap">
                            <div className="reviewInfo_date">{formattedDate}</div>
                            <div className="reviewInfo_views"><HiOutlineEye className="view_icon"/> {reviewInfo.views}</div>
                            <div className="reviewInfo_scrap" onClick={handleScrap}><BsFillBookmarkFill className={isScrap? "BsFillBookmarkFill":""}/></div>
                        </div>
                    </div>
                </div>
                <div className="reviewInfo_layout">
                    {view && <Viewer initialValue={reviewInfo.content} style={{width:"300px", height:"300px"}} className="reviewVu"/> }
                    {/* <div className="reviewInfo_content">
                    </div> */}
                </div>
                <div className="reviewInfoBtn_layout">
                    <div className="reviewsBtn_layout">
                        <Link to={'/reviews'} className="reviewsBtn">
                                목록
                        </Link>
                    </div>
                        {
                        userId!=null ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/reviewInfoModify/${forumId}`} className="modifyBtn">
                                        수정
                                </Link>
                                {/* <Link to={`/reviewInfoDel/${reviewInfo.id}`} className="delBtn"> */}
                                <div className="delBtn" onClick={handelReviewDel}>
                                    삭제
                                </div>
                                {/* </Link>  */}
                            </div>
                        : null
                        }
                </div>
            </div>
        </div>
    );
}