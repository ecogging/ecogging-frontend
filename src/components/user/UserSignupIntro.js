import { Link } from 'react-router-dom';

import MyButton from '../common/MyButton';
import '../../styles/user/UserSignupIntro.css';

import kakao_start from '../../assets/kakao_start.png';
import ecoggingLogo from '../../assets/ecoggingLogo.png';

import { TfiEmail }  from 'react-icons/tfi';
import useLoginModal from '../../hooks/useLoginModal';
import UserLoginModal from './UserLoginModal';

function UserSignupIntro() {
  // 모달
  const {isLoginModalOpen, openLoginModal, closeLoginModal} = useLoginModal();

  const emailSignupText = (
    <span className='email_signup_text'>
      <TfiEmail size="20"/>&nbsp;&nbsp;&nbsp;이메일로 회원가입
    </span>
  );

  return (
    <div className='UserSignupIntro'>
      <img src={ecoggingLogo} alt='EcoggingLogo' className='logo-image'/>

      <Link to={'/signup'}>
        <MyButton type={'whiteGray'} text={emailSignupText}></MyButton>
      </Link>
      <img src={kakao_start} alt='kakao-start'/>

      <p>
        이미 계정이 있으신가요? <button className='signup-login' onClick={openLoginModal}>로그인</button>
      </p>

     <UserLoginModal isOpen={isLoginModalOpen} closeModal={closeLoginModal} />
    </div>
  );
}

export default UserSignupIntro;