import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/CookieUtil";

export default function MyPageTab({ userId }) {
  const isCorporate = getCookie('userType') === 'CORPORATE';

  // 다른 경로를 통해 마이페이지로 들어올 경우 
  useEffect(() => {
    let nowPath = window.location.href;
    let links = document.getElementsByClassName('link_myPageTabMenu');
    for (let l of links) {
      if ( l.href.indexOf(nowPath) > -1 ) {
        l.firstChild.className += '_clicked';
      }
    }
  }, []);

  const handleTabMenu = (e) => {

    // 현재 url 
    let nowPath = window.location.pathname;
    // 클릭한 요소의 Link
    let nowMenu = e.target.parentNode.parentNode.href;
    if (nowMenu) {

      // 이전 선택 메뉴 CSS clicked 효과 제거
      let prevMenu = document.querySelector('[class*="_clicked"]');
      if(prevMenu) {
        const newClassName = prevMenu.className.replace('_clicked', '');
        prevMenu.className = newClassName;
      }
      // 현재 선택 메뉴 CSS clicked 효과 설정
      if(nowMenu && nowMenu.indexOf(nowPath) > -1) {
        e.target.parentNode.className += '_clicked';
      }

    }
  }

  
  
  // 일반로그인 마이페이지 탭
  if (!isCorporate) {
    return(
      <div className="myPageTab">

        <nav className="container_myPageTabAll">

        <ul className="container_myPageTabNav" onClick={handleTabMenu}>
          <Link to={'/mypage/profile'} className="link_myPageTabMenu">
            <li className='box_myPageTabMenu'><div className="txt_myPageTabMenu">계정 정보</div></li>
          </Link>
          <Link to={`/mypage/${userId}/messagerooms`} className="link_myPageTabMenu">
            <li className='box_myPageTabMenu'><div className="txt_myPageTabMenu">쪽지함</div></li>
          </Link>

          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">플로깅</div>
            <ul className="box_myPloggingList">

              <Link to={`/mypage/${userId}/plogging/recruitPlogging/1`} className="link_myPageTabMenu">
                <li className='box_myPloggingMenu'><div className="txt_myPloggingMenu">내가 모집한 플로깅</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/participationPlogging/1`} className="link_myPageTabMenu">
                <li className='box_myPloggingMenu'><div className="txt_myPloggingMenu">내가 참여한 플로깅</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/scrapPlogging/1`} className="link_myPageTabMenu">
                <li className='box_myPloggingMenu'><div className="txt_myPloggingMenu">스크랩한 플로깅</div></li>
              </Link>
              <Link to={`/mypage/${userId}/reviews/1`} className="link_myPageTabMenu">
                  <li className='box_myPloggingMenu'><div className="txt_myPloggingMenu">플로깅 후기</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/savePlogging/1`} className="link_myPageTabMenu">
                <li className='box_myPloggingMenu'><div className="txt_myPloggingMenu">임시저장함</div></li>
              </Link>
            </ul>
          </li>
          <li className="box_myPageTabMenuTitle">
              <div className="txt_myPageTabMenu">나의 커뮤니티</div>
              
              <ul className="box_myForumList">
                <Link to={`/mypage/${userId}/shares`} className="link_myPageTabMenu">
                  <li className='box_myForumMenu'><div className="txt_myForumMenu">무료 나눔</div></li>
                </Link>
                <Link to={`/mypage/${userId}/recommendations`} className="link_myPageTabMenu">
                  <li className='box_myForumMenu'><div className="txt_myForumMenu">경로 추천</div></li>
                </Link>
                <Link to={`/mypage/${userId}/forumscraps`} className="link_myPageTabMenu">
                  <li className='box_myForumMenu'><div className="txt_myForumMenu">스크랩</div></li>
                </Link> 
              </ul>
            </li>
          </ul>

        </nav>
      </div>
    );
  }

  else {

    //기업로그인 마이페이지 탭
    return(
      <div className="myPageTab">

      <nav className="container_myPageTabAll" onClick={handleTabMenu}>

        <ul className="container_myPageTabNav">
          <Link to={'/mypage/profile'} className="link_myPageTabMenu">
            <li className='box_myPageTabMenu'><div className="txt_myPageTabMenu">계정 정보</div></li>
          </Link>

          <li className="box_myPageTabMenuTitle">
            <ul className="box_myPloggingList">
              <Link to={`/mypage/${userId}/plogging/correcruitPlogging/1`} className="link_myPageTabMenu">
                <li className='box_myPloggingMenu'><div className="txt_myPloggingMenu">작성한 게시글</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/savePlogging/1`} className="link_myPageTabMenu">
                <li className='box_myPloggingMenu'><div className="txt_myPloggingMenu">임시저장함</div></li>
              </Link>
            </ul>
          </li>

        </ul>

      </nav>
    </div>
    );
  }
}