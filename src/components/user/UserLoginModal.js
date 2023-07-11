import { useEffect, useRef, useState } from 'react';

import MyButton from '../common/MyButton';
import ecoggingLogo from '../../assets/ecoggingLogo.png';
import kakaoLoginImage from '../../assets/kakao_login_medium_wide.png'


import '../../styles/common/UserLoginModal.css'

function UserLoginModal({setModalOpen}) {

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

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
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
                  <input type="text" placeholder="email" name="email" id="user-email" />
                </div>
                <div className="input-field">
                  <input type="password" placeholder="password" name="password" id="user-password" />
                </div>
              </div>

              <div className="button-group">
                <MyButton text={'로그인'}></MyButton>
                <div className="link-group">
                  <span> 아이디 찾기 </span> |
                  <span> 비밀번호 찾기 </span> |
                  <span> 회원가입 </span>
                </div>

              <img src={kakaoLoginImage} alt='kakaoLoginImage' className='kakao-login-image'/>
                
              </div>
          </div>
        </div>
    );

}

export default UserLoginModal;