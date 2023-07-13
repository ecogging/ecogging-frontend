
const MyButton = ({ text, type, onClick }) => {

    const btnType = ['whiteMint', 'whiteGray', 'gray', 'lightGray', 'graySmall', 'whiteGraySmall', 'whiteMintWide', 'mintWide2', 'lightGrayWide2', 'whiteGrayWide2'].includes(type ? type : 'mint');

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