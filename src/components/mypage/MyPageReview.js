import { Pagination } from 'antd';
import '../../styles/mypage/MyPageReview.css';
import { RiArrowDropDownLine } from "react-icons/ri";

export default function MyPageReview () {
    return (
        <div className='container_mypageReview'>
            <div className='container_mypageRevHeader'>
                <div className='container_mypageRevTitleArea'>
                    <div className='box_mypageRevTitle'>플로깅 후기</div>
                </div>
                <div className='container_mypageRevLine'>
                    <div className='box_mypageRevLatest'>최신순 <span className='box_revDropdown'><RiArrowDropDownLine /></span> </div>
                    <div className='box_mypageRevOldest'>오래된순 <span className='box_revDropdown'><RiArrowDropDownLine /></span> </div>
                </div>
            </div>
            
            <div className='container_wholeMyReviews'>
                <div className='container_wholeMyReview'>
                    <div className='container_myReview'>
                        <div className='container_revDateandViews'>
                            <div className='box_revDate'>
                                <div className='txt_revDate'>2023. 07. 11 15:30</div>
                            </div>
                            <div className='box_revViews'>
                                <div className='txt_revViews'>조회수 25</div>
                            </div>
                        </div>
                        <div className='container_mypageRevContents'>
                            <div className='temper'>
                                <div className='box_revTitle'>플로깅 후기 제목</div>
                                <div className='box_detailBtns'>
                                    <div className='box_revModify'>수정</div>
                                    <div className='box_revDelete'>삭제</div>
                                </div>
                            </div>
                            <div className='box_revContents'>플로깅 후기 본문</div>
                        </div>
                    </div>
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