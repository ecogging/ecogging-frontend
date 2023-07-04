import '../../../styles/plogging/accompany/AccompanyList.css';
import { Link } from 'react-router-dom';
import MyButton from '../../common/MyButton';

const AccompanyList = () => {
    return (
        <div className="accompany-board">
            <h1 className="list-subject">동행 모집</h1>
            <table className="list-info">
                <tbody>
                    <tr>
                        <td className="article-new">
                            <Link to="/accompanywrite">
                                <MyButton text={'새 글 작성'}></MyButton>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className="list-order">
                            <button className="list-latest">최신순 ∨</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="accompany-card">
                            <div className="card-info">
                                <div className="card-header">
                                    <div className="card-progress">모집중</div>
                                </div>
                                <div className="card-body">
                                    <Link to="/detail">
                                        <p className="card-body-title">글제목</p>
                                    </Link>
                                    <p className="card-body-writer">작성자</p>
                                </div>
                                <hr/>
                                <div className="card-footer">
                                    <p className="plogging-date">2023-07-27</p>
                                    <p className="participant">참여 12</p>
                                </div>
                            </div>
                        
                            <div className="card-info">
                                <div className="card-header">
                                    <div className="card-progress">모집중</div>
                                </div>
                                <div className="card-body">
                                    <p className="card-body-title">글제목</p>
                                    <p className="card-body-writer">작성자</p>
                                </div>
                                <hr/>
                                <div className="card-footer">
                                    <p className="plogging-date">2023-07-27</p>
                                    <p className="participant">참여 12</p>
                                </div>
                            </div>
                            <div className="card-info">
                                <div className="card-header">
                                    <div className="card-progress">모집중</div>
                                </div>
                                <div className="card-body">
                                    <p className="card-body-title">글제목</p>
                                    <p className="card-body-writer">작성자</p>
                                </div>
                                <hr/>
                                <div className="card-footer">
                                    <p className="plogging-date">2023-07-27</p>
                                    <p className="participant">참여 12</p>
                                </div>
                            </div>                          

                        </td>


                        <td className="accompany-card">
                            <div className="card-info">
                                <div className="card-header">
                                    <div className="card-progress">모집중</div>
                                </div>
                                <div className="card-body">
                                    <p className="card-body-title">글제목</p>
                                    <p className="card-body-writer">작성자</p>
                                </div>
                                <hr/>
                                <div className="card-footer">
                                    <p className="plogging-date">2023-07-27</p>
                                    <p className="participant">참여 12</p>
                                </div>
                            </div>
                        </td>


                    </tr>  
                    <tr>
                        <td className="list-more">
                            <button className="load-more">더 보기</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AccompanyList;