import { Table, Input, Button, Label } from 'reactstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const EventDetail = () => {
  const { eventId, page, ptype } = useParams();
  const [userId, setUserId] = useState(1);
  const [event, setEvent] = useState({eventId: 0,title: '',content: '',location: '',meetingDate: '',corpName: '',explanation: '',fileId: '',views: '',createdAt: '',management: '',});
  const [isScrapped, setIsScrapped] = useState(false);
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // 상태 변수 추가
  const [modalImageSrc, setModalImageSrc] = useState(''); // 상태 변수 추가

  useEffect(() => {
    axios
      .post(`http://localhost:8080/eventDetail`, { userId: userId, eventId: eventId })
      .then((res) => {
        setEvent(res.data.event);
        setIsScrapped(res.data.iseventScrap);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(event);
  }, []);

  const handleScrapToggle = () => {
    axios
      .post(`http://localhost:8080/eventScrap`, { userId: userId, eventId: eventId })
      .then((res) => {
        setIsScrapped(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createdAtDate = new Date(event.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString();

  const handleImageClick = (src) => {
    setModalImageSrc(src);
    setIsImageModalOpen(true);
  };

  const closeModal = () => {
    setIsImageModalOpen(false);
    setModalImageSrc('');
  };

  return (
    <>
      <div style={{ margin: '0 auto', width: '1000px', height: '100%', border: '1px solid', borderRadius: '7px', padding: '10px' }}>
        <Table style={{ padding: '10px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid', height: '30px' }}>
              <td colSpan={2} style={{ height: '50px', width: '1000px', fontSize: '25px', fontWeight: 'bold' }}>
                {event.title}
              </td>
            </tr>
            <tr style={{ height: '10px' }}>
              <td colSpan="2">
                <hr style={{ height: '10px', border: '0', boxShadow: '0 10px 10px -10px #bbb inset' }} />
              </td>
            </tr>
            <tr style={{ height: '5px' }}></tr>
            <tr>
              <td style={{ textAlign: 'center', width: '50%', overflow: 'hidden' }}>
                <img
                  src={`http://localhost:8080/eventImg/${event.fileId}`}
                  alt=""
                  width={'320px'}
                  height={'350px'}
                  onClick={() => handleImageClick(`http://localhost:8080/eventImg/${event.fileId}`)} // 이미지 클릭 이벤트 핸들러 추가
                  style={{ cursor: 'pointer' }} // 이미지 커서 속성 추가
                />
                {/* <div dangerouslySetInnerHTML={{ __html : event.content }} /> */}
              </td>
              <td style={{ verticalAlign: 'top', width: '50%', fontSize: '20px' }}>
                <p style={{ textAlign: 'right', fontSize: '14px', marginRight: '40px' }}>
                  조회수 {event.views} &nbsp;&nbsp;/&nbsp;&nbsp; {formattedDate}
                </p>
                <p>
                  <b style={{marginRight:'2px'}}>주 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;최</b> : &nbsp;&nbsp;{event.corpName}
                </p>
                <p>
                  <b style={{marginRight:'2px'}}>주 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;관</b> : &nbsp;&nbsp;{event.management}
                </p>
                <p>
                  <b style={{marginRight:'2px'}}>지 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;역</b> : &nbsp;&nbsp;{event.location}
                </p>
                <p>
                  <b>행사기간</b> : &nbsp;&nbsp;{event.meetingDate} ~ {event.endDate}
                </p>
                <div style={{ display: 'flex' }}>
                  <div style={{width:'105px'}}>
                    <b>행사내용</b> :
                  </div>
                  <div style={{width:'380px'}}>{event.explanation}</div>
                </div>
                <p style={{ margin: '26px 0 0 0', textAlign: 'right' }}>
                  <button style={{boxSizing: 'border-box',width: '100px',height: '33px',background: 'rgba(155, 228, 206, 1)', borderRadius: '7px',
                    fontWeight: 'bold',borderStyle: 'none',border: 'white 1px solid',marginRight: '40px',color: 'white',cursor: 'pointer',}}
                    className={`article-scrap ${isScrapped ? 'active' : ''}`} onClick={handleScrapToggle}>
                    스크랩
                  </button>
                </p>
              </td>
            </tr>
            <tr style={{ height: '40px' }}></tr>
            <tr>
              <td colSpan={2} style={{ fontSize: '20px', textAlign: 'center' }}>
                <span>상세내용</span>
              </td>
            </tr>
            <tr style={{ height: '10px' }}>
              <td colSpan="2">
                <hr style={{ height: '10px', border: '0', boxShadow: '0 10px 10px -10px #bbb inset' }} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div dangerouslySetInnerHTML={{ __html: event.content }} />
              </td>
            </tr>
            <tr style={{ height: '10px' }}>
              <td colSpan="2">
                <hr />
              </td>
            </tr>
          </tbody>
        </Table>
        <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <Link to={`/eventModify/${eventId}`} style={{ textDecoration: 'none', color: 'white' }}>
            <Button style={{boxSizing: 'border-box',width: '150px',height: '33px',background: 'rgba(155, 228, 206, 1)',borderRadius: '7px',
                      fontWeight: 'bold',borderStyle: 'none',border: 'white 1px solid',marginRight: '40px',color: 'white',cursor: 'pointer'}}>
              수정하기
            </Button>
          </Link>
          <Button style={{boxSizing: 'border-box',width: '150px',height: '33px',background: 'rgba(155, 228, 206, 1)',borderRadius: '7px',fontWeight: 'bold',
                borderStyle: 'none',border: 'white 1px solid',marginRight: '40px',color: 'white',cursor: 'pointer'}}onClick={() => {navigate('/eventList/' + page + '/' + ptype);}}>
            목록
          </Button>
        </div>
      </div>
      {isImageModalOpen && (
        <div style={{position: 'fixed',top: '0',left: '0',right: '0',bottom: '0',zIndex: '9999', display: 'flex',
                justifyContent: 'center',alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)',}} onClick={closeModal}>
          <div style={{ position: 'relative', width: '95%', height: '95%', maxWidth: '100%', maxHeight: '100%',}}>
            <img src={modalImageSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onClick={closeModal}/>
          </div>
        </div>)}
    </>
  );
};

export default EventDetail;
