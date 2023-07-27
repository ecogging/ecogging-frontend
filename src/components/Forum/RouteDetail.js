import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";
import moment from 'moment/moment';
import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';
import '../../styles/Forum/RouteDetail.css';
import { HiOutlineEye } from "react-icons/hi2";
import { BsFillBookmarkFill } from "react-icons/bs";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
const {kakao} =window;
const {daum}=window;
 

export default function RouteDetail(){
    const [routeInfo, setRouteInfo]=useState('');
    const {forumId} = useParams();
    const createdAt=moment(routeInfo.createdAt);
    const formattedDate=createdAt.format('YYYY-MM-DD');
    const navigate = useNavigate();
    // const loginCheck=true;
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
     }
    
   useEffect(()=>{
        axios
        .post(`http://localhost:8080/routeInfo/${forumId}/${userId}`,null,null)
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
    }

    const handleScrap=()=>{
        console.log("스크랩");
        axios.post(`http://localhost:8080/forumscrap/${forumId}/${userId}`)
        .then(res=> {
            setIsScrap(res.data);
            // setIsScrapped(res.data);
        })
        .catch(err=> {
            console.log(err);
        })      
    };

    const handelShareDel=()=>{
        axios
        .post(`http://localhost:8080/shareDel/${forumId}`)
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
                        {/* <div className="routeInfo_imageAndnickname">
                            <div className="routeInfo_profil">프사</div>
                            <div className="routeInfo_nickname"  onClick={handleChat}>{routeInfo.userId}</div>
                        </div> */}
                        <div className="routeInfo_dateAndviewsAndscrap">
                            <div className="routeInfo_date">{formattedDate}</div>
                            <div className="routeInfo_views"><HiOutlineEye className="view_icon"/> {routeInfo.views}</div>
                            <div className="reviewInfo_scrap" onClick={handleScrap}><BsFillBookmarkFill className={isScrap? "BsFillBookmarkFill":""}/></div>
                        </div>
                    </div>
                </div>
                <div className="routeInfo_layout">
                    <div className="routeInfo_content">
                        <div className="routeInfo_content_in">
                            <div className="content_Detail_view">
                                <div className="content_view_in">
                                {view && <Viewer initialValue={routeInfo.content} style={{width:"300px", height:"300px"}}/> }
                                </div>
                            </div>
                            <div className="map_Detail_view">
                                <div className="map_layout">
                                    {/* <div id="map" className="routeMapDetail"></div> */}
                                    {/* <div id="map" style={{width:'100%', height:'350px'}}></div> */}
                                    {/* <div id="map"></div> */}
                                    <div id="map" style={{width:'100%', height:'350px'}} ></div>
                                    {/* <div className="map_layout_in" data-address={routeInfo.routeLocation}></div> */}
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
                        userId!==null ?
                            <div className="modifyAndDeleteBtn_layout_in">
                                <Link to={`/routeInfoModify/${routeInfo.forumId}`} className="modifyBtn">
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