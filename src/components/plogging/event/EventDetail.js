import { Table, Input, Button,Label } from 'reactstrap';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';

const DetailForm = () => {
    const {id} = useParams();
    const[event, setEvent] = useState({title:'', content:'',location:'',meetingDate:'',corpName:'',explanation:'',id:'',fileId:'',view:'',createdAt:''})
    const [scrap, setScrap] = useState(false);
    const token = useSelector(state=>state.Authorization);
    const userId = useSelector(state=>state.userId);

    useEffect(() => {
        axios.get(`http://localhost:8080/eventDetail/${id}`)
            .then(res => {
                setEvent(res.data.event);
                setScrap(res.data.scrap);
            })
            .catch(err=> {
                console.log(err);
            })
    },[])
    
    const scrapClick = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8080/scrap/${event.id}`)
            .then(res => {
                setScrap(res.data.scrap);
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <>
        <div style={{margin:'0 auto',width:'1000px', height:'100%',border:'1px solid lightgray', borderRadius:'7px', padding:'10px'}}>  
            <Table style={{padding:'10px'}}>
                <tbody>
                    <tr style={{borderBottom:'1px solid', height:'30px'}}>
                        <td><Label for="title">제 목</Label></td>
                        <td><Input name="title" type="text" id="title" required="required" value={event.title} readOnly
                             style={{width:'700px', border:'none' }}/>
                             조회수<Input name='view' type='text' id='view' value={event.view}style={{border:'none'}} readOnly></Input>
                            <Input name='createdAt' type='text' id='createdAt' value={event.createdAt}  style={{border:'none'}} readOnly/></td>
                    </tr>
                    <tr style={{height:'10px'}}></tr>
                    <tr style={{borderBottom:'1px solid', height:'30px', paddingTop:'10px'}}>
                        <td><Label for="">지역/일시</Label></td>
                        <td><Input name='location' type='text' id='location' value={event.location} style={{border:'none' }} readOnly /> / 
                            <Input name='meetingDate' type='text' id='meetingDate' value={event.meetingDate} style={{border:'none' }} readOnly/></td>
                    </tr>
                    <tr style={{height:'10px'}}></tr>
                    <tr>
                        <td colSpan='2'><Input type='textarea' id="content" name="content"
                            required="required" value={event.content} style={{width:'100%', height:'100%'}} readOnly/></td>
                    </tr>
                </tbody>
            </Table>
            <div style={{textAlign:'center', marginTop:'20px', marginBottom:'10px'}}> 
            {userId==event.userId && <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'white 1px solid',marginRight:'40px'}}><a style={{textDecoration:'none',color:'white'}} href='/eventModify'>수정하기</a></Button>}
            <Button style={{boxSizing:'border-box', width:'150px', height:'33px', background:'rgba(155, 228, 206, 1)', borderRadius:'7px',fontWeight:'bold', borderStyle:'none', border:'white 1px solid',marginRight:'40px'}}><a style={{textDecoration:'none',color:'white'}} href='/list/1'>목록</a></Button>
            </div>    
        </div>
        </>
    )
}
export default DetailForm;