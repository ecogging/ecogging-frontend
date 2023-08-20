// MessageSendModal.js
import { useState } from "react";


export default function useSendMessage ( ) {
  
  // 쪽지 보내기 모달 띄우고, 받는 사람 닉네임 동기화, 받는 사람 id 저장
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedNick, setSelectedNick] = useState('');
  
  const openSendModal = (userId, nickname) => {
    setSelectedUserId(userId);
    setSelectedNick(nickname);
    setIsModalOpen(true);
  }

  const closeSendModal = () => {
    if(isModalOpen){
      setIsModalOpen(false);
    }
  }


  return {
    isModalOpen, selectedUserId, selectedNick, openSendModal, closeSendModal
  };
}