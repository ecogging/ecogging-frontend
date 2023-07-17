// MessageSendModal.js
import { useState } from "react";


export default function useSendMessage ( ) {
  
  // 쪽지 보내기 모달 띄우고, 받는 사람 닉네임 동기화
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNick, setSelectedNick] = useState('');
  
  const openSendModal = (e) => {
    setSelectedNick(e.target.textContent);
    setIsModalOpen(true);
  }

  const closeSendModal = () => {
    if(isModalOpen){
      setIsModalOpen(false);
    }
  }


  return {
    isModalOpen, selectedNick, openSendModal, closeSendModal
  };
}