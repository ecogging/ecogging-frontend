import { useState } from "react";



export default function useDeleteMessageRoom ( ) {

   // 쪽지함 삭제 모달 띄우고, 내 아이디 & 지금 쪽지함 id 저장
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

   return {
    deleteOpen, openDeleteModal, closeDeleteModal
   }


}