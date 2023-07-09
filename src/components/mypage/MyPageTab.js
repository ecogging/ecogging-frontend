import { useState } from "react";
import { Link } from "react-router-dom";


export default function MyPageTab() {

  const [clicked, setClicked] = useState('txt_myPageTabMenu');
  const [beforeClicked, setBeforeClicked] = useState('');

  const onClicked = (e) => {
    let clickedText = e.target.firstChild.textContent; // 선택한 메뉴 텍스트 내용
    let clickedClass = e.target.parentNode.className;
    let temp = 'box_myPageTabMenuTitle';
    console.log("clicked!!"+clickedText);
    console.log(clickedClass);    
    // 전에 선택한 항목이 존재하고, 선택했던 항목의 텍스트내용이 같지 않고, 
    // 선택한 항목의 텍스트가 플로깅, 나의 커뮤니티가 아니라면
    if (beforeClicked && beforeClicked.firstChild.textContent !== clickedText && clickedClass !== temp) { 
        beforeClicked.classList.remove('_clicked');
    }
    setBeforeClicked(e.target);
    console.log("before!!!!"+beforeClicked.firstChild.textContent);
    setClicked(clickedText);
  }

  // 일반로그인 마이페이지 탭
  return(
    <div className="myPageTab" onClick={onClicked}>
      <nav className="container_myPageTabAll">

        <ul className="container_myPageTabNav">
          <Link to={'/mypage/temp2'}>
            <li className={clicked === '계정 정보' ? 'box_myPageTabMenu_clicked' : 'box_myPageTabMenu'}><div className="txt_myPageTabMenu">계정 정보</div></li>
          </Link>
          <Link to={'/mypage/message'}>
          <li className={clicked === '쪽지함' ? 'box_myPageTabMenu_clicked' : 'box_myPageTabMenu'}><div className="txt_myPageTabMenu">쪽지함</div></li>
          </Link>

          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">플로깅</div>
            
            <ul className="box_myPloggingList">
              <Link to={'/mypage/temp2'}>
                <li className={clicked === '내가 모집한 플로깅' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">내가 모집한 플로깅</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className={clicked === '내가 참여한 플로깅' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">내가 참여한 플로깅</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className={clicked === '스크랩한 플로깅' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">스크랩한 플로깅</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className={clicked === '플로깅 후기' ? 'box_myPloggingMenu_clicked' : 'box_myPloggingMenu'}><div className="txt_myPloggingMenu">플로깅 후기</div></li>
              </Link>
            </ul>
          </li>

          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">나의 커뮤니티</div>
            
            <ul className="box_myForumList">
              <Link to={'/mypage/temp2'}>
              <li className={clicked === '무료 나눔' ? 'box_myForumMenu_clicked' : 'box_myForumMenu'}><div className="txt_myForumMenu">무료 나눔</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
              <li className={clicked === '경로 추천' ? 'box_myForumMenu_clicked' : 'box_myForumMenu'}><div className="txt_myForumMenu">경로 추천</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
              <li className={clicked === '스크랩' ? 'box_myForumMenu_clicked' : 'box_myForumMenu'}><div className="txt_myForumMenu">스크랩</div></li>
              </Link>
            </ul>
          </li>
        </ul>

      </nav>
    </div>
  );


  // 기업로그인 마이페이지 탭
  // return(
  //   <div className="myPageTab">
  //     <nav className="container_myPageTabAll">
  //       <ul className="container_myPageTabNav">
  //         <Link to={'/mypage/temp2'}>
  //           <li className="box_myPageTabMenu"><div className="txt_myPageTabMenu">계정 정보</div></li>
  //         </Link>
  //         <Link to={'/mypage/temp2'}>
  //           <li className="box_myPageTabMenu"><div className="txt_myPageTabMenu">작성한 게시글</div></li>
  //         </Link>
  //       </ul>
  //     </nav>
  //   </div>
  // );
}