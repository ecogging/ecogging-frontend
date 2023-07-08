import '../../styles/main/MainAccompany.css';
import MyButton from '../common/MyButton';
import imgTemp from '../../assets/123213.png';
import picTemp from '../../assets/cat.png';
import { Link } from 'react-router-dom';

export default function MainAccompany() {
  return (
    <div className='container_mainAccompany'>
      <div className='container_part_mainAccompany'>

        <div className='container_title'>
          <div className='box_title'>RECENT MATES</div>
        </div>




        <div className='container_MatesCards'>

          <div className='box_MatesCard'>
            <div className='card_MatesWhole'>

              <div className='container_card_top_recruit'>
                <div className='box_recruitState'>모집중</div>
              </div>
              <div className='container_card_top_pic'>
                <div className='box_pic_circle'>
                  <img src={picTemp} className='image_userPic_source'/>
                </div>
              </div>

              <div className='container_card_middle'>
                <div className='box_nickname'>닉네임</div>
                <Link to={"/temp"}><div className='box_matesTitle'>동행제목</div></Link>
              </div>

              <div className='container_card_bottom'>
                <div className='box_map'>
                  <img src={imgTemp} alt='temp' className='img_map'/>
                </div>
              </div>

            </div>
          </div>




          <div className='box_MatesCard'>
            <div className='card_MatesWhole'>

              <div className='container_card_top_recruit'>
                <div className='box_recruitState'>모집중</div>
              </div>
              <div className='container_card_top_pic'>
                <div className='box_pic_circle'>
                  <img src={picTemp} className='image_userPic_source'/>
                </div>
              </div>

              <div className='container_card_middle'>
                <div className='box_nickname'>닉네임</div>
                <Link to={"/temp"}><div className='box_matesTitle'>동행제목</div></Link>
              </div>

              <div className='container_card_bottom'>
                <div className='box_map'>
                  <img src={imgTemp} alt='temp' className='img_map'/>
                </div>
              </div>

            </div>
          </div>
          <div className='box_MatesCard'>
            <div className='card_MatesWhole'>

              <div className='container_card_top_recruit'>
                <div className='box_recruitState'>모집중</div>
              </div>
              <div className='container_card_top_pic'>
                <div className='box_pic_circle'>
                  <img src={picTemp} className='image_userPic_source'/>
                </div>
              </div>

              <div className='container_card_middle'>
                <div className='box_nickname'>닉네임</div>
                <Link to={"/temp"}><div className='box_matesTitle'>동행제목</div></Link>
              </div>

              <div className='container_card_bottom'>
                <div className='box_map'>
                  <img src={imgTemp} alt='temp' className='img_map'/>
                </div>
              </div>

            </div>
          </div>

















        </div>
      </div>
    </div>

    
  );
}