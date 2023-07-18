import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import '../../../styles/plogging/review/ReviewWrite.css';
import TextEditor from "./TextEditor";


export default function ReviewWrite(){
    const [reviewWrite, setReviewWrite]=useState({title:'', content:''});
    const {id}=useParams();
    const [imgFile,setImgFile]=useState(null);

    const handleTitleChange=(e)=>{
        setReviewWrite(e.target.value);
    };

    const handleContentChange=(e)=>{
        const file=e.target.files[0];
        setImgFile(file);
    };
    

    const handleSave=()=>{
         const formData=new FormData();
         formData.append('content',reviewWrite.content);
         formData.append('title',reviewWrite.title);

        
    };

    return( 
        <div className="reviewWrite_mainLayout">
            <div className="reviewWrite_wrap">
                <div className="reviewWrite_top">
                    <div className="reviewWrite_title">
                        <input className="titleInput" onChange={handleTitleChange} maxLength={50}/>
                    </div>
                </div>
                <div className="reviewWrite_layout">
                    <div className="reviewWrite_content">
                        <div className="reviewWrite_content_in">
                            <TextEditor value={reviewWrite.content} onChange={handleContentChange}/>
                        </div>
                    </div>
                    {/* <div className="reviewWrite_img">
                        <div className="reviewWrite_img_in">
                            <div className="uploadImgBtn">
                                이미지
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="tempAndComplBtn_layout">
                    <div className="tempAndComplBtn_layout_in">
                        <div className="tmepBtn">
                                임시저장
                        </div>
                        <div className="complBtn" onClick={handleSave}>
                                등록
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}