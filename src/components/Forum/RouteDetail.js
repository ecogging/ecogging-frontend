import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import { getCookie } from '../../utils/CookieUtil';
import { Viewer } from '@toast-ui/react-editor';
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '../../styles/Forum/RouteDetail.css';
import '../../styles/Forum/ForumCommon.css';

const {kakao} =window;
 
export default function RouteDetail(){
    const [routeInfo, setRouteInfo]=useState('');
    const {forumId} = useParams();
    const createdAt=moment(routeInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    const [location, setlocation]=useState('');
    const userId = getCookie("userId");
    const [view, setView] = useState(false);
    const [isScrap, setIsScrap] = useState(false);

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
                var map = new kakao.maps.Map(mapContainer, mapOption);
                var marker = new kakao.maps.Marker({
                    position: center
                })
                marker.setMap(map);
            } 
        })        
     };
    
   useEffect(()=>{
        axios
        .post(`http://localhost:8080/routeInfo/${forumId}`,{userId:userId})
        .then((res)=>{
            setRouteInfo(res.data.routeInfo);
            console.log(res.data.routeInfo);
            setIsScrap(res.data.isScrap);
            setlocation(res.data.routeInfo.routeLocation);
            makeMap(res.data.routeInfo.routeLocation)
            setView(true);
        })
        .catch((error) => {
          console.log('Error fetching data:', error);
        })       
    }, []);

    const handleChat=()=>{
        console.log("쪽지모달");
    };

    const handleScrap=()=>{
        console.log("스크랩");
        axios
        .post(`http://localhost:8080/forumscrap/${forumId}/${userId}`)
        .then(res=> {
            setIsScrap(res.data);
            // setIsScrapped(res.data);
        })
        .catch(err=> {
            console.log(err);
        })      
    };

    const handelRouteDel=()=>{
        axios
        .post(`http://localhost:8080/shareDel/${forumId}`)
        .then(res=>{
            console.log("삭제 완료");
            navigate('/routeList');
        }).catch(err=>{
            console.log(err);
        })
    };

    return(
        <div className="routeInfo_mainLayout">
            <div className="routeInfo_wrap">
                <div className="routeInfo_top">
                    <div className="routeInfo_title">{routeInfo.title}</div>
                    <div className="routeInfo_top_in">
                        <div className="routeInfo_imageAndnickname">
                            <div className="routeInfo_profil">
                                <img src={routeInfo.writerPic} alt="프사" className="routeInfo_profil_img"/>    
                            </div>
                            <div className="routeInfo_nickname"  onClick={handleChat}>{routeInfo.writerNickname}</div>
                        </div>
                        <div className="routeInfo_dateAndviewsAndscrap">
                            <div className="routeInfo_date">{formattedDate}</div>
                            <div className="routeInfo_views"><HiOutlineEye/> {routeInfo.views}</div>
                            <div className="forum_scrap" onClick={handleScrap}><BsFillBookmarkFill className={isScrap? "BsFillBookmarkFill_true":"BsFillBookmarkFill_false"}/></div>
                        </div>
                    </div>
                </div>
                <div className="routeInfo_layout">
                    <div className="routeInfo_content_Detail_view">
                        {view && <Viewer initialValue={routeInfo.content}/> }
                    </div>
                    <div className="routeInfo_map_Detail_view">
                        <div id="map" className="map_st"/>
                        <div className="map_address">
                            <div className="map_address_in">
                                "추천 주소 : {routeInfo.routeLocation} {routeInfo.routeLocationDetail}"
                            </div>
                        </div>
                    </div>
                </div>
                <div className="routeInfoBtn_layout">
                    <div className="routeInfo_list_layout">
                        <Link to={'/routeList'} className="routeBtn">
                                목록
                        </Link>
                    </div>
                        {
                        userId!==null ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/routeInfoModify/${routeInfo.forumId}`} className="routeBtn">
                                    수정
                                </Link>
                                <div className="routeBtn" onClick={handelRouteDel}>
                                    삭제
                                </div>
                            </div>
                        : null
                        }
                </div>
            </div>
        </div>
    );
}