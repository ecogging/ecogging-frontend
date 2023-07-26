import '../../styles/main/MainHome.css';
import mainBackground from '../../assets/mainBackground.mp4';

export default function MainHome() {
  return(
    <div className='mainContainer'>
      <video className='mainVideo' src={mainBackground} muted autoPlay loop></video>
      <div className='mainWrap'></div>
      <div className='mainWelcome'>
        <div className='mainWelcomeEng'>
          Find Plogging Partners
        </div>
        <div className='mainWelcomeKo'>
          함께 <span className='ploggingNote'>플로깅</span>하세요 !
        </div>
      </div>
    </div>
  );
}