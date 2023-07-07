
const MyButton = ({ text, type, onClick }) => {

    const btnType = ['whiteMint', 'whiteGray', 'gray', 'graySmall', 'whiteMintWide'].includes(type ? type : 'mint');

    return (
        <button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
    
}
MyButton.defaultProps = {
    type: "mint"
}

export default MyButton;