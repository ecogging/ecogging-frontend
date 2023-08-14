import axios from "axios";
import React, { useEffect, useState } from 'react';
import { getCookie } from '../../../utils/CookieUtil';
import { useParams } from "react-router";
import TextEditor from "../../common/TextEditor";
import { useNavigate } from 'react-router-dom';
import '../../../styles/plogging/review/ReviewWrite.css';
import '../../../styles/Forum/ForumCommon.css';

export default function ReviewModify(){
    const navigate = useNavigate();
    const {forumId}=useParams();
    const [reviewInfo, setReviewInfo]=useState("");
    const userId = getCookie("userId");
    const [view, setView] = useState(false);

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/reviewInfo/${forumId}`,{userId:userId})
        .then(res=>{
            setView(true);
            setReviewInfo(res.data.reviewInfo);
            console.log(res.data.reviewInfo);
        }).catch(err=>{
            console.log(err);
        })
    },[view])

    const handleReviewSave=async(temp)=>{
        try {
            const res=await axios.post(`http://localhost:8080/reviewModify/${userId}/${forumId}/${temp}`, reviewInfo,
            {
                headers:{'Content-Type': 'application/json',
                withCredentials:true},
            })
            console.log(res.data);
            navigate('/reviews');
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditorData=(data)=>{
        setReviewInfo({...reviewInfo, content:data})
    };

    const handleTitleChange=(e)=>{
        setReviewInfo({...reviewInfo, title:e.target.value})
    };

    return( 
        <div className="review_mainLayout">
            <div className="review_wrap">
                <div className="review_top">
                    <input className="titleInput" value={reviewInfo.title}  onChange={handleTitleChange} maxLength={50}/>
                </div>
                <div className="review_layout">
                    {view && <TextEditor onEditorDataChange={handleEditorData} contentData={reviewInfo.content}/>}
                </div>
                <div className="tempAndSaveBtn_layout">
                    <div className="tempAndSaveBtn_layout_in">
                        <div className="routeBtn" onClick={()=>handleReviewSave(1)}>
                                임시저장
                        </div>
                        <div className="routeBtn" onClick={()=>handleReviewSave(0)}>
                                등록
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}