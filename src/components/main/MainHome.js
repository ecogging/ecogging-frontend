import '../../styles/main/MainHome.css';
import mainBackground from '../../assets/mainBackground.mp4';

export default function MainHome() {
  return(
    <div className='mainContainer'>
      <video src={mainBackground} muted autoPlay loop></video>
      <div className='wrap'></div>
    </div>
  );
}