import { Link } from 'react-router-dom';
import '../../styles/common/Header2.css';
import styled from 'styled-components';
import ecoggingLogo from '../../assets/ecoggingLogo.png';

export default function Header2 () {
    
    const HeaderContainer = styled.div`
        width:1280px;
        height:100px;
        display:flex;
        align-items:center;
        background-color:blue;   
    `;

    const LogoContainer = styled.div`
        width:15%;
        display:flex;
        background-color:pink;
        align-items:center;
        justify-content: center;
    `;



    return (

        <HeaderContainer>
            <Link to = {'/main'}>
                <LogoContainer>
                    <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
                </LogoContainer>
            </Link>
        </HeaderContainer>
        
    );
}