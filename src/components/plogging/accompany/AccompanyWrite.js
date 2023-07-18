import '../../../styles/plogging/accompany/AccompanyWrite.css';
import MyButton from '../../common/MyButton';
import { setCookie, getCookie, removeCookie } from '../../../utils/CookieUtil';
import {useState} from 'react';
import axios from 'axios';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
const { daum } = window;

const AccompanyWrite = () => {

    let today = new Date();
    let year = today.getFullYear();
    let month = ('0'+(today.getMonth()+1)).slice(-2);
    let day = ('0'+today.getDate()).slice(-2);

    let hours = ('0'+today.getHours()).slice(-2);
    let minutes = ('0'+today.getMinutes()).slice(-2);
    let seconds = ('0'+today.getSeconds()).slice(-2);

    let todaystr = year+"-"+month+"-"+day;
    let curtime = hours+"::"+minutes+"::"+seconds;
    const userId = getCookie("userId");
    const [accompany, setAccompany] = useState({title:'',content:'',numOfPeople:0, location:'',locationDetail:'',meetingDate:todaystr, meetingTime:hours+':'+minutes+':'+seconds, userId:userId});

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

    const accompanyWrite = (temp) => {
        axios.post(`http://localhost:8080/accompanieswrite/${temp}`,accompany)
        .then(res=> {
            console.log(res)
            window.location.href = '/accompanies';
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
                                <input className="accompany-title" type="text" name="title" id="title" placeholder="제목" onChange={changeInput}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-cell">
                                <input className="accompany-loc-detail" type="text" name="locationDetail" id="locationDetail" placeholder="장소" onChange={changeInput}/>
                                <input className="accompany-location" type="text" name="location" id="location" placeholder="주소" readOnly/>
                                <button className="find-address" onClick={searchAddress}>주소 찾기</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-cell">
                                <input className="accompany-headcount" type="text" name="numOfPeople" id="numOfPeople" placeholder="모집 인원" onChange={changeInput}/>
                                <DatePicker className="accomp-date" allowClear={false}  defaultValue={dayjs(todaystr, 'YYYY-MM-DD') }  onChange={(date, dateString)=> {setAccompany({...accompany, meetingDate:dateString})}}/>
                                <TimePicker className="accomp-time" allowClear={false}  defaultValue={dayjs(curtime, 'HH::mm::ss') }  onChange={(time, timeString)=> {setAccompany({...accompany, meetingTime:timeString})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-cell">
                                <textarea className="accompany-content" name="content" id="content" placeholder="모집글 작성" onChange={changeInput}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="accompany-buttons">
                                <MyButton text={'임시 저장'} onClick={()=>accompanyWrite(1)}></MyButton>&nbsp;&nbsp;&nbsp;
                                <MyButton text={'작성 완료'} onClick={()=>accompanyWrite(0)}></MyButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccompanyWrite;