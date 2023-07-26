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
  removeCookie('access-token');
  removeCookie('userId');
  removeCookie('nickname');
  removeCookie('userType');
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
        if(e.target.className !== 'headerMenu' && e.target.className !== 'ploggingNav' && e.target.className !== ''){
            if(showNav === true) {
                setShowNav(!showNav);
            }
        }
        const menuText = e.target.className;

        if (menuText === 'headerMenuLink' || menuText === 'mainLogo' || menuText == 'ploggingNavMenu' || menuText == 'MyButton MyButton_gray') {
          localStorage.setItem('selected', "계정 정보");
          setInMenu(''); 
        } else {
          setInMenu(menuText);
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

    

    useEffect(() => {
      setNickname(getCookie('nickname'));
      setIsCorporate(isCorporateUser);
    },[])

    if(isLogin){
        return (
            <header className='header' onClick={closeToggle} >
                <Link to = {'/'}>
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo' onClick={clickMenu} />
                </Link>
                <nav className={`headerNav ${showNav ? 'show' : ''}`}>
                    <ul className='headerMenu'>
                        <li className='headerMenuList'>
                            <Link to = {'/accompanies'} id='ploggingMenu' onClick={clickMenu} >
                                <div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu === '플로깅' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>플로깅</div>
                            </Link>
                            <div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu=='플로깅' ? 'ploggingNavContainer_clicked' : 'ploggingNavContainer'}>
                                <ul className='ploggingNav' >
                                    <Link to={'/accompanies'}><li className={ inMenu=='플로깅'  || inMenu === '모임' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'} onClick={clickMenu}>모임</li></Link>
                                    <Link to={'/eventList'}><li className={inMenu === '행사' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'} onClick={clickMenu}>행사</li></Link>
                                    <Link to={'/reviews'}><li className={inMenu === '후기' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'} onClick={clickMenu}>후기</li></Link>
                                </ul>
                            </div>
                        </li>
                        <Link to={'/shares'}>
                            <li className='headerMenuList' onClick={clickMenu} >
                                <div className={inMenu === '커뮤니티' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>커뮤니티</div>
                            </li>
                        </Link>
                    </ul>
                </nav>
                <ul className='userNav' >
                    {/* 알림 */}
                    <li className='userNavBox headerNotify' onClick={toggleNotiModal}><FaRegBell className='headerNotify'/>
                      {hasUnReadNotifications && <div id='notificationCount' className='headerNotify'></div>}
                    </li>
                    <li className='userNavBox' id='headerNickname'>
                      <Link to={ isCorporate ? '/corporate/mypage/profile' : '/mypage/profile'}>
                        <span className='nickName' onClick={clickMenu} >{nickname}</span>
                      </Link> 님
                    </li>
                    <li className='userNavBox' onClick={clickMenu} ><MyButton text={"로그아웃"} type={"gray"} onClick={userLogout}></MyButton></li>
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
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo' onClick={clickMenu} />
                </Link>
            <nav className={`headerNav ${showNav ? 'show' : ''}`}>
                <ul className='headerMenu'>
                    <li className='headerMenuList'>
                        <Link to = {'/accompanies'} id='ploggingMenu' onClick={clickMenu}>
                            <div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu === '플로깅' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>플로깅</div>
                        </Link>
                        <div className={inMenu === '모임' || inMenu === '행사' ||inMenu === '후기' || inMenu=='플로깅' ? 'ploggingNavContainer_clicked' : 'ploggingNavContainer'}>
                            <ul className='ploggingNav'>
                                <Link to={'/accompanies'}><li className={ inMenu=='플로깅'  || inMenu === '모임' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'} onClick={clickMenu}>모임</li></Link>
                                <Link to={'/eventList'}><li className={inMenu === '행사' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'} onClick={clickMenu}>행사</li></Link>
                                <Link to={'/reviews'}><li className={inMenu === '후기' ? 'ploggingNavMenu_clicked' : 'ploggingNavMenu'} onClick={clickMenu}>후기</li></Link>
                            </ul>
                        </div>
                    </li>
                    <Link to={'/shares'}>
                        <li className='headerMenuList' onClick={clickMenu}>
                            <div className={inMenu === '커뮤니티' ? 'headerMenuLink_clicked' : 'headerMenuLink'}>커뮤니티</div>
                        </li>
                    </Link>
                </ul>
            </nav>
            <ul className='loginNav' onClick={clickMenu}>
              <Link to={'/corp-login'}>
                <li className='loginBtn'><MyButton text={'기업 로그인'} type={'whiteMint'}></MyButton></li>
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