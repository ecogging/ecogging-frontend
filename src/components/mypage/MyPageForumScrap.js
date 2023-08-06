import { getCookie } from "../../utils/CookieUtil";
import '../../styles/mypage/MyPageForumScrap.css';
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

import { SlLocationPin } from "react-icons/sl";


export default function MyPageForumScrap() {

  // 검색
  const [searchCriteria, setSearchCriteria] = useState('전체');
  const [searchWords, setSearchWords] = useState(null);
  const [searchNull, setSearchNull] = useState(false);

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
      setMyScraps(res.data.data);
      setTotPages(res.data.allCount);
    })
    .catch((err) => {
      console.log('내 스크랩 불러오기 실패', err);
    });
  }, [nowPage]);


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
        setSearchNull(false);
        setMyScraps(res.data.data);
        setTotPages(res.data.allCount);
      })
      .catch((err) => {
        console.log('내 스크랩 검색 결과 불러오기 실패', err);
        setSearchNull(true);
      });
    }
  }


  // 스크랩 토글 ------------------------------------------------------------
  const getMyScrapToggle = (forumId, e) => {
    const url = `/mypage/${userId}/forumscraps`;
    axios.put(url, null, {
      headers:headers,
      params: {
        forumId:forumId,
      }
    })
    .then((res) => {
      if (e.target.classList.contains('icon_myScrapToggle_scrap')) {
        e.target.classList.remove('icon_myScrapToggle_scrap');
        e.target.classList.add('scrappedOk');
      } else {
        e.target.classList.remove('scrappedOk');
        e.target.classList.add('icon_myScrapToggle_scrap');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // 본문 내용 태그 제거 ------------------------------------------------
  function removeHtmlTags(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
  }
      


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
                <li className='drops_myScrapSearch'>경로</li>
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
              <div className="container_myForumScrapWriting" key={idx}>

                <div className="container_myForumScrapCon">

                      <div className='container_scrapShareTop'>

                        {item.status === '진행중' ?
                          <div className='container_myShareState_ongoing'>진행중</div>
                          :
                          <div className='container_myShareState_finish'>완료</div>
                        }

                        <div className='container_scrapShareTopRight'>
                          <div className='container_scrapShareViews'>조회수 {item.views}</div>
                          <div className='container_scrapShareDate'>{moment(item.createdAt).format('YY.MM.DD h:mm a')}</div>
                        </div>    
                                            
                          <div className='container_scrapShareToggle'>
                            <RxBookmarkFilled className='scrappedOk' id='icon_myScrapToggle' onClick={(e) => getMyScrapToggle(item.forumId, e)} />
                          </div>

                      </div>

                      <Link to={`/shareInfo/${item.forumId}`} className='link_toShareDetail'>
                        <div className='container_scrapShareTitle'>
                          {item.title}
                        </div>
                      </Link>

                      <div className='container_scrapShareBottom'>

                        <div className='container_scrapShareContent'>

                        { removeHtmlTags(item.content).length > 60 ? 
                          removeHtmlTags(item.content).substring(0, 60)
                          :
                          removeHtmlTags(item.content)
                        }

                        </div>

                        <div className='container_scrapShareUser'>
                          <div className='box_userNicknameScrap' onClick={() => openSendModal(item.userId, item.nickname)}>{item.nickname}</div>
                        </div>

                      </div>

                  </div>

              </div>
            )

          :

            (
              <div className="container_myForumScrapWriting" key={idx}>

                  <div className="container_myForumScrapCon">

                      <div className='container_scrapShareTop'>

                        <div className="container_scrapRecomLocation">
                          <SlLocationPin className="icon_scrapRecomLocation"/> {item.location}
                        </div>
                      
                        <div className='container_scrapShareTopRight'>
                          <div className='container_scrapShareViews'>조회수 {item.views}</div>
                          <div className='container_scrapShareDate'>{moment(item.createdAt).format('YY.MM.DD h:mm a')}</div>
                        </div>

                        <div className='container_scrapShareToggle' id ='container_myScrapToggler'>
                          <RxBookmarkFilled className='scrappedOk' id='icon_myScrapToggle' onClick={(e) => getMyScrapToggle(item.forumId, e)} />
                        </div>
                       </div>

                        <Link to={`/routeInfo/${item.forumId}`} className='link_toRouteDetail'>
                          <div className='container_scrapShareTitle'>
                            {item.title}
                          </div>
                        </Link>

                      <div className='container_scrapShareBottom'>
                        <div className='container_scrapShareContent'>
                          { removeHtmlTags(item.content).length > 60 ? 
                            removeHtmlTags(item.content).substring(0, 60)
                            :
                            removeHtmlTags(item.content)
                          }
                        </div>

                        <div className='container_scrapShareUser'>
                        <div className='box_userNicknameScrap' onClick={() => openSendModal(item.userId, item.nickname)}>{item.nickname}</div>
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