import '../../styles/common/Main.css';
import '../../styles/common/Footer.css';
import '../../styles/common/MyButton.css';
import Header from '../../components/common/Header';
import Home from './Home';
import Footer from '../../components/common/Footer';


import AccompanyList from '../../components/plogging/accompany/AccompanyList';
import AccompanyDetail from '../../components/plogging/accompany/AccompanyDetail';
import AccompanyWrite from '../../components/plogging/accompany/AccompanyWrite';
import AccompanyModify from '../../components/plogging/accompany/AccompanyModify';

import EventList from '../../components/plogging/event/EventList';
import EventWrite from '../../components/plogging/event/EventWrite';
import EventDetail from '../../components/plogging/event/EventDetail';
import EventModify from '../../components/plogging/event/EventModify';

import Reviews from '../../components/plogging/reivews/Reviews';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Temp from '../../components/main/Temp';
import MyPage from '../mypage/MyPage';
import UserSignupIntro from '../../components/user/UserSignupIntro';
import UserSignup from '../../components/user/UserSignup';
import ReviewDetail from '../../components/plogging/reivews/ReviewDetail';
import ReviewModify from '../../components/plogging/reivews/ReviewModify';
import ReviewWrite from '../../components/plogging/reivews/ReviewWrite';
import ShareWrite from '../../components/Forum/ShareWrite';
import Shares from '../../components/Forum/Shares';
import ShareDetail from '../../components/Forum/ShareDetail';
import ShareModify from '../../components/Forum/ShareModify';
import RouteList from '../../components/Forum/RouteList';
import RouteDetail from '../../components/Forum/RouteDetail';
import RouteWrite from '../../components/Forum/RouteWrite';
import MessageDetail from '../mypage/MessageDetail';

import { getCookie, removeCookie, setCookie } from '../../utils/CookieUtil';
import CorpLogin from '../../components/corporate/CorpLogin';
import CorpSignUp from '../../components/corporate/CorpSignUp';
import CorpMyPage from '../mypage/CorpMyPage';


export default function Main() {

  // 마이페이지 접근제한 위한 로그인 확인
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); 
  useEffect(() => {
    const accessToken = getCookie('access-token');
    setUserId(getCookie('userId')); // userId 설정
    if (accessToken) {
      setIsAuthenticated(true);
    }
    console.log('USEEFFECT__'+userId);
  }, [userId]);


  return (
    <BrowserRouter>
      <div className='Main'>
        <Header userId={userId}  /> 
        <div className='mainContents'>
          <Routes>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/temp" element={<Temp />}></Route>

            <Route path="/mypage/*" element={isAuthenticated ? <MyPage userId={userId} setUserId={setUserId}/> : <UserSignupIntro/> } />
            <Route path="/:userId/messageroom/:messageRoomId" element={<MessageDetail />}></Route>

            <Route path="/corporate/mypage/*" element=
            {isAuthenticated ? <CorpMyPage /> : <CorpLogin /> } 
            />


            <Route path="/accompanies" element={<AccompanyList />} />
            <Route path="/accompaniesdetail/:id" element={<AccompanyDetail />} />
            <Route path="/accompanieswrite" element={<AccompanyWrite />} />
            <Route path="/accompaniesmodify/:id" element={<AccompanyModify />} />

            <Route exact path='/eventDetail/:eventId' element={<EventDetail/>}/>
            <Route exact path='/eventDetail/:eventId/:page/:ptype' element={<EventDetail/>}/>
            <Route exact path='/eventList' element={<EventList/>}/> 
            <Route exact path='/eventList/:page/:ptype' element={<EventList/>}/>
            <Route exact path='/eventWrite' element={<EventWrite/>}/> 
            <Route exact path='/eventModify/:eventId' element={<EventModify/>}/>
            <Route exact path='/eventModify/:eventId/:page/:ptype' element={<EventModify/>}/>

            <Route path="/reviews" element={<Reviews/>}/>

            <Route path="/signup-intro" element={<UserSignupIntro/>}/>
            <Route path="/signup" element={<UserSignup/>}/>

            <Route path="/reviewInfo/:id" element={<ReviewDetail/>}/>
            <Route path="/shareInfo/:id" element={<ShareDetail/>}/>
            <Route path="/reviewInfoModify/:id" element={<ReviewModify/>}/>
            <Route path="/shareInfoModify/:id" element={<ShareModify/>}/>
            <Route path="/reviewWrite/:userId" element={<ReviewWrite/>}/>
            <Route path="/shareWrite/:userId" element={<ShareWrite/>}/>
            <Route path="/routeWrite/:userId" element={<RouteWrite/>}/>
            <Route path="/shares" element={<Shares/>}/>
            <Route path="/routeList" element={<RouteList/>}/>
            <Route path="/routeInfo/:id" element={<RouteDetail/>}/>

            <Route path="/corp-login" element={<CorpLogin />}/>
            <Route path="/corp-signup" element={<CorpSignUp />}/>
          </Routes>
        </div>
        <Footer />  
      </div>
    </BrowserRouter>
  );

}

