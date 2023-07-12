import { Link } from 'react-router-dom';
import '../../styles/user/UserSignupIntro.css';

function UserSignupIntro() {
  return <div className='UserSignupIntro'>
    <p>로고로고</p>
    <Link to={'/signup'}>
      <button>이메일로 회원가입</button>
    </Link>
    <br />
    <button>카카오 회원가입</button>
    <br />
    <p>이미 계정이 있으신가요? 로그인</p>
  </div>;
}

export default UserSignupIntro;