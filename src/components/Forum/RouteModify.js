import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from "react-router";
import { getCookie } from '../../utils/CookieUtil';
import TextEditor from "../common/TextEditor";
import { useNavigate } from 'react-router-dom';
import '../../styles/Forum/RouteWrite.css';
import '../../styles/Forum/ForumCommon.css';

const {kakao} =window;
const {daum}=window;

export default function RouteWrite(){
    const navigate = useNavigate();
    const userId = getCookie("userId");
    const {forumId}=useParams();
    const [routeInfo, setRouteInfo]=useState(null);
    const [view, setView] = useState(false);

    function daumPostcode() {
        console.log("sample5_execDaumPostcode");
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        
        mapOption = {
            center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };
        
        if (mapContainer){

            //지도를 미리 생성
            var map = new daum.maps.Map(mapContainer, mapOption);
            //주소-좌표 변환 객체를 생성
            var geocoder = new daum.maps.services.Geocoder();
            //마커를 미리 생성
            var marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(37.537187, 127.005476),
                map: map
            });        
            new daum.Postcode({

                oncomplete: function(data) {
                    var addr = data.address; // 최종 주소 변수
                    
                    // 주소 정보를 해당 필드에 넣는다.
                    document.getElementById("sample5_address").value = addr;

                    // 주소를 routeInfo.routeLocation에 저장
                    handleAddress(addr);

                    // 주소로 상세 정보를 검색
                    geocoder.addressSearch(data.address, function(results, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === daum.maps.services.Status.OK) {

                            var result = results[0]; //첫번째 결과의 값을 활용

                            // 해당 주소에 대한 좌표를 받아서
                            var coords = new daum.maps.LatLng(result.y, result.x);
                            // 지도를 보여준다.
                            mapContainer.style.display = "block";
                            map.relayout();
                            // 지도 중심을 변경한다.
                            map.setCenter(coords);
                            // 마커를 결과값으로 받은 위치로 옮긴다.
                            marker.setPosition(coords)
                        }
                    });
                }
            }).open();
        }
    }

    const makeMap = (address) => {
        var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var center = new kakao.maps.LatLng(result[0].y, result[0].x);
                const mapOption = {
                    center:center,
                    level:5
                }
                if (mapContainer) {
                    var map = new kakao.maps.Map(mapContainer, mapOption);
                    var marker = new kakao.maps.Marker({
                        position: center
                    })
                    marker.setMap(map);
                } 
            }
            })    
        }
    
    useEffect(()=>{
        axios
        .post(`http://localhost:8080/routeInfo/${forumId}`,{userId:userId})
        .then(res=>{
            setRouteInfo(res.data.routeInfo);
            console.log(res.data.routeInfo);
            console.log(res.data.routeInfo.routeLocation);
            makeMap(res.data.routeInfo.routeLocation);
            setView(true);
        })
        .catch((error) => {
            console.log('Error fetching data:', error);
        })
    }, [view]);



    useEffect(() => {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }, []);


    const handleRouteUpdateSave=async(temp)=>{
        try {
            console.log('====================');
            console.log(routeInfo)
            const response=await axios.post(`http://localhost:8080/routeModify/${userId}/${forumId}/${temp}`, routeInfo,
            {
                headers:{'Content-Type': 'application/json'},
                withCredentials:true
            })
            console.log(response.data);
            navigate('/routeList');
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitleChange=(e)=>{
        setRouteInfo({...routeInfo, title:e.target.value})
    };

    const handleEditorData=(data)=>{
        setRouteInfo({...routeInfo, content:data})
    };

    const handleAddress=(addr)=>{
        setRouteInfo({...routeInfo, routeLocation:addr })
    };

    const handleAddressDetail = (e) => {
        setRouteInfo({...routeInfo, routeLocationDetail: e.target.value})
    };

    return( 
        <div className="route_mainLayout">
            {view && <div className="route_wrap">
                <div className="route_top">
                    <input className="titleInput" value={routeInfo.title} onChange={handleTitleChange}/>
                </div>
                <div className="route_layout">
                    <div className="route_view">
                        <TextEditor onEditorDataChange={handleEditorData} contentData={routeInfo.content}/>
                    </div>
                    <div className="map_view">
                        <div id="map" className='map_st'></div>
                        <div className="map_input">
                            <div className='map_input_in'>
                                <div className="map_input1">
                                    <input type="text" id="sample5_address" name="routeLocation" value={routeInfo.routeLocation} onChange={handleAddress}/>
                                    <input type="button" className='route_search_btn' onClick={daumPostcode} value="주소 검색"/>
                                </div>
                                <div className="map_input2">
                                    <input className="route_location_detail" type="text" name="routeLocationDetail" id="routeLocationDetail" value={routeInfo.routeLocationDetail} placeholder="상세주소" onChange={handleAddressDetail}/>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="tempAndSaveBtn_layout">
                    <div className="tempAndSaveBtn_layout_in">
                        <div className="routeBtn" onClick={()=>handleRouteUpdateSave(1)}>
                                임시저장
                        </div>
                        <div className="routeBtn" onClick={()=>handleRouteUpdateSave(0)}>
                                등록
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}