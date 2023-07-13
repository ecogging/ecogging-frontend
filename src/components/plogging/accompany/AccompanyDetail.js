import '../../../styles/plogging/accompany/AccompanyDetail.css';
import MyButton from '../../common/MyButton';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AccompanyDetail = () => {

    const {id} = useParams();
    const [userId, setUserId] = useState(1);
    const [isScrapped, setIsScrapped] = useState(false);
    const [isParticipated, setIsParticipated] = useState(false);
    const [accompany, setAccompany] = useState({id:0,title:'',content:'',meetingDate:'',meetingTime:'',
        numOfPeople:0,active:true,views:0,save:false,location:'',locationDetail:'',joincnt:0,nickname:''})

    useEffect(()=> {
        axios.post(`http://localhost:8080/accompaniesdetail`,{userId:userId, accompanyId:id})
            .then(res=> {
                setAccompany(res.data.accompany);
                setIsParticipated(res.data.isParticipation);
                setIsScrapped(res.data.isAccompanyscrap);
            })
            .catch(err=> {
                console.log(err);
            })
    }, []);

    const handleScrapToggle = () => {
        axios.post(`http://localhost:8080/accompaniesscrap`,{userId:userId, accompanyId:id})
        .then(res=> {
            setIsScrapped(res.data);
        })
        .catch(err=> {
            console.log(err);
        })    
    };

    const handleParticipationToggle = () => {
        axios.post(`http://localhost:8080/participation`,{userId:userId, accompanyId:id})
        .then(res=> {
            setIsParticipated(res.data);
        })
        .catch(err=> {
            console.log(err);
        })        
       
    };

    const accompaniesDelete = () => {
        axios.get(`http://localhost:8080/accompaniesdelete/${id}`)
        .then(res=> {
            window.location.href = '/accompanies';            
        })
        .catch(err=> {
            console.log(err);
        })
    }

    return (
        <div className="accompany-article">
            <div className="article-container">
                <h1 className="article-subject">동행 모집</h1>
                <table className="article-info">
                    <tbody>
                        <tr>
                            <td className="buttons-above">
                                <button className={`article-scrap ${isScrapped ? 'active' : ''}`} onClick={handleScrapToggle}>스크랩</button>
                                <button className={`article-participation ${isParticipated ? 'active' : ''}`} onClick={handleParticipationToggle}>참여하기</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <input className="article-loc-detail" type="text" name="locationDetail" id="locationDetail" value={accompany.locationDetail}/>
                                <input className="article-location" type="text" name="location" id="location" value={accompany.location}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <input className="article-headcount" type="text" name="headcount" id="headcount" value={accompany.numOfPeople}/>
                                <input className="article-date" type="text" name="date" id="date" value={accompany.meetingDate}/>
                                <input className="article-time" type="text" name="time" id="time" value={accompany.meetingTime}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <input className="article-title" type="text" name="title" id="title" value={accompany.title}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <textarea className="article-content" name="content" id="content" value={accompany.content}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="buttons-bottom">
                            <Link to={`/accompaniesmodify/${id}`}><MyButton text={'수정'}></MyButton></Link>&nbsp;&nbsp;&nbsp;
                                <MyButton onClick={accompaniesDelete} text={'삭제'}></MyButton>&nbsp;&nbsp;&nbsp;
                                <Link to="/accompanies"><MyButton text={'목록'}></MyButton></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccompanyDetail;