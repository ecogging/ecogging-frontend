import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user/UserSignup.css';
import MyButton from '../common/MyButton';

const UserSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [tel, setTel] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleTelChange = (event) => {
    setTel(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', {
        email,
        password,
        nickname,
        tel,
        birthdate,
      });

      // Handle successful signup

      // Clear the form fields and any error messages
      setEmail('');
      setPassword('');
      setNickname('');
      setTel('');
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
      <h2>Signup</h2>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <label>Nickname:</label>
          <input type="text" value={nickname} onChange={handleNicknameChange} required />
        </div>
        <div>
          <label>Telephone Number:</label>
          <input type="tel" value={tel} onChange={handleTelChange} required />
        </div>
        <div>
          <label>Birthdate:</label>
          <input type="date" value={birthdate} onChange={handleBirthdateChange} required />
        </div>
        {error && <p className="error">{error}</p>}
         <MyButton onClick={handleSubmit} text={'회원가입'}></MyButton>
    </div>
  );
};

export default UserSignup;
