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
  const [userId, setUserId] = useState(null); // userId 상태 추가

  useEffect(() => {
    const accessToken = getCookie('access-token');
    const userId = getCookie('userId');

    if (accessToken) {
      setIsAuthenticated(true);
      setUserId(userId); // userId 설정
    }
  }, []);

  return (
    <BrowserRouter>
      <div className='Main'>
        <Header userId={userId} /> 
        <div className='mainContents'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/temp" element={<Temp />}></Route>

            <Route path="/mypage/:userId/*" element={isAuthenticated ? <MyPage userId={userId} /> : <UserSignupIntro/> } />
            <Route path="/messages" element={<MessageDetail />}></Route>

            <Route path="/accompanies" element={<AccompanyList />} />
            <Route path="/accompaniesdetail/:id" element={<AccompanyDetail />} />
            <Route path="/accompanieswrite" element={<AccompanyWrite />} />
            <Route path="/accompaniesmodify/:id" element={<AccompanyModify />} />
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

