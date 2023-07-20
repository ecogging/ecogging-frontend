import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import MyButton from '../../components/common/MyButton';
import '../../styles/mypage/MessageDetail.css';
import MessageReplyModal from '../../components/mypage/MessageReplyModal';
import MessageDeleteModal from '../../components/mypage/MessageDeleteModal';

export default function MessageDetail() {

    // 목록보기
    const goBack = useNavigate();

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

    //삭제하기모달
    const [deleteOpen, setDeleteOpen] = useState(false);
    const openDeleteModal = () => {
        setDeleteOpen(!deleteOpen);
        document.body.style.overflow = 'hidden'; // 배경 스크롤 막기
    }
    const closeDeleteModal = () => {
        if(deleteOpen){
            setDeleteOpen(false);
            document.body.style.overflow = 'auto'; // 배경 스크롤 다시 활성화
        }   
    };


    return(
        <div className="MessageDetail">

            {isOpen ? 
                <MessageReplyModal onCloseModal={closeReplyModal} />
                : null }
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
                                <div className='txt_msgSenderNick'>닉닉닉닉닉닉</div>
                            </div>
                            <div className='container_msgBodyHeaderRight'>
                                <div className='container_msgBodyHeaderBtns'>
                                    <MyButton text={'답장하기'} type={'mintWide2'} onClick={openReplyModal}/>
                                    <MyButton text={'삭제하기'} type={'lightGrayWide2'} onClick={openDeleteModal}/>
                                </div>
                            </div>
                        </div>

                        <div className='container_messageArea'>
 
                            <div className='container_msgOne'>
                                <div className='container_msgOneInner'>
                                    <div className='box_msgOneTop'>
                                        <div className='txt_msgState_receive'>받은 쪽지</div>
                                        <div className='txt_msgWriteDate'>23/06/27 00:12</div>
                                    </div>
                                    <div className='box_msgContentsBody'>
                                        쪽지 내용<br/>
                                        쪽지 내용
                                    </div>
                                </div>
                            </div>

                            {/* 임시 */}
                            <div className='container_msgOne'>
                                <div className='container_msgOneInner'>
                                    <div className='box_msgOneTop'>
                                        <div className='txt_msgState_send'>보낸 쪽지</div>
                                        <div className='txt_msgWriteDate'>23/06/27 00:12</div>
                                    </div>
                                    <div className='box_msgContentsBody'>
                                        쪽지 내용<br/>
                                        쪽지 내용
                                    </div>
                                </div>
                            </div>
                            <div className='container_msgOne'>
                                <div className='container_msgOneInner'>
                                    <div className='box_msgOneTop'>
                                        <div className='txt_msgState_receive'>받은 쪽지</div>
                                        <div className='txt_msgWriteDate'>23/06/27 00:12</div>
                                    </div>
                                    <div className='box_msgContentsBody'>
                                        쪽지 내용<br/>
                                    </div>
                                </div>
                            </div>
                            <div className='container_msgOne'>
                                <div className='container_msgOneInner'>
                                    <div className='box_msgOneTop'>
                                        <div className='txt_msgState_send'>보낸 쪽지</div>
                                        <div className='txt_msgWriteDate'>23/06/27 00:12</div>
                                    </div>
                                    <div className='box_msgContentsBody'>
                                        쪽지 내용<br/>
                                        쪽지 내용
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>



            </div>           


        </div>
    );
}