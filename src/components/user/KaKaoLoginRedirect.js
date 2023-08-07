// http://localhost:3000/oauth2/redirect/{token}

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import jwtDecode from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from '../../utils/CookieUtil';

function KakaoLoginRedirect() {
  const params = useParams();
  const navigate = useNavigate();

  const tokenKeys = ['access-token', 'userId', 'nickname', 'userType', 'profileImageUrl'];
  
  for (const tokenKey of tokenKeys) {
    if (getCookie(tokenKey))
      removeCookie(tokenKey)
  }
  localStorage.clear()

  // Decode the token
  const token = params.token;
  setCookie('access-token', token);
  localStorage.setItem('access-token', token)

  try {
    const decodedToken = jwtDecode(token);
    // set userinfo in token to cooke
    setCookie('userId', decodedToken.userId)
    setCookie('nickname', decodedToken.nickname);

    localStorage.setItem('userId',decodedToken.userId )
    localStorage.setItem('nickname', decodedToken.nickname);

    

    navigate('/');
  } catch (e) {
    alert("실패")
    console.log("소셜로그인실패--");
    console.log(e);
  }
      
  return <></>;
}

export default KakaoLoginRedirect;