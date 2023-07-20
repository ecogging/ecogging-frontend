import { Table, Input, Button,Label } from 'reactstrap';
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useParams } from 'react-router-dom';
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import { reqToken } from '../requestToken';
import axios from 'axios';

const EventModify = () => {
    const { eventId } = useParams();
    const [userId, setUserId] = useState(1);
    const[event, setEvent] = useState({userId:userId,title:'', content:'',location:'',meetingDate:'',corpName:'',explanation:'',fileId:'',save:false,management:''})
    const [file, setFile] = useState();
    //const userId = useSelector(state=>state.userId);
    const token = useSelector(state=>state.Authorization);
    const [cookie, setCookie] = useCookies('[refreshToken]');
    const dispatch = useDispatch();

    useEffect(() => {
        axios
        .post(`http://localhost:8080/eventDetail`, { userId: userId, eventId: eventId })
        .then((res) => {
            setEvent(res.data.event);
        })
        .catch((err) => {
            console.log(err);

        });
    }, []);

    useEffect(() => {
        setFileImage(`http://localhost:8080/eventImg/${event.fileId}`);
      }, [event.fileId]);
      

    const change = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
      }

      const eventModify = (psave) => {
        // if (e) {
        //     e.preventDefault();
        //   }
        const formData = new FormData();
        formData.append('eventId', eventId);
        formData.append('title', event.title);
        formData.append('content', event.content);
        formData.append('location', event.location);
        formData.append('meetingDate', event.meetingDate);
        formData.append('endDate', event.endDate);
        formData.append('corpName', event.corpName);
        formData.append('explanation', event.explanation);
        formData.append('userId', userId);
        formData.append('save', psave);
        formData.append('fileId', event.fileId);
        formData.append('file', file);
        formData.append('views', event.views);
        formData.append('management', event.management);

        axios.post(`http://localhost:8080/eventModify`, formData
        // , {headers : {Authorization:token}}
        )
            .then(res=> {
                document.location.href="/eventList";
            })
            .catch(err=> {
                console.log(err);
            })
    }

    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState(`http://localhost:8080/eventImg/${event.fileId}`);

    // 파일 저장
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    // 파일 삭제
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        fileInput.current.value = "";
        setFileImage(null); // fileImage 초기화
        setFile(null); // input file 초기화
    };  

    const fileInput=useRef();

    const handleTempSave = (e) => {
        e.preventDefault();
        setEvent((prevEvent) => ({ ...prevEvent, save: true }));
        eventModify(true);
    };
    
    const handleRegister = (e) => {
        e.preventDefault();
        if (!event.title) {
            alert('제목을 입력해 주세요');
            return;
        }
        
        if (!event.corpName) {
            alert('기업명을 입력해 주세요');
            return;
        }
        
        if(!event.explanation){
            alert('행사개요를 입력해 주세요');
            return;
        }
                
        if (!event.meetingDate) {
            alert('시작일자를 입력해 주세요');
            return;
        }
        
        if (!event.endDate) {
            alert('종료일자를 입력해 주세요');
            return;
        }

        if (!event.location) {
            alert('지역을 선택해 주세요');
            return;
            }
            
            if (!event.content) {
            alert('본문을 작성해 주세요');
            return;
            }

        if (!file && event.fileId=='') {
            alert('썸네일을 선택해 주세요');
            return;
        }  

        if (new Date(event.meetingDate) > new Date(event.endDate)) {
            alert('시작일자는 종료일자와 같거나 이전 날짜여야 합니다');
            return;
        }
        setEvent((prevEvent) => ({ ...prevEvent, save: false }));
        eventModify(false);
    };

    const modules = {
        toolbar: {
            container: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
              [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
              ['image'],
              ['clean']  
            ],
        }
    }
    

    const qlContainerStyle = `
    .ql-container.ql-snow {
      background-color: white;
    }`;


    return (
        <>
        <div style={{margin:'0 auto',width:'100%', border:'1px solid lightgray', borderRadius:'7px', padding:'10px', backgroundColor:'rgba(243, 243, 243, 1)'}}>  
        <h1 style={{textAlign:'center', margin:'0 auto', marginTop:'20px'}}>행사 기획 작성</h1>
          <Table style={{margin:'0 auto',width:'860px', padding:'20px'}}>
                  <tbody>
                  <tr style={{height:'10px'}}></tr>
                      <tr>
                          <td style={{width:'100px'}}><Label for="title">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</Label></td>
                          <td>
                            <Input style={{width:'700px', height:'25px'}} name="title" type="text" onChange={change} id="title" required="required"
                               value={event.title} placeholder="제목을 입력해 주세요(27자 이하)" maxLength='27'/>
                          </td>
                      </tr>
                      <tr style={{height:'15px'}}></tr>
                      <tr>
                          <td><Label for="corpName">주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;최</Label></td>
                          <td><Input style={{width:'700px', height:'25px'}} type="text" id="corpName" name="corpName" onChange={change}
                               required="required" value={event.corpName} placeholder="주최명을 입력해 주세요(16자 이하)" maxLength='16'/></td>
                      </tr>
                      <tr style={{height:'15px'}}></tr>
                      <tr>
                          <td><Label for="management">주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;관</Label></td>
                          <td><Input style={{width:'700px', height:'25px'}} type="text" id="management" name="management" onChange={change}
                               required="required" value={event.management} placeholder="주관명을 입력해 주세요(16자 이하)" maxLength='16'/></td>
                      </tr>
                      <tr style={{height:'15px'}}></tr>
                      <tr>
                          <td><Label for="explanation">행사내용</Label></td>
                          <td><Input style={{width:'700px', height:'25px'}} type="text" id="explanation" name="explanation" onChange={change}
                               required="required" value={event.explanation} placeholder="행사내용를 입력해 주세요(60자 이하)" maxLength='60'/></td>
                      </tr>
                      <tr style={{height:'15px'}}></tr>
                      <tr>
                          <td><Label for="meetingDate">시작일자</Label></td>
                          <td><Input style={{height:'25px', marginRight:'25px'}} type="Date" id="meetingDate" name="meetingDate" onChange={change}
                               required="required" value={event.meetingDate}/>
                               <span style={{fontSize:'20px'}}>~</span>
                               <Label for="endDate" style={{marginRight:'20px', marginLeft:'20px'}}>종료일자</Label>
                               <Input style={{height:'25px'}} type="Date" id="endDate" name="endDate" onChange={change}
                               required="required" value={event.endDate}/>
                          </td>
                          
                          
                      </tr>
                      <tr style={{height:'15px'}}></tr>
                      <tr>
                          <td><Label for="location">지&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;역</Label></td>
                          <td>
                              <select style={{width:'85px', height:'25px'}} id="location" name='location' value={event.location} required="required" onChange={change}>
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
                                  <option>기타</option>	
                              </select>
                          </td>
                      </tr>
                      <tr style={{height:'15px'}}></tr>
                      <tr>
                          <td  style={{ verticalAlign:'top'}}><Label for="content">상세내용</Label></td>
                          <td>
                          <style>{qlContainerStyle}</style>
                           <ReactQuill style={{height:'400px', background:'white'}} id='content' name='content' modules={modules} value={event.content} 
                                       onChange={(content) => {setEvent((prevEvent) => ({ ...prevEvent, content }));}}/>   
                          </td>
                      </tr>
                      <tr style={{height:'70px'}}></tr>
                      <tr>
                          <td><Label for="file"> 썸네일 </Label></td>
                          <td>
                          <div>
                              {fileImage && (<img alt="" src={fileImage} style={{ margin: "auto", width:'290px',height:'210px'}}/>)}
                              <div style={{alignItems: "center", justifyContent: "center"}}>
                                <input name="file" type="file" accept="image/*" ref={fileInput} onChange={saveFileImage} style={{cursor: "pointer"}} />
                                <button style={{cursor: "pointer"}} onClick={() => deleteFileImage()}>삭제</button>
                              </div>
                          </div>       
                          </td>
                      </tr>
                      <tr>
                      <td></td>                           
                      <td><span style={{fontSize:'14  px', color:'gray'}}>*썸네일 사이즈(290x210)</span></td>
                      </tr>
                      <tr style={{height:'15px'}}>
                        <input type='hidden' name='save' id='save' value={event.save}/>
                        <input type='hidden' name='userId' id='userId' value={event.userId}/>
                      </tr>
                  </tbody>
           </Table>
          </div>
          <div style={{textAlign:'center', marginTop:'30px', marginBottom:'20px'}}>
           <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'rgba(155, 228, 206, 1) 1px solid',marginRight:'40px', cursor:'pointer'}}><Link to={'/eventList'} style={{textDecoration:'none',color:'white'}}>목록</Link></Button>
           <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'rgba(155, 228, 206, 1) 1px solid',marginRight:'40px', color:'white', cursor:'pointer'}} onClick={handleTempSave}>임시저장</Button>
           <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'rgba(155, 228, 206, 1) 1px solid',marginRight:'40px', color:'white', cursor:'pointer' }} onClick={handleRegister}>수정완료</Button>       
          </div> 
      </>
    )
}

export default EventModify;