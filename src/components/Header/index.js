import {Link, useNavigate} from 'react-router-dom';
import {Link as ScrollLink } from 'react-scroll';
import { MdSearch } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import Popup from 'reactjs-popup';
import Cookies from 'js-cookie';
import './index.css';
import CommonContext from '../../CommonContext/common';
const Header = () => {
    const navigate = useNavigate();
    const onClickLogoutBtn = () => {
        Cookies.remove('jwt_token') 
        navigate('/login')
    }
    return (
        <CommonContext.Consumer>
            {value => { 
                const { cartList } = value;
    return (
        <nav>
           <Link to='/'>  <img src="https://e7.pngegg.com/pngimages/250/321/png-clipart-bmw-logo-bmw-car-logo-bmw-logo-trademark-logo-thumbnail.png" alt="logo" className='nav-logo' /> </Link>
            <div className='search-container'>
                <input type="search" placeholder='Search' className='search-bar' />
                <MdSearch className='search-icon' />
            </div>
            <div className='links'>
                <Link to="/" className='Link mobile-links'>Home</Link>
                <ScrollLink to="newCars" className='Link mobile-links' smooth={true} duration={600} offset={-70} >New Cars</ScrollLink>
                <Link to="/services" className='Link mobile-links'>Services</Link>
                <div className='cart-items-showcontainer'> 
                <Link to="/cart" className='Link mobile-links'>Cart  </Link>
                {cartList.length > 0 && <p className='cart-items-show'>{cartList.length}</p>}
                </div>
                <div>
                <button className='logout-btn mobile-links' onClick={onClickLogoutBtn} >Logout</button>
                <Popup trigger={<button className='hamburger-menu'> <IoReorderThreeOutline className="hamberger" /> </button>} position="bottom right" modal>
                    {close => ( 
                        <div className='popup-container'>
                            <Link to="/" className='Link popup-links' onClick={close}>Home</Link>
                            <ScrollLink to="newCars" className='Link popup-links' smooth={true} duration={600} offset={-70} onClick={close}>New Cars</ScrollLink>
                            <Link to="/services" className='Link popup-links' onClick={close}>Services</Link>
                            <Link to="/cart" className='Link popup-links' onClick={close}>Cart</Link>
                            <button className='logout-btn popup-links' onClick={() => {onClickLogoutBtn(); close()}}>Logout</button>
                        </div>
                    )}  
                </Popup>
            </div>
            </div>
            
        </nav>
            )}}
        </CommonContext.Consumer>
    );
}
export default Header;