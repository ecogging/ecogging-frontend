import '../styles/common/Main.css';
import '../styles/common/Footer.css';
import '../styles/common/MyButton.css';
import Header from '../components/common/Header';
import Home from '../components/main/Home';
import Footer from '../components/common/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Temp from './Temp';


export default function Main() {


  return (
    <BrowserRouter>
      <div className='Main'>
        <Header/> 
        <div className='mainContents'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/temp" element={<Temp />}></Route>

            <Route path="/" element={<AccompanyList />} />
            <Route path="/detail" element={<AccompanyDetail />} />
            <Route path="/write" element={<AccompanyWrite />} />
          </Routes>
        </div>
        <Footer />  
      </div>
    </BrowserRouter>
  );

}

