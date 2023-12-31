﻿import { Link } from 'react-router-dom';

import MyButton from '../common/MyButton';
import '../../styles/user/UserSignupIntro.css';

import kakao_start from '../../assets/kakao_start.png';
import ecoggingLogo from '../../assets/ecoggingLogo.png';

import { TfiEmail }  from 'react-icons/tfi';
import useCustomModal from '../../hooks/useCustomModal';
import UserLoginModal from './UserLoginModal';

function UserSignupIntro() {
  // 모달BiCommentDetail
  const [isModalOpen, openModal, closeModal] = useCustomModal();

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

      <a href="http://localhost:8080/oauth2/authorization/kakao" alt="카카오로 시작하기">
        <img src={kakao_start} alt='kakao-start'/>
      </a>

      <p>
        이미 계정이 있으신가요? <button className='signup-login' onClick={openModal}>로그인</button>
      </p>

     <UserLoginModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default UserSignupIntro;