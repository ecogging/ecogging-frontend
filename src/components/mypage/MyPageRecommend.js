import '../../styles/mypage/MyPageRecommend.css';
import temptemp from '../../assets/temp.png';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { getCookie } from '../../utils/CookieUtil';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { Viewer } from '@toast-ui/react-editor';
import NotFoundWrote from './NotFoundWrote';

const { kakao } = window;

export default function MyPageRecommend() {
  const navigate = useNavigate();
  const [view, setView] = useState(false);

  // 페이징 ---------------------------------------------------------------
  const [totPages, setTotPages] = useState(0); // 전체 페이지
  const [nowPage, setNowPage] = useState(1); // 현재 페이지
  const changePage = (no) => { // 페이지 클릭할 때마다 현재 페이지 변경
    setNowPage(no);
  }


  // 데이터 불러오기 ------------------------------------------------------
  const {userId} = useParams();
  const accessToken = getCookie('access-token'); 
  const headers = {
    'Authorization': 'Bearer ' + accessToken,
    'Content-Type': 'application/json',
  };
  const [routes, setRoutes] = useState(null);
  useEffect(() => {
    const url = `/mypage/${userId}/recommendations`;
    axios.get(url, {
      headers:headers, 
      params: {
        pageNo: nowPage, // 현재 페이지 서버로 전송 ( Back: @RequestParam )
      }
    })
    .then((res) => {
      setRoutes(res.data.data); // 데이터 설정
      setTotPages(res.data.allCount); // 전체 개수 설정
    })
    .catch((err) => {
      console.log('내 경로 불러오기 실패');
    });
  }, [nowPage]);

  
  // 지도 ------------------------------------------------------------------
  useEffect(() => {
    let boxMaps = document.getElementsByClassName("container_myRecomLeft");
    for(let boxMap of boxMaps) { 
        mapOnload(boxMap, boxMap.dataset.address);
    }
  }, [routes]); 

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


// 글 삭제 ------------------------------------------------------------
const handelShareDel=(id)=>{
  axios
  .post(`http://localhost:8080/shareDel/${id}`)
  .then((res)=>{
      navigate(`http://localhost:8080/mypage/${userId}/recommendations`);
  }).catch((err)=>{
      console.log("내 경로 삭제 실패", err);
  });
}



  return (
    <div className="MyPageRecommend">

      <div className="container_mypageRecomArea">

        { routes === null ?

          <NotFoundWrote />

        :
        
        routes.map((item) => (

          <div className="container_mypageRecomWriting">
            
            <div className="container_myRecomLeft" id="container_myRecomLeft" data-address={item.location} ref={(e) => mapOnload(e,item.location)}>
            </div>

            <div className="container_myRecomRight">
              <div className='container_myRecomWhole'>
                <div className='container_myRecomTop'>
                  <Link to={`/routeInfo/${item.forumId}`} className='link_toRouteDetail'>
                    <div className='container_myRecomTitle'>
                      {item.title}
                    </div>
                  </Link>
                  <div className='container_myViews'>조회수 {item.views}</div>
                  <div className='container_myWriteDate_Recom'>{moment(item.createdAt).format('YY.MM.D h:mm a')}</div>
                </div>
                <div className='container_myRecomBottom'>
                  <div className='container_myRecomContent'>
                    <Viewer initialValue={item.content}/>
                  </div>
                  <div className='container_myDetailBtns_Recom'>
                    <Link to={`/routeInfoModify/${item.forumId}`}><div className='txt_myBtn_Recom'>수정</div></Link>
                    <div className='txt_myBtn_Recom' onClick={() => handelShareDel(item.forumId)}>삭제</div>
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