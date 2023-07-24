import '../../styles/common/Main.css';
import '../../styles/common/Footer.css';
import '../../styles/common/MyButton.css';
import Header from '../../components/common/Header';
import Home from './Home';
import Footer from '../../components/common/Footer';


import AccompanyList from '../../components/plogging/accompany/AccompanyList';
import AccompanyDetail from '../../components/plogging/accompany/AccompanyDetail';
import AccompanyWrite from '../../components/plogging/accompany/AccompanyWrite';
import Reviews from '../../components/plogging/reivews/Reviews';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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


export default function Main() {


  return (
    <BrowserRouter>
      <div className='Main'>
        <Header/> 
        <div className='mainContents'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/temp" element={<Temp />}></Route>

            <Route path="/mypage/*" element={<MyPage />}></Route>

            <Route path="/accompany" element={<AccompanyList />} />
            <Route path="/accompanydetail" element={<AccompanyDetail />} />
            <Route path="/accompanywrite" element={<AccompanyWrite />} />
            
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

          </Routes>
        </div>
        <Footer />  
      </div>
    </BrowserRouter>
  );

}

