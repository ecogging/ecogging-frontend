import '../../styles/main/MainEvents.css';
import posterTemp from '../../assets/poster.png';

export default function MainEvents() {

  const printTarget = (e) => {
    alert(e.target.className);
  }

  return(
    <div className='container_mainEvents' onClick={printTarget}>
      <div className='container_mainEvents_part'>
        <div className='container_title'>
          <div className='box_title'>UPCOMING EVENTS</div>
        </div>

        {/* 카드 */}
        <div className='container_EventsCards'>

          <div className='box_EventsCards'>
            <div className='cover_EventsCard'>
              <div className='container_EventsCardCoverText'>
                <div className='box_EventsCard_title'>행사 제목</div>
                <div className='box_EventsCard_date'>행사 날짜</div>
                <div className='box_EventsCard_writer'>행사 주관처</div>
              </div>
            </div>

            <div className='card_EventsWhole'>
              <img src={posterTemp} className='img_poster_source' />
            </div>
          
          </div>
        </div>


      </div>
    </div>
  );
}