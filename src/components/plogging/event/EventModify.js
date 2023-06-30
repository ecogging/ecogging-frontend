import { Table, Input, Button,Label } from 'reactstrap';
import {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { reqToken } from '../requestToken';
import axios from 'axios';

const Event = () => {
    const[event, setEvent] = useState({title:'', content:'',location:'',meetingDate:'',corpName:'',explanation:'',id:'',fileName:''})
    const [file, setFile] = useState();
    const userId = useSelector(state=>state.userId);
    const token = useSelector(state=>state.Authorization);
    const [cookie, setCookie] = useCookies('[refreshToken]');
    const dispatch = useDispatch();

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setEvent({...event,[name]:value});
    }

    const fileChange = (e) => {
        setEvent({...event,fileName:e.target.files[0].name})
        setFile(e.target.files[0]);
    }

    const changeArticle = (e) => {
        axios.post(`http://localhost:8080/eventModify`, event, {
            headers : {
                Authorization:token
            }
        })
            .then(res=> {
                document.location.href="/eventList/1";
            })
            .catch(err=> {
                console.log(err);
            })
    }



    return (
        <>
          <h5 style={{textAlign:'center', margin:'20px auto'}}>행사 기획 수정</h5>
          <div style={{margin:'0 auto',width:'900px', border:'1px solid lightgray', borderRadius:'7px', padding:'10px'}}>  
            <Table borderless>
                    <tbody>
                        <tr>
                            <td><Label for="title">제 목</Label></td>
                            <td><Input name="title" type="text" id="title" required="required" defaultValue={event.title}/></td>
                        </tr>
                        <tr>
                            <td><Label for="corpName">기업명</Label></td>
                            <td><Input type="text" id="corpName" name="corpName"
                                 required="required" defaultValue={event.corpName}/></td>
                        </tr>
                        <tr>
                            <td><Label for="meetingDate">행사일자</Label></td>
                            <td><Input type="Date" id="meetingDate" name="meetingDate"
                                 required="required" defaultValue={event.meetingDate}/></td>
                        </tr>
                        <tr>
                            <td><Label for="location">지 역</Label></td>
                            <td>
                                <select id="location" name='location' defaultValue={event.location}>
                                    <option>선택</option>
                                    <option>서울</option>
                                    <option>경기</option>
                                    <option>부산</option>
                                    <option>인천</option>
                                    <option>대전</option>
                                    <option>대구</option>
                                    <option>광주</option>
                                    <option>경북</option>
                                    <option>경남/울산</option>
                                    <option>전북</option>
                                    <option>전남</option>
                                    <option>충북</option>
                                    <option>충남</option>
                                    <option>세종</option>
                                    <option>강원</option>
                                    <option>제주</option>	
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><Label for="explanation">한 줄 소개</Label></td>
                            <td><Input type="text" id="explanation" name="explanation"
                                 required="required" defaultValue={event.explanation}/></td>
                        </tr>
                        <tr>
                            <td><Label for="content">내 용</Label></td>
                            <td><Input type='textarea' id="content" name="content" onChange={change}
                                cols="40" rows="15" required="required" defaultValue={event.content}/></td>
                        </tr>
                        <tr>
                            <td><Label for="file"> 썸네일 </Label></td>
                            <td><Input name="file" type="file"
                                id="file" accept="image/*" onChange={fileChange}/></td>
                        </tr>
                        <tr>
                            <td colSpan='2'> 
                                <Button color='primary'><Link to={'/eventList'}>목록</Link></Button>&nbsp;&nbsp;
                                <Button color='primary'>임시저장</Button>&nbsp;&nbsp;
                                <Button color='primary' onClick={submit}>등록</Button>
                            </td>
                        </tr>
                    </tbody>
             </Table>  
            </div>
        </>
    )

}