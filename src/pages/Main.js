import '../styles/common/Main.css';
import '../styles/common/Header.css';
import '../styles/common/Footer.css';
import '../styles/common/MyButton.css';
import Header from '../components/common/Header';
import Content from '../components/main/Content';
import Footer from '../components/common/Footer';


function Main() {
  return (
    <div className='Main'>
      <Header />
      {/* <Content />
      <Footer /> */}
    </div>
  );
}

export default Main;
