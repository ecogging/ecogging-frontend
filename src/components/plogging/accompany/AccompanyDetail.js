import '../../../styles/plogging/accompany/AccompanyDetail.css';
import MyButton from '../../common/MyButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AccompanyDetail = () => {

    const [isScrapped, setIsScrapped] = useState(false);
    const [isParticipated, setIsParticipated] = useState(false);

    const handleScrapToggle = () => {
        setIsScrapped(!isScrapped);
    };

    const handleParticipationToggle = () => {
        setIsParticipated(!isParticipated);
    };

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
                                <input className="article-location" type="text" name="location" id="location"/>
                                <input className="article-loc-detail" type="text" name="locationDetail" id="locationDetail"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <input className="article-headcount" type="text" name="headcount" id="headcount"/>
                                <input className="article-date" type="text" name="date" id="date"/>
                                <input className="article-time" type="text" name="time" id="time"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <input className="article-title" type="text" name="title" id="title"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <textarea className="article-content" name="content" id="content"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="buttons-bottom">
                                <MyButton text={'수정'}></MyButton>&nbsp;&nbsp;&nbsp;
                                <MyButton text={'삭제'}></MyButton>&nbsp;&nbsp;&nbsp;
                                <Link to="/accompany"><MyButton text={'목록'}></MyButton></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccompanyDetail;