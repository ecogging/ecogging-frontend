import '../../../styles/plogging/accompany/AccompanyDetail.css';
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
                        </td>
                    </tr>
                    <tr>
                        <td className="article-cell">
                            <input className="article-headcount" type="text" name="headcount" id="headcount"/>
                            <input className="article-datetime" type="text" name="datetime" id="datetime"/>
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
                            <button className="article-edit">수정</button>
                            <button className="article-delete">삭제</button>
                            <Link to="/"><button className="list-back">목록</button></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AccompanyDetail;