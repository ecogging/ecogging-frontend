import React, { useEffect, useState , useRef} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import '../../styles/Forum/RouteWrite.css';
import TextEditor from "../common/TextEditor";
import { useNavigate } from 'react-router-dom';
const {kakao} =window;
const {daum}=window;

export default function RouteWrite(){
    const [editorData,setEditorData]=useState('');
    const {userId}=useParams();
    const [titleVal, setTitleVal]=useState('');
    const navigate = useNavigate();
    const [locationVal,setLocationVal]=useState();

    function sample5_execDaumPostcode() {
        console.log("sample5_execDaumPostcode");
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };

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
                setLocationVal(addr);

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
    

    const handleRouteSave=async()=>{
        try {
            //작성된 글과 이미지를 폼 데이터로 변환
            // const formData=new FormData();
            // formData.append('content',editorData);
            // formData.append('title',titleVal);

            const requestData={
                content:editorData,
                title:titleVal,
                route_location:locationVal
            };
            
            const response=await axios.post(`http://localhost:8080/routeWrite`, requestData,
            {
                headers:{'Content-Type': 'application/json'},
                withCredentials:true
            })
            // const url=`/images/${response.data.filename}`;
            console.log(response.data);
            navigate('/routeList');
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitleChange=(e)=>{
        setTitleVal(e.target.value);
        console.log(titleVal);
    };

    const handleEditorData=(data)=>{
        setEditorData(data);
        console.log("editorData : "+editorData);
    }

    const handleAddress=(e)=>{
        setLocationVal();
        console.log("location : "+locationVal);
    }

    // var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    // mapOption = { 
    //     center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    //     level: 3 // 지도의 확대 레벨
    // };

    // // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    // var map = new kakao.maps.Map(mapContainer, mapOption); 
    
    const changeInput=(e)=>{
        setLocationVal(e.target.value);
    }

    return( 
        <div className="reviewWrite_mainLayout">
            <div className="reviewWrite_wrap">
                <div className="reviewWrite_top">
                    <div className="reviewWrite_title">
                        <input className="titleInput" value={titleVal} onChange={handleTitleChange}/>
                    </div>
                </div>
                <div className="reviewWrite_layout">
                    <div className="reviewWrite_content">
                        <div className="reviewWrite_content_in">
                            <TextEditor onEditorDataChange={handleEditorData}/>
                        </div>
                        <div className="map_view">
                            <div className="map_layout">
                                <div id="map" className='map'></div>
                                <div className='map_input'>
                                    <input className="route_location_detail" type="text" name="routeLocationDetail" id="routeLocationDetail" placeholder="장소" value={locationVal}/>
                                    <input type="text" id="sample5_address" placeholder="주소" onChange={handleAddress}/>
                                    <input type="button" onClick={sample5_execDaumPostcode} value="주소 검색"/><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tempAndComplBtn_layout">
                    <div className="tempAndComplBtn_layout_in">
                        <div className="tmepBtn">
                                임시저장
                        </div>
                        <div className="complBtn" onClick={handleRouteSave}>
                                등록
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}