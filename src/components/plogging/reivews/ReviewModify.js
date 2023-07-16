import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import '../../../styles/plogging/review/ReviewModify.css';


export default function ReviewModify(){
    const [reviewModify, setReviewModity]=useState([]);
    const {id}=useParams();

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/reviewModify`,{id:id})
        .then(res=>{
            setReviewModity(res.data.reviewModi);
            console.log(res.data.reviewModi);
        }).catch(err=>{
            console.log(err);
        })
    },[])
    

    return(
        <div className="reviewModify_mainLayout">
            <div className="reviewModify_wrap">
                <div className="reviewModify_top">
                    <div className="reviewModify_title">{reviewModify.title}</div>
                </div>
                <div className="tempAndComplBtn_layout">
                    <div className="tempAndComplBtn_layout_in">
                        <div className="tmepBtn">
                                임시저장
                        </div>
                        <div className="complBtn">
                                완료
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}