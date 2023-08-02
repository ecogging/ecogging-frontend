import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/CookieUtil";

export default function MyPageTab({ userId }) {
  const isCorporate = getCookie('userType') === 'CORPORATE';
  const [clicked, setClicked] = useState(() => localStorage.getItem('selected'));

  const saveClickedMenu = (menu) => {
    localStorage.setItem('selected', menu); // 로컬에 클릭한 메뉴 저장
  };

  const onClicked = (e) => {
    const click = e.target; // 지금 클릭한 타겟
    const clickParentClass = e.target.parentNode.className; // 지금 클릭한 타겟의 부모클래스 이름
    const temp = 'box_myPageTabMenuTitle'; // 플로깅, 나의 커뮤니티 부모클래스 이름

    if (clicked !== click.textContent && clickParentClass !== temp) {
      // 이전 선택 메뉴와 현재 클릭한 메뉴가 다르고, 플로깅이나 나의 커뮤니티를 클릭하지 않았으면
      const prevClicked = document.querySelector('.box_myPageTabMenu_clicked');
      if (prevClicked) {
        prevClicked.classList.remove('box_myPageTabMenu_clicked');
      }
    }

    if (clickParentClass !== temp) {
      // 플로깅, 나의 커뮤니티를 클릭하지 않았으면
      setClicked(click.textContent);
      saveClickedMenu(click.textContent); // 로컬에 저장
    }
  };

  
  
  // 일반로그인 마이페이지 탭
  if (!isCorporate) {
    return(
      <div className="myPageTab">

        <nav className="container_myPageTabAll">

        <ul className="container_myPageTabNav" onClick={onClicked}>
          <Link to={'/mypage/profile'} className="link_myPageTabMenu">
            <li className={clicked === '계정 정보' ? 'box_myPageTabMenu_clicked' : 'box_myPageTabMenu'}><div className="txt_myPageTabMenu">계정 정보</div></li>
          </Link>
          <Link to={`/mypage/${userId}/messagerooms`} className="link_myPageTabMenu">
            <li className={clicked === '쪽지함' ? 'box_myPageTabMenu_clicked' : 'box_myPageTabMenu'}><div className="txt_myPageTabMenu">쪽지함</div></li>
          </Link>

          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">플로깅</div>
            <ul className="box_myPloggingList">

              <Link to={`/mypage/${userId}/plogging/recruitPlogging/1`} className="link_myPageTabMenu">
                <li className={clicked === '내가 모집한 플로깅' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">내가 모집한 플로깅</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/participationPlogging/1`} className="link_myPageTabMenu">
                <li className={clicked === '내가 참여한 플로깅' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">내가 참여한 플로깅</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/scrapPlogging/1`} className="link_myPageTabMenu">
                <li className={clicked === '스크랩한 플로깅' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">스크랩한 플로깅</div></li>
              </Link>
              <Link to={`/mypage/${userId}/reviews/1`} className="link_myPageTabMenu">
                  <li className={clicked === '플로깅 후기' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">플로깅 후기</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/savePlogging/1`} className="link_myPageTabMenu">
                <li className={clicked === '임시저장함' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">임시저장함</div></li>
              </Link>
            </ul>
          </li>
          <li className="box_myPageTabMenuTitle">
              <div className="txt_myPageTabMenu">나의 커뮤니티</div>
              
              <ul className="box_myForumList" onClick={onClicked}>
                <Link to={`/mypage/${userId}/shares`} className="link_myPageTabMenu">
                  <li className={clicked === '무료 나눔' ? 'box_myForumMenu_clicked' : 'box_myForumMenu'}><div className="txt_myForumMenu">무료 나눔</div></li>
                </Link>
                <Link to={`/mypage/${userId}/recommendations`} className="link_myPageTabMenu">
                  <li className={clicked === '경로 추천' ? 'box_myForumMenu_clicked' : 'box_myForumMenu'}><div className="txt_myForumMenu">경로 추천</div></li>
                </Link>
                <Link to={`/mypage/${userId}/forumscraps`} className="link_myPageTabMenu">
                  <li className={clicked === '스크랩' ? 'box_myForumMenu_clicked' : 'box_myForumMenu'}><div className="txt_myForumMenu">스크랩</div></li>
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

      <nav className="container_myPageTabAll">

        <ul className="container_myPageTabNav" onClick={onClicked}>
          <Link to={'/mypage/profile'} className="link_myPageTabMenu">
            <li className={clicked === '계정 정보' ? 'box_myPageTabMenu_clicked' : 'box_myPageTabMenu'}><div className="txt_myPageTabMenu">계정 정보</div></li>
          </Link>

          <li className="box_myPageTabMenuTitle">
            <ul className="box_myPloggingList">
              <Link to={`/mypage/${userId}/plogging/correcruitPlogging/1`} className="link_myPageTabMenu">
                <li className={clicked === '작성한 게시글' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">작성한 게시글</div></li>
              </Link>
              <Link to={`/mypage/${userId}/plogging/savePlogging/1`} className="link_myPageTabMenu">
                <li className={clicked === '임시저장함' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">임시저장함</div></li>
              </Link>
            </ul>
          </li>

        </ul>

      </nav>
    </div>
    );
  } 

}