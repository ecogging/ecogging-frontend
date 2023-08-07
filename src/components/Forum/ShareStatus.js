export default function ShareStatus({onStatus}){

    const hadleStatus_inProgress=()=>{
        console.log("진행중");
        const data="진행중"
        onStatus(data);
    }
    const hadleStatus_complete=()=>{
        console.log("완료");
        const data="완료"
        onStatus(data);
    }

    return(
        <>
            <li onClick={hadleStatus_inProgress}>진행중</li>
            <li onClick={hadleStatus_complete}>완료</li>
        </>
    );
}