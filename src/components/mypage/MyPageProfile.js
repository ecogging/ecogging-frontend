import axios from 'axios';
import { getCookie } from '../../utils/CookieUtil'
import { useState } from 'react';

export default function MyPageProfile() {
  const requestUrl = "http://localhost:8080/mypage";
  const userId = getCookie("userId");
  const [userProfile, setUserProfile] = useState({
      email: '',
      name: '',
      nickname: '',
      profileImageUrl: '',
      telephone: '',
      notiYn: ''
  });

  // axios로 유저 정보 요청 

  axios.get(requestUrl, {
    headers: {
      'Authorization': 'Bearer ' + getCookie('access-token'),
    }
  }).then(response => {
    console.log(response)
    // setUserProfile(response.data);
  })

  return (
    <div>
      
    </div>
  )
}