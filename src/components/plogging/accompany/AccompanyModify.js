import '../../../styles/plogging/accompany/AccompanyWrite.css';
import MyButton from '../../common/MyButton';
import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
const { daum } = window;

const AccompanyModify = () => {
    const {id} = useParams();

    const [userId, setUserId] = useState(1);
    const [accompany, setAccompany] = useState({userId:0, title:'',content:'',numOfPeople:0, location:'',locationDetail:'',meetingDate:'', meetingTime:''});

    useEffect(()=> {
        axios.post(`http://localhost:8080/accompaniesdetail`,{userId:userId, accompanyId:id})
            .then(res=> {
                console.log(res.data.accompany);
                setAccompany(res.data.accompany);
            })
            .catch(err=> {
                console.log(err);
            })
    }, []);

    const searchAddress = (e) => {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById("location").value = addr;
                setAccompany({...accompany, "location":addr});
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("locationDetail").focus();
            }
        }).open();
    }

    const changeInput = (e) => {
        setAccompany({...accompany, [e.target.name]:e.target.value});
    }

    const accompanyModify = () => {
        axios.post(`http://localhost:8080/accompaniesmodify`,accompany)
        .then(res=> {
            console.log(res)
            window.location.href = `/accompaniesdetail/${id}`;
        })
        .catch(err=> {
            console.log(err);
        })
    }

    return (
        <div className="accompany-new">
            <div className="write-container">
                <h1 className="accompany-subject">동행 모집</h1>
                <table className="accompany-info">
                    <tbody>
                        <tr>
                            <td className="accompany-cell">
                                <input className="accompany-title" type="text" name="title" id="title" value={accompany.title} placeholder="제목" onChange={changeInput}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-cell">
                                <input className="accompany-loc-detail" type="text" name="locationDetail" id="locationDetail" value={accompany.locationDetail} placeholder="장소" onChange={changeInput}/>
                                <input className="accompany-location" type="text" name="location" id="location" value={accompany.location} placeholder="주소" readOnly/>
                                <button className="find-address" onClick={searchAddress}>주소 찾기</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-cell">
                                <input className="accompany-headcount" type="text" name="numOfPeople" id="numOfPeople" value={accompany.numOfPeople} placeholder="모집 인원" onChange={changeInput}/>
                                <DatePicker className="accomp-date" allowClear={false} value={dayjs(accompany.meetingDate) }  onChange={(date, dateString)=> {setAccompany({...accompany, meetingDate:dateString})}}/>
                                <TimePicker className="accomp-time" value={dayjs(accompany.meetingTime,'HH:mm:ss') } allowClear={false} onChange={(time, timeString)=> {setAccompany({...accompany, meetingTime:timeString})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-cell">
                                <textarea className="accompany-content" name="content" id="content" value={accompany.content} placeholder="모집글 작성" onChange={changeInput}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-buttons">
                                <MyButton text={'수정 완료'} onClick={accompanyModify}></MyButton>&nbsp;&nbsp;&nbsp;
                                <Link to="/accompanies"><MyButton text={'목록'}></MyButton></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccompanyModify;