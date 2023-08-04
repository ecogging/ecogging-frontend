import { getCookie } from "../../utils/CookieUtil";
import '../../styles/mypage/MyPageForumScrap.css';
import '../../styles/mypage/MyPageShare.css';
import '../../styles/mypage/MyPageRecommend.css';
import { RxBookmarkFilled } from "react-icons/rx";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Route, useParams } from "react-router";
import { Pagination } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

import MessageSendModal from '../../components/common/MessageSendModal';
import useSendMessage from "../../hooks/useSendMessage";
import NotFound from "./NotFound";

const { kakao } = window;

export default function MyPageForumScrap() {

  const [searchCriteria, setSearchCriteria] = useState('전체');
  const [searchWords, setSearchWords] = useState(null);
  const [searchNull, setSearchNull] = useState(false);
  console.log("조건: "+searchCriteria);
  console.log('검색어: '+searchWords);

  // 스크랩 토글 - 일단 임시 (글 생성 -> 자동 인덱스, 배열 업데이트 함수 추가)
  const [isScrapped, SetIsScrapped] = useState([true, true, true]);
  const scrapClick = (index) => {
    const newIsScrapped = [...isScrapped];
    newIsScrapped[index] = !newIsScrapped[index];
    SetIsScrapped(newIsScrapped);
  }

  // 쪽지 -----------------------------------------------------------------
  const { isModalOpen, selectedNick, selectedUserId, openSendModal, closeSendModal } = useSendMessage();

  // 페이징 ---------------------------------------------------------------
  const [totPages, setTotPages] = useState(0); // 전체 페이지
  const [nowPage, setNowPage] = useState(1); // 현재 페이지
  const changePage = (no) => { // 페이지 클릭할 때마다 현재 페이지 변경
    setNowPage(no);
  }
  
  // 데이터 불러오기 ------------------------------------------------------
  const { userId } = useParams();
  const accessToken = getCookie('access-token'); 
  const headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  };

  const [myScraps,setMyScraps]=useState(null);

  useEffect(() => {
    const url = `/mypage/${userId}/forumscraps`;
    axios.get(url, {
      headers:headers,
      params: {
        pageNo: nowPage,
      }
    })
    .then((res) => {
      console.log(res.data.data);
      setMyScraps(res.data.data);
      setTotPages(res.data.allCount);
    })
    .catch((err) => {
      console.log('내 스크랩 불러오기 실패', err);
    });
  }, [nowPage]);

  // 지도 ------------------------------------------------------------------
  useEffect(() => {
    let boxMaps = document.getElementsByClassName("container_myRecomLeft");
    for(let boxMap of boxMaps) { 
        mapOnload(boxMap, boxMap.dataset.address);
    }
  }, [myScraps]); 

  if (myScraps === null) {
    return <div>Loading...</div>
  }

  const mapOnload = (e, address) => {
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) { 
            let lat = result[0].y;
            let lon = result[0].x; 
            var center = new kakao.maps.LatLng(lat, lon);

            const mapOption = {
                center: center, 
                draggable: false,
                level: 4 
            };   

            if (e) {
            var map = new kakao.maps.Map(e, mapOption);
            map.setZoomable(false);

            var marker = new kakao.maps.Marker({
                position: center
            });
            marker.setMap(map);
        }
      }
    });
  };

  // 검색창 분류기준 드롭다운 여닫기 -------------------------------------
  const openSearchCriteria = () => {
    const droplist = document.getElementById("droplist_myScrapSearch");
    if (droplist.classList.contains('searchDrop_clicked')) {
      droplist.classList.remove('searchDrop_clicked');
    } else {
      droplist.classList.add('searchDrop_clicked');
    }
  }

  // 검색창 분류기준 설정
  const getSearchCriteria = (e) => {
    setSearchCriteria(e.target.textContent);
    document.getElementById("droplist_myScrapSearch").classList.remove('searchDrop_clicked');
  }

  const getSearchWords = (e) => {
    let inputSearch = document.getElementById('input_myForumScrapSearch').value;
    setSearchWords(inputSearch);
  }

  // 검색어 설정 & 검색 
  const goSearch = () => {
    document.getElementById("droplist_myScrapSearch").classList.remove('searchDrop_clicked');
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

    if(searchWords === null) {
      alert('검색어를 입력해주세요');
    } else if (searchWords.length < 2) {
      alert('검색어는 2글자 이상 입력해주세요');  
    } else if (regExp.test(searchWords)) {
      alert('특수문자를 뺀 한글, 영어, 숫자로 검색해주세요');
    }
    else {

      const url = `/mypage/${userId}/forumscraps/search`;
      setNowPage(1);
      axios.get(url, {
        headers:headers,
        params: {
          pageNo: nowPage,
          searchCriteria: searchCriteria,
          searchWords: searchWords
        }
      })
      .then((res) => {
        console.log('내 스크롤 검색 결과 불러오기 완료');
        setSearchNull(false);
        console.log(res.data);
        setMyScraps(res.data.data);
        setTotPages(res.data.allCount);
      })
      .catch((err) => {
        console.log('내 스크랩 검색 결과 불러오기 실패', err);
        setSearchNull(true);
      });
    }
  };
      








  return(
    <div className="MyPageForumScrap">

      {isModalOpen ? <MessageSendModal onCloseModal={closeSendModal} receiverNick={selectedNick} receiverId={selectedUserId} /> : null}

      <div className='container_myForumScrapHeader' onClick={closeSendModal}>

        <div className='container_myForumScrapSearch'>
          <div className='box_myScrapSearch'>
            <div className='dropbox_myScrapSearch'>
              <div className='droplist_nowSearch' onClick={openSearchCriteria}>{searchCriteria}</div>
              <ul className='droplist_myScrapSearch' id="droplist_myScrapSearch" onClick={getSearchCriteria}>
                <li className='drops_myScrapSearch'>전체</li>
                <li className='drops_myScrapSearch'>나눔</li>
                <li className='drops_myScrapSearch'>추천</li>
              </ul>
            </div>
            <input type='text' name='forumscrapSearch' className='input_myForumScrapSearch' id='input_myForumScrapSearch' onChange={getSearchWords}/>
            <button className='btn_myForumScrapSearch' onClick={goSearch}>검색</button>
          </div>
        </div>
      </div>
      
      <div className='container_myforumScrapArea' onClick={closeSendModal}>

        { searchNull === true ? 
         <NotFound />
        
          :
          
         searchNull === false && myScraps && myScraps.map((item, idx) => {

          return item.type === '나눔' ? 
          
            (
              <div className="container_mypageShareWriting" key={idx}>

                <div className="container_myShareRight">
                  <div className='container_myShareWhole'>
                    <div className='container_myScrapTop'>
                      <div className='container_myShareState_ongoing'>진행중</div>
                      <div className='container_myShareViews'>조회수 {item.views}</div>
                      <div className='container_myWriteDate_share'>{moment(item.createdAt).format('YY.MM.DD h:mm a')}</div>
                      
                      <div className='container_myScrapToggle'
                      onClick={() => scrapClick(0)}>
                        <RxBookmarkFilled className={isScrapped[0] ? 'icon_myScrapToggle_scrap' : 'icon_myScrapToggle_unScrap'}/>
                      </div>

                    </div>
                    <Link to={`/shareInfo/${item.forumId}`} className='link_toShareDetail'>
                      <div className='container_myShareTitle'>
                        {item.title}
                      </div>
                    </Link>
                    <div className='container_myShareBottom'>
                      <div className='container_myScrapContent'>
                        {item.content}
                      </div>

                      <div className='container_myScrapUser'>
                        <div className='box_userNickname' onClick={() => openSendModal(item.userId, item.nickname)}>{item.nickname}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )

          :

            (
              <div className="container_mypageRecomWriting" key={idx}>

                <div className="container_myRecomLeft" id="container_myRecomLeft" data-address={item.location} ref={(e) => mapOnload(e,item.location)}></div>

                <div className="container_myRecomRight">
                  <div className='container_myRecomWhole'>
                    <div className='container_myScrapTop_r'>
                      <Link to={`/routeInfo/${item.forumId}`} className='link_toRouteDetail'>
                        <div className='container_myRecomTitle'>
                          {item.title}
                        </div>
                      </Link>
                      <div className='container_myViews'>조회수 {item.views}</div>
                      <div className='container_myWriteDate_Recom'>{moment(item.createdAt).format('YY.MM.DD h:mm a')}</div>

                      <div className='container_myScrapToggle'
                      onClick={() => scrapClick(2)}>
                        <RxBookmarkFilled className={isScrapped[2] ? 'icon_myScrapToggle_scrap' : 'icon_myScrapToggle_unScrap'} id='icon_myRouteScrapToggle'/>
                      </div>
                    </div>

                    <div className='container_myRecomBottom'>
                      <div className='container_myScrapContent_r'>
                        {item.content}
                      </div>

                      <div className='container_myScrapUser'>
                      <div className='box_userNickname' onClick={() => openSendModal(item.userId, item.nickname)}>{item.nickname}</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          ) 

      })

    } 

      </div>

      <div className='container_myBottom'  onClick={closeSendModal}>
          <Pagination current={nowPage} onChange={changePage} pageSize={5} total={totPages} />
      </div>

    </div>
  );
}