import '../../styles/main/MainAccompany.css';
import MyButton from '../common/MyButton';


export default function MainAccompany() {
  return (
    <div className='mainAccompContainer'>
      <div className='accompBackground'>

        <div className='accompTitleBox'>
          <div className='accompTitle'>RECENT MATES</div>
        </div>

        <div className='accompBox'>
          <div className='accompCardBox'>

            <div className='accompCard'>
            
              <div className='cardTop'>
                <div className='accompRecruit'>모집중</div>
                <div className='userPic'></div>
                <div className='accompNotice'>
                  <div className='nowRecruiting'>5명 중 3명 참여중</div>
                  <div className='accompTime'>7/14 AM 6:30</div>
                </div>
              </div>

              <div className='cardbody'>
                <div className='userCardNickname'>닉네임</div>
                <div className='accompCardTitle'>동행제목</div>
                <div className='accompCardContent'>동행모집본문</div>
                <div className='accompCardDetail'><MyButton text={'상세글 보기'} type={'whiteMint'}/></div>
              </div>
            </div>

          </div>
          <div className='accompCardBox'>2</div>
          <div className='accompCardBox'>3</div>
        </div>
      </div>
    </div>
  );
}