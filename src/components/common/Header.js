import React, { useEffect, useState } from 'react';
import { Link, navigate, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegBell } from "react-icons/fa";

import '../../styles/common/Header.css';

import ecoggingLogo from '../../assets/ecoggingLogo.png';
import MyButton  from './MyButton';
import { getCookie, removeCookie, setCookie } from '../../utils/CookieUtil';

import UserLoginModal from '../user/UserLoginModal';
import useLoginModal from '../../hooks/useLoginModal';

function isValidTokenToLogin(token) {
  return token != null && token !== "";
}

function removeTokenAndUserFromCookie() {
  removeCookie('access-token');
  removeCookie('userId');
  removeCookie('nickname')
}

export default function Header () {
    const navigate = useNavigate();
    const accessToken = getCookie('access-token');
    // 임시 로그인 처리
    const isLogin = isValidTokenToLogin(accessToken);

    const userNickname = getCookie("nickname");

    // 모달
    const { isLoginModalOpen, openLoginModal, closeLoginModal } = useLoginModal();
    const userLogout = () => {
      removeTokenAndUserFromCookie();
      navigate('/');
      alert('로그아웃 되었습니다.');
    }

    // 반응형 토글 메뉴 여닫기
    const closeToggle = (e) => {
        if(e.target.className !== 'headerMenu' && e.target.className !== 'ploggingNav' && e.target.className !== ''){
            if(showNav === true) {
                setShowNav(!showNav);
            }
        }
    }
    const [showNav, setShowNav] = useState(false);
    const toggleNav = (e) => {
        setShowNav(!showNav);
    };

    // click 효과
    const [inMenu, setInMenu] = useState('');
    const clickMenu = (e) => {
        let nowMenu = e.target; // 지금 클릭한 타겟
        console.log(nowMenu);
 
        let nowMenuClass = e.target.textContent; // 클릭한 타겟의 클래스이름
        console.log(nowMenuClass);
        setInMenu(nowMenuClass);
    }

    if(isLogin){
        return (
            <header className='header' onClick={closeToggle}>
                <div className='logoContainer' onClick={clickMenu}>
                    <Link to = {'/'}>
                        <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
                    </Link>
                </div>
                <nav className={`headerNav ${showNav ? 'show' : ''}`} onClick={clickMenu}>
                    <ul className='headerMenu'>
                        <li className='headerMenuList'>
                            <Link to = {'/accompany'} id='ploggingMenu'><div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu === '플로깅' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>플로깅</div></Link>
                            <div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu==='플로깅' ? 'ploggingNavContainer_clicked' : 'ploggingNavContainer'}>
                                <ul className='ploggingNav'>
                                    <Link to={'/accompany'}><li className={ inMenu==='플로깅'  || inMenu === '모임' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'}>모임</li></Link>
                                    <Link to={'/temp'}><li className={inMenu === '행사' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'}>행사</li></Link>
                                    <Link to={'/reviews'}><li className={inMenu === '후기' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'}>후기</li></Link>
                                </ul>
                            </div>
                        </li>
                        <Link to={'/temp'}>
                            <li className='headerMenuList'>
                                <div className={inMenu === '커뮤니티' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>커뮤니티</div>
                            </li>
                        </Link>
                    </ul>
                </nav>
                <ul className='userNav' onClick={clickMenu}>
                    <li className='userNavBox headerNotify'><FaRegBell /><div className='alaramCount'>12</div></li>
                    <li className='userNavBox'><Link to={'/mypage'}><span className='nickName'>{userNickname}</span></Link> 님</li>
                    <li className='userNavBox'><MyButton text={"로그아웃"} type={"graySmall"} onClick={userLogout}></MyButton></li>
                </ul>
                <div className='toggle' onClick={toggleNav} >
                    <GiHamburgerMenu />
                </div>
           </header>
        );
    }

    return (
        <header onClick={closeToggle}>
             <div className='logoContainer' onClick={clickMenu}>
                <Link to = {'/'}>
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
                </Link>
            </div>
            <nav className={`headerNav ${showNav ? 'show' : ''}`} onClick={clickMenu}>
                <ul className='headerMenu'>
                    <li className='headerMenuList'>
                    <Link to = {'/accompany'} id='ploggingMenu'><div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu === '플로깅' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>플로깅</div></Link>
                        <div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu==='플로깅' ? 'ploggingNavContainer_clicked' : 'ploggingNavContainer'}>
                            <ul className='ploggingNav'>
                                <Link to={'/accompany'}><li className={ inMenu==='플로깅'  || inMenu === '모임' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'}>모임</li></Link>
                                <Link to={'/temp'}><li className={inMenu === '행사' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'}>행사</li></Link>
                                <Link to={'/reviews'}><li className={inMenu === '후기' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'}>후기</li></Link>
                            </ul>
                        </div>
                    </li>
                    <Link to={'/temp'}>
                        <li className='headerMenuList'>
                            <div className={inMenu === '커뮤니티' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>커뮤니티</div>
                        </li>
                    </Link>
                </ul>
            </nav>
            <ul className='loginNav' onClick={clickMenu}>
              <li className='loginBtn'><MyButton text={'기업 로그인'} type={'whiteMint'}></MyButton></li>
              <li className='loginBtn'><MyButton text={'개인 로그인'} onClick={openLoginModal}></MyButton></li>
            </ul>

            <UserLoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} />

            <div className='toggle' onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>
        </header>
    );
}