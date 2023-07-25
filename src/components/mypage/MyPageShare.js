import '../../styles/mypage/MyPageShare.css';
import temptemp from '../../assets/temp.png';
import { Pagination } from 'antd';
import { getCookie } from '../../utils/CookieUtil';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function MyPageShare() {
  const navigate = useNavigate();

  const { userId } = useParams();
  console.log(userId);
  console.log(typeof(userId));
  const accessToken = getCookie('access-token'); 
  const headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  };

  // 포럼 데이터 불러오기
  const [shares, setShares] = useState(null);
  useEffect(() => {
    const url = `/mypage/${userId}/shares`;
    axios.get(url, {
      headers:headers,
    })
    .then((res) => {
      console.log('내 나눔 불러오기 완료');
      setShares(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log('내 나눔 불러오기 실패', err);
    });
  }, []);

  // 포럼 글 삭제
  const handelShareDel=(id)=>{
    axios.post(`http://localhost:8080/shareDel/${id}`)
    .then((res)=>{
        console.log("내 나눔 삭제 완료");
        navigate(`http://localhost:8080/mypage/${userId}/shares`);
    }).catch((err)=>{
        console.log('내 나눔 삭제 실패', err);
    })
  }
  

  return (
    <div className="MyPageShare">

      {/* 글 목록 업데이트 영역 -- 5개 */}
      <div className="container_myShareArea"> 


        {shares && shares.map((item, idx) => (


        <div className="container_mypageShareWriting" key={item.forumId}>

          { (item.fileName) ? 
          <div className="container_myShareLeft">
            <img src={temptemp}  className='temptemp'/> 
          </div>
          :
          null
          }

            <div className="container_myShareRight">
              <div className='container_myShareWhole'>
                <div className='container_myShareTop'>

                  {/* 진행상태 따라 컴포넌트 변경 */}
                  <div className='container_myShareState_ongoing'>진행중</div>

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
                    {item.content}
                  </div>
                  <div className='container_myDetailBtns_Share'>
                    <Link to={`/shareInfoModify/${item.forumId}`} ><div className='txt_myBtn_Share'>수정</div></Link>
                    <div className='txt_myBtn_Share' onClick={() => handelShareDel(item.forumId)}>삭제</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ))}
    

      </div>

      <div className='container_myBottom'>
        <div className='box_contensPlus'>
            더보기  
        </div>
      </div>

    </div>
  );
}