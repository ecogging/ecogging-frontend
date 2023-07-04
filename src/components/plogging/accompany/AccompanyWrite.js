import '../../../styles/plogging/accompany/AccompanyWrite.css';

const AccompanyWrite = () => {
    return (
        <div className="accompany-new">
            <h1 className="accompany-subject">동행 모집</h1>
            <table className="accompany-info">
                <tbody>
                    <tr>
                        <td className="accompany-cell">
                            <input className="accompany-title" type="text" name="title" id="title" placeholder="제목"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="accompany-cell">
                            <input className="accompany-location" type="text" name="location" id="location" placeholder="장소 & 위치"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="accompany-cell">
                            <input className="accompany-headcount" type="text" name="headcount" id="headcount" placeholder="모집 인원"/>
                            <input className="accompany-datetime" type="text" name="datetime" id="datetime" placeholder="날짜 & 시간"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="accompany-cell">
                            <textarea className="accompany-content" name="content" id="content" placeholder="모집글 작성"/>
                        </td>
                    </tr>
                    <tr>
                        <td className="accompany-buttons">
                            <button className="accompany-save">임시 저장</button>
                            <button className="accompany-complete">작성 완료</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AccompanyWrite;