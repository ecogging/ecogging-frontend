

export default function MyPageTab() {
  return(
    <div className="myPageTab">
      <nav className="container_myPageTabAll">
        <ul className="container_myPageTabNav">
          <li className="box_myPageTabMenu"><div className="txt_myPageTabMenu">계정 정보</div></li>
          <li className="box_myPageTabMenu"><div className="txt_myPageTabMenu">쪽지함</div></li>
          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">플로깅</div>
            <ul className="box_myPloggingList">
              <li className="box_myPloggingMenu"><div className="txt_myPloggingMenu">내가 모집한 플로깅</div></li>
              <li className="box_myPloggingMenu"><div className="txt_myPloggingMenu">내가 참여한 플로깅</div></li>
              <li className="box_myPloggingMenu"><div className="txt_myPloggingMenu">스크랩한 플로깅</div></li>
            </ul>
          </li>
          <li className="box_myPageTabMenuTitle">
            <div className="txt_myPageTabMenu">나의 커뮤니티</div>
            <ul className="box_myForumList">
              <li className="box_myForumMenu"><div className="txt_myForumMenu">동행 후기</div></li>
              <li className="box_myForumMenu"><div className="txt_myForumMenu">무료 나눔</div></li>
              <li className="box_myForumMenu"><div className="txt_myForumMenu">경로 추천</div></li>
              <li className="box_myForumMenu"><div className="txt_myForumMenu">스크랩</div></li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}