import '../../../styles/plogging/accompany/AccompanyList.css';
import { Link } from 'react-router-dom';
import MyButton from '../../common/MyButton';
import axios from 'axios';
import { useState, useEffect } from 'react';
const { kakao } = window;

const AccompanyList = () => {


    const [page, setPage] = useState(1);  // 페이지 (기본값: 1)
    const [accompanys, setAccompanys] = useState([]); // 컨트롤러에서 받아오는 글 목록
    const [hasNext, setHasNext] = useState(true); // 다음값 존재유무 (기본값 존재true)
    const [orderby, setOrderby] = useState("createdAt"); // 정렬 조건 (기본값: 작성일)

    useEffect(() => {
        reqAccompany(page, orderby);
    }, []); // 처음 컴포넌트 불러올 때 reqAccompany 실행

    useEffect(() => {
        let cardHeaders = document.getElementsByClassName("card-header"); // .card-header 선택자
        // <div className="card-header" data-address={card.location}></div>
        for(let cardHeader of cardHeaders) { 
            // ** for ~ of : 반복문  -> 선택된 card-header 클래스들 중 하나씩 cardHeader로 가져와 반복해줌
            cardOnload(cardHeader,cardHeader.dataset.address);
            // 각 card-header마다 지도 만들어주는 함수 cardOnload 실행 
            // - 매개변수: 지도 들어갈 card-header, 주소 card-header에 세팅된 address
        }
        
    }, [accompanys]); // accompanys가 변경될 때마다 실행

  
    // # reqAccompany ( 1page, 작성일 기준 정렬 )
    const reqAccompany = (page, order) => {
      axios.get(`http://localhost:8080/accompanies/${page}?orderby=${order}`)
          .then(res => {
              console.log(res);
              setHasNext(res.data.hasNext); // 불러온 데이터에 다음 데이터 존재유무 저장
              if(page==1) { // 1페이지라면
                  setAccompanys([...res.data.list]); // 받아온 데이터 리스트만 setAccompanys
              } else {
                  setAccompanys([...accompanys, ...res.data.list]); // 1페이지가 아니면 지금까지 저장해둔 Accomp + 새로 받아온 데이터 리스트까지 setAccompanys
              }
          })
          .catch(err => {
              console.log(err);
          })
  }


    // 정렬 조건 변경 함수
    const changeOrderby = (porder) => {
        reqAccompany(1,porder);
        setPage(1); // 1페이지로 복귀
        setOrderby(porder); 
    }    


    // # e == [object HTMLDivElement] : 주소를 가져올 HTML 요소 : cardHeader (cardHeaders로 반복되는 .card-header)
    // # address == 주소 정보 : (cardHeader.dataset.address)
    const cardOnload = (e, address) => {

        // 주소-좌표 변환 객체를 생성합니다 ( geocoder가 주소를 좌표로 변환해주는 객체 )
        var geocoder = new kakao.maps.services.Geocoder();
        // address를 좌표로 변환한 결과 result(위도, 경도), status(검색 성공/실패 결과)를 매개변수로 갖고 함수 실행
        geocoder.addressSearch(address, (result, status) => {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) { 
                let lat = result[0].y;
                let lon = result[0].x; // result의 x,y 좌표로 설정
                // 지도 중심 위치입니다 -> 지도 중심 위치를 설정한 x,y좌표로 설정
                var center = new kakao.maps.LatLng(lat, lon);

                const mapOption = {
                    center: center, // 지도의 중심좌표
                    level: 5 // 지도의 확대 레벨
                }; // 이 옵션을 기반으로 --------------
                // 지도를 생성합니다    
                var map = new kakao.maps.Map(e, mapOption);
                map.setZoomable(false);

                // 마커를 생성합니다 -> 가운데로
                var marker = new kakao.maps.Marker({
                    position: center
                });
                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);
            }
        });
    };


    // 더보기 함수
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
            <div className="board-container">
                <h1 className="list-subject">동행 모집</h1>
                <table className="list-info">
                    <tbody>
                        <tr>
                            <td className="article-new"> 
                                <Link to="/accompanieswrite"><MyButton text={'새 글 작성'}></MyButton></Link>
                            </td>
                        </tr>
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
                                                    <div className="card-body-writer">{card.nickname}</div>
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