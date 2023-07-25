import { useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/CookieUtil";


export default function MyPageTab( {userId} ) {

  const isCorporate = getCookie('userType') === 'CORPORATE';

  const [clicked, setClicked] = useState('계정 정보'); // 기본값 계정 정보로 시작 
  const [prev, setPrev] = useState('box_myPageTabMenu_clicked');

  const onClicked = (e) => {
    // setBeforeClicked(document.getElementsByClassName('box_myPageTabMenu_clicked')[0]); // 기본값 계정 정보
    // console.log(prev);
    // console.log(document.getElementsByClassName(prev)[0].className);

    let click = e.target; // 지금 클릭한 타겟
    let clickParentClass = e.target.parentNode.className; // 지금 클릭한 타겟의 부모클래스 이름
    let temp = 'box_myPageTabMenuTitle'; // 플로깅, 나의 커뮤니티 부모클래스 이름
    // console.log("지금 클릭한 타겟 텍스트--" + click.textContent);
    // console.log("지금 클릭한 타겟의 부모클래스--"+ clickParentClass);
    // console.log("clicked -- 전에 클릭했던 메뉴 이름 --" + clicked);

    // // 전에 선택한 항목이 존재하고, 선택했던 항목의 텍스트내용이 같지 않고, 
    // // 선택한 항목의 텍스트가 플로깅, 나의 커뮤니티가 아니라면
    // console.log("조건문 --" + clicked !== click.textContent && clickParentClass !== temp);
    if (clicked !== click.textContent && clickParentClass !== temp) { 
      document.getElementsByClassName(prev)[0].classList.remove('_clicked');
      // console.log('오나료');
    }

    // console.log("PREV : "+prev);
    // console.log(clicked);

    if (clickParentClass !== temp) { // 플로깅,나의커뮤니티를 클릭하지 않았으면
      setClicked(click.textContent);      
    } 
    setPrev(clickParentClass);

  }
  
  
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
              <Link to={`/mypage/${userId}/reviews`} className="link_myPageTabMenu">
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
            <Link to={'/corporate/mypage/profile'} className="link_myPageTabMenu">
              <li className={clicked === '계정 정보' ? 'box_myPageTabMenu_clicked' : 'box_myPageTabMenu'}><div className="txt_myPageTabMenu">계정 정보</div></li>
            </Link>
            <Link to={'/corporate/mypage/profile'} className="link_myPageTabMenu">
              <li className={clicked === '작성한 게시글' ? 'box_myPageTabMenu_clicked' : 'box_myPageTabMenu'}><div className="txt_myPageTabMenu">작성한 게시글</div></li>
            </Link>
          </ul>
        </nav>
      </div>
    );
  } 

}