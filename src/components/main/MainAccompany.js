import '../../styles/main/MainAccompany.css';
import MyButton from '../common/MyButton';
import imgTemp from '../../assets/123213.png';
import picTemp from '../../assets/444.jpg';
import { Link } from 'react-router-dom';

export default function MainAccompany() {
  return (
    <div className='mainAccompContainer'>
      <div className='accompBackground'>

        <div className='accompTitleBox'>
          <div className='accompTitle'>RECENT MATES</div>
        </div>

        <div className='accompBox'>

          <div className='accompCardBox'>
            <div className='accompCard'>

              <div className='cardTop-recruit'>
                <div className='accompRecruit'>모집중</div>
              </div>
              <div className='cardTop'>
                <div className='userPic'>
                  <img src={picTemp} className='userPicSource'/>
                </div>
              </div>

              <div className='cardbody'>
                <div className='userCardNickname'>닉네임</div>
                <Link to={"/temp"}><div className='accompCardTitle'>동행제목</div></Link>
              </div>

              <div className='cardfooter'>
                <div className='cardMapBox'>
                  <img src={imgTemp} alt='temp' className='cardMapImg'/>
                </div>
              </div>

            </div>
          </div>


          {/* 2 */}
          <div className='accompCardBox'>
            <div className='accompCard'>

              <div className='cardTop-recruit'>
                <div className='accompRecruit'>모집중</div>
              </div>
              <div className='cardTop'>
                <div className='userPic'>
                  <img src={picTemp} className='userPicSource'/>
                </div>
              </div>

              <div className='cardbody'>
                <div className='userCardNickname'>닉네임</div>
                <Link to={"/temp"}><div className='accompCardTitle'>동행제목</div></Link>
              </div>

              <div className='cardfooter'>
                <div className='cardMapBox'>
                  <img src={imgTemp} alt='temp' className='cardMapImg'/>
                </div>
              </div>

            </div>
          </div>

          {/* 3 */}
          <div className='accompCardBox'>
            <div className='accompCard'>

              <div className='cardTop-recruit'>
                <div className='accompRecruit'>모집중</div>
              </div>
              <div className='cardTop'>
                <div className='userPic'>
                  <img src={picTemp} className='userPicSource'/>
                </div>
              </div>

              <div className='cardbody'>
                <div className='userCardNickname'>닉네임</div>
                <Link to={"/temp"}><div className='accompCardTitle'>동행제목</div></Link>
              </div>

              <div className='cardfooter'>
                <div className='cardMapBox'>
                  <img src={imgTemp} alt='temp' className='cardMapImg'/>
                </div>
              </div>

            </div>
          </div>




        </div>
      </div>
    </div>

    
  );
}