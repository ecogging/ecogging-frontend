import { Table, Input, Button,Label } from 'reactstrap';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import axios from 'axios';

const DetailForm = () => {
    const {id} = useParams();
    const[event, setEvent] = useState({title:'', content:'',location:'',meetingDate:'',corpName:'',explanation:'',id:'',fileName:'',createdAt:''})
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
        <div style={{margin:'0 auto',width:'900px', border:'1px solid lightgray', borderRadius:'7px', padding:'10px'}}>  
            <Table borderless>
                <tbody>
                    <tr>
                        <td><Label for="title">제 목</Label></td>
                        <td><Input name="title" type="text" id="title" required="required" value={event.title} readOnly/>
                            <Input name='createdAt' type='Date' id='createdAt' value={event.createdAt}/></td>
                    </tr>
                    <tr>
                        <td>지역/일시</td>
                        <td><Input name='location' type='text' id='location' value={event.location}/> / 
                            <Input name='meetingDate' type='Date' id='meetingDate' value={event.meetingDate}/></td>
                    </tr>
                    <tr>
                        <td colSpan='2'><Input type='textarea' id="content" name="content"
                            required="required" value={article.content} onChange={change}/></td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            {userId==event.userId && <Button color='primary' tag='a' href='/eventModify'>수정하기</Button>}&nbsp;&nbsp;    
                            <Button color='primary' tag='a' href='/list/1'>게시판목록</Button>&nbsp;&nbsp;
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
        </>
    )
}
export default DetailForm;