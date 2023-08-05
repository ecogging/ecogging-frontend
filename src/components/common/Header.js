import React, { useEffect, useState } from 'react';
import { Link, navigate, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegBell } from "react-icons/fa";

import '../../styles/common/Header.css';

import ecoggingLogo from '../../assets/ecoggingLogo.png';
import MyButton  from './MyButton';
import { getCookie, removeCookie, setCookie } from '../../utils/CookieUtil';

import UserLoginModal from '../user/UserLoginModal';
import useCustomModal from '../../hooks/useCustomModal';
import NotificationModal from './NotificationModal';

function isValidTokenToLogin(token) {
  return token != null && token !== "";
}

function removeTokenAndUserFromCookie() {
  const tokenKeys = ['access-token', 'userId', 'nickname', 'userType', 'profileImageUrl'];

  for (const tokenKey of tokenKeys) {
    if (getCookie(tokenKey))
      removeCookie(tokenKey)
  }
}

// 새로고침
const reloading = () => {
    window.location.reload();
};

function isCorporateUser() {
  return getCookie('userType') === 'CORPORATE';
}


export default function Header ({userId, setUserId}) {
    const navigate = useNavigate();
    const accessToken = getCookie('access-token');

    // 로그인 처리
    const [isLogin, setIsLogin] = useState(isValidTokenToLogin(accessToken));
    const [isCorporate, setIsCorporate] = useState(isCorporateUser());
    const [nickname, setNickname] = useState(getCookie('nickname'));

    // 모달 - 로그인
    const [isLoginModalOpen, openLoginModal, closeLoginModal] = useCustomModal();
    const userLogout = () => {
      handleRemoveCss();

      removeTokenAndUserFromCookie();
      navigate('/');
      setIsLogin(false);
      alert('로그아웃 되었습니다.');
    }
    // 모달 - 알림
    const [isNotiModalOpen, openNotiModal, closeNotiModal] = useCustomModal();
    
    const [hasUnReadNotifications, setHasUnReadNotifications] = useState(false);

    const toggleNotiModal = () => {
      if (isNotiModalOpen) {
        closeNotiModal();
      } else {
        openNotiModal();
      }
    }

    // 반응형 토글 메뉴 여닫기
    const closeToggle = (e) => {

        handleHeaderMenu(e);

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
        let nowMenuClass = e.target.textContent; // 클릭한 타겟의 클래스이름
        setInMenu(nowMenuClass);
    }

    // Header clicked css 
    const handleHeaderMenu = (e) => {
        let nowPath = window.location.pathname;
        let nowMenu = e.target.parentNode.href;

        let includeMenu = e.target.parentNode.parentNode.className; 

        if (nowMenu) {
            // 일단 이전에 선택했던 메뉴가 있으면 css clicked효과 제거
            let prevMenu = document.querySelectorAll('[class*="_clicked"]');
            if(prevMenu) {
                for(let p of prevMenu) {
                    const newClassName = p.className.replace('_clicked', '');
                    p.className = newClassName;
                }
            }
            
            if(nowMenu.indexOf(nowPath) > -1 && includeMenu.indexOf('ploggingNav') > -1) { // 플로깅 하위 메뉴 선택하면 플로깅까지 css 효과 적용
                e.target.className += '_clicked';
                document.querySelector('.ploggingNavContainer').className += '_clicked';
                document.getElementsByClassName('headerMenuLink')[0].className += '_clicked';
            } else if (nowMenu.indexOf('accompanies') > -1) { // 플로깅 선택할 경우 '모임'까지 css 효과 적용
                document.querySelector('.ploggingNavContainer').className += '_clicked';
                document.querySelectorAll('.headerMenuLink')[0].className += '_clicked';
                document.querySelectorAll('.ploggingNavMenu')[0].className += '_clicked';
            } else {
                e.target.className += '_clicked';
            }

        }
    }

    const handleRemoveCss = () => {
        let prevMenu = document.querySelectorAll('[class*="_clicked"]');
        if(prevMenu) {
            for(let p of prevMenu) {
                const newClassName = p.className.replace('_clicked', '');
                p.className = newClassName;
            }
        }
    }


    if(isLogin){
        return (
            <header className='header' onClick={closeToggle} >
                <Link to = {'/'}>
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
                </Link>
                <nav className={`headerNav ${showNav ? 'show' : ''}`}>
                    <ul className='headerMenu'>
                        <li className='headerMenuList'>
                            <Link to = {'/accompanies'} id='ploggingMenu' className='ploggingMenu'>
                                <div className='headerMenuLink'>플로깅</div>
                            </Link>
                            <div className='ploggingNavContainer'>
                                <ul className='ploggingNav' >
                                    <Link to={'/accompanies'}><li className='ploggingNavMenu'>모임</li></Link>
                                    <Link to={'/eventList'}><li className='ploggingNavMenu'>행사</li></Link>
                                    <Link to={'/reviews'}><li className='ploggingNavMenu'>후기</li></Link>
                                </ul>
                            </div>
                        </li>
                        <li className='headerMenuList'>
                            <Link to={'/shares'}>
                                <div className='headerMenuLink'>커뮤니티</div>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <ul className='userNav' >
                    {/* 알림 */}
                    <li className='userNavBox headerNotify' onClick={toggleNotiModal}><FaRegBell className='headerNotify'/>
                      {hasUnReadNotifications && <div id='notificationCount' className='headerNotify'></div>}
                    </li>

                    <li className='userNavBox' id='headerNickname'>
                        {window.location.href.indexOf('mypage') > -1 ? (
                            <a href={isCorporate ? '/corporate/mypage/profile' : '/mypage/profile'}>
                            <span className='nickName' onClick={handleRemoveCss}>{nickname}</span>
                            </a>
                        ) : (
                            <Link to={isCorporate ? '/corporate/mypage/profile' : '/mypage/profile'}>
                            <a>
                                <span className='nickName' onClick={handleRemoveCss}>{nickname}</span>
                            </a>
                            </Link>
                        )}
                        님
                    </li>
                    <li className='userNavBox'><MyButton text={"로그아웃"} type={"gray"} onClick={userLogout}></MyButton></li>
                </ul>

                <NotificationModal
                  isOpen={isNotiModalOpen}
                  closeModal={closeNotiModal}
                  setHasUnReadNotifications={setHasUnReadNotifications}/>

                <div className='toggle' onClick={toggleNav} >
                    <GiHamburgerMenu />
                </div>
           </header>
        );
    }

    return (
        <header onClick={closeToggle}>
                <Link to = {'/'}>
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
                </Link>
            <nav className={`headerNav ${showNav ? 'show' : ''}`}>
                <ul className='headerMenu'>
                    <li className='headerMenuList'>
                        <Link to = {'/accompanies'} id='ploggingMenu'>
                            <div className='headerMenuLink'>플로깅</div>
                        </Link>
                        <div className='ploggingNavContainer'>
                            <ul className='ploggingNav'>
                                <Link to={'/accompanies'}><li className='ploggingNavMenu'>모임</li></Link>
                                <Link to={'/eventList'}><li className='ploggingNavMenu'>행사</li></Link>
                                <Link to={'/reviews'}><li className='ploggingNavMenu'>후기</li></Link>
                            </ul>
                        </div>
                    </li>
                    <Link to={'/shares'}>
                        <li className='headerMenuList'>
                            <div className='headerMenuLink'>커뮤니티</div>
                        </li>
                    </Link>
                </ul>
            </nav>
            <ul className='loginNav'>
              <Link to={'/corp-login'}>
                <li className='loginBtn'><MyButton text={'기업 로그인'} type={'whiteMint'} onClick={handleRemoveCss}></MyButton></li>
              </Link>
              <li className='loginBtn'><MyButton text={'개인 로그인'} onClick={openLoginModal}></MyButton></li>
            </ul>

            <UserLoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} />

            <div className='toggle' onClick={toggleNav}>
                <GiHamburgerMenu />
            </div>
        </header>
    );
}
