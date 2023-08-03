import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import '../../styles/Forum/ShareDetail.css';
import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';

 

export default function ShareDetail(){
    const [shareInfo, setShareInfo]=useState("");
    const {forumId} = useParams();
    const createdAt=moment(shareInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const userId = getCookie("userId");
    const [isScrap, setIsScrap] = useState(false);

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/shareInfo/${forumId}`,{userId:userId})
        .then(res=>{
            setShareInfo(res.data.shareInfo);
            setView(true);
            console.log(res.data.shareInfo);
            setIsScrap(res.data.isScrap);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    
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


    const handelShareDel=()=>{
        axios
        .post(`http://localhost:8080/shareDel/${forumId}`)
        .then(res=>{
            console.log("삭제 완료");
            navigate('/shares');
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="reviewInfo_mainLayout">
            <div>
            </div>
            <div className="reviewInfo_wrap">
                <div className="reviewInfo_top">
                    <div className="reviewInfo_title">{shareInfo.title}</div>
                    <div className="reviewInfo_top_in">
                        {/* <div className="reviewInfo_imageAndnickname">
                            <div className="reviewInfo_profil">프사</div>
                            <div className="reviewInfo_nickname"  onClick={handleChat}>{shareInfo.userId}</div>
                        </div> */}
                        <div className="reviewInfo_dateAndviewsAndscrap">
                            <div className="reviewInfo_date">{formattedDate}</div>
                            <div className="reviewInfo_views"><HiOutlineEye className="view_icon"/> {shareInfo.views}</div>
                            <div className="reviewInfo_scrap" onClick={handleScrap}><BsFillBookmarkFill className={isScrap? "BsFillBookmarkFill":""}/></div>
                        </div>
                    </div>
                </div>
                <div className="reviewInfo_layout">
                    {view && <Viewer initialValue={shareInfo.content} style={{width:"300px", height:"300px"}} className='viewerContent' /> }
                    {/* <div className="reviewInfo_content">
                    </div> */}
                </div>
                <div className="reviewInfoBtn_layout">
                    <div className="reviewsBtn_layout">
                        <Link to={'/shares'} className="reviewsBtn">
                                목록
                        </Link>
                    </div>
                        {
                        userId!==null ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/shareInfoModify/${shareInfo.forumId}`} className="modifyBtn">
                                        수정
                                </Link>
                                {/* <Link to={`/reviewInfoDel/${reviewInfo.id}`} className="delBtn"> */}
                                <div className="delBtn" onClick={handelShareDel}>
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