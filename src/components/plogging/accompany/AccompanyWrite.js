import React, {useState} from 'react';
import '../../../styles/plogging/accompany/AccompanyWrite.css';

const AccompanyWrite = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [headcount, setHeadcount] = useState('');
    const [datetime, setDatetime] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleHeadcountChange = (e) => {
        setHeadcount(e.target.value);
    };
    
    const handleDatetimeChange = (e) => {
        setDatetime(e.target.value);
    };
    
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSave = () => {
        // 임시 저장 버튼의 동작
    };
    
    const handleSubmit = () => {
        // 작성 완료 버튼의 동작
    };


    return (
        <div>
            <h1>동행 모집</h1>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input type="text" name="title" id="title" onChange={handleTitleChange} value={title} required placeholder="제목"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="location" id="location" onChange={handleLocationChange} value={location} required placeholder="장소 & 위치"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="headcount" id="headcount" onChange={handleHeadcountChange} value={headcount} required placeholder="모집 인원"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="datetime" id="datetime" onChange={handleDatetimeChange} value={datetime} required placeholder="날짜 & 시간"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea name="content" id="content" onChange={handleContentChange} value={content} placeholder="모집글 작성"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={handleSave}>임시 저장</button>
                            <button onClick={handleSubmit}>작성 완료</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AccompanyWrite;