import '../../../styles/plogging/accompany/AccompanyList.css';
import { Link } from 'react-router-dom';
import MyButton from '../../common/MyButton';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import MessageSendModal from '../../common/MessageSendModal';
import useSendMessage from '../../../hooks/useSendMessage';
const { kakao } = window;

const AccompanyList = () => {
    const { isModalOpen, selectedNick, selectedUserId, openSendModal, closeSendModal } = useSendMessage();

    const [page, setPage] = useState(1);
    const [accompanys, setAccompanys] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [orderby, setOrderby] = useState("createdAt");
    const userId = getCookie("userId");
    useEffect(() => {
        reqAccompany(page, orderby);
    }, []);

    useEffect(() => {
        let cardHeaders = document.getElementsByClassName("card-header");
        for(let cardHeader of cardHeaders) {
            cardOnload(cardHeader,cardHeader.dataset.address);
        }
        
    }, [accompanys]);

    const changeOrderby = (porder) => {
        reqAccompany(1,porder);
        setPage(1);
        setOrderby(porder);
    }    

    const reqAccompany = (page, order) => {
        axios.get(`http://localhost:8080/accompanies/${page}?orderby=${order}`)
            .then(res => {
                console.log(res);
                setHasNext(res.data.hasNext);
                if(page==1) {
                    setAccompanys([...res.data.list]);
                } else {
                    setAccompanys([...accompanys, ...res.data.list]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const cardOnload = (e, address) => {
        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
                let lat = result[0].y;
                let lon = result[0].x;

                // 지도 중심 위치입니다 
                var center = new kakao.maps.LatLng(lat, lon);
                const mapOption = {
                    center: center, // 지도의 중심좌표
                    level: 5 // 지도의 확대 레벨
                };

                // 지도를 생성합니다    
                var map = new kakao.maps.Map(e, mapOption);
                map.setZoomable(false);

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: center
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);
            }
        });


    };

    const moreView = () => {
        reqAccompany(page + 1,orderby);
        setPage(page + 1);
    }



    const cardsPerRow = 3;

    const splitCardsIntoRows = (cards, cardsPerRow) => {
        const rows = [];
        for (let i = 0; i < cards.length; i += cardsPerRow) {
            const row = cards.slice(i, i + cardsPerRow);
            rows.push(row);
        }
        return rows;
    };

    const cardRows = splitCardsIntoRows(accompanys, cardsPerRow);

    return (
        <div className="accompany-board">
        {isModalOpen ? <MessageSendModal onCloseModal={closeSendModal} receiverNick={selectedNick} receiverId={selectedUserId} /> : null}

            <div className="board-container">
                <h1 className="list-subject">동행 모집</h1>
                <table className="list-info">
                    <tbody>
                        {userId!=null && (<tr>
                            <td className="article-new"> 
                                <Link to="/accompanieswrite"><MyButton text={'모집글 작성'}></MyButton></Link>
                            </td>
                        </tr>)}
                        <tr>
                            <td className="list-order">
                                <button className={orderby=='createdAt'? "list-latest selected": "list-latest"}  onClick={()=>changeOrderby("createdAt")}>최신순 ∨</button>&nbsp;&nbsp;&nbsp;
                                <button className={orderby=='meetingDate'? "almost-done selected": "almost-done"} onClick={()=>changeOrderby("meetingDate")}>모집임박순 ∨</button>&nbsp;&nbsp;&nbsp;
                                <button className={orderby=='activeFalse'? "almost-done selected": "almost-done"} onClick={()=>changeOrderby("activeFalse")}>모집완료 보기 ∨</button>
                            </td>
                        </tr>
                        <tr className="card-container"> 
                            <td className="accompany-card">
                                {cardRows.map((row, rowIndex) => (
                                    <div key={rowIndex} className="card-row">
                                        {row.map((card, cardIndex) => (
                                            <div key={cardIndex} className="card-info">
                                                <div className="card-header" data-address={card.location}></div>
                                                <div className="card-body">
                                                    <div>
                                                        {card.active && <div className="card-progress">모집중</div>}
                                                        {!card.active && <div className="progress-over">모집완료</div>}
                                                    </div>
                                                    <Link to={`/accompaniesdetail/${card.id}`} className="move-to-detail">
                                                        <p className="card-body-title">{card.title}</p>
                                                    </Link>
                                                    <div className="card-body-writer" onClick={() => openSendModal(card.userId, card.nickname)}>{card.nickname}</div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="plogging-date">{card.meetingDate}</div>
                                                    <div className="participant">참여 {card.joincnt}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className="list-more">
                                {hasNext && <button className="load-more" onClick={moreView}>더 보기</button>}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccompanyList;