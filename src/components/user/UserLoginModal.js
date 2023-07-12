import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { Link } from 'react-router-dom';

import MyButton from '../common/MyButton';
import ecoggingLogo from '../../assets/ecoggingLogo.png';
import kakaoLoginImage from '../../assets/kakao_login_medium_wide.png'

import '../../styles/common/UserLoginModal.css'

function UserLoginModal({isOpen, setModalOpen, handleLoginSuccess}) {
    const login_url = 'http://localhost:8080/auth/login';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const modalRef = useRef(null);

    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // 로그인 request 
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.post(login_url, {
          email,
          password,
        });
  
        // Assuming the server responds with a JSON Web Token (JWT)
        const token = response.data.token;
        // Save the token to localStorage
        localStorage.setItem('token', token);
        console.log("token: " + token);

        // Decode the token
        const decodedToken = jwtDecode(token);
        // Extract the desired fields
        const userId = decodedToken.userId;
        const nickname = decodedToken.nickname;

        // Set the user info in localStorage -> 추후 redux로 변경. 지금은 안씀
        localStorage.setItem('userId', userId);
        localStorage.setItem('nickname', nickname);

        handleLoginSuccess({userId: userId, nickname: nickname});

        // Clear the form fields and any error messages
        setEmail('');
        setPassword('');
        setError('');
  
        // Close the modal
        closeModal();
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

    if (!isOpen) return null;

    return (
      <>
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
                  <Link to={'/signup-intro'} onClick={closeModal}><span> 회원가입 </span></Link>
                </div>

              <img src={kakaoLoginImage} alt='kakaoLoginImage' className='kakao-login-image'/>
                
              </div>
          </div>
        </div>
      </>
    );

}

export default UserLoginModal;