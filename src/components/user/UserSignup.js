import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import '../../styles/user/UserSignup.css';
import MyButton from '../common/MyButton';
import { isValidAxiosResponse } from '../../utils/CustomUtil';
import { message } from 'antd';

const UserSignup = () => {
  const navigate = useNavigate();

  // Form Input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [telephone, setTelephone] = useState('');
  // Form validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reEnteredPasswordError, setReEnteredPasswordError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  // Form validation - success
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [reEnteredPasswordSuccess, setReEnteredPasswordSuccess] = useState(false);
  const [nicknameSuccess, setNicknameSuccess] = useState(false);
  
  const [telephoneError, setTelephoneError] = useState(false);
  // email form validation & auth
  const [emailAuthMessage, setEmailAuthMessage] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false); // 이메일 형식
  const [emailAuthRequested, setEmailAuthRequested] = useState(false); // 인증번호전송 클릭여부
  const [emailAuthNumber, setEmailAuthNumber] = useState('')
  const [emailAuthConfirmRequested, setEmailAuthConfirmRequested] = useState(false); // 인증번호확인 클릭여부
  const [emailAuthConfirmed, setEmailAuthConfirmed] = useState(false); // 인증완료 여부
  const [emailAuthConfirmMessage, setEmailAuthConfirmMessage] = useState('');

  // Polich Check
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeOption1, setAgreeOption1] = useState(false);
  const [agreeOption2, setAgreeOption2] = useState(false);
  const [agreeOption3, setAgreeOption3] = useState(false);

  const [commonError, setCommonError] = useState('');


  const handleAgreeAllChange = (e) => {
    const checked = e.target.checked;
    setAgreeAll(checked);
    setAgreeOption1(checked);
    setAgreeOption2(checked);
    setAgreeOption3(checked);
  };

  // email auth
  const isValidEmail = (email) => {
    // Email validation regular expression
    // (@아닌공백아닌문자여러개) @ (@아닌공백아닌문자여러개) . (@아닌공백아닌문자여러개)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return emailRegex.test(email);
  }
  
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError('유효한 이메일 형식이 아닙니다.');
      setEmailSuccess(false);
    } else {
      setEmailError('');
      setEmailSuccess(true);
      setEmailAuthMessage('적합한 이메일 형식입니다.');
    }
  };

  const handleEmailAuthRequestClick = (email) => {
    axios.post('http://localhost:8080/auth/email-duplicated', {
          email
    }).then(response => {
      console.log('11')
      const {isValid, message} = response.data;
      // 버튼 클릭 막음
      if (!isValidAxiosResponse(response)) {
        console.log("empty response")
        return;
      }

      if (!isValidRequestingEmailAuth(isValid, message)) {
        return;
      }

      showEmailAuthNumberInputForm(email);
    })
    .catch(error => {
      console.error(error);
      alert('네트워크 오류 - 잠시 후 다시 시도하세요.');
    });
  }

  const showEmailAuthNumberInputForm = (email) => {

    setEmailAuthRequested(true);
    setEmailAuthMessage('인증번호가 발송되었습니다.')
    axios.post('http://localhost:8080/auth/email-auth-send', {
          email
    }).then(response => {
      
    })
    .catch(error => {
      console.error(error);
    });
  }

  const isValidRequestingEmailAuth = (isValid, message) => {
    if (emailError) {
      alert('유효한 이메일 형식이 아닙니다.');
      return false;
    }

    if (!isValid) {
      alert(message);
      return false;
    }

    return true;
  }

  const handleEmailAuthNumberChange = (event) => {
    const { value } = event.target;
    setEmailAuthNumber(value);
  }

  const handleEmailAuthConfirmClick = () => {
    setEmailAuthConfirmRequested(true);
    const authNumber = emailAuthNumber;
    axios.post('http://localhost:8080/auth/email-auth-confirm', {
          authNumber
    }).then(response => {
      const isConfirmed = response.data;
      if (isConfirmed) {
        setEmailAuthConfirmed(true);
        setEmailAuthConfirmMessage("인증에 성공하였습니다.");
      } else {
        setEmailAuthConfirmed(false);
        setEmailAuthConfirmMessage("인증에 실패하였습니다.");
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  // password auth
  const isValidPassword = (password) => {
    return password.length > 5 && password.length < 17;
  }

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(event.target.value);
    setReEnteredPassword('');
    if (!isValidPassword(value)) {
      setPasswordError('사용 불가능한 패스워드 입니다.')
      setPasswordSuccess(false);
    } else {
      setPasswordError('');
      setPasswordSuccess(true);
    }
  };

  const handleReEnteredPasswordChange = (event) => {
    const { value } = event.target;
    setReEnteredPassword(event.target.value);
    if (value !== password) {
      setReEnteredPasswordError('패스워드가 일치하지 않습니다.')
      setReEnteredPasswordSuccess(false);
    } else {
      setReEnteredPasswordError('');
      setReEnteredPasswordSuccess(true);
    }
  };

  const isValidNickname = (nickname) => {
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,6}$/;
    return nicknameRegex.test(nickname);
  }

  const handleNicknameChange = (event) => {
    const { value } = event.target;
    setNickname(event.target.value);
    if (!isValidNickname(value)) {
      setNicknameError('올바른 닉네임 형식이 아닙니다.')
      setNicknameSuccess(false);
    } else {
      setNicknameError('');
      setNicknameSuccess(true);
    }
  };

  const isValidTelephone = (telephone) => {
    return telephone.length >= 10;
  }

  const handleTelephoneChange = (event) => {
    const input = event.target.value;
    const telephone = input.replace(/\D/g, ""); // Remove all non-numeric characters

    setTelephone(telephone);
    if (!isValidTelephone(telephone)) {
      setTelephoneError('최소 10자 이상이어야 합니다.');
    } else {
      setTelephoneError('');
    }
  };

  const allRequirementSatisfied = () => {
    if (!emailAuthConfirmed) {
      alert("이메일 인증이 필요합니다.")
      return false;
    }  
    if (!(passwordSuccess && reEnteredPasswordSuccess)) {
      alert("비밀번호를 다시 확인해주세요.")
      return false;
    }
    if (!nicknameSuccess) {
      alert("닉네임을 다시 확인해주세요.")
      return false;
    } 
    if (telephoneError) {
      alert("휴대폰 번호를 다시 확인해주세요.");
      return false;
    } 
    if (!agreeOption1 || !agreeOption2) {
      alert('필수 이용약관 동의가 이뤄지지 않았습니다.');
      return false;
    } 
    
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!allRequirementSatisfied())
      return;

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        email,
        password,
        nickname,
        telephone
      });

      // Handle successful signup

      // Clear the form fields and any error messages
      setEmail('');
      setEmailAuthNumber('');
      setPassword('');
      setReEnteredPassword('');
      setNickname('');
      setTelephone('');
      setCommonError('');
      // Redirect to the main page
      alert('회원가입에 성공하였습니다.');
      navigate('/');
    } catch (error) {
      // Handle signup error
      setCommonError('회원가입에 실패하였습니다.');
    }
  };

  return (
    <div className='UserSignup'>
      <h1>회원가입</h1>
      <div className="input-wrapper">
        {/* 이메일 */}
        <div className='input-section'>
          <label htmlFor="email">이메일</label>
          <div className='email-input-section'>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required/>
            <MyButton text={emailAuthRequested ? '인증번호 재요청' : '인증번호 요청'} id="request-email-auth"
            onClick={() => handleEmailAuthRequestClick(email)}>
            </MyButton>
          </div>
        
          {/* validation */}
          {emailError && <div className='invalid-input-message'>{emailError}</div>}
          {emailSuccess && <div className='valid-input-message'>{emailAuthMessage}</div>}
          {
            emailAuthRequested &&
            (
              <div className='email-input-section'>
                <input
                type="text"
                id="email-auth-number"
                value={emailAuthNumber}
                onChange={handleEmailAuthNumberChange}
                placeholder='인증번호 입력'
                />
                <MyButton type={'gray'} text={'인증하기'} id="confirm-email-auth"
                  onClick={handleEmailAuthConfirmClick}>
                </MyButton>
              </div>
            )
          }
          { 
            emailAuthConfirmRequested  &&
            (
              <div className={(emailAuthConfirmed ? '' : 'in') + 'valid-input-message'}>
                {emailAuthConfirmMessage}
              </div>
            )
          }

          
        </div>
        
        {/* 비밀번호 */}
        <div className='input-section'>
          <label htmlFor="password">비밀번호</label>
          <span className='label-requirement'>(8~16자)</span>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required/>
          {/* validation */}
          {passwordError && <div className='invalid-input-message'>{passwordError}</div>}
          {passwordSuccess && <div className='valid-input-message'>사용 가능한 패스워드입니다.</div>}
          <input
            type="password"
            id="reEnteredPassword"
            value={reEnteredPassword}
            onChange={handleReEnteredPasswordChange}
            placeholder='비밀번호 재 입력'
            required
          />
          {/* validation */}
          {reEnteredPasswordError && <div className='invalid-input-message'>{reEnteredPasswordError}</div>}          
          {reEnteredPasswordSuccess && <div className='valid-input-message'>패스워드가 일치합니다.</div>}
        
        </div>

        {/* 닉네임 */}
        <div className='input-section'>
          <label htmlFor="nickname">닉네임</label>
          <span className='label-requirement'>(2~6자, 특수문자 제외)</span>
          <input type="text" id="nickname" value={nickname} onChange={handleNicknameChange} required/>
          {/* validation */}
          {nicknameError && <div className='invalid-input-message'>{nicknameError}</div>}
          {nicknameSuccess && <div className='valid-input-message'>사용 가능한 닉네임입니다.</div>}
        </div>
        {/* 핸드폰번호 */}
        <div className='input-section'>
          <label htmlFor="telephone">휴대폰 번호</label>
          <span className='label-requirement'>('-' 제외하고 입력)</span>

          <div id='telephone-input-section'>
            <input type="text" id="telephone" value={telephone} onChange={handleTelephoneChange} required/>
          </div>
          {
            telephoneError && <div className='invalid-input-message'>{telephoneError}</div>
          }
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
