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
import MessageDetail from '../mypage/MessageDetail';

import { getCookie, removeCookie, setCookie } from '../../utils/CookieUtil';



export default function Main() {

  // 마이페이지 접근제한 위한 로그인 확인
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const accessToken = getCookie('access-token');
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className='Main'>
        <Header/> 
        <div className='mainContents'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/temp" element={<Temp />}></Route>

            <Route path="/mypage/*" element={isAuthenticated ? <MyPage /> : <UserSignupIntro/> }></Route>
            <Route path="/messages" element={<MessageDetail />}></Route>

            <Route path="/accompanies" element={<AccompanyList />} />
            <Route path="/accompaniesdetail/:id" element={<AccompanyDetail />} />
            <Route path="/accompanieswrite" element={<AccompanyWrite />} />
            <Route path="/accompaniesmodify/:id" element={<AccompanyModify />} />

            <Route exact path='/eventDetail/:eventId/:page/:ptype' element={<EventDetail/>}/>
            <Route exact path='/eventDetail/:eventId' element={<EventDetail/>}/>
            <Route exact path='/eventList' element={<EventList/>}/> 
            <Route exact path='/eventList/:page/:ptype' element={<EventList/>}/>
            <Route exact path='/eventWrite' element={<EventWrite/>}/> 
            <Route exact path='/eventModify/:eventId/:page/:ptype' element={<EventModify/>}/>

            <Route path="/reviews" element={<Reviews/>}/>

            <Route path="/signup-intro" element={<UserSignupIntro/>}/>
            <Route path="/signup" element={<UserSignup/>}/>
          </Routes>
        </div>
        <Footer />  
      </div>
    </BrowserRouter>
  );

}

