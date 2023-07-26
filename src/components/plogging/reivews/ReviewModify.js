import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import { useParams } from "react-router";
import '../../../styles/plogging/review/ReviewModify.css';
import TextEditor from "../../common/TextEditor";
import { useNavigate } from 'react-router-dom';


export default function ReviewModify(){
    const navigate = useNavigate();
    const {forumId}=useParams();
    const [reviewInfo, setReviewInfo]=useState({});
    const userId = getCookie("userId");
    const [view, setView] = useState(false);

    console.log("forumId : "+forumId);
    useEffect(()=>{
        axios
        .post(`http://localhost:8080/reviewInfo/${forumId}/${userId}`)
        .then(res=>{
            setView(true);
            setReviewInfo(res.data.reviewInfo);
            // setView(true);
            console.log(res.data.reviewInfo);
            // setContent(reviewInfo.content);
            // console.log("reviewInfo : "+reviewInfo.content);
            // console.log("result"+result);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    const handleupdateSave=async()=>{
        try {
            const res=await axios.post(`http://localhost:8080/routeModify/${userId}/${forumId}`, reviewInfo,
            {
                headers:{'Content-Type': 'application/json',
                withCredentials:true},
            })
            console.log(res.data);
            navigate('/reviews');
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditorData=(data)=>{
        setReviewInfo({...reviewInfo, content:data})
    }

    const handleTitleChange=(e)=>{
        setReviewInfo({...reviewInfo, title:e.target.value})
    }

    return( 
        <div className="reviewModify_mainLayout">
            <div className="reviewModify_wrap">
                <div className="reviewModify_top">
                    <div className="reviewModify_title">
                        <input className="titleInput" value={reviewInfo.title}  onChange={handleTitleChange} maxLength={50}/>
                    </div>
                </div>
                <div className="reviewModify_layout">
                    <div className="reviewModify_content">
                        <div className="reviewModify_content_in">
                        {view && <TextEditor onEditorDataChange={handleEditorData} contentData={reviewInfo.content}/>}
                        </div>
                    </div>
                </div>
                <div className="tempAndComplBtn_layout">
                    <div className="tempAndComplBtn_layout_in">
                        <div className="tmepBtn">
                                임시저장
                        </div>
                        <div className="complBtn" onClick={handleupdateSave}>
                                등록
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}