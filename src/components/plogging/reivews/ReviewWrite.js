import React, { useState } from 'react';
import axios from "axios";
import { useParams } from "react-router";
import TextEditor from "../../common/TextEditor";
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../utils/CookieUtil';
import '../../../styles/plogging/review/ReviewWrite.css';
import '../../../styles/Forum/ForumCommon.css';

export default function ReviewWrite(){
    const [editorData,setEditorData]=useState('');
    const [titleVal, setTitleVal]=useState('');
    const navigate = useNavigate();
    const userId = getCookie("userId");
    const {accompanyId}=useParams();
 
    console.log("accompanyId :"+accompanyId);

    const handleReviewSave=async(temp)=>{
        try {
            console.log("temp : "+temp);
            const requestData={
                content:editorData,
                title:titleVal,
            };
            const response=await axios.post(`http://localhost:8080/reviewWrite/${accompanyId}/${temp}/${userId}`, requestData,
            {
                headers:{'Content-Type': 'application/json',
                withCredentials:true},
            })
            console.log(response.data);
            navigate('/reviews');
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitleChange=(e)=>{
        setTitleVal(e.target.value);
        console.log(titleVal);
    };

    const handleEditorData=(data)=>{
        setEditorData(data);
        console.log("editorData : "+editorData);
    };
    
    return( 
        <div className="review_mainLayout">
            <div className="review_wrap">
                <div className="review_top">
                    <input className="titleInput" value={titleVal} onChange={handleTitleChange}/>
                </div>
                <div className="review_layout">
                    <TextEditor onEditorDataChange={handleEditorData}/>
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