import { Route, Routes } from "react-router";
import Temp from "../../components/main/Temp";
import MyPageTab from "../../components/mypage/MyPageTab";

import '../../styles/mypage/MyPage.css';
import '../../styles/mypage/MyPagePlogging.css';

import RecruitPlogging from '../../components/mypage/plogging/RecruitPlogging';
import RecruitEventPlogging from '../../components/mypage/plogging/RecruitEventPlogging';
import ParticipationPlogging from '../../components/mypage/plogging/ParticipationPlogging';
import ScrapPlogging from '../../components/mypage/plogging/ScrapPlogging';

import MyPageProfile from '../../components/mypage/MyPageProfile';
import MyPageReview from "../../components/mypage/MyPageReview";
import SavePlogging from '../../components/mypage/plogging/SavePlogging';

import MyPageShare from "../../components/mypage/MyPageShare";
import MyPageRecommend from "../../components/mypage/MyPageRecommend";
import MyPageForumScrap from "../../components/mypage/MyPageForumScrap";
import MyPageMessages from "../../components/mypage/MyPageMessages";

import { getCookie } from "../../utils/CookieUtil";

export default function MyPage( {userId , setUserId } ) {

  return (
    <div className="MyPage">
      <MyPageTab userId={userId} />
      <div className="MyPageContent">
        <Routes>
          <Route path="/profile" element={<MyPageProfile />}></Route>
          <Route path="/:userId/messagerooms" element={<MyPageMessages />}></Route>

          {/* 플로깅 */}
          <Route path="/:userId/plogging/recruitPlogging" element={<RecruitPlogging/>}/>
          <Route path="/:userId/plogging/recruitEventPlogging/:page" element={<RecruitEventPlogging/>}/>
          <Route path="/:userId/plogging/participationPlogging" element={<ParticipationPlogging/>}/>
          <Route path="/:userId/plogging/scrapPlogging" element={<ScrapPlogging/>}/>
          <Route path="/:userId/reviews" element={<MyPageReview />}></Route>
          <Route path="/:userId/plogging/savePlogging" element={<SavePlogging/>}/>
          

          {/* 나의 커뮤니티 */}
          <Route path="/:userId/shares" element={<MyPageShare />}></Route>
          <Route path="/:userId/recommendations" element={<MyPageRecommend />}></Route>
          <Route path="/:userId/forumscraps" element={<MyPageForumScrap />}></Route>
        </Routes>
      </div>

    </div>
  );
}