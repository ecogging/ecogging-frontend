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
            <Route path="/reviewInfoModify/:id" element={<ReviewModify/>}/>
            <Route path='/reviewWrite/:id' element={<ReviewWrite/>}/>
          </Routes>
        </div>
        <Footer />  
      </div>
    </BrowserRouter>
  );

}

