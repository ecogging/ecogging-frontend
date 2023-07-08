import '../../styles/main/MainForums.css';
import tempPic from '../../assets/temp.png';
import { Link } from 'react-router-dom';

export default function MainForums() {
  return(
    <div className='container_mainForum'>
      <div className='container_part_mainForum'>

        <div className='container_title'>
          <div className='box_title'>ENJOY COMMUNITY</div>
        </div>

        <div className='container_mainFormsCards'>
          <div className='temp'>
            <div className='container_forumsCardTop'>
              <div className='box_forumsCardClassify'>말머리</div>
              <div className='box_forumsCardViews'>조회수 12</div>
            </div>
            <div className='container_forumsCardMiddle'>
              <Link to={"/temp"}>
                <div className='box_forumsCardTitle'>포럼글 제목</div>
                <div className='box_forumsCardContent'>후기 본문</div>
              </Link>
              <div className='box_forumsCardNickAndTime'>
                <div className='box_forumsCardWriter'>닉네임</div>
                <div className='box_forumsCardWriteTime'>2023.07.14 18:02</div>
              </div>
            </div>
            <div className='container_forumsCardBottom'>
              <div className='box_forumsCardImg'></div>
            </div>
          </div>
        </div>

        <div className='container_mainFormsCards'>
          <div className='temp'>
            <div className='container_forumsCardTop'>
              <div className='box_forumsCardClassify'>말머리</div>
              <div className='box_forumsCardViews'>조회수 12</div>
            </div>
            <div className='container_forumsCardMiddle'>
              <Link to={"/temp"}>
                <div className='box_forumsCardTitle'>포럼글 제목</div>
                <div className='box_forumsCardContent'>후기 본문</div>
              </Link>
              <div className='box_forumsCardNickAndTime'>
                <div className='box_forumsCardWriter'>닉네임</div>
                <div className='box_forumsCardWriteTime'>2023.07.14 18:02</div>
              </div>
            </div>
            <div className='container_forumsCardBottom'>
              <div className='box_forumsCardImg'>
                <img src={tempPic} className='img_forumsCardImgSource'/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}