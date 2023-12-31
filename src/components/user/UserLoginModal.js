﻿import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { Link, useNavigate } from 'react-router-dom';

import { setCookie, getCookie, removeCookie } from '../../utils/CookieUtil';

import MyButton from '../common/MyButton';
import ecoggingLogo from '../../assets/ecoggingLogo.png';
import kakaoLoginImage from '../../assets/kakao_login_medium_wide.png'

import '../../styles/user/UserLoginModal.css'
import { useTheme } from 'styled-components';


function UserLoginModal({isOpen, closeModal, setIsLogin}) {
    const navigate = useNavigate();
    const loginEndPoint = 'http://localhost:8080/auth/login';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    // 모달 끄기 
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // 새로고침
    const reloading = () => {
      window.location.reload();
    };

    // 로그인 request 
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post(loginEndPoint, {
          email,
          password,
        });
  
        // Assuming the server responds with a JSON Web Token (JWT)
        const token = response.data.token;
        // Save the token to localStorage
        // localStorage.setItem('token', token);
        const tokenKeys = ['access-token', 'userId', 'nickname', 'userType', 'profileImageUrl'];
        
        for (const tokenKey of tokenKeys) {
          if (getCookie(tokenKey))
            removeCookie(tokenKey)
        }
        
        
        setCookie('access-token', token);

        // Decode the token
        const decodedToken = jwtDecode(token);
        // set userinfo in token to cooke
        setCookie('userId', decodedToken.userId)
        setCookie('nickname', decodedToken.nickname);

        const userType = response.data.userType;
        setCookie('userType', userType);

        const profileImageUrl = response.data.profileImageUrl;
        setCookie('profileImageUrl', profileImageUrl);

        // Clear the form fields and any error messages
        setEmail('');
        setPassword('');
        setError('');
  
        // Close the modal
        closeModal();

        navigate('/');
        reloading();

      } catch (error) {
        // Handle login error
        setError('Invalid email or password');
        console.log(error);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // modal on/off
    if (!isOpen) return null;

    return (
      <div className='UserLoginModal'>
        <div className="overlay" onClick={closeModal}></div>
        <div className="modal-container" ref={modalRef}>
          <div className="model-header">
              <button className="modal-close" onClick={closeModal}>
                  X
              </button>
          </div>

          <div className="modal-content">

              <img src={ecoggingLogo} alt='EcoggingLogo' className='modal-image'/>

              <div className="login-input-group">
                <div className="input-field">
                  <input type="text" value={email} onChange={handleEmailChange} placeholder="email" name="email" id="user-email" required/>
                </div>
                <div className="input-field">
                  <input type="password" value={password} onChange={handlePasswordChange} placeholder="password" name="password" id="user-password" required/>
                </div>
              </div>

              <div className="button-group">
                <MyButton text={'로그인'} onClick={handleSubmit}></MyButton>
                {error && <p className="error">{error}</p>}
                <div className="link-group">
                  <span> 아이디 찾기 </span> |
                  <span> 비밀번호 찾기 </span> |
                  <Link to={'/signup-intro'} onClick={closeModal} className='link-in-modal'><span> 회원가입 </span></Link>
                </div>

                <a href="http://localhost:8080/oauth2/authorization/kakao" alt="카카오로 시작하기">
                    <img src={kakaoLoginImage} alt='kakaoLoginImage' className='kakao-login-image'/>
                </a>
              </div>
          </div>
        </div>
      </div>
    );

}

export default UserLoginModal;