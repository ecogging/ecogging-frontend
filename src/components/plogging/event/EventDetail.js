import { Table, Input, Button,Label } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';

const EventDetail = () => {
    const {eventId} = useParams();
    const [userId, setUserId] = useState(1);
    const[event, setEvent] = useState({eventId:0, title:'', content:'',location:'',meetingDate:'',corpName:'',explanation:'',fileId:'',views:'',createdAt:''})
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


    return (
        <>
        <div style={{margin:'0 auto',width:'1000px', height:'100%',border:'1px solid lightgray', borderRadius:'7px', padding:'10px'}}>  
            <Table style={{padding:'10px'}}>
                <tbody>
                    <tr style={{borderBottom:'1px solid', height:'30px'}}>
                        <td colSpan='2'><Input name="title" type="text" id="title" required="required" value={event.title} readOnly style={{border:'none', width:'90%' }}/></td>
                        <td  style={{fontSize:'13px', width:'10%', textAlign:"right"}}>조회수 {event.views} &nbsp;&nbsp;/&nbsp;&nbsp; {formattedDate}</td>
                    </tr>
                    <tr style={{height:'10px'}}></tr>
                    <tr style={{borderBottom:'1px solid', height:'30px', paddingTop:'10px'}}>
                        <td><Label for="">지역/일시</Label></td>
                        <td><Input name='location' type='text' id='location' value={event.location} style={{border:'none' }} readOnly />/</td> 
                        <td><Input name='meetingDate' type='text' id='meetingDate' value={event.meetingDate} style={{border:'none' }} readOnly/></td>
                    </tr>
                    <tr style={{height:'10px'}}></tr>
                    <tr>
                        <td colSpan='3'><Input type='textarea' id="content" name="content"
                            required="required" value={event.content} style={{width:'100%', height:'100%'}} readOnly/></td>
                    </tr>
                    <tr>
                        <td className="buttons-above">
                            <button className={`article-scrap ${isScrapped ? 'active' : ''}`} onClick={handleScrapToggle}>스크랩</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div style={{textAlign:'center', marginTop:'20px', marginBottom:'10px'}}> 
            <Link to={`/eventModify/${eventId}`} style={{textDecoration:'none',color:'white'}}><Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'white 1px solid',marginRight:'40px',color:'white'}}>수정하기</Button></Link>
            <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'white 1px solid',marginRight:'40px'}}><a style={{textDecoration:'none',color:'white'}} href='/eventList'>목록</a></Button>
            </div>    
        </div>
        </>
    )
}
export default EventDetail;