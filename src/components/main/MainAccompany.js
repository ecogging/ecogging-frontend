import '../../styles/main/MainAccompany.css';
import imgTemp from '../../assets/123213.png';
import picTemp from '../../assets/cat.png';
import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MessageSendModal from '../../components/common/MessageSendModal';
import useSendMessage from "../../hooks/useSendMessage";

const { kakao } = window;



export default function MainAccompany() {

  // 쪽지 보내기 모달
  const { isModalOpen, selectedNick, openSendModal, closeSendModal } = useSendMessage();

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

  // 지도 생성
  useEffect(() => {
    let boxMaps = document.getElementsByClassName("box_map"); // 맵 넣을 컨테이너 선택
    for(let boxMap of boxMaps) { 
        mapOnload(boxMap, boxMap.dataset.address);
    }
  }, [accomp]); // accomp가 변경될 때마다 실행

  // 데이터 로딩 중에 보여줄 내용
  if (accomp === null) {
    return <div>Loading...</div>
  }

  // 지도 생성 함수
  const mapOnload = (e, address) => {
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) { 
            let lat = result[0].y;
            let lon = result[0].x; 
            var center = new kakao.maps.LatLng(lat, lon);

            const mapOption = {
                center: center, 
                level: 3 
            };   

            if (e) {
            // kakao.js:31 Uncaught TypeError: Cannot read properties of null (reading 'currentStyle')
            // DOM 요소에서 'currentStyle' 속성에 접근하려고 할 때 null/정의X 일 때 발생
            // 메인일 때 말고 다른 페이지로 이동하면 발생-> box-map이 존재할 때만 지도 생성하도록 조건 걸어줌
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

const clicking = (e) => {
  console.log(e.target);
}

  return (
    <div className='container_mainAccompany'>
      {isModalOpen ? <MessageSendModal onCloseModal={closeSendModal} receiverNick={selectedNick}/> : null}

      <div className='container_part_mainAccompany' onClick={closeSendModal}>

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
                    <div className='box_pic_circle' onClick={clicking}>
                      <img src={picTemp} className='image_userPic_source'/>
                    </div>
                  </div>

                  <div className='container_card_middle'>
                    <div className='box_nickname' onClick={openSendModal}>{item.nickname}</div>
                    <Link to={`/accompaniesdetail/${item.id}`} ><div className='box_matesTitle'>{item.title}</div></Link>
                  </div>

                  <div className='container_card_bottom'>
                      <div className="box_map" id="box_map" data-address={item.location} ref={(e) => mapOnload(e,item.location)}></div> 
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