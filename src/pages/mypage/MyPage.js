import { Route, Routes } from "react-router";
import Temp from "../../components/main/Temp";
import MyPageTab from "../../components/mypage/MyPageTab";

import '../../styles/mypage/MyPage.css';
import '../../styles/mypage/MyPagePlogging.css';

import RecruitPlogging from '../../components/mypage/plogging/RecruitPlogging';
import RecruitEventPlogging from '../../components/mypage/plogging/RecruitEventPlogging';
import ParticipationPlogging from '../../components/mypage/plogging/ParticipationPlogging';
import ScrapPlogging from '../../components/mypage/plogging/ScrapPlogging';
import ScrapEventPlogging from '../../components/mypage/plogging/ScrapEventPlogging';

import MyPageProfile from '../../components/mypage/MyPageProfile';
import MyPageReview from "../../components/mypage/MyPageReview";
import SavePlogging from '../../components/mypage/plogging/SavePlogging';
import SaveEventPlogging from '../../components/mypage/plogging/SaveEventPlogging';

import MyPageShare from "../../components/mypage/MyPageShare";
import MyPageRecommend from "../../components/mypage/MyPageRecommend";
import MyPageForumScrap from "../../components/mypage/MyPageForumScrap";
import MyPageMessages from "../../components/mypage/MyPageMessages";

import { getCookie } from "../../utils/CookieUtil";
import CorRecruitPlogging from "../../components/mypage/plogging/CorRecruitPlogging";

export default function MyPage( {userId , setUserId } ) {

  return (
    <div className="MyPage">
      <MyPageTab userId={userId} />
      <div className="MyPageContent">
        <Routes>
          <Route path="/profile" element={<MyPageProfile />}></Route>
          <Route path="/:userId/messagerooms" element={<MyPageMessages />}></Route>

          {/* 플로깅 */}
          <Route path="/:userId/plogging/recruitPlogging/:page" element={<RecruitPlogging/>}/>
          <Route path="/:userId/plogging/correcruitPlogging/:page" element={<CorRecruitPlogging/>}/>
          <Route path="/:userId/plogging/recruitEventPlogging/:page" element={<RecruitEventPlogging/>}/>
          
          <Route path="/:userId/plogging/participationPlogging/:page" element={<ParticipationPlogging/>}/>

          <Route path="/:userId/plogging/scrapPlogging/:page" element={<ScrapPlogging/>}/>
          <Route path="/:userId/plogging/scrapEventPlogging/:page" element={<ScrapEventPlogging/>}/>

          <Route path="/:userId/reviews/:page" element={<MyPageReview />}></Route>

          <Route path="/:userId/plogging/savePlogging/:page" element={<SavePlogging/>}/>
          <Route path="/:userId/plogging/saveEventPlogging/:page" element={<SaveEventPlogging/>}/>
          {/* 나의 커뮤니티 */}
          <Route path="/:userId/shares" element={<MyPageShare />}></Route>
          <Route path="/:userId/recommendations" element={<MyPageRecommend />}></Route>
          <Route path="/:userId/forumscraps" element={<MyPageForumScrap />}></Route>
        </Routes>
      </div>

    </div>
  );
}