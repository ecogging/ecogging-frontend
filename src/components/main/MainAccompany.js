import '../../styles/main/MainAccompany.css';
import imgTemp from '../../assets/123213.png';
import picTemp from '../../assets/cat.png';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function MainAccompany() {

  // 데이터 연결 후 수정
  // const [accomp, setAccomp] = useState([]);
  // useEffect(() => {
  //   fetch("/api/list")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAccomp(data);
  //     });
  // }, []);

  return (
    <div className='container_mainAccompany'>
      <div className='container_part_mainAccompany'>

        <div className='container_title'>
          <div className='box_title'>RECENT MATES</div>
        </div>




        <div className='container_MatesCards'>

          {/* {accomp.map((item, idx) => ( */}
          {/* <div className='box_MatesCard' key={idx}> */}
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
                {/* <div className='box_nickname'>{item.author}</div>
                <Link to={"/temp"}><div className='box_matesTitle'>{item.title}</div></Link> */}
                <div className='box_nickname'>닉네임</div>
                  <Link to={"/temp"}><div className='box_matesTitle'>제목</div></Link>
              </div>

              <div className='container_card_bottom'>
                <div className='box_map'>
                  <img src={imgTemp} alt='temp' className='img_map'/>
                </div>
              </div>

            </div>
          </div>
          {/* ))} */}



          {/* 컨트롤러연결 전까지 임시 */}
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
                  <Link to={"/temp"}><div className='box_matesTitle'>제목</div></Link>
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
                  <Link to={"/temp"}><div className='box_matesTitle'>제목</div></Link>
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