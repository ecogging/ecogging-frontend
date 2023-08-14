import '../../styles/main/MainForums.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';
import moment from 'moment';

export default function MainForums() {

  const [view, setView] = useState(false);
  const [forums, setForums] = useState(null);
  const url = '/main/forums';
  useEffect(() => {   
    axios.get(url)
    .then((res) => {
      setForums(res.data.data);
      setView(true);
    })
    .catch((err) => {
      console.log('포럼 불러오기 실패', err);
    });
  }, []);

  // 본문 내용 태그 제거
  function removeHtmlTags(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
  }


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
                      <Link to={`/routeInfo/${item.forumId}`}>
                        <div className='box_forumsCardTitle'>{item.title}</div>
                        <div className='box_forumsCardContent'>
                          {view && <Viewer initialValue={item.content} /> }
                        </div>
                      </Link>
                    ) : (
                      <Link to={`/shareInfo/${item.forumId}`}>
                        <div className='box_forumsCardTitle'>{item.title}</div>
                        <div className='box_forumsCardContent'>
                          {view && <Viewer initialValue={item.content} /> }
                        </div>
                      </Link>
                    )}

                  <div className='box_forumsCardNickAndTime'>
                    <div className='box_forumsCardWriter'>{item.writerNickname}</div>
                    <div className='box_forumsCardWriteTime'>{moment(item.createdAt).format('YY.MM.DD hh:mm a')}</div>
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