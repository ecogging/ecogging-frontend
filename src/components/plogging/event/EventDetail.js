import { Table, Input, Button,Label } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';

const EventDetail = () => {
    const {eventId} = useParams();
    const [userId, setUserId] = useState(1);
    const[event, setEvent] = useState({eventId:0, title:'', content:'',location:'',meetingDate:'',corpName:'',explanation:'',fileId:'',views:'',createdAt:'', management:''})
    const [isScrapped, setIsScrapped] = useState(false);
    // const [scrap, setScrap] = useState(false);
    // const token = useSelector(state=>state.Authorization);
    // const userId = useSelector(state=>state.userId);

    useEffect(() => {
        axios.post(`http://localhost:8080/eventDetail`,{userId:userId, eventId:eventId})
            .then(res => {
                setEvent(res.data.event);
                setIsScrapped(res.data.iseventScrap);
            })
            .catch(err=> {
                console.log(err);
            })
            console.log(event);
    },[])
    
    const handleScrapToggle = () => {
        axios.post(`http://localhost:8080/eventScrap`,{userId:userId, eventId:eventId})
        .then(res=> {
            setIsScrapped(res.data);
        })
        .catch(err=> {
            console.log(err);
        })    
    };

    const createdAtDate = new Date(event.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString();

      console.log(event.management);

    return (
        <>
        <div style={{margin:'0 auto',width:'1000px', height:'100%', border:'1px solid',borderRadius:'7px', padding:'10px'}}>  
            <Table style={{padding:'10px'}}>
                <tbody>
                    <tr style={{borderBottom:'1px solid', height:'30px'}}>
                        <td colSpan={2} style={{height:'50px', width:'1000px', fontSize:'25px', fontWeight:'bold'}}>{event.title}</td>
                        
                    </tr>
                    <tr style={{height:'10px'}}><td colSpan='2'><hr style={{height:'10px', border:'0', boxShadow:'0 10px 10px -10px #bbb inset'}}/></td></tr>
                    <tr style={{height:'5px'}}></tr>
                    <tr> 
                        <td style={{textAlign:'center', width:'50%', overflow:'hidden'}}>
                            <img src={`http://localhost:8080/eventImg/${event.fileId}`} alt='' width={'320px'} height={'350px'} />
                            {/* <div dangerouslySetInnerHTML={{ __html : event.content }} /> */}
                        </td>
                        <td style={{verticalAlign:'top', width:'50%', fontSize:'20px'}}>
                            <p style={{textAlign:'right', fontSize:'14px', marginRight:'40px'}}>조회수 {event.views} &nbsp;&nbsp;/&nbsp;&nbsp; {formattedDate}</p>
                            <p><b>주 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;최</b> : &nbsp;&nbsp;{event.corpName}</p>
                            <p><b>주 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;관</b> : &nbsp;&nbsp;{event.management}</p>
                            <p><b>지 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;역</b> : &nbsp;&nbsp;{event.location}</p>
                            <p><b>행사기간</b> : &nbsp;&nbsp;{event.meetingDate} ~ {event.endDate}</p>
                            <div style={{display:'flex'}}><div><b>행사내용</b> : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>{event.explanation}</div></div>
                            <p style={{margin:'26px 0 0 0', textAlign:'right'}}>
                                <button style={{boxSizing:'border-box', width:'100px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'white 1px solid',marginRight:'40px',color:'white', cursor:'pointer'}} 
                                className={`article-scrap ${isScrapped ? 'active' : ''}`} onClick={handleScrapToggle}>스크랩</button>
                            </p>
                        </td>
                    </tr>
                    <tr style={{height:'40px'}}></tr>
                    <tr><td colSpan={2} style={{fontSize:'20px', textAlign:'center'}}><span>상세내용</span></td></tr>
                    <tr style={{height:'10px'}}><td colSpan='2'><hr style={{height:'10px', border:'0', boxShadow:'0 10px 10px -10px #bbb inset'}}/></td></tr>
                    <tr><td colSpan={2}><div dangerouslySetInnerHTML={{ __html : event.content }} /></td></tr>
                    <tr style={{height:'10px'}}><td colSpan='2'><hr /></td></tr>
                </tbody>
            </Table>
            <div style={{textAlign:'center', marginTop:'10px', marginBottom:'10px'}}> 
            <Link to={`/eventModify/${eventId}`} style={{textDecoration:'none',color:'white'}}><Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'white 1px solid',marginRight:'40px',color:'white', cursor:'pointer'}}>수정하기</Button></Link>
            <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'white 1px solid',marginRight:'40px'}}><a style={{textDecoration:'none',color:'white'}} href='/eventList'>목록</a></Button>
            </div>    
        </div>
        </>
    )
}
export default EventDetail;