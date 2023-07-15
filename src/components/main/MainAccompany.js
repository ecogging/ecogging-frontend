import '../../styles/main/MainAccompany.css';
import imgTemp from '../../assets/123213.png';
import picTemp from '../../assets/cat.png';
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const { kakao } = window;

export default function MainAccompany() {

  function initMap() {
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색하고 지도에 표시합니다
    geocoder.addressSearch('주소', function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 지도 생성 및 옵션 설정
        var map = new kakao.maps.Map(document.getElementById('map'), {
          center: coords,
          level: 3,
        });

        // 지도에 마커 표시
        var marker = new kakao.maps.Marker({
          position: coords,
          map: map,
        });
      }
    });
  }


  // 최신 3개 글 가져오기
  const [accomp, setAccomp] = useState(null);
  useEffect(() => {
    fetch("/main/accompanies")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.list)) {
          setAccomp(data.list);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 지도 가져오기
  useEffect(() => {
    let cardHeaders = document.getElementsByClassName("box_map");
    for (let cardHeader of cardHeaders) {
      cardOnload(cardHeader, cardHeader.dataset.address);
    }
  }, [accomp]);
  
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
          level: 3, // 지도의 확대 레벨
        };

        // 지도를 생성합니다
        var map = new kakao.maps.Map(e, mapOption);
        map.setZoomable(false);

        // 마커 생성 & 지도 위 표시
        var marker = new kakao.maps.Marker({
          position: center
        });
        marker.setMap(map);

        // 지도 드래그 방지
        map.setDraggable(false);
      }
    });
  };

  if (accomp === null) {
    // 데이터 로딩 중에 보여줄 내용
    return <div>Loading...</div>
  }

  return (
    <div className='container_mainAccompany'>

      <div className='container_part_mainAccompany'>

        <div className='container_title'>
          <div className='box_title'>RECENT MATES</div>
        </div>

        <div className='container_MatesCards'>

          {accomp.map((item, idx) => ( 
            <div className='box_MatesCard' key={idx}>
              <div className='box_MatesCard'>
                <div className='card_MatesWhole'>

                <div className='container_card_top_recruit'>
                  {item.active === true ? (
                    <div className='box_recruitState_process'>모집중</div>
                  ) : <div className='box_recruitState_finish'>모집완료</div>
                  }
                </div>

                  <div className='container_card_top_pic'>
                    <div className='box_pic_circle'>
                      <img src={picTemp} className='image_userPic_source'/>
                    </div>
                  </div>

                  <div className='container_card_middle'>
                    <div className='box_nickname'>{item.nickname}</div>
                    <Link to={`/accompaniesdetail/${item.id}`} ><div className='box_matesTitle'>{item.title}</div></Link>
                  </div>

                  <div className='container_card_bottom'>
                    { item.location ? 
                      <div className="box_map" id="box_map" data-address={item.location} ref={(e) => cardOnload(e, item.location)}></div> 
                      : <div>{item.content}</div> }
                  </div>
              
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    
  )
}