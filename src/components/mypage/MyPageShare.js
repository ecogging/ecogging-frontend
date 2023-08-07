import '../../styles/mypage/MyPageShare.css';
import { Pagination } from 'antd';
import { getCookie } from '../../utils/CookieUtil';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NotFoundWrote from './NotFoundWrote';

export default function MyPageShare() {
  const navigate = useNavigate();


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

  const [shares, setShares] = useState(null);
  useEffect(() => {
    const url = `/mypage/${userId}/shares`;
    axios.get(url, {
      headers:headers,
      params: {
        pageNo: nowPage, // 현재 페이지 서버로 전송 ( Back: @RequestParam )
      }
    })
    .then((res) => {
      setShares(res.data.data);
      setTotPages(res.data.allCount); // 전체 개수 설정
    })
    .catch((err) => {
      console.log('내 나눔 불러오기 실패', err);
    });
  }, [nowPage]);


  // 글 삭제 ------------------------------------------------------------
  const handelShareDel=(id)=>{
    axios.post(`http://localhost:8080/shareDel/${id}`)
    .then((res)=>{
        navigate(`http://localhost:8080/mypage/${userId}/shares`);
    }).catch((err)=>{
        console.log('내 나눔 삭제 실패', err);
    })
  }
  
  // 본문 내용 태그 제거 ------------------------------------------------
  function removeHtmlTags(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
  }

  return (
    <div className="MyPageShare">

      <div className="container_myShareArea"> 

        {shares === null ?

        <NotFoundWrote />

        : 

        shares.map((item, idx) => (


        <div className="container_mypageShareWriting" key={item.forumId}>

            <div className="container_myShareRight">
            <div className="container_myShareCover">
              <div className='container_myShareWhole'>
                <div className='container_myShareTop'>

                  {item.status === '진행중' ?
                    <div className='container_myShareState_ongoing'>진행중</div>
                    :
                    <div className='container_myShareState_finish'>완료</div>
                  }

                  <div className='container_myShareViews'>조회수 {item.views}</div>
                  <div className='container_myWriteDate_share'>{moment(item.createdAt).format('YY.MM.D h:mm a')}</div>
                </div>
                <Link to={`/shareInfo/${item.forumId}`} className='link_toShareDetail'>
                  <div className='container_myShareTitle'>
                    {item.title}
                  </div>
                </Link>
                <div className='container_myShareBottom'>
                    <div className='container_myShareContent'>

                      { removeHtmlTags(item.content).length > 60 ? 
                      removeHtmlTags(item.content).substring(0, 60)
                      :
                      removeHtmlTags(item.content)
                      }

                    </div>
                  <div className='container_myDetailBtns_Share'>
                    <Link to={`/shareInfoModify/${item.forumId}`} ><div className='txt_myBtn_Share'>수정</div></Link>
                    <div className='txt_myBtn_Share' onClick={() => handelShareDel(item.forumId)}>삭제</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

        ))
    
      }
      
      </div>

      <div className='container_myBottom'>
          <Pagination current={nowPage} onChange={changePage} pageSize={5} total={totPages} />
      </div>

    </div>
  );
}