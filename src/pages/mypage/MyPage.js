import { Route, Routes } from "react-router";
import Temp from "../../components/main/Temp";
import MyPageTab from "../../components/mypage/MyPageTab";
import '../../styles/mypage/MyPage.css';
import Message from "./Message";
import MyPageReview from "../../components/mypage/MyPageReview";

export default function MyPage() {
  return (
    <div className="MyPage">
      <MyPageTab />
      <div className="MyPageContent">
        <Routes>
          <Route path="/temp2" element={<Temp />}></Route>
          <Route path="/message" element={<Message />}></Route>

          <Route path="/reviews" element={<MyPageReview />}></Route>
        </Routes>
      </div>

    </div>
  );
}