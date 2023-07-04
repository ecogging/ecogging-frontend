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

    // const handleContentChange = (content) => {
    //     setEvent((prevEvent) => ({ ...prevEvent, content: content }));
    // };  

    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");

    // 파일 저장
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    // 파일 삭제
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
    };  

    const changeEvent = (e) => {
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
          <h1 style={{textAlign:'center', margin:'20px auto'}}>행사 기획 작성</h1>
          <div style={{margin:'0 auto',width:'100%', border:'1px solid lightgray', borderRadius:'7px', padding:'10px', backgroundColor:'rgba(243, 243, 243, 1)'}}>  
            <Table style={{margin:'0 auto',width:'810px', padding:'20px'}}>
                    <tbody>
                    <tr style={{height:'10px'}}></tr>
                        <tr>
                            <td><Label for="title">제 목</Label></td>
                            <td style={{width:'700px'}}><Input style={{width:'700px', height:'25px'}} name="title" type="text" onChange={change}
                                id="title" required="required" defaultValue={event.title}/></td>
                        </tr>
                        <tr style={{height:'15px'}}></tr>
                        <tr>
                            <td><Label for="corpName">기업명</Label></td>
                            <td><Input style={{width:'700px', height:'25px'}} type="text" id="corpName" name="corpName" onChange={change}
                                 required="required" defaultValue={event.corpName}/></td>
                        </tr>
                        <tr style={{height:'15px'}}></tr>
                        <tr>
                            <td><Label for="explanation">한 줄 소개</Label></td>
                            <td><Input style={{width:'700px', height:'25px'}} type="text" id="explanation" name="explanation" onChange={change}
                                 required="required" defaultValue={event.explanation}/></td>
                        </tr>
                        <tr style={{height:'15px'}}></tr>
                        <tr>
                            <td><Label for="meetingDate">행사일자</Label></td>
                            <td><Input style={{height:'25px'}} type="Date" id="meetingDate" name="meetingDate" onChange={change}
                                 required="required" defaultValue={event.meetingDate}/></td>
                        </tr>
                        <tr style={{height:'15px'}}></tr>
                        <tr>
                            <td><Label for="location">지 역</Label></td>
                            <td>
                                <select style={{width:'85px', height:'25px'}} id="location" name='location' required="required" onChange={change} defaultValue={event.location}>
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
                        <tr style={{height:'15px'}}></tr>
                        <tr>
                            <td  style={{ verticalAlign:'top'}}><Label for="content">내 용</Label></td>
                            <td>
                            <style>{qlContainerStyle}</style>
                             <ReactQuill style={{height:'400px', background:'white'}} modules={modules} defaultValue={event.content} onChange={handleContentChange}/>   
                            {/* <Input type='textarea' id="content" name="content" onChange={change} style={{height:'100px'}}required="required" value={event.content}/> */}
                            </td>
                        </tr>
                        <tr style={{height:'60px'}}></tr>
                        <tr>
                            <td><Label for="file"> 썸네일 </Label></td>
                            <td>
                            <div>
                                {fileImage && (<img alt="sample" src={fileImage} style={{ margin: "auto" }}/>)}
                                <div style={{alignItems: "center", justifyContent: "center"}}>
                                <input name="file" type="file" accept="image/*" onChange={saveFileImage} style={{cursor: "pointer"}} defaultValue={event.file} />
                                <button style={{cursor: "pointer"}} onClick={() => deleteFileImage()}>삭제</button>
                                </div>
                            </div>       
                            </td>
                        </tr>
                        <tr style={{height:'15px'}}></tr>
                    </tbody>
             </Table>
            </div>
            <div style={{textAlign:'center', marginTop:'30px', marginBottom:'20px'}}>
            <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'rgba(155, 228, 206, 1) 1px solid',marginRight:'40px'}}><Link to={'/eventList'} style={{textDecoration:'none',color:'white'}}>취소</Link></Button>
            <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'rgba(155, 228, 206, 1) 1px solid',marginRight:'40px', color:'white'}} onClick={changeEvent}>저장</Button>       
            </div>  
        </>
    )
}

export default EventModify;