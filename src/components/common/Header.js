import { Link } from 'react-router-dom';
import '../../styles/common/Header.css';
import ecoggingLogo from '../../assets/ecoggingLogo.png';
import MyButton  from './MyButton';
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState } from 'react';
import { FaRegBell } from "react-icons/fa";

export default function Header () {
    
    // 임시 로그인 처리
    const [isLogin, setIsLogin] = useState(false);
    const loginTemp = () => {
        setIsLogin(!isLogin);
    }
    
    const printTarget = (e) => {
        console.log(e.target);
        console.log(e.target.parentNode);
        // if(showNav == true) {
        //     setShowNav(!showNav);
        // }
    }

    // 반응형 토글 메뉴 여닫기
    const [showNav, setShowNav] = useState(false);
    const toggleNav = (e) => {
        setShowNav(!showNav);
    };

    if(isLogin){
        return (
            <header onClick={printTarget}>
            <div className='logoContainer'>
                <Link to = {'/'}>
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
                </Link>
            </div>
            <nav className={`headerNav ${showNav ? 'show' : ''}`}>
                <ul className='headerMenu'>
                    <li className='headerMenuList'>
                        <Link to = {'/temp'} id='ploggingMenu'><div className='headerMenuLink' >플로깅</div></Link>
                        <div className='ploggingNavContainer'>
                            <ul className='ploggingNav'>
                                <li className='ploggingNavMenu'>모임</li>
                                <li className='ploggingNavMenu'>행사</li>
                                <li className='ploggingNavMenu'>후기</li>
                            </ul>
                        </div>
                    </li>
                    <li className='headerMenuList'>
                        <div className='headerMenuLink'>커뮤니티</div>
                    </li>
                </ul>
            </nav>
            <ul className='userNav'>
                <li className='headerNotify'><FaRegBell /><div className='alaramCount'>12</div></li>
                <li><span className='nickName'>닉네임</span> 님</li>
                <li><MyButton text={"로그아웃"} type={"graySmall"} onClick={loginTemp}></MyButton></li>
            </ul>
            <div className='toggle' onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>
         </header>
        );
    }

    return (
        <header>
            <div className='logoContainer'>
                <Link to = {'/'}>
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
                </Link>
            </div>
            <nav className={`headerNav ${showNav ? 'show' : ''}`}>
                <ul className='headerMenu'>
                    <li className='headerMenuList'>
                        <Link to = {'/temp'} id='ploggingMenu'><div className='headerMenuLink' >플로깅</div></Link>
                        <div className='ploggingNavContainer'>
                            <ul className='ploggingNav'>
                                <li className='ploggingNavMenu'>모임</li>
                                <li className='ploggingNavMenu'>행사</li>
                                <li className='ploggingNavMenu'>후기</li>
                            </ul>
                        </div>
                    </li>
                    <li className='headerMenuList'>
                        <div className='headerMenuLink'>커뮤니티</div>
                    </li>
                </ul>
            </nav>
            <ul className='loginNav'>
                <li className='loginBtn' onClick={loginTemp}><MyButton text={'기업 로그인'} type={'whiteMint'}></MyButton></li>
                <li className='loginBtn'><MyButton text={'개인 로그인'} onClick={loginTemp}></MyButton></li>
            </ul>
            <div className='toggle' onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>
        </header>
    );
}