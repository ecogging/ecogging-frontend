import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import { getCookie } from '../../utils/CookieUtil';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
import ShareStatus from './ShareStatus';
import {MdKeyboardArrowUp} from "react-icons/md";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import { HiOutlineEye } from "react-icons/hi2";
import '../../styles/Forum/ShareDetail.css';
import '../../styles/Forum/ForumCommon.css';
 
export default function ShareDetail(){
    const [shareInfo, setShareInfo]=useState("");
    const {forumId} = useParams();
    const createdAt=moment(shareInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const userId = getCookie("userId");
    const [isScrap, setIsScrap] = useState(false);
    const [dropd, setDropd]=useState(false);
    const [shareStau, setShareStau]=useState("");

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/shareInfo/${forumId}`,{userId:userId})
        .then(res=>{
            setShareInfo(res.data.shareInfo);
            setView(true);
            setShareStau(res.data.shareInfo.status);
            console.log(res.data.shareInfo);
            setIsScrap(res.data.isScrap);
        }).catch(err=>{
            console.log(err);
        })
    },[]);
    
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

    const handelShareDel=()=>{
        axios
        .post(`http://localhost:8080/shareDel/${forumId}`)
        .then(res=>{
            console.log("삭제 완료");
            navigate('/shares');
        }).catch(err=>{
            console.log(err);
        })
    };

    const handleShareStatus=(data)=>{
        setShareStau(data);
        console.log("data : "+data);
        const status=data;
        console.log(status);
        axios.post(`http://localhost:8080/shareStatus/${forumId}`,{stat:status});   
    };

    return(
        <div className="shareInfo_mainLayout">
            <div className="shareInfo_wrap">
                <div className="shareInfo_status">
                    <div className="shareInfo_status_in">
                        <ul onClick={()=>{setDropd(!dropd)}} className="share_status_ul">
                            {shareStau}
                            {dropd?<MdKeyboardArrowUp/>:<MdOutlineKeyboardArrowDown/>}
                            {dropd&&<ShareStatus onStatus={handleShareStatus}/>}
                        </ul>
                    </div>
                </div>
                <div className="shareInfo_top">
                    <div className="reviewInfo_title">{shareInfo.title}</div>
                    <div className="shareInfo_top_in">
                        <div className="shareInfo_imageAndnickname">
                            <div className="shareInfo_profil">
                                <img src={shareInfo.writerPic} alt="프사" className="shareInfo_profil_img"/>    
                            </div>
                            <div className="shareInfo_nickname"  onClick={handleChat}>{shareInfo.writerNickname}</div>
                        </div>
                        <div className="shareInfo_dateAndviewsAndscrap">
                            <div className="shareInfo_date">{formattedDate}</div>
                            <div className="shareInfo_views"><HiOutlineEye/> {shareInfo.views}</div>
                            <div className="forum_scrap" onClick={handleScrap}><BsFillBookmarkFill className={isScrap? "BsFillBookmarkFill_true":"BsFillBookmarkFill_false"}/></div>
                        </div>
                    </div>
                </div>
                <div className="shareInfo_layout">
                    <div className="shareInfo_layout_in">
                        {view && <Viewer initialValue={shareInfo.content}/> }
                    </div>
                </div>
                <div className="shareInfoBtn_layout">
                    <div className="shareInfo_list_layout">
                        <Link to={'/shares'} className="routeBtn">
                                목록
                        </Link>
                    </div>
                        {
                        userId!==null ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/shareInfoModify/${shareInfo.forumId}`} className="routeBtn">
                                    수정
                                </Link>
                                <div className="routeBtn" onClick={handelShareDel}>
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