import { BiCalendarCheck } from "react-icons/bi";
import '../../styles/main/MainEvents.css';
import posterTemp from '../../assets/poster.png';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../utils/CookieUtil";

export default function MainEvents() {
  const [evts, setEvts] = useState(null);

  // 행사 최신글 4개 불러오기
  const url = '/main/events';
  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setEvts(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log('행사 불러오기 실패', err);
      });
  }, []);


  return(
    <div className='container_mainEvents'>
      <div className='container_mainEvents_part'>
        <div className='container_title'>
          <div className='box_title'>NEW EVENTS</div>
        </div>

        {/* 카드 */}
        <div className='container_EventsCards'>

        {evts && evts.map((item, idx) => (
          
            
          <Link to={`/eventDetail/${item.evtid}`} >
            <div className='box_EventsCards' key={item.evtId}>
                
                <div className='cover_EventsCard'>

                  <div className='container_EventsCardCoverText'>
                    
                    <div className="cont_EventsCardCoverTop">
                      { (item.active) ?  <div className="box_EventsCard_state_ing">진행중</div>
                      :  <div className="box_EventsCard_state_fin">마감</div>}
                    </div>

                    <div className="cont_EventsCardCoverMiddle">
                      <div className='box_EventsCard_title'>
                          {(item.evtTitle.length>10) ? item.evtTitle.substring(0,8)+'...' : item.evtTitle}
                      </div>
                      <div className='box_EventsCard_date'><BiCalendarCheck className="icon_eventsDate"/>{item.evtStartDate} ~ {item.evtEndDate}</div>
                      <div className='box_EventsCard_writer'>{item.nickname}</div>
                    </div>

                    <div className="cont_EventsCardCoverBottom">
                      <div className="box_EventsCard_location">{item.evtLocation}</div>
                    </div>

                  </div>
                </div>

                <div className='card_EventsWhole'>
                    {item.filePath ? (
                      <img src={`http://localhost:8080/eventImg/${item.fileId}`} className='img_poster_source' />
                    ) : (
                      <img src={posterTemp} className='img_poster_source' />
                    )}
                </div>
            
            </div>
          </Link>



        ))}

        </div>


      </div>
    </div>
  );
}