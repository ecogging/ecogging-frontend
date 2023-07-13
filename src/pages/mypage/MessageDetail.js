import MyButton from '../../components/common/MyButton';
import '../../styles/mypage/MessageDetail.css';

export default function MessageDetail() {
    return(
        <div className="MessageDetail">
            
            <div className='container_messageWrapper'>

                
                    <div className='container_messageDetailHeader'>
                        <MyButton text={'목록보기'} type={ 'whiteGray' } /> 
                    </div>

                <div className='container_msgSubWrapper'>
                    <div className='container_messageBody'>
                        <div className='container_msgBodyHeader'>
                            <div className='container_msgBodyHeaderLeft'></div>
                            <div className='container_msgBodyHeaderRight'>
                                <div className='container_msgBodyHeaderBtns'>
                                    <MyButton text={'답장하기'} />
                                    <MyButton text={'삭제하기'} type={'lightGray'}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



            </div>           


        </div>
    );
}