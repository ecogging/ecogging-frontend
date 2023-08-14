import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { getCookie } from '../../utils/CookieUtil';
import TextEditor from "../common/TextEditor";
import { useNavigate } from 'react-router-dom';
import '../../styles/Forum/ShareWrite.css';
import '../../styles/Forum/ForumCommon.css';

export default function ShareModify(){
    const navigate = useNavigate();
    const {forumId}=useParams();
    const userId = getCookie("userId");
    const [shareInfo, setShareInfo]=useState('');
    const [view, setView] = useState(false);

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/shareInfo/${forumId}`,{userId:userId})
        .then(res=>{
            setView(true);
            setShareInfo(res.data.shareInfo);
            console.log(res.data.shareInfo);
            console.log("info 가져오기");
        }).catch(err=>{
            console.log(err);
        })
    },[view]);

    const handleShareSave=async(temp)=>{
        try {
            const res=await axios.post(`http://localhost:8080/routeModify/${userId}/${forumId}/${temp}`, shareInfo,
            {
                headers:{'Content-Type': 'application/json',
                withCredentials:true},
            })
            console.log(res.data);
            navigate('/shares');
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditorData=(data)=>{
        setShareInfo({...shareInfo, content:data})
    };

    const handleTitleChange=(e)=>{
        setShareInfo({...shareInfo, title:e.target.value})
    };
    
    return( 
        <div className="share_mainLayout">
            <div className="share_wrap">
                <div className="share_top">
                    <input className="titleInput" value={shareInfo.title}  onChange={handleTitleChange} maxLength={50}/>
                </div>
                <div className="share_layout">
                    {view && <TextEditor  onEditorDataChange={handleEditorData} contentData={shareInfo.content}/>}
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