import { useState, useEffect } from 'react';
import '../../styles/plogging/accompany/AccompanyDetail.css';
import axios from 'axios';
import { getCookie } from '../../utils/CookieUtil';
import detailDate from '../../utils/GetDayMinuteCounter ';


const Comment = ({ comment, deleteHandler, fetchAccompanyData }) => {

  console.log("pararm comment: ")
  console.log(comment)
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyCommentTypeIn, setReplyCommentTypeIn] = useState();

  const isReply = comment.parentId !== null;

  const userId = getCookie('userId');
  const accompanyId = comment.articleId;

  const handleReplyClick = () => {
    setShowReplyInput(true);
  };

  const handleReplyCommentInputChange = (event) => {
    setReplyCommentTypeIn(event.target.value);
  };

  // 대댓글 ------------
  const replyCommentSaveHandler = (event) => {
    event.preventDefault();
    cancelReplyInput();

    axios.post('http://localhost:8080/comments',{
      content: replyCommentTypeIn,
      articleId: accompanyId,
      parentId: comment.id
    }, {
      headers: {
        'Authorization': 'Bearer ' + getCookie('access-token'),
        'Content-Type': 'application/json'
      },
    })
      .then(res=> {
        console.log("success in comment")
        fetchAccompanyData(userId, accompanyId);
      })
      .catch(err=> {
          console.log(err);
      })  
  }

  const cancelReplyInput = () => {
    setReplyCommentTypeIn('');
    setShowReplyInput(false);
  };


  useEffect(()=> {
    console.log("use effect in comment")
    fetchAccompanyData(userId, accompanyId);
  }, []);

  return (

    <>
      { comment.deleted ?  // 삭제된 댓글인데,
        (
          (comment.children == false) ? // 자식이 없으면 아예 안보이게
            (<></>)
          : // 자식이 있으면 삭제됐다하고 자식은 보이게
          (<tr> 
            <hr />
              삭제된 댓글입니다.
            <hr />
            <br />
          </tr>)
        )
        : 
        (<>
          <tr key={comment.id} className={isReply? "reply" : ""}>
            
            <td className="comment-from">
                <div className="comment-from-container">
                      <img src={comment.profileImageUrl} className="writer-picture"/>
                    <div className="comment-from-info">
                        <div className="comment-writer">{comment.userNickname}</div>
                        <div className="comment-date">{detailDate(comment.createdAt)}</div>
                    </div>
                </div>
            </td>

          </tr>
          <tr className={isReply? "reply" : ""}>
              <td className="accompany-comment">
                  <textarea className="comment-content" name="comm-content" id="comm-content" value={comment.content}/>
              </td>
          </tr>
          <tr className={isReply? "reply" : ""}>
              <td className="comment-buttons">
                {!isReply && 
                  <button className="comment-reply" onClick={handleReplyClick}>답글</button>
                }
                { (userId == comment.userId) &&
                  <button className="comment-delete" onClick={() => deleteHandler(comment.id)}>삭제</button>
                }
              </td>
          </tr>
        </>)
      }

      {!isReply && showReplyInput &&
            <tr className="comment-write reply">
              
              <textarea className="comment-type-in"
                onChange={handleReplyCommentInputChange}
                value={replyCommentTypeIn}
                name="reply-type-in"
                placeholder="댓글을 입력해 주세요"/>
                
              <button className="comment-complete" onClick={replyCommentSaveHandler}>작성</button>
              <button className="comment-cancel" onClick={cancelReplyInput}>취소</button>              
            </tr>
      }

      {
        comment.children.map(c =>
          <Comment
              comment={c}
              deleteHandler={deleteHandler}
              fetchAccompanyData={fetchAccompanyData}
          />
        )
      }
    </>
  )
}

export default Comment;