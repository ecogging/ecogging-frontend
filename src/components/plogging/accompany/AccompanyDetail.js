import '../../../styles/plogging/accompany/AccompanyDetail.css';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import MyButton from '../../common/MyButton';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MessageSendModal from '../../common/MessageSendModal';
import useSendMessage from '../../../hooks/useSendMessage';

import Comment from '../../comment/Comment';

const AccompanyDetail = () => {
    const { isModalOpen, selectedNick, selectedUserId, openSendModal, closeSendModal } = useSendMessage();

    const {id} = useParams();
    const accompanyId = id;

    console.log("accompany(at first): " + accompanyId);

    const [isScrapped, setIsScrapped] = useState(false);
    const [isParticipated, setIsParticipated] = useState(false);
    const [accompany, setAccompany] = useState({id:0,title:'',content:'',meetingDate:'',meetingTime:'',
        numOfPeople:0,active:true,views:0,save:false,location:'',locationDetail:'',joincnt:0,nickname:'', userId:''})
    const userId = getCookie("userId");

    const [comments, setComments] = useState([]);

    const [commentTypeIn, setCommentTypeIn] = useState('');


    const fetchAccompanyData = (userId, accompanyId) => {
      console.log("fetch..." + userId + ", " + accompanyId);
      axios.post(`http://localhost:8080/accompaniesdetail`,{userId:userId, accompanyId:accompanyId})
            .then(res=> {
                setAccompany(res.data.accompany);
                setIsParticipated(res.data.isParticipation);
                setIsScrapped(res.data.isAccompanyscrap);
                setComments(res.data.comments);
                console.log("res.data: ");
                console.log(res.data)
            })
            .catch(err=> {
                console.log(err);
            })
    }

    useEffect(()=> {
      console.log("use effect")
      fetchAccompanyData(userId, accompanyId);
    }, []);

    const handleScrapToggle = () => {
        if(accompany.active==false) return;
        axios.post(`http://localhost:8080/accompaniesscrap`,{userId:userId, accompanyId:accompanyId})
        .then(res=> {
            setIsScrapped(res.data);
        })
        .catch(err=> {
            console.log(err);
        })    
    };

    // 댓글 작성 
    const commentSaveHandler = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8080/comments',{
        content: commentTypeIn,
        articleId: accompanyId,
        parentId: null
      }, {
        headers: {
          'Authorization': 'Bearer ' + getCookie('access-token'),
          'Content-Type': 'application/json'
        },
      })
        .then(res=> {
          console.log("save in accompanydetail");
          setCommentTypeIn('')
          fetchAccompanyData(userId, accompanyId);
        })
        .catch(err=> {
            console.log(err);
        })  
    }

    const commentInputChangeHandler = (event) => {
      const input = event.target.value;

      setCommentTypeIn(input)
    }


    // ------------------------

    const handleParticipationToggle = () => {
        if(accompany.active==false) return;
        axios.post(`http://localhost:8080/participation`,{userId:userId, accompanyId: accompanyId})
        .then(res=> {
            setIsParticipated(res.data);
        })
        .catch(err=> {
            console.log(err);
        })        
       
    };

    const accompaniesDelete = () => {
        axios.get(`http://localhost:8080/accompaniesdelete/${id}`)
        .then(res=> {
            window.location.href = '/accompanies';            
        })
        .catch(err=> {
            console.log(err);
        })
    }



    const handleCommentDelete = (id) => {
      axios.delete(`http://localhost:8080/comments/${id}`, {
        headers: {
        'Authorization': 'Bearer ' + getCookie('access-token'),
        'Content-Type': 'application/json'
      }})
      .then(response => {
        console.log("handle comment delete")
        fetchAccompanyData(userId, accompanyId);
      })
      .catch(error => {
        console.log(error)
      })
    }

    console.log("comments: ")
    console.log(comments)
    return (
        <div className="accompany-article">
     {isModalOpen ? <MessageSendModal onCloseModal={closeSendModal} receiverNick={selectedNick} receiverId={selectedUserId} /> : null}

            <div className="article-container">
                <h1 className="article-subject">동행 모집</h1>
                <table className="article-info">
                    <tbody>
                        {userId!=null && (
                        <tr>
                            <td className="buttons-above">
                                <button className={`article-scrap ${isScrapped ? 'active' : ''}`} onClick={handleScrapToggle}>스크랩</button>
                                <button className={`article-participation ${isParticipated ? 'active' : ''}`} onClick={handleParticipationToggle}>참여하기</button>
                            </td>
                        </tr>)}
                        <tr>
                            <td className="article-cell">
                                <input className="article-loc-detail" type="text" name="locationDetail" id="locationDetail" value={accompany.locationDetail}/>
                                <input className="article-location" type="text" name="location" id="location" value={accompany.location}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <input className="article-headcount" type="text" name="headcount" id="headcount" value={accompany.numOfPeople}/>
                                <input className="article-date" type="text" name="date" id="date" value={accompany.meetingDate}/>
                                <input className="article-time" type="text" name="time" id="time" value={accompany.meetingTime}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <input className="article-title" type="text" name="title" id="title" value={accompany.title}/>
                                <input className="article-writer" onClick={() => openSendModal(accompany.userId, accompany.nickname)} type="text" name="writer" id="writer" value={accompany.nickname}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="article-cell">
                                <textarea className="article-content" name="content" id="content" value={accompany.content}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="buttons-bottom">
                                {userId!=null && userId == accompany.userId && (
                                    <>
                                    <Link to={`/accompaniesmodify/${id}`}><MyButton text={'수정'}></MyButton></Link>&nbsp;&nbsp;&nbsp;
                                    <MyButton onClick={accompaniesDelete} text={'삭제'}></MyButton>&nbsp;&nbsp;&nbsp;</>
                                )}
                            <Link to="/accompanies"><MyButton text={'목록'}></MyButton></Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="comment-write">
                                <textarea className="comment-type-in" onChange={commentInputChangeHandler} value={commentTypeIn} name="type-in" id="type-in" placeholder="댓글을 입력해 주세요"/>
                                <button className="comment-complete" onClick={commentSaveHandler}>작성</button>
                            </td>
                        </tr>
                        {/* 댓글 시작 */}
                        {
                          comments && comments.map((comment) => {
                            return (
                              <Comment
                                comment={comment}
                                deleteHandler={handleCommentDelete}
                                fetchAccompanyData={fetchAccompanyData}
                                handleMessageOpen={openSendModal}
                              />
                            )
                          })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccompanyDetail;