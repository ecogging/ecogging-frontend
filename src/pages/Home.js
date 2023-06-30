import '../styles/common/Home.css';
import '../styles/common/Footer.css';
import '../styles/common/MyButton.css';
import Header2 from '../components/common/Header2';
import Content from '../components/main/Content';
import Footer from '../components/common/Footer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './Main';


export default function Home() {
  return (
    <BrowserRouter>
        <div className='Home'>
          <Header2 />
            {/* <Content />
            <Footer /> */}

          <Routes>
            <Route path="/main" element={ <Main /> } />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

