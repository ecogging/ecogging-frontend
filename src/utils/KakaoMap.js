// import { useState, useEffect } from "react";
// const { kakao } = window;

// export default function KakaoMap({ item }) {

 
//   function initMap() {
//     // 주소-좌표 변환 객체를 생성합니다
//     var geocoder = new kakao.maps.services.Geocoder();

//     // 주소로 좌표를 검색하고 지도에 표시합니다
//     geocoder.addressSearch('주소', function (result, status) {
//       // 정상적으로 검색이 완료됐으면
//       if (status === kakao.maps.services.Status.OK) {
//         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // 지도 생성 및 옵션 설정
//         var map = new kakao.maps.Map(document.getElementById('map'), {
//           center: coords,
//           level: 3,
//         });

//         // 지도에 마커 표시
//         var marker = new kakao.maps.Marker({
//           position: coords,
//           map: map,
//         });
//       }
//     });
//   }

//   // 지도 가져오기
//   useEffect(() => {
//     let cardHeaders = document.getElementsByClassName("box_map");
//     for (let cardHeader of cardHeaders) {
//       cardOnload(cardHeader, cardHeader.dataset.address);
//     }
//   }, [item]);
  
//   const cardOnload = (e, address) => {
//     // 주소-좌표 변환 객체를 생성합니다
//     var geocoder = new kakao.maps.services.Geocoder();

//     geocoder.addressSearch(address, function (result, status) {
//       // 정상적으로 검색이 완료됐으면
//       if (status === kakao.maps.services.Status.OK) {
//         let lat = result[0].y;
//         let lon = result[0].x;

//         // 지도 중심 위치입니다
//         var center = new kakao.maps.LatLng(lat, lon);
//         const mapOption = {
//           center: center, // 지도의 중심좌표
//           level: 3, // 지도의 확대 레벨
//         };

//         // 지도를 생성합니다
//         var map = new kakao.maps.Map(e, mapOption);
//         map.setZoomable(false);

//         // 마커 생성 & 지도 위 표시
//         var marker = new kakao.maps.Marker({
//           position: center
//         });
//         marker.setMap(map);

//         // 지도 드래그 방지
//         map.setDraggable(false);
//       }
//     });
//   };



//   return {cardOnload};

// }