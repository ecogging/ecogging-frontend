import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import '../../styles/user/UserSignup.css';
import MyButton from '../common/MyButton';

const UserSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [telephone, setTelephone] = useState('');
  const [telephoneAuthText, setTelephoneAuthText] = useState('');
  const [error, setError] = useState('');
  const [isPasswordReEnteredMessage, setIsPasswordReEnteredMessage] = useState('');

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeOption1, setAgreeOption1] = useState(false);
  const [agreeOption2, setAgreeOption2] = useState(false);
  const [agreeOption3, setAgreeOption3] = useState(false);

  const handleAgreeAllChange = (e) => {
    const checked = e.target.checked;
    setAgreeAll(checked);
    setAgreeOption1(checked);
    setAgreeOption2(checked);
    setAgreeOption3(checked);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleReEnteredPasswordChange = (event) => {
    setReEnteredPassword(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleTelephoneChange = (event) => {
    setTelephone(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };
  const handleTelephoneAuthTextChange = (event) => {
    setTelephoneAuthText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        email,
        password,
        nickname,
        telephone,
        birthdate,
      });

      // Handle successful signup

      // Clear the form fields and any error messages
      setEmail('');
      setPassword('');
      setReEnteredPassword('');
      setNickname('');
      setTelephone('');
      setTelephoneAuthText('');
      setBirthdate('');
      setError('');
      // Redirect to the main page
      alert('회원가입에 성공하였습니다.');
      navigate('/');
    } catch (error) {
      // Handle signup error
      setError('회원가입에 실패하였습니다.');
    }
  };

  return (
    <div className='UserSignup'>
      <h1>회원가입</h1>
      <div className="input-wrapper">
        {/* 이메일 */}
        <div className='input-section'>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        {/* 비밀번호 */}
        <div className='input-section'>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          <input
            type="password"
            id="reenteredPassword"
            value={reEnteredPassword}
            onChange={handleReEnteredPasswordChange}
            placeholder='비밀번호 재 입력'
          />
        </div>
        {/* 닉네임 */}
        <div className='input-section'>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" value={nickname} onChange={handleNicknameChange} />
        </div>
        {/* 핸드폰번호 */}
        <div className='input-section'>
          <label htmlFor="telephone">휴대폰 번호</label>
          <div id='telephone-input-section'>
            <input type="text" id="telephone" value={telephone} onChange={handleTelephoneChange} />
            <MyButton text={'인증번호 요청'} id="request-tel-auth"></MyButton>
          </div>
    
          <input
            type="text"
            id="telephoneAuthText"
            value={telephoneAuthText}
            onChange={handleTelephoneAuthTextChange}
            placeholder='인증번호 입력'
          />
        </div>
        {/* 생년월일 */}
        <div className='input-section'>
          <label htmlFor="birthdate">생년월일</label>
          <input type="date" id="birthdate" value={birthdate} onChange={handleBirthdateChange} />
        </div>
      </div>

      {/* 이용약관 동의 */}
      <div className='policies'>
        <div className="checkboxOptionSection">
          <input type="checkbox" id="agreeAll" checked={agreeAll} onChange={handleAgreeAllChange} />
          <label htmlFor="agreeAll">이용약관 전체 동의</label>
        </div>
        <hr />
        <div className="checkboxOptionSection">
          <input
            type="checkbox"
            id="agreeOption1"
            checked={agreeOption1}
            onChange={(e) => setAgreeOption1(e.target.checked)}
          />
          <label htmlFor="agreeOption1">(필수) 서비스 약관 이용 동의</label>
        </div>
        <div className="checkboxOptionSection">
          <input
            type="checkbox"
            id="agreeOption2"
            checked={agreeOption2}
            onChange={(e) => setAgreeOption2(e.target.checked)}
          />
          <label htmlFor="agreeOption2">(필수) 개인정보 처리 방침 동의</label>
        </div>
        <div className="checkboxOptionSection">
          <input
            type="checkbox"
            id="agreeOption3"
            checked={agreeOption3}
            onChange={(e) => setAgreeOption3(e.target.checked)}
          />
          <label htmlFor="agreeOption3">(선택) 마케팅 정보 활용 동의</label>
        </div>
      </div>
      <MyButton onClick={handleSubmit} text={'가입하기'} type={'mintWide'}></MyButton>
    </div>
  );
};

export default UserSignup;
