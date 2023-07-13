import { Pagination } from 'antd';
import MyButton from '../common/MyButton';
import '../../styles/mypage/MyPageMessages.css';
import { Link } from "react-router-dom";

export default function MyPageMessages() {
  return (
    <div className="MyPageMessages">

      <div className='container_myMessagesHeader'>
        <div className='containver_myMessagesUnread'>
          읽지 않은 쪽지 <span id='msg_unReadCount'>1232</span> 개
        </div>
        <div className='container_myMessagesReadAll'>
          모두 읽음 표시
        </div>
      </div>

      <div className='container_myMessagesArea'>

        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>

        {/* 임시 */}
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>
        <div className='container_MessageOne'>
          <div className='con_MessageLeft'>
            <div className='con_MessageSender'>
              <div className='box_senderPic'></div>
              <div className='txt_senderNick'>닉닉닉닉닉닉</div>
            </div>
          </div>

          <Link to={'/messages'} className='link_messageDetail'>
            <div className='con_MessageMiddle'>
              <div className='txt_MessageContent'>최신 쪽지 내용 ...</div>
            </div>
          </Link>

          <div className='con_MessageRight'>
            <div className='txt_MessageDate'> 2분 전 </div>
          </div>
        </div>


       
      </div>

      <div className='container_MessageBottom'>
        <div className='container_MessageBtns'>
          <MyButton text={'모두 선택'} type={'whiteGray'}/>
          <MyButton text={'삭제'} type={'gray'} />
        </div>
      </div>
      <div className='container_mypageRevBottom'>
        <div className='box_revPagination'>
            <Pagination />    
        </div>
    </div>

    </div>
  );
}