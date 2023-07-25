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
    const {id} = useParams();
    const createdAt=moment(reviewInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    // const loginCheck=true;
    const userId=getCookie("userId");
    const [isScrapped, setIsScrapped] = useState(false);

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/reviewInfo`,{userId:userId,forumId:id})
        .then(res=>{
            setReviewInfo(res.data.reviewInfo);
            console.log(res.data.reviewInfo);
            setContent(reviewInfo.content);
            // console.log("reviewInfo : "+reviewInfo.content);
            // console.log("result"+result);
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
        // if(accompany.active==false) return;
        axios.post(`http://localhost:8080/reviewscrap`,{userId:userId, forumId:id})
        .then(res=> {
            setIsScrapped(res.data);
        })
        .catch(err=> {
            console.log(err);
        })    
    };

    const handelReviewDel=()=>{
        axios
        .post(`http://localhost:8080/reviewDel/${id}`)
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
                        {/* <div className="reviewInfo_content_in"> */}
                            {/* <Viewer initialValue={reviewInfo.content}/> */}
                            <Viewer dangerouslySetInnerHTML={{ __html: content }}/>
                        {/* </div> */}
                    </div>
                </div>
                <div className="reviewInfoBtn_layout">
                    <div className="reviewsBtn_layout">
                        <Link to={'/reviews'} className="reviewsBtn">
                                목록
                        </Link>
                    </div>
                        {
                        // loginCheck ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/reviewInfoModify/${reviewInfo.id}`} className="modifyBtn">
                                        수정
                                </Link>
                                {/* <Link to={`/reviewInfoDel/${reviewInfo.id}`} className="delBtn"> */}
                                <div className="delBtn" onClick={handelReviewDel}>
                                    삭제
                                </div>
                                {/* </Link>  */}
                            </div>
                        // : null
                        }
                </div>
            </div>
        </div>
    );
}