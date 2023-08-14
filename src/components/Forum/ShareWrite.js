import React, { useState } from 'react';
import axios from "axios";
import TextEditor from "../common/TextEditor";
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/CookieUtil';
import '../../styles/Forum/ShareWrite.css';
import '../../styles/Forum/ForumCommon.css';

export default function ShareWrite(){
    const [editorData,setEditorData]=useState('');
    const [titleVal, setTitleVal]=useState('');
    const navigate = useNavigate();
    const userId = getCookie("userId");
    
    const handleShareSave=async(temp)=>{
        try {
            console.log("userId : "+userId);
            console.log("등록");
            const requestData={
                content:editorData,
                title:titleVal,
            };
            const response=await axios.post(`http://localhost:8080/shareWrite/${userId}/${temp}`, requestData,
            {
                headers:{'Content-Type': 'application/json',
                withCredentials:true},
            })
            console.log(response.data);
            navigate('/shares');
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
        <div className="share_mainLayout">
            <div className="share_wrap">
                <div className="share_top">
                    <input className="titleInput" value={titleVal} onChange={handleTitleChange}/>
                </div>
                <div className="share_layout">
                    <TextEditor onEditorDataChange={handleEditorData}/>
                </div>
                <div className="tempAndSaveBtn_layout">
                    <div className="tempAndSaveBtn_layout_in">
                        <div className="routeBtn" onClick={()=>handleShareSave(1)}>
                                임시저장
                        </div>
                        <div className="routeBtn" onClick={()=>handleShareSave(0)}>
                                등록
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}