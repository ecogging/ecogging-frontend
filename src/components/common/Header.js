import React, { useState } from 'react';
import styled from 'styled-components';
import MyButton from './MyButton';
import ecoggingLogo from '../../assets/ecoggingLogo.png';
import { RxHamburgerMenu, RxBell } from 'react-icons/rx';
import { Link } from 'react-router-dom';

export default function Header() {

    // styled-components로 선언한 component 안 768px이하 화면에서 nav-menu가 coulmn, 버튼 show
    const MainHeader = styled.header`
        .menuToggleBtn {
            display:none;
        }

        @media screen and (max-width:768px) {
            flex-direction:column;
            align-items: flex-start;
            .menuToggleBtn {
                display:block;
            }
        }
    `;

    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
    };


        // return (
        //     <MainHeader>
        //         <div className='logoBox'>
        //             <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
        //         </div>
        //         <div className='mainNav'>
        //             <ul className='outsideNav'>
        //                 <li className='outsideNavMenu'><a href='#' className='outsideNavA' id='navPlogging'>플로깅</a></li>
        //                 <div className='insideNavBox'>
        //                         <ul className='insideNav'>
        //                             <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>모임</a></li>
        //                             <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>행사</a></li>
        //                             <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>후기</a></li>
        //                         </ul>
        //                     </div>
        //                 <li className='outsideNavMenu'><a href='#' className='outsideNavA' id='navForum'>커뮤니티</a></li>
        //             </ul>
        //         </div>
        //         <ul className='userNav'>
        //             <li><RxBell /></li>
        //             <li><a href='#' className='userNickname'>닉네임 님</a></li>
        //             <li><MyButton text={'로그아웃'} onClick={()=>alert('로그아웃!')} type={'gray'}/></li>
        //         </ul>
        //         <div className='menuToggleBtn'><RxHamburgerMenu /></div>
        //     </MainHeader>   
        // );


    return (
        <MainHeader>
            <div className='logoBox'>
                <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
            </div>
            <div className='mainNav'>
                <ul className='outsideNav'>
                    <li className='outsideNavMenu'><a href='#' className='outsideNavA' id='navPlogging'>플로깅</a></li>
                      <div className='insideNavBox'>
                            <ul className='insideNav'>
                                <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>모임</a></li>
                                <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>행사</a></li>
                                <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>후기</a></li>
                            </ul>
                        </div>
                    <li className='outsideNavMenu'><a href='#' className='outsideNavA' id='navForum'>커뮤니티</a></li>
                </ul>
            </div>
            <ul className='loginNav'>
                <li className='loginMenu'><MyButton text={'기업 로그인'} onClick={()=>alert('기업 로그인!')} type={'whiteMint'}/></li>
                <li className='loginMenu'><MyButton text={'로그인'} onClick={()=>alert('개인 로그인!')} type={'mint'}/></li>
            </ul>
            <div className='menuToggleBtn'><RxHamburgerMenu /></div>
        </MainHeader>       
    );
}
