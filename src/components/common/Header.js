import ecoggingLogo from '../../assets/ecoggingLogo.png';
import MyButton from './MyButton';

export default function Header() {
    return (
        <header>
            <div className='logoBox'>
                <img src={ecoggingLogo} alt='EcoggingLogo' className='mainLogo'/>
            </div>
            <div className='mainNav'>
                <ul className='outsideNav'>
                    <li className='outsideNavMenu'><a href='#' className='outsideNavA' id='navPlogging'>플로깅</a></li>
                      <div className='insideNavBox'>
                            <ul className='insideNav'>
                                <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>모임</a></li>
                                <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>행사</a></li>
                                <li className='insideNavMenu'><a href='#' className='insideNavMenuA'>후기</a></li>
                            </ul>
                        </div>
                    <li className='outsideNavMenu'><a href='#' className='outsideNavA' id='navForum'>커뮤니티</a></li>
                </ul>
            </div>
            <ul className='loginNav'>
                <li className='loginMenu'><MyButton text={'기업 로그인'} onClick={()=>alert('기업 로그인!')} type={'whiteMint'}/></li>
                <li className='loginMenu'><MyButton text={'로그인'} onClick={()=>alert('개인 로그인!')} type={'mint'}/></li>
            </ul>
        </header>       
    );
}
