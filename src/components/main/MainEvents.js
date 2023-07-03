import '../../styles/main/MainEvents.css';

export default function MainEvents() {
  return(
    <div className='mainEventsContainer'>
      <div className='eventsBackground'>

        <div className='eventsTitleBox'>
          <div className='eventsTitle'>UPCOMING EVENTS</div>
        </div>

        <div className='eventsBox'>
          <div className='eventInfo'>1</div>
          <div className='eventInfo'>2</div>
          <div className='eventInfo'>3</div>
          <div className='eventInfo'>4</div>
        </div>
      </div>
    </div>
  );
}