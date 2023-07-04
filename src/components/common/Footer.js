import { BsInstagram,BsYoutube } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";

export default function Footer() {
    return(
        <footer>
            <div className='footerContainer'>
                <div className='footerLeftContainer'>
                    <div className='leftInfoBox'>
                        <div className='leftTopInfo'>
                            대표 운이삭  |  사업자번호 795-82-00237<br/>
                            주소 서울특별시 강남구 테헤란로 30길 5, 7층<br/>
                            전화 02-777-7979 | 고객문의 pickupYOURLUCK@gmail.com
                        </div>
                        <br/>
                        <div className='leftBottomInfo'>
                            이용약관 <span className='personalInfo'><a href='https://www.privacy.go.kr/front/contents/cntntsView.do?contsNo=267'>개인정보처리방침</a></span><br/>
                            <span className='copyright'>Copyright ⓒ 2023 에코깅서울 All rights reserved.</span>
                        </div>
                    </div>
                </div>
                <div className='footerRightContainer'>
                    <div className='snsIcons'>
                      <a href='https://www.youtube.com/watch?v=OSrIOsk1ui4'><BsYoutube/></a>
                      <a href='https://www.facebook.com/groups/ploggingworld/'><FaSquareFacebook/></a>
                      <a href='https://www.instagram.com/niceplogging/'><BsInstagram /></a>
                    </div>
                </div>
            </div>  
        </footer>
    );
}