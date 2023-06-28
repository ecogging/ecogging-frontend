import { Table, Input, Button, FormGroup, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import '../../../styles/EventList.css';

const EvnetList = () => {
    const { page } = useParams();
    //const [curPage, setCurPage] = useState(1);
    //const [pageBtn, setPageBtn] = useState([]);


    // useEffect(() => {
    //     getAllBoardPage(page);
    // }, [])

    // const getAllEnvetPage = (p_page) => {
    //     axios.get(`http://localhost:8080/eventList/${p_page}`)
    //         .then(res => {
    //             console.log(res);
    //             let pageInfo = res.data.pageInfo;
    //             let list = res.data.list;
    //             setBoard([...list]);
    //             let btn = [];
    //             for(let i=pageInfo.startPage; i<=pageInfo.endPage; i++){
    //                 btn.push(i);
    //             }
    //             setPageBtn(btn);
    //             setBsearch(false);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    return (
        <>
            <a href="">
                <div className="card">
                    {/* 카드 헤더 */}
                    <div className="card-header">
                        <div className="card-header-is_closed">
                            <div className="card-header-text">모집중</div>
                            <div className="card-header-number">2 / 5</div>
                        </div>
                    </div>

                    {/* 카드 바디 */}
                    <div className="card-body">
                        {/* 카드 바디 헤더 */}
                        <div className="card-body-header">
                            <h1>4월 15일 순천만 동행구해요!</h1>
                            <p className="card-body-hashtag">#여수 #순천 #광양</p>
                            <p className="card-body-nickname">작성자: ENDORPHIN0710</p>
                        </div>
                        <p className="card-body-description">
                            안녕하세요! 4월 15일 순천만 동행구합니다!
                        </p>
                        {/* 카드 바디 본문 */}

                        {/* 카드 바디 푸터 */}
                        <div className="card-body-footer">
                            <hr style={{ marginBottom: '8px', opacity: '0.5', borderColor: '#EF5A31' }} />
                            <MdOutlineRemoveRedEye /> 조회 38회
                            <i className="icon icon-comments_count"></i>댓글 4개
                            <i className="reg_date"> 2018/04/12 </i>
                        </div>
                    </div>
                </div>
            </a>
        </>
    )
}

export default EvnetList;