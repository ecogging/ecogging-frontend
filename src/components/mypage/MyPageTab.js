import { Link } from "react-router-dom";


export default function MyPageTab() {

  // 일반로그인 마이페이지 탭
  return(
    <div className="myPageTab">
      <nav className="container_myPageTabAll">

        <ul className="container_myPageTabNav">
          <Link to={'/mypage/temp2'}>
            <li className="box_myPageTabMenu"><div className="txt_myPageTabMenu">계정 정보</div></li>
          </Link>
          <Link to={'/mypage/message'}>
            <li className="box_myPageTabMenu"><div className="txt_myPageTabMenu">쪽지함</div></li>
          </Link>

          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">플로깅</div>
            
            <ul className="box_myPloggingList">
              <Link to={'/mypage/temp2'}>
                <li className="box_myPloggingMenu"><div className="txt_myPloggingMenu">내가 모집한 플로깅</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className="box_myPloggingMenu"><div className="txt_myPloggingMenu">내가 참여한 플로깅</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className="box_myPloggingMenu"><div className="txt_myPloggingMenu">스크랩한 플로깅</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className="box_myPloggingMenu"><div className="txt_myPloggingMenu">플로깅 후기</div></li>
              </Link>
            </ul>
          </li>

          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">나의 커뮤니티</div>
            
            <ul className="box_myForumList">
              <Link to={'/mypage/temp2'}>
                <li className="box_myForumMenu"><div className="txt_myForumMenu">무료 나눔</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className="box_myForumMenu"><div className="txt_myForumMenu">경로 추천</div></li>
              </Link>
              <Link to={'/mypage/temp2'}>
                <li className="box_myForumMenu"><div className="txt_myForumMenu">스크랩</div></li>
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