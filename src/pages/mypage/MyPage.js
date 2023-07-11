import { Route, Routes } from "react-router";
import Temp from "../../components/main/Temp";
import MyPageTab from "../../components/mypage/MyPageTab";
import '../../styles/mypage/MyPage.css';
import Message from "./Message";
import MyPageReview from "../../components/mypage/MyPageReview";
import MyPageShare from "../../components/mypage/MyPageShare";
import MyPageRecommend from "../../components/mypage/MyPageRecommend";

export default function MyPage() {
  return (
    <div className="MyPage">
      <MyPageTab />
      <div className="MyPageContent">
        <Routes>
          <Route path="/temp2" element={<Temp />}></Route>
          <Route path="/message" element={<Message />}></Route>


          {/* 나의 커뮤니티 */}
          <Route path="/reviews" element={<MyPageReview />}></Route>
          <Route path="/shares" element={<MyPageShare />}></Route>
          <Route path="/recommendations" element={<MyPageRecommend />}></Route>
        </Routes>
      </div>

    </div>
  );
}