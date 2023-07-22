import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MyButton from '../../components/common/MyButton';
import '../../styles/mypage/MessageDetail.css';
import MessageReplyModal from '../../components/mypage/MessageReplyModal';
import MessageDeleteModal from '../../components/mypage/MessageDeleteModal';
import moment from 'moment';
import axios from 'axios';

import useDeleteMessageRoom from "../../hooks/useDeleteMessageRoom";

export default function MessageDetail() {
    const { userId } = useParams();
    const { messageRoomId } = useParams();

    // 목록보기
    const goBack = useNavigate();

    // 삭제하기 모달
    const { deleteOpen, openDeleteModal, closeDeleteModal } = useDeleteMessageRoom();
    // 답장하기모달
    const [isOpen, setIsOpen] = useState(false);
    const openReplyModal = () => {
        setIsOpen(!isOpen);
    }
    const closeReplyModal = () => {
        if(isOpen){
            setIsOpen(false);
        }
    };

    // 서버에서 데이터 받아오기
    const[msgs, setMsgs] = useState([]);
    const[conNick, setConNick] = useState();
    useEffect(() => {
        const url = `/${userId}/messageroom/${messageRoomId}`;

        axios.get(url)
        .then((response) => {
            setMsgs(response.data.data.messages.content); 
            console.log(response.data.data);
            console.log('쪽지 불러오기 완료 ㅋㅋ');
            setConNick(response.data.data.contactNickname);
        })
        .catch((err) => {
            console.log('쪽지 불러오기 실패 ㅋㅋ', err);
        })
    }, []);

    console.log('------------');
    console.log(msgs);
    console.log('------------');

        console.log(msgs.length);
        console.log(conNick);

        console.log(userId);
        console.log(messageRoomId);
    


    return (
        <div className="MessageDetail">

            {/* 답장모달 */}
            {isOpen ? 
                <MessageReplyModal onCloseModal={closeReplyModal} />
                : null }

            {/* 삭제모달 */}
            {deleteOpen ?
                <MessageDeleteModal onCloseDeleteModal={ closeDeleteModal } />
                : null }

            <div className='container_messageWrapper'>


                <div className='container_messageDetailHeader'>
                    <MyButton text={'목록보기'} type={ 'whiteGrayWide2' } 
                    onClick={() => goBack(-1)}/>
                </div>

                <div className='container_msgSubWrapper'>
                    <div className='container_messageBody'>

                        <div className='container_msgBodyHeader'>
                            <div className='container_msgBodyHeaderLeft'>
                                <div className='circle_msgSenderPic'></div>
                                <div className='txt_msgSenderNick'>{conNick}</div>
                            </div>
                            <div className='container_msgBodyHeaderRight'>
                                <div className='container_msgBodyHeaderBtns'>
                                    <MyButton text={'답장하기'} type={'mintWide2'} onClick={openReplyModal}/>
                                    <MyButton text={'삭제하기'} type={'lightGrayWide2'} onClick={openDeleteModal}/>
                                </div>
                            </div>
                        </div>

                        <div className='container_messageArea'>

                            { msgs.map((msg, idx) => (

                                    <div className='container_msgOne' key={msg.id}>
                                        <div className='container_msgOneInner'>
                                            <div className='box_msgOneTop'>
                                                { msg.isReceived === 1 ?
                                                    <div className='txt_msgState_receive'>받은 쪽지</div>
                                                    :   <div className='txt_msgState_send'>보낸 쪽지</div>
                                                }   
                                                <div className='txt_msgWriteDate'>{moment(msg.createdAt).format('YY.MM.D h:mm a')}</div>
                                            </div>
                                            <div className='box_msgContentsBody'>
                                                {msg.content}
                                            </div>
                                        </div>
                                    </div>

                                ))                               
                            }

                        </div>
                    </div>
                </div>
            </div>           
        </div>
    );
}