import { Route, Routes } from "react-router";
import Temp from "../../components/main/Temp";
import MyPageTab from "../../components/mypage/MyPageTab";

import '../../styles/mypage/MyPage.css';
import '../../styles/mypage/MyPagePlogging.css';

import { getCookie } from "../../utils/CookieUtil";
import RecruitEventPlogging from '../../components/mypage/plogging/RecruitEventPlogging';
import CorpMyPageProfile from '../../components/mypage/CorpMyPageProfile';

export default function CorpMyPage() {

  return (
    <div className="MyPage">
      <MyPageTab />
      <div className="MyPageContent">
        <Routes>
          <Route path="/profile" element={<CorpMyPageProfile />}></Route>
          {/* 플로깅 */}
          <Route path="/recruit-event/:page" element={<RecruitEventPlogging/>}/>
        </Routes>
      </div>

    </div>
  );
}