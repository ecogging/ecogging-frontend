import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import '../../styles/Forum/ShareDetail.css';
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';

 

export default function ShareDetail(){
    const [shareInfo, setShareInfo]=useState([]);
    const {id} = useParams();
    const createdAt=moment(shareInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    const loginCheck=true;

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/shareInfo`,{id:id})
        .then(res=>{
            setShareInfo(res.data.shareInfo);
            console.log(res.data.shareInfo);
            // console.log("reviewInfo : "+reviewInfo.content);
            // console.log("result"+result);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    
    const result=shareInfo.content;
    console.log("result:"+result);
    // const html=reviewInfo;
    // console.log(html);

    const handleChat=()=>{
        console.log("쪽지모달");
    }

    const handleScrap=()=>{
        console.log("스크랩");
    }
    const handelShareDel=()=>{
        axios
        .post(`http://localhost:8080/shareDel/${id}`)
        .then(res=>{
            console.log("삭제 완료");
            navigate('/shares');
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="reviewInfo_mainLayout">
            <div className="reviewInfo_wrap">
                <div className="reviewInfo_top">
                    <div className="reviewInfo_title">{shareInfo.title}</div>
                    <div className="reviewInfo_top_in">
                        <div className="reviewInfo_imageAndnickname">
                            <div className="reviewInfo_profil">프사</div>
                            <div className="reviewInfo_nickname"  onClick={handleChat}>{shareInfo.userId}</div>
                        </div>
                        <div className="reviewInfo_dateAndviewsAndscrap">
                            <div className="reviewInfo_date">{formattedDate}</div>
                            <div className="reviewInfo_views"><HiOutlineEye className="view_icon"/> {shareInfo.views}</div>
                            <div className="reviewInfo_scrap" onClick={handleScrap}><BsFillBookmarkFill className="BsFillBookmarkFill"/></div>
                        </div>
                    </div>
                </div>
                <div className="reviewInfo_layout">
                    <div className="reviewInfo_content">
                        {/* <div className="reviewInfo_content_in"> */}
                            <Viewer initialValue={shareInfo.content}/>
                        {/* </div> */}
                    </div>
                </div>
                <div className="reviewInfoBtn_layout">
                    <div className="reviewsBtn_layout">
                        <Link to={'/shares'} className="reviewsBtn">
                                목록
                        </Link>
                    </div>
                        {
                        loginCheck ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/shareInfoModify/${shareInfo.id}`} className="modifyBtn">
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