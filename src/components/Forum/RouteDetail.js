import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import '../../styles/Forum/RouteDetail.css';
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
const {kakao} =window;
const {daum}=window;
 

export default function RouteDetail(){
    const [routeInfo, setRouteInfo]=useState([]);
    const {id} = useParams();
    const createdAt=moment(routeInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    const loginCheck=true;
    const [location, setlocation]=useState([]);

    // useEffect(()=>{
    //     mapOnload(routeInfo.routeLocation);
    // })

    // const mapOnload = (data) => {
    //     // 주소-좌표 변환 객체를 생성합니다
    //     var geocoder = new kakao.maps.services.Geocoder();

    //     geocoder.addressSearch(routeInfo.routeLocation, function (result, status) {
    //         // 정상적으로 검색이 완료됐으면 
    //         if (status === kakao.maps.services.Status.OK) {
    //             let lat = result[0].y;
    //             let lon = result[0].x;

    //             // 지도 중심 위치입니다 
    //             var center = new kakao.maps.LatLng(lat, lon);
    //             const mapOption = {
    //                 center: center, // 지도의 중심좌표
    //                 level: 5 // 지도의 확대 레벨
    //             };

    //             // 지도를 생성합니다    
    //             var map = new kakao.maps.Map(mapOption);
    //             map.setZoomable(false);

    //             // 마커를 생성합니다
    //             var marker = new kakao.maps.Marker({
    //                 position: center
    //             });

    //             // 마커가 지도 위에 표시되도록 설정합니다
    //             marker.setMap(map);
    //         }
    //     });


    // };

    // useEffect(()=>{
    //     var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    //     mapOption = { 
    //         center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    //         level: 3 // 지도의 확대 레벨
    //     };

    //     // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    //     var map = new kakao.maps.Map(mapContainer, mapOption); 


    // },[])


    // function sample5_execDaumPostcode() {
    //     console.log("sample5_execDaumPostcode");
    //     var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    //     mapOption = {
    //         center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
    //         level: 5 // 지도의 확대 레벨
    //     };

    //     //지도를 미리 생성
    //     var map = new daum.maps.Map(mapContainer, mapOption);
    //     //주소-좌표 변환 객체를 생성
    //     var geocoder = new daum.maps.services.Geocoder();
    //     //마커를 미리 생성
    //     var marker = new daum.maps.Marker({
    //         position: new daum.maps.LatLng(37.537187, 127.005476),
    //         map: map
    //     });        
    //     new daum.Postcode({
    //         oncomplete: function(data) {
    //             // var addr = data.address; // 최종 주소 변수
    //             // var addr=routeInfo.routeLocation;

    //             // 주소 정보를 해당 필드에 넣는다.
    //             // document.getElementById("sample5_address").value = addr;
    //             // addr=routeInfo.routeLocation;
    //             // setLocationVal(addr);

    //             // 주소로 상세 정보를 검색
    //             geocoder.addressSearch(routeInfo.routeLocation, function(results, status) {
    //                 // 정상적으로 검색이 완료됐으면
    //                 if (status === daum.maps.services.Status.OK) {

    //                     var result = results[0]; //첫번째 결과의 값을 활용

    //                     // 해당 주소에 대한 좌표를 받아서
    //                     var coords = new daum.maps.LatLng(result.y, result.x);
    //                     // 지도를 보여준다.
    //                     mapContainer.style.display = "block";
    //                     map.relayout();
    //                     // 지도 중심을 변경한다.
    //                     map.setCenter(coords);
    //                     // 마커를 결과값으로 받은 위치로 옮긴다.
    //                     marker.setPosition(coords)
    //                 }
    //             });
    //         }
    //     }).open();
    // }

    // // useEffect(()=>{
    // //     let mapLayout=document.getElementsByClassName("map_layout_in");
    // //     for(let mapLayout of mapLayout){
    // //         mapLoad(mapLayout, mapLayout.dataset.address);
    // //     }
    // // })

    // const mapLoad=(e,address)=>{
    //     var geocoder=new kakao.maps.services.Geocoder();
    //     geocoder.addressSearch(address,function(result,status){
    //         if(status===kakao.maps.services.Status.OK){
    //             let lat=result[0].y;
    //             let lon=result[0].x;

    //             var center=new kakao.maps.LatLng(lat,lon);
    //             const mapOption={
    //                 center:center,
    //                 level:5
    //             };

    //             var map=new kakao.maps.Map(e,mapOption);
    //             map.setZoomable(false);

    //             var marker=new kakao.maps.Marker({
    //                 position:center
    //             });

    //             marker.setMap(map);
    //         }
    //     });
    // };

    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);    

    useEffect(()=>{
        axios
        .post(`http://localhost:8080/routeInfo`,{id:id})
        .then(res=>{
            setRouteInfo(res.data.routeInfo);
            console.log(res.data.routeInfo);
            // console.log("reviewInfo : "+reviewInfo.content);
            // console.log("result"+result);
            
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
        })
    }, []);
    
    const result=routeInfo.content;
    console.log("result:"+result);
    // const html=reviewInfo;
    // console.log(html);

    const handleChat=()=>{
        console.log("쪽지모달");
    }

    const handleScrap=()=>{
        console.log("스크랩");
    }
    const handelShareDel=()=>{
        axios
        .post(`http://localhost:8080/shareDel/${id}`)
        .then(res=>{
            console.log("삭제 완료");
            navigate('/shares');
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <div className="routeInfo_mainLayout">
            <div className="routeInfo_wrap">
                <div className="routeInfo_top">
                    <div className="routeInfo_title">{routeInfo.title}</div>
                    <div className="routeInfo_top_in">
                        <div className="routeInfo_imageAndnickname">
                            <div className="routeInfo_profil">프사</div>
                            <div className="routeInfo_nickname"  onClick={handleChat}>{routeInfo.userId}</div>
                        </div>
                        <div className="routeInfo_dateAndviewsAndscrap">
                            <div className="routeInfo_date">{formattedDate}</div>
                            <div className="routeInfo_views"><HiOutlineEye className="view_icon"/> {routeInfo.views}</div>
                            <div className="routeInfo_scrap" onClick={handleScrap}><BsFillBookmarkFill className="BsFillBookmarkFill"/></div>
                        </div>
                    </div>
                </div>
                <div className="routeInfo_layout">
                    <div className="routeInfo_content">
                        <div className="routeInfo_content_in">
                            <div className="content_Detail_view">
                                <div className="content_view_in">
                                    <Viewer initialValue={routeInfo.content} className="routeView"/>
                                </div>
                            </div>
                            <div className="map_Detail_view">
                                <div className="map_layout">
                                    {/* <div id="map" className="routeMapDetail"></div> */}
                                    <div id="map" style={{width:'100%', height:'350px'}}></div>
                                    <div className="map_layout_in" data-address={routeInfo.routeLocation}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="routeInfoBtn_layout">
                    <div className="routeInfoBtn_layout">
                        <Link to={'/routeList'} className="routeListBtn">
                                목록
                        </Link>
                    </div>
                        {
                        loginCheck ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/routeInfoModify/${routeInfo.id}`} className="modifyBtn">
                                        수정
                                </Link>
                                {/* <Link to={`/reviewInfoDel/${reviewInfo.id}`} className="delBtn"> */}
                                <div className="delBtn" onClick={handelShareDel}>
                                    삭제
                                </div>
                                {/* </Link>  */}
                            </div>
                        : null
                        }
                </div>
            </div>
        </div>
    );
}