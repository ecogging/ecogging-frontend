import MyButton from '../common/MyButton';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, navigate, useNavigate } from 'react-router-dom';
import '../../styles/mypage/MyPageProfile.css';

import { getCookie, setCookie } from '../../utils/CookieUtil';

export default function CorporateMyPageProfile() {
  const navigate = useNavigate();
  const requestUrl = "http://localhost:8080/corporate/mypage";

  const [nickname, setNickname] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [nicknameSuccess, setNicknameSuccess] = useState(false);

  const [telephone, setTelephone] = useState('');
  const [telephoneError, setTelephoneError] = useState(false);

  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [profileImageFile, setProfileImageFile] = useState(null);


  // 기업 정보
  const [corpName, setCorpName] = useState('');
  const [corpRegisterNumber, setCorpRegisterNumber] = useState('');
  const [corpRepresentative, setCorpRepresentative] = useState('');
  const [corpRegisterNumberError, setCorpRegisterNumberError] = useState('');

  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({});

  const [isEditting, setIsEditting] = useState(false);

  const startEditting = () => {
    setIsEditting(true);
  }
  const endEditting = () => {
    setIsEditting(false);
  }

  // axios로 유저 정보 요청 
  const fetchData = () => {
    axios.get(requestUrl, {
      headers: {
        'Authorization': 'Bearer ' + getCookie('access-token'),
      }
    }).then(response => {
      const responseProfile = response.data;

      setProfile(responseProfile);
      setNickname(responseProfile.nickname);
      setTelephone(responseProfile.telephone);
      setProfileImageUrl(responseProfile.profileImageUrl);
      setCorpName(responseProfile.corpName);
      setCorpRegisterNumber(responseProfile.corpRegisterNumber);
      setCorpRepresentative(responseProfile.corpRepresentative);
    
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const email = profile.email;
  const name = profile.name;
  
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
  
  const handleFileButtonClick = () => {
    // Trigger the hidden file input when the custom button is clicked
    fileInputRef.current.click(); 
  };
  const reloading = () => {
    window.location.reload();
  };
  // 프로필 사진 
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileImageFile(file);
    }
  }

  const isValidTelephone = (telephone) => {
    return telephone.length >= 10 && telephone.length <= 11;
  }

  const handleTelephoneChange = (event) => {
    const input = event.target.value;
    const telephone = input.replace(/\D/g, ""); // Remove all non-numeric characters

    setTelephone(telephone);
    if (!isValidTelephone(telephone)) {
      setTelephoneError('최소 10자 이상, 11글자 이하여야 합니다.');
    } else {
      setTelephoneError('');
    }
  };

  const handleCorpName = (event) => {
    const input = event.target.value;
    setCorpName(input);
  }

  const handleCorpRegisterNumber = (event) => {
    const input = event.target.value;

    const number = input.replace(/\D/g, ""); // Remove all non-numeric characters

    setCorpRegisterNumber(number);

    if (!isValidCorpRegisterNumber(number)) {
      setCorpRegisterNumberError('올바른 사업자등록번호 형식이 아닙니다.');
    } else {
      setCorpRegisterNumberError('');
    }

  }
  const handleCorpRepresentative = (event) => {
    const input = event.target.value;
    setCorpRepresentative(input);
  }

  const isValidCorpRegisterNumber = (number) => {
    return number.length == 0 || number.length == 10;
  }
  
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      nickname: nickname,
      email: email,
      telephone: telephone,
      corpName: corpName,
      corpRegisterNumber: corpRegisterNumber,
      corpRepresentative: corpRepresentative
    };

    const formDataToSubmit = new FormData();
    // Convert MyDTO data to a Blob and include it as a parameter.
    formDataToSubmit.append('profile',
      new Blob([JSON.stringify(userData)], { type: 'application/json' })); 

    formDataToSubmit.append('image', profileImageFile);

    try {
      const response = await axios.post(requestUrl, formDataToSubmit, {
        headers: {
          'Authorization': 'Bearer ' + getCookie('access-token'),
          'Content-Type': 'multipart/form-data',
        },
      });
      setCookie('nickname', nickname);
      reloading();      
      navigate('/mypage/profile');

      // Handle the response or any other actions after a successful save
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setIsEditting(false);
    alert('회원정보 수정에 성공했습니다.')
  };

  const handleCancel = () => {
    setIsEditting(false);
    navigate('/mypage/profile');
  }

  console.log(getCookie('isCorporate'))

  return (
    <div className='profile-edit-container'>
      <div className="input-wrapper">
         {/* image  */}
          <div className='profile-image-edit'>
            <center>
              <div className='mypage-profile-image'>
                  <img src={profileImageUrl} id="mypage-profile-image"></img>
              </div>
              {/* Hidden file input */}
              <input type="file" id="edit-image" name="image" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
              {/* Custom styled file input button */}
              {
                isEditting &&
                (<MyButton type={'gray'} text={'변경하기'} onClick={handleFileButtonClick} >
                </MyButton>)
              }
              
            </center>
          </div>

          {/* 이메일 */}
          <div className='input-section' id="email-readonly">
            <label htmlFor="email">이메일</label>
            {email}
          </div>
        
          {/* 닉네임 */}
          <div className='input-section'>
            <label htmlFor="nickname">닉네임</label>
            { isEditting && 
              <span className='label-requirement'>(2~6자, 특수문자 제외)</span>
            }
            <input type="text" id="nickname" value={nickname} onChange={handleNicknameChange} required readOnly={!isEditting}/>
            {/* validation */}
    
            
            {isEditting && nicknameError && <div className='invalid-input-message'>{nicknameError}</div>}
            {isEditting && nicknameSuccess && <div className='valid-input-message'>사용 가능한 닉네임입니다.</div>}
             
          </div>
          {/* 핸드폰번호 */}
          <div className='input-section'>
            <label htmlFor="telephone">휴대폰 번호</label>
            { isEditting && 
              <span className='label-requirement'>('-' 제외하고 입력)</span>
            }
            <div id='telephone-edit-section'>
              <input type="text" id="telephone" value={telephone} onChange={handleTelephoneChange} required readOnly={!isEditting}/>
            </div>
            { isEditting && 
              <>
              {
                telephoneError && <div className='invalid-input-message'>{telephoneError}</div>
              }
              </>
            }
          </div>
          {/* 기업 이름 */}
          <div className='input-section'>
            <label htmlFor="telephone">기업 이름</label>
            { isEditting && 
              <span className='label-requirement'>('-' 제외하고 입력)</span>
            }
            <div id='telephone-edit-section'>
              <input type="text" id="corpName" value={corpName} onChange={handleCorpName} required readOnly={!isEditting}/>
            </div>
          </div>

          {/* 사업자등록번호 */}
          <div className='input-section'>
            <label htmlFor="corpRegisterNumber">사업자등록번호</label>
            { isEditting &&   
            <span className='label-requirement'>(미입력 가능, 입력 시 '-' 제외하고 입력)</span>
            } 
            <div>
              <input type="text" id="corpRegisterNumber" 
                value={corpRegisterNumber} onChange={handleCorpRegisterNumber} required readOnly={!isEditting}/>
            </div>
            {
              isEditting &&
              corpRegisterNumberError && <div className='invalid-input-message'>{corpRegisterNumberError}</div>
            }
          </div>
          {/* 대표자명 */}
          <div className='input-section'>
            <label htmlFor="corpRepresentative">대표자명</label>

            <div>
              <input type="text" id="corpRepresentative" 
                value={corpRepresentative} onChange={handleCorpRepresentative} required readOnly={!isEditting}/>
            </div>
          </div>
        </div>
        {
        isEditting ?
          (
            <div className='horizontal-buttons'>
              <MyButton onClick={handleEditSubmit} text={'수정완료'} type={'mintWide2'}></MyButton>
              <MyButton onClick={handleCancel} text={'취소하기'} type={'whiteGrayWide2'}></MyButton>
            </div>
          )
          :
          (
            <MyButton type={'mintWide2'} text={'프로필 수정'} onClick={startEditting}></MyButton>
          )
        }
        </div>
      );

}