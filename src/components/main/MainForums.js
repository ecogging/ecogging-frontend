import '../../styles/main/MainForums.css';
import tempPic from '../../assets/temp.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
// import { getFormSubmissionInfo } from 'react-router-dom';

export default function MainForums() {


  const [forums, setForums] = useState(null);
  const url = '/main/forums';
  useEffect(() => {   
    axios.get(url)
    .then((res) => {
      setForums(res.data.data);
    })
    .catch((err) => {
      console.log('포럼 불러오기 실패', err);
    });
  }, []);


  return(
    <div className='container_mainForum'>



      <div className='container_part_mainForum'>
        <div className='container_title'>
          <div className='box_title'>ENJOY COMMUNITY</div>
        </div>

          {forums && forums.map((item, idx) => (
            
            <div className='container_mainFormsCards' key={item.forumId}>
              <div className='temp'>
                <div className='container_forumsCardTop'>
                  <div className='box_forumsCardClassify'>{item.type}</div>
                  <div className='box_forumsCardViews'>조회수 {item.views}</div>
                </div>

                <div className='container_forumsCardMiddle'>
                  
                { (item.type) === '경로' ? (
                      <Link to={`http://localhost:8080/routeInfo/${item.forumId}`}>
                        <div className='box_forumsCardTitle'>{item.title}</div>
                        <div className='box_forumsCardContent'>{item.content}</div>
                      </Link>
                    ) : (
                      <Link to={`http://localhost:8080/shareInfo/${item.forumId}`}>
                        <div className='box_forumsCardTitle'>{item.title}</div>
                        <div className='box_forumsCardContent'>{item.content}</div>
                      </Link>
                    )}

                  <div className='box_forumsCardNickAndTime'>
                    <div className='box_forumsCardWriter'>{item.writerNickname}</div>
                    <div className='box_forumsCardWriteTime'>{moment(item.createdAt).format('YY.MM.D h:mm a')}</div>
                  </div>
                </div>

                <div className='container_forumsCardBottom'>
                  <div className='box_forumsCardImg'></div>
                </div>
              </div>
            </div>
             

          ))}   

      </div>
    </div>
  );
}