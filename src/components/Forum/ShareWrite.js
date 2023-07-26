import React, { useEffect, useState , useRef} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import '../../styles/Forum/ShareWrite.css';
import TextEditor from "../common/TextEditor";
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';

export default function ShareWrite(){
    const [editorData,setEditorData]=useState('');
    // const {userId}=useParams();
    const [titleVal, setTitleVal]=useState('');
    const navigate = useNavigate();
    const userId = getCookie("userId");
    // const {id}=useParams();
    

    const handleShareSave=async()=>{
        try {
            // const tmep=0;
            //작성된 글과 이미지를 폼 데이터로 변환
            // const formData=new FormData();
            // formData.append('content',editorData);
            // formData.append('title',titleVal);
            // console.log("temp"+temp);
            console.log("userId : "+userId);
            // console.log("id : "+id);
            console.log("등록");
            const requestData={
                content:editorData,
                title:titleVal,
                // isTemp
            };
            
            const response=await axios.post(`http://localhost:8080/shareWrite/${userId}`, requestData,
            {
                headers:{'Content-Type': 'application/json',
                withCredentials:true},
                
            })
            // const url=`/images/${response.data.filename}`;
            console.log(response.data);
            navigate('/shares');
        } catch (error) {
            console.log(error);
        }
    };

    const handleShareTempSave=async()=>{
        try {
            //작성된 글과 이미지를 폼 데이터로 변환
            // const formData=new FormData();
            // formData.append('content',editorData);
            // formData.append('title',titleVal);
            // console.log("temp"+temp);
            console.log("등로고로고고곡버튼");
            const requestData={
                content:editorData,
                title:titleVal,
            };
            
            const response=await axios.post(`http://localhost:8080/sharewWrite`, requestData,
            {
                headers:{'Content-Type': 'application/json'},
                withCredentials:true
            })
            // const url=`/images/${response.data.filename}`;
            console.log(response.data);
            navigate('/shares');
        } catch (error) {
            console.log(error);
        }
    };

    // const handlShareOnClick=(temp)=>{
    //     handleShareSave(temp);
    // }

    const handleTitleChange=(e)=>{
        setTitleVal(e.target.value);
        console.log(titleVal);
    };

    const handleEditorData=(data)=>{
        setEditorData(data);
        console.log("editorData : "+editorData);
    }
    
    return( 
        <div className="reviewWrite_mainLayout">
            <div className="reviewWrite_wrap">
                <div className="reviewWrite_top">
                    <div className="reviewWrite_title">
                        <input className="titleInput" value={titleVal} onChange={handleTitleChange}/>
                    </div>
                </div>
                <div className="reviewWrite_layout">
                    <div className="reviewWrite_content">
                        <div className="reviewWrite_content_in">
                            <TextEditor onEditorDataChange={handleEditorData}/>
                        </div>
                    </div>
                </div>
                <div className="tempAndComplBtn_layout">
                    <div className="tempAndComplBtn_layout_in">
                        <div className="tmepBtn"onClick={handleShareTempSave}>
                                임시저장
                        </div>
                        <div className="complBtn" onClick={handleShareSave}>
                                등록
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}